import {useState, useEffect, useMemo} from 'react'
import './App.css'
import {httpJson} from "./shared/api.ts";
import {ProductList} from "./components/ProductList.tsx";
import {SortingProducts} from "./components/SortingProducts.tsx";
import type {NewProductInput, Product} from "./types/product.type.ts";

function App() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [sortKey, setSortKey] = useState<'price' | 'rating' | null>(null)
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

    useEffect(() => {
        fetchProducts();
    }, [])

    async function fetchProducts() {
        setLoading(true)
        try {
            const products = await httpJson<Product[]>('/products');
            setProducts(products);
        } catch (e) {
            console.error('Не удалось загрузить товары', e);
        } finally {
            setLoading(false)
        }
    }

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

    const createProduct = async (data: NewProductInput) => {
        const newProduct = await httpJson<Product>('/products', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        if (newProduct)
            await fetchProducts();
    }

    const updateProduct = async (data: NewProductInput & { id: number }) => {
        const updatedProduct = await httpJson<Product>(`/products/${data.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });

        if (updatedProduct)
            await fetchProducts();
    }

    const deleteProduct = async (id: number) => {
        const deletedProduct = await httpJson<Product>(`/products/${id}`, {
            method: 'DELETE',
        });

        if (deletedProduct)
            setProducts(products.filter(p => p.id !== id))
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
                        onCreateProduct={createProduct}
                        onUpdateProduct={updateProduct}
                        onDeleteProduct={deleteProduct}
                    />
                </>
            )}
        </div>
    )
}

export default App
