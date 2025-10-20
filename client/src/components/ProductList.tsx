import * as React from "react";
import {AddProductModal} from "./AddProductModal";
import type {NewProductInput, Product} from "../types/product.type.ts";
import {EditProductModal} from "./editProductModal";
import {useState} from "react";

type Props = {
    products: Product[];
    onCreateProduct: (data: NewProductInput) => void;
    onUpdateProduct: (data: NewProductInput & { id: number }) => void;
    onDeleteProduct: (id: number) => void;
};

export const ProductList: React.FC<Props> = ({products, onCreateProduct, onUpdateProduct, onDeleteProduct}) => {
    const [open, setOpen] = useState(false);
    const [selectProduct, setSelectProduct] = useState<Product | null>(null);

    function handleSubmit(data: NewProductInput) {
        onCreateProduct?.(data);
        setOpen(false);
    }

    function handleDelete(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) {
        event.stopPropagation();
        onDeleteProduct(id);
    }

    return (
        <div>
            <div className="toolbar" style={{marginBottom: 16}}>
                <button className="toolbar__btn" onClick={() => setOpen(true)}>
                    Добавить товар
                </button>
            </div>

            <div className="product-grid">
                {products.map((p) => (
                    <div
                        key={p.id}
                        className="product-card"
                        onClick={() => setSelectProduct(p)}
                    >
                        <button
                            type="button"
                            className="product-card__delete-btn"
                            aria-label="Удалить товар"
                            title="Удалить"
                            onClick={(e) => handleDelete(e, p.id)}
                        >
                            🗑️
                        </button>
                        <div className="product-card__image-wrapper">
                            <img
                                src={p.image}
                                alt={p.title}
                                className="product-card__image"
                            />
                        </div>
                        <div className="product-card__title" title={p.title}>
                            {p.title}
                        </div>
                        <div className="product-card__row">
                            <span className="product-card__price">${p.price.toFixed(2)}</span>
                            <span className="product-card__category">{p.category}</span>
                        </div>
                        <div className="product-card__rating">★ {p.rating.rate}</div>
                    </div>
                ))}
            </div>

            <AddProductModal
                open={open}
                onClose={() => setOpen(false)}
                onSubmit={handleSubmit}
            />

            {
                selectProduct &&
                <EditProductModal
                    product={selectProduct}
                    open={Boolean(selectProduct)}
                    onClose={() => setSelectProduct(null)}
                    onSubmit={onUpdateProduct}
                />
            }
        </div>
    )
        ;
};
