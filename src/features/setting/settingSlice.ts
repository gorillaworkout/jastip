// features/orders/ordersSlice.ts
"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SubCategory {
    id: string | null
    name: string | null
    uid: string  | null
}

interface SubCategoryState {
    subcategory: SubCategory[]
}

const initialState: SubCategoryState = {
    subcategory: [],
}

const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        setSubcategory: (state, action: PayloadAction<SubCategory[]>) => {
            state.subcategory = action.payload
        },
        clearSubcategory: (state) => {
            state.subcategory = []      
        },
    },
})

export const { setSubcategory, clearSubcategory } = settingSlice.actions
export default settingSlice.reducer
