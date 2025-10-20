import {createSlice,  type PayloadAction} from "@reduxjs/toolkit";
import type {NewProductInput, Product, UpdateProductInput} from "../types/product.type.ts";
import {isPending, isRejected, isFulfilled} from "@reduxjs/toolkit";
import {addProduct, deleteProduct, fetchProducts, updateProduct} from "./thunks.ts";

type ProductState = {
    list: Product[];
    categories: string[];
    loading: boolean;
    error?: string | null;
};

const initialState: ProductState = {
    list:       [],
    categories: [],
    loading:    false,
    error:      null,
};

const productSlice = createSlice({
    name:          "productList",
    initialState,
    reducers:      {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.list = action.payload;
                state.categories = Array.from(new Set(action.payload.map(p => p.category))).sort();
            })
            .addCase(addProduct.fulfilled, (state, action: PayloadAction<NewProductInput>) => {
                state.list.push(action.payload as Product);
            })
            .addCase(updateProduct.fulfilled, (state, action: PayloadAction<UpdateProductInput>) => {
                state.list.forEach(item => {
                    if (item.id === action.payload.id)
                        Object.assign(item, action.payload);
                })
            })
            .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
                state.list = state.list.filter(item => item.id !== action.payload);
            })

        builder
            .addMatcher(
                isPending(fetchProducts, addProduct, updateProduct, deleteProduct),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                isRejected(fetchProducts, addProduct, updateProduct, deleteProduct),
                (state, action) => {
                    state.loading = false;
                    state.error = action.error?.message ?? "Unexpected error";
                }
            )
            .addMatcher(
                isFulfilled(fetchProducts, addProduct, updateProduct, deleteProduct),
                (state) => {
                    state.loading = false;
                }
            );
    },
});

// export const {} = productSlice.actions;

export default productSlice.reducer;

