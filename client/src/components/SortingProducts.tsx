import * as React from "react";

type PropsType = {
    handleSort: (key: 'price' | 'rating') => void;
    sortKey: 'price' | 'rating' | null;
    sortOrder: 'asc' | 'desc';
}

export const SortingProducts: React.FC<PropsType> = ({handleSort, sortKey, sortOrder}) => {
    function getArrow(key: 'price' | 'rating'): string {
        if (sortKey !== key)
            return '';

        return sortOrder === 'asc' ? '↑' : '↓';
    }

    return (
        <div className="toolbar">
            <span className="toolbar__label">Сортировать:</span>
            <button className="toolbar__btn" onClick={() => handleSort('price')}>
                Цена {getArrow('price')}
            </button>
            <button className="toolbar__btn" onClick={() => handleSort('rating')}>
                Рейтинг {getArrow('rating')}
            </button>
        </div>
    )
}
