import {useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../hooks/useReduxHooks';
import {venuesActions} from '../../../redux/slices/venuesSlice';
import {Venue} from '../Venue/Venue';
import css from './Venues.module.css';
import Pagination from '../../Pagination/Pagination';

const LIMIT = 9;

const Venues = () => {
    const {venues, loading, error, total} = useAppSelector(state => state.venues);
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get('page') ?? 1);
    const setPage = (p: number) => { setSearchParams({page: String(p)}); window.scrollTo(0, 0); };

    useEffect(() => {
        dispatch(venuesActions.getAll({page, limit: LIMIT}));
    }, [dispatch, page]);

    return (
        <div className={css.wrap}>
            <div className={css.headerRow}>
                <h2 className={css.title}>Всі заклади</h2>
                <span className={css.count}>{total > 0 ? `${total} закладів` : ''}</span>
            </div>

            {loading && (
                <div className={css.grid}>
                    {Array.from({length: LIMIT}).map((_, i) => (
                        <div key={i} className={css.skeleton}/>
                    ))}
                </div>
            )}

            {error && !loading && (
                <div className={css.state}>
                    <span>😕</span>
                    <p>{error}</p>
                    <button className={css.retryBtn} onClick={() => dispatch(venuesActions.getAll({page, limit: LIMIT}))}>
                        Спробувати знову
                    </button>
                </div>
            )}

            {!loading && venues.length === 0 && !error && (
                <div className={css.state}>
                    <span>🏗</span>
                    <p>Заклади ще не додані</p>
                </div>
            )}

            {!loading && venues.length > 0 && (
                <div className={css.grid}>
                    {venues.map(v => <Venue key={v.id} venue={v}/>)}
                </div>
            )}

            {!loading && <Pagination page={page} total={total} limit={LIMIT} onChange={setPage}/>}
        </div>
    );
};

export {Venues};