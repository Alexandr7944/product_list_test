import * as React from "react";
import type {NewProductInput, UpdateProductInput} from "../types/product.type.ts";
import {EditProductModal} from "./editProductModal";

type AddProductModalProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: NewProductInput) => void;
};

export const AddProductModal: React.FC<AddProductModalProps> = ({open, onClose, onSubmit}) => {
    const product: UpdateProductInput = {
        id:          0,
        title:       "",
        price:       0,
        description: "",
        image:       "",
        category:    "",
    }

    return (
        <EditProductModal
            product={product}
            open={open}
            onClose={onClose}
            onSubmit={onSubmit}
        />
    );
};
