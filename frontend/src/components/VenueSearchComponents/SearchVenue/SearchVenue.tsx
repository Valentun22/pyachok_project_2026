import {useState, useEffect, useCallback} from 'react';
import {useSearchParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../hooks/useReduxHooks';
import {venueSearchActions} from '../../../redux/slices/venueSearchSlice';
import {IVenueSearchQuery, SortOrderEnum, VenueSortByEnum} from '../../../interfaces/IVenueSearchInterface';
import css from './SearchVenue.module.css';
import {SearchFilters} from "../SearchFilters/SearchFilters";
import {VenueSearchCard} from "../VenueSearchCard/VenueSearchCard";
import Pagination from '../../Pagination/Pagination';

const LIMIT = 12;

const SearchVenue = () => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const {venues, total, query, loading, error} = useAppSelector(state => state.venueSearch);

    const page = Number(searchParams.get('page') ?? 1);
    const [inputValue, setInputValue] = useState(query.search ?? '');

    const setPage = (p: number) => setSearchParams(prev => {
        const n = new URLSearchParams(prev);
        n.set('page', String(p));
        return n;
    });

    useEffect(() => {
        const tagFromUrl = searchParams.get('tag');
        const cityFromUrl = searchParams.get('city');
        const q: IVenueSearchQuery = {offset: 0};
        if (tagFromUrl) {
            q.tag = tagFromUrl;
            setInputValue(tagFromUrl);
        }
        if (cityFromUrl) q.city = cityFromUrl;
        if (tagFromUrl || cityFromUrl) {
            dispatch(venueSearchActions.setQuery(q));
            dispatch(venueSearchActions.search(q));
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (inputValue.trim()) {
                const isTagSearch = query.tag === inputValue.trim();
                const q = isTagSearch
                    ? {...query, offset: (page - 1) * LIMIT, limit: LIMIT}
                    : {...query, search: inputValue.trim(), tag: undefined, offset: (page - 1) * LIMIT, limit: LIMIT};
                dispatch(venueSearchActions.setQuery(q));
                dispatch(venueSearchActions.search(q));
            } else if (!inputValue) {
                dispatch(venueSearchActions.resetSearch());
            }
        }, 400);
        return () => clearTimeout(timer);
    }, [inputValue, page]);

    const handleFiltersApply = useCallback((filters: IVenueSearchQuery) => {
        const q = {...filters, search: inputValue || undefined, offset: 0, limit: LIMIT};
        dispatch(venueSearchActions.setQuery(q));
        dispatch(venueSearchActions.search(q));
        setPage(1);
    }, [dispatch, inputValue]);

    const handleFiltersReset = () => {
        dispatch(venueSearchActions.resetSearch());
        setInputValue('');
        setPage(1);
    };

    const defaultQuery: IVenueSearchQuery = {
        sortBy: VenueSortByEnum.CREATED,
        sortOrder: SortOrderEnum.DESC,
        ...query,
    };

    return (
        <div className={css.page}>
            <div className={css.hero}>
                <h1 className={css.title}>Знайди своє місце</h1>
                <p className={css.sub}>Ресторани, бари, кафе та інші заклади поруч із тобою</p>
            </div>

            <div className={css.searchRow}>
                <div className={css.searchBox}>
                    <span className={css.searchIcon}>🔍</span>
                    <input
                        className={css.input}
                        type="text"
                        placeholder="Назва закладу, тег, місто..."
                        value={inputValue}
                        onChange={e => {
                            setInputValue(e.target.value);
                            setPage(1);
                        }}
                        autoFocus
                    />
                    {inputValue && (
                        <button className={css.clearBtn} onClick={() => {
                            setInputValue('');
                            dispatch(venueSearchActions.resetSearch());
                        }}>✕</button>
                    )}
                </div>
                <SearchFilters query={defaultQuery} onApply={handleFiltersApply} onReset={handleFiltersReset}/>
            </div>

            {!loading && total > 0 && (
                <p className={css.resultsCount}>Знайдено: <strong>{total}</strong> закладів</p>
            )}

            {loading && (
                <div className={css.grid}>
                    {Array.from({length: 8}).map((_, i) => <div key={i} className={css.skeleton}/>)}
                </div>
            )}

            {error && !loading && <div className={css.state}><span>😕</span><p>{error}</p></div>}

            {!loading && !error && inputValue && venues.length === 0 && (
                <div className={css.state}><span>🔦</span><p>За запитом <strong>«{inputValue}»</strong> нічого не
                    знайдено</p></div>
            )}

            {!loading && !error && !inputValue && !query.tag && !query.city && venues.length === 0 && (
                <div className={css.state}><span>🗺</span><p>Введи назву закладу або застосуй фільтри</p></div>
            )}

            {!loading && !error && (query.tag || query.city) && venues.length === 0 && (
                <div className={css.state}><span>🔦</span><p>За фільтрами нічого не знайдено</p></div>
            )}

            {!loading && venues.length > 0 && (
                <>
                    <div className={css.grid}>
                        {venues.map(v => <VenueSearchCard key={v.id} venue={v}/>)}
                    </div>
                    <Pagination page={page} total={total} limit={LIMIT} onChange={p => {
                        setPage(p);
                        window.scrollTo(0, 0);
                    }}/>
                </>
            )}
        </div>
    );
};

export {SearchVenue};