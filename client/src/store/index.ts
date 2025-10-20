import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "./productListSlice";

const store = configureStore({
    reducer: {
        productList: productListReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
