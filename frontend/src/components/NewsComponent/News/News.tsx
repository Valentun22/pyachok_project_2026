import {useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../hooks/useReduxHooks';
import {newsActions} from '../../../redux/slices/newsSlice';
import {NewsTypeEnum} from '../../../interfaces/INewsInterface';
import css from './News.module.css';
import {NewsCard} from "../NewsCard/NewsCard";
import Pagination from '../../Pagination/Pagination';

const TYPE_FILTERS: { label: string; value: NewsTypeEnum | null }[] = [
    {label: 'Всі', value: null},
    {label: 'Загальне', value: NewsTypeEnum.GENERAL},
    {label: 'Акції', value: NewsTypeEnum.PROMOTION},
    {label: 'Події', value: NewsTypeEnum.EVENT},
];

const LIMIT =9;

const News = () => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const {news, total, activeType, loading, error} = useAppSelector(state => state.news);

    const page = Number(searchParams.get('page') ?? 1);

    const setPage = (p: number) => setSearchParams(prev => {
        const n = new URLSearchParams(prev);
        n.set('page', String(p));
        return n;
    });

    useEffect(() => {
        dispatch(newsActions.getAll({
            type: activeType ?? undefined,
            offset: (page - 1) * LIMIT,
            limit: LIMIT,
        }));
    }, [dispatch, page, activeType]);

    const handleTypeChange = (type: NewsTypeEnum | null) => {
        dispatch(newsActions.setActiveType(type));
        setPage(1);
    };

    return (
        <div className={css.page}>
            <div className={css.hero}>
                <h1 className={css.heroTitle}>Новини</h1>
                <p className={css.heroSub}>Акції, події та оновлення від найкращих місць міста</p>
            </div>

            <div className={css.filters}>
                {TYPE_FILTERS.map(f => (
                    <button
                        key={String(f.value)}
                        className={`${css.filterBtn} ${activeType === f.value ? css.active : ''}`}
                        onClick={() => handleTypeChange(f.value)}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {loading && (
                <div className={css.skeletonGrid}>
                    {Array.from({length: 6}).map((_, i) => (
                        <div key={i} className={css.skeleton}/>
                    ))}
                </div>
            )}

            {error && !loading && (
                <div className={css.error}>
                    <p>😕 {error}</p>
                    <button className={css.retryBtn} onClick={() => dispatch(newsActions.getAll({offset: (page - 1) * LIMIT, limit: LIMIT}))}>Спробувати знову</button>
                </div>
            )}

            {!loading && !error && news.length === 0 && (
                <div className={css.empty}>
                    <span>📭</span>
                    <p>Новин поки немає</p>
                </div>
            )}

            {!loading && news.length > 0 && (
                <>
                    <div className={css.grid}>
                        {news.map(item => (
                            <NewsCard key={item.id} news={item}/>
                        ))}
                    </div>
                    <Pagination page={page} total={total} limit={LIMIT} onChange={p => { setPage(p); window.scrollTo(0, 0); }}/>
                </>
            )}
        </div>
    );
};

export {News};