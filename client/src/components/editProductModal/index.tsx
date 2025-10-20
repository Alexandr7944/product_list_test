import * as React from "react";
import "./EditProductModal.css";
import {useEffect, useState} from "react";
import type {UpdateProductInput} from "../../types/product.type.ts";

type EditProductModalProps = {
    product: UpdateProductInput;
    open: boolean;
    onClose: () => void;
    onSubmit: (data: UpdateProductInput) => void;
};

export const EditProductModal: React.FC<EditProductModalProps> = ({product, open, onClose, onSubmit}) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState<string>("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (!open) return;
        // Reset form and errors when opened
        setTitle(product.title);
        setPrice(product.price.toString());
        setDescription(product.description);
        setImage(product.image);
        setCategory(product.category);
        setErrors({});
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open) return null;

    function validate(): boolean {
        const next: Record<string, string> = {};

        if (!title.trim()) {
            next.title = "Укажите название";
        }

        const num = Number(price);
        if (!price || Number.isNaN(num)) {
            next.price = "Введите корректную цену";
        } else if (num < 0) {
            next.price = "Цена не может быть отрицательной";
        }

        if (!image.trim()) {
            next.image = "Укажите URL изображения";
        } else {
            try {
                new URL(image);
            } catch {
                next.image = "Некорректный URL";
            }
        }
        if (!category.trim()) {
            next.category = "Укажите категорию";
        }

        setErrors(next);
        return Object.keys(next).length === 0;
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;
        onSubmit({
            id:          product.id,
            title:       title.trim(),
            price:       Number(price),
            description: description.trim(),
            image:       image.trim(),
            category:    category.trim(),
        });
        onClose();
    }

    function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        onClose();
    }

    function stopPropagation(e: React.MouseEvent) {
        e.stopPropagation();
    }

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="edit-product-modal-title"
                onClick={stopPropagation}
            >
                <div className="modal__header">
                    <h2 id="edit-product-modal-title" className="modal__title">Добавить товар</h2>
                    <button type="button" className="modal__close-btn" aria-label="Закрыть" onClick={onClose}>
                        ×
                    </button>
                </div>

                <form className="modal__body form-grid" onSubmit={handleSubmit} noValidate>
                    <div className="form-field">
                        <label className="form-field__label" htmlFor="title">Название</label>
                        <input
                            id="title"
                            className="form-field__input"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            autoFocus
                        />
                        {errors.title && <div className="form-field__error">{errors.title}</div>}
                    </div>

                    <div className="form-field">
                        <label className="form-field__label" htmlFor="price">Цена</label>
                        <input
                            id="price"
                            className="form-field__input"
                            type="number"
                            inputMode="decimal"
                            min="0"
                            step="0.01"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                        {errors.price && <div className="form-field__error">{errors.price}</div>}
                    </div>

                    <div className="form-field">
                        <label className="form-field__label" htmlFor="image">Ссылка на изображение (URL)</label>
                        <input
                            id="image"
                            className="form-field__input"
                            type="url"
                            placeholder="https://example.com/image.jpg"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                        />
                        {errors.image && <div className="form-field__error">{errors.image}</div>}
                    </div>

                    <div className="form-field">
                        <label className="form-field__label" htmlFor="category">Категория</label>
                        <input
                            id="category"
                            className="form-field__input"
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                        {errors.category && <div className="form-field__error">{errors.category}</div>}
                    </div>

                    <div className="form-field form-field--full">
                        <label className="form-field__label" htmlFor="description">Описание</label>
                        <textarea
                            id="description"
                            className="form-field__input form-field__textarea"
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Краткое описание товара"
                        />
                    </div>

                    <div className="modal__footer">
                        <button type="button" className="btn btn--secondary" onClick={onClose}>Отмена</button>
                        <button type="submit" className="btn btn--primary">
                            {product.id ? "Изменить" : "Добавить"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
