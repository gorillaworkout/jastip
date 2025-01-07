// features/orders/ordersSlice.ts
"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SubCategory {
    id: string 
    name: string 
    uid: string  
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
        addSubcategory: (state, action: PayloadAction<SubCategory>) => {
            state.subcategory.push(action.payload)
        },
        setSubcategory: (state, action: PayloadAction<SubCategory[]>) => {
            state.subcategory = action.payload
        },
        clearSubcategory: (state) => {
            state.subcategory = []      
        },
    },
})

export const { setSubcategory, clearSubcategory,addSubcategory } = settingSlice.actions
export default settingSlice.reducer
