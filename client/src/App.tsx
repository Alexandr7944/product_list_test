import {useState, useEffect, useMemo} from 'react'
import './App.css'
import {ProductList} from "./components/ProductList.tsx";
import {SortingProducts} from "./components/SortingProducts.tsx";
import {useAppDispatch, useAppSelector} from "./hooks/hook.ts";
import {fetchProducts} from "./store/thunks.ts";

function App() {
    const dispatch = useAppDispatch();
    const [sortKey, setSortKey] = useState<'price' | 'rating' | null>(null)
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')


    useEffect(() => {
        const promise = dispatch(fetchProducts());
        return () => {
            promise.abort();
        };
    }, [dispatch]);

    const products = useAppSelector(state => state.productList.list);
    const loading = useAppSelector(state => state.productList.loading);

    const sortedProducts = useMemo(() => {
        const arr = [...products]
        if (!sortKey) return arr
        arr.sort((a, b) => {
            const aVal = sortKey === 'price' ? a.price : a.rating.rate
            const bVal = sortKey === 'price' ? b.price : b.rating.rate
            return sortOrder === 'asc' ? aVal - bVal : bVal - aVal
        })
        return arr
    }, [products, sortKey, sortOrder])

    function handleSort(key: 'price' | 'rating') {
        if (key === sortKey && sortOrder === 'desc') {
            setSortKey(null);
        } else if (key === sortKey) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortKey(key)
            setSortOrder('asc')
        }
    }

    return (
        <div className="App app">
            <h1>Товары</h1>

            {loading ? (
                <div className="loading">Загрузка...</div>
            ) : (
                <>
                    <SortingProducts
                        handleSort={handleSort}
                        sortKey={sortKey}
                        sortOrder={sortOrder}
                    />
                    <ProductList
                        products={sortedProducts}
                    />
                </>
            )}
        </div>
    )
}

export default App
