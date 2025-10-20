import * as React from "react";
import {AddProductModal} from "./AddProductModal";
import type {NewProductInput, Product, UpdateProductInput} from "../types/product.type";
import {EditProductModal} from "./editProductModal";
import {useAppDispatch} from "../hooks/hook";
import {addProduct, deleteProduct, updateProduct} from "../store/thunks";
import {useLocation, useNavigate} from "react-router-dom";

type Props = {
    products: Product[];
};

export const ProductList: React.FC<Props> = ({products}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isAddOpen = location.pathname.endsWith("/new");
    const editMatch = location.pathname.match(/\/products\/(\d+)\/edit$/);
    const editId = editMatch ? Number(editMatch[1]) : null;
    const productToEdit = editId != null
        ? products.find(p => p.id === editId) ?? null
        : null;

    const openAdd = () => navigate("/products/new", {replace: false});
    const openEdit = (id: number) => navigate(`/products/${id}/edit`, {replace: false});
    const closeModal = () => navigate("/products");

    function handleSubmit(data: NewProductInput) {
        dispatch(addProduct(data))
        closeModal();
    }

    function handleUpdate(data: UpdateProductInput) {
        dispatch(updateProduct(data));
        closeModal();
    }

    function handleDelete(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) {
        event.stopPropagation();
        dispatch(deleteProduct(id));
        closeModal();
    }

    return (
        <div>
            <div className="toolbar" style={{marginBottom: 16}}>
                <button className="toolbar__btn" onClick={() => openAdd()}>
                    Добавить товар
                </button>
            </div>

            <div className="product-grid">
                {products.map((p) => (
                    <div
                        key={p.id}
                        className="product-card"
                        onClick={() => openEdit(p.id)}
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
                open={isAddOpen}
                onClose={closeModal}
                onSubmit={handleSubmit}
            />

            <EditProductModal
                product={productToEdit as UpdateProductInput}
                open={Boolean(productToEdit && editId)}
                onClose={closeModal}
                onSubmit={handleUpdate}
            />
        </div>
    )
        ;
};
