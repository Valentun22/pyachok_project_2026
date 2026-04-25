import css from './Pagination.module.css';

interface Props {
    page: number;
    total: number;
    limit: number;
    onChange: (page: number) => void;
}

const Pagination = ({page, total, limit, onChange}: Props) => {
    const totalPages = Math.ceil(total / limit);
    if (totalPages <= 1) return null;

    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
        pages.push(1);
        if (page > 3) pages.push('...');
        for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
        if (page < totalPages - 2) pages.push('...');
        pages.push(totalPages);
    }

    return (
        <div className={css.pagination}>
            <button className={css.btn} disabled={page === 1} onClick={() => onChange(page - 1)}>‹</button>
            {pages.map((p, i) =>
                p === '...'
                    ? <span key={`dots-${i}`} className={css.dots}>…</span>
                    : <button key={p} className={`${css.btn} ${p === page ? css.active : ''}`}
                              onClick={() => onChange(p as number)}>{p}</button>
            )}
            <button className={css.btn} disabled={page === totalPages} onClick={() => onChange(page + 1)}>›</button>
        </div>
    );
};

export default Pagination;