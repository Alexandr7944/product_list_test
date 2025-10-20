import {createAsyncThunk} from "@reduxjs/toolkit";
import {httpJson} from "../shared/api.ts";
import type {NewProductInput, Product, UpdateProductInput} from "../types/product.type.ts";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const fetchProducts = createAsyncThunk<Product[]>(
    "productList/fetchProducts",
    async (_, {signal}) => {
        return await httpJson<Product[]>("/products", {signal});
    }
);

export const addProduct = createAsyncThunk<Product, NewProductInput>(
    "productList/addProduct",
    async (data, {signal, rejectWithValue}) => {
        try {
            return await httpJson("/products", {
                method: "POST",
                body:   JSON.stringify(data),
                signal,
            });
        } catch (e: any) {
            return rejectWithValue(e?.message ?? "Не удалось создать товар");
        }
    });

export const updateProduct = createAsyncThunk<UpdateProductInput, UpdateProductInput>(
    "productList/updateProduct",
    async (data, {signal, rejectWithValue}) => {
        try {
            await httpJson<Product>(`/products/${data.id}`, {
                method: "PUT",
                body:   JSON.stringify(data),
                signal,
            });
            return data;
        } catch (e: any) {
            return rejectWithValue(e?.message ?? "Не удалось обновить товар");
        }
    }
)

export const deleteProduct = createAsyncThunk<number, number>(
    "productList/deleteProduct",
    async (id, {signal, rejectWithValue}) => {
        try {
            await httpJson<Product>(`/products/${id}`, {
                method: "DELETE",
                signal,
            });
            return id;
        } catch (e: any) {
            return rejectWithValue(e?.message ?? "Не удалось удалить товар");
        }
    });
