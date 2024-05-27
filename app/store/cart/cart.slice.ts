import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../product/product.types";

const initialState: IProduct[] = []

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<IProduct>) => {
            state.push(action.payload)
        },
        removeProduct: (state, action: PayloadAction<{id: number}>) => {
            return state.filter(product => product.id !== action.payload.id)
        }
    }
})

export const cartReducer = cartSlice.reducer
export const cartActions = cartSlice.actions