import {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import css from './PyachokComponent.module.css';
import {IPyachokItem, PyachokStatusEnum} from '../../../interfaces/IPyachokInterface';
import {pyachokService} from '../../../services/pyachok.service';
import {useAppSelector} from '../../../hooks/useReduxHooks';
import img1 from '../../../img/img1.png';
import Pagination from '../../Pagination/Pagination';

const GENDER_LABELS: Record<string, string> = {any: 'Будь-яка', male: '👨 Чоловіча', female: '👩 Жіноча'};
const PAYER_LABELS: Record<string, string> = {
    any: 'Обговоримо',
    me: '👤 Я пригощаю',
    split: '🤝 Поровну',
    other: '🎁 Мене пригощають'
};

type ViewTab = 'feed' | 'my';

const PyachokCard = ({item, onNavigate}: { item: IPyachokItem; onNavigate: (id: string) => void }) => (
    <article className={css.card}>
        <div className={css.cardHeader}>
            <div className={css.userRow}>
                {(item.user as any)?.image
                    ? <img src={(item.user as any).image} alt="" className={css.avatar}/>
                    : <div className={css.avatarPlaceholder}>{item.user?.name?.[0]?.toUpperCase() ?? '?'}</div>}
                <span className={css.userName}>{item.user?.name ?? 'Я'}</span>
            </div>
            <span className={`${css.statusBadge} ${item.status === PyachokStatusEnum.OPEN ? css.open : css.closed}`}>
                {item.status === PyachokStatusEnum.OPEN ? '🟢 Відкритий' : '🔴 Закритий'}
            </span>
        </div>
        {item.venue && (
            <div className={css.venueRow} onClick={() => onNavigate(item.venue!.id)}>
                🏠 <span className={css.venueName}>{item.venue.name}</span>
                {item.venue.city && <span className={css.venueCity}>{item.venue.city}</span>}
            </div>
        )}
        <div className={css.dateRow}>
            <span>📅 {new Date(item.date).toLocaleDateString('uk-UA', {day: 'numeric', month: 'long'})}</span>
            <span>🕐 {item.time}</span>
        </div>
        {item.purpose && <p className={css.purpose}>🎯 {item.purpose}</p>}
        <div className={css.tags}>
            {item.peopleCount && <span className={css.tag}>👥 {item.peopleCount} осіб</span>}
            {item.genderPreference && item.genderPreference !== 'any' &&
                <span className={css.tag}>{GENDER_LABELS[item.genderPreference]}</span>}
            {item.payer && item.payer !== 'any' && <span className={css.tag}>{PAYER_LABELS[item.payer]}</span>}
            {item.expectedBudget && <span className={css.tag}>💰 ≈{item.expectedBudget} ₴</span>}
        </div>
        {item.message && <p className={css.message}>"{item.message}"</p>}
    </article>
);

const LIMIT = 12;

const PyachokComponent = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const {isAuth} = useAppSelector(state => state.auth);

    const viewTab = (searchParams.get('ptab') ?? 'feed') as ViewTab;
    const page = Number(searchParams.get('page') ?? 1);

    const setViewTab = (tab: ViewTab) => setSearchParams(prev => {
        const n = new URLSearchParams(prev);
        n.set('ptab', tab);
        n.set('page', '1');
        return n;
    });

    const setPage = (p: number) => {
        setSearchParams(prev => { const n = new URLSearchParams(prev); n.set('page', String(p)); return n; });
        window.scrollTo(0, 0);
    };

    const [items, setItems] = useState<IPyachokItem[]>([]);
    const [myItems, setMyItems] = useState<IPyachokItem[]>([]);
    const [total, setTotal] = useState(0);
    const [myTotal, setMyTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [myLoading, setMyLoading] = useState(false);

    const loadFeed = async (p: number) => {
        setLoading(true);
        try {
            const {data} = await pyachokService.getOpenFeed({limit: LIMIT, page: p});
            const list = (data as any).items ?? (data as any).data ?? [];
            setItems(list);
            setTotal((data as any).total ?? 0);
        } catch {}
        setLoading(false);
    };

    const loadMy = async (p: number) => {
        if (!isAuth) return;
        setMyLoading(true);
        try {
            const {data} = await pyachokService.getMyList({limit: LIMIT, page: p});
            const list = (data as any).items ?? (data as any).data ?? [];
            setMyItems(list);
            setMyTotal((data as any).total ?? 0);
        } catch {}
        setMyLoading(false);
    };

    useEffect(() => {
        if (viewTab === 'feed') loadFeed(page);
        if (viewTab === 'my' && isAuth) loadMy(page);
    }, [viewTab, page, isAuth]);

    const renderList = (
        list: IPyachokItem[], isLoading: boolean, curTotal: number, emptyText: string,
    ) => (
        <>
            {isLoading && <div className={css.grid}>{Array.from({length: 6}).map((_, i) => <div key={i} className={css.skeleton}/>)}</div>}
            {!isLoading && list.length === 0 && (
                <div className={css.empty}>
                    <span>🍻</span><p>{emptyText}</p>
                    <button className={css.emptyBtn} onClick={() => navigate('/searchVenue')}>Шукати заклади</button>
                </div>
            )}
            {list.length > 0 && (
                <>
                    <div className={css.grid}>
                        {list.map(item => <PyachokCard key={item.id} item={item} onNavigate={id => navigate(`/venues/${id}`)}/>)}
                    </div>
                    <Pagination page={page} total={curTotal} limit={LIMIT} onChange={setPage}/>
                </>
            )}
        </>
    );

    return (
        <div className={css.page}>
            <div className={css.hero}>
                <img src={img1} alt="Logo"/>
                <p className={css.heroSub}>Шукаєш компанію? Знайди людей, які хочуть провести час у барі чи ресторані</p>
                <div className={css.heroBtns}>
                    <button className={css.heroBtn} onClick={() => navigate('/searchVenue')}>Знайти заклад</button>
                </div>
            </div>
            <div className={css.container}>
                <div className={css.tabRow}>
                    <button className={`${css.tabBtn} ${viewTab === 'feed' ? css.tabActive : ''}`}
                            onClick={() => setViewTab('feed')}>
                        🌐 Стрічка <span className={css.totalBadge}>{total}</span>
                    </button>
                    {isAuth && (
                        <button className={`${css.tabBtn} ${viewTab === 'my' ? css.tabActive : ''}`}
                                onClick={() => setViewTab('my')}>
                            👤 Мої запити <span className={css.totalBadge}>{myTotal}</span>
                        </button>
                    )}
                </div>
                {viewTab === 'feed' && renderList(items, loading, total, 'Відкритих запитів поки немає. Знайди заклад і натисни «Пиячок»!')}
                {viewTab === 'my' && renderList(myItems, myLoading, myTotal, 'Ти ще не створював запитів. Знайди заклад і натисни «Пиячок»!')}
            </div>
        </div>
    );
};

export {PyachokComponent};