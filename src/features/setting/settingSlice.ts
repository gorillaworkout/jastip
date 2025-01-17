// features/orders/ordersSlice.ts
"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SubCategory {
    id: string 
    name: string 
    uid: string  
}

export interface IBank {
    id: string 
    name: string 
    uid: string  
}
interface InitialState {
    subcategory: SubCategory[]
    bank: IBank[]
}

interface IBankState{
    bank: IBank[]
}
const initialState: InitialState= {
    subcategory: [],
    bank: []
}

const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        // Subcategory Reducer
        addSubcategory: (state, action: PayloadAction<SubCategory>) => {
            state.subcategory.push(action.payload)
        },
        setSubcategory: (state, action: PayloadAction<SubCategory[]>) => {
            state.subcategory = action.payload
        },
        clearSubcategory: (state) => {
            state.subcategory = []      
        },
        // Subcategory Reducer
        // Bank Reducer
        addBank: (state, action: PayloadAction<SubCategory>) => {
            state.bank.push(action.payload)
        },
        setBank: (state, action: PayloadAction<SubCategory[]>) => {
            state.bank = action.payload
        },
        clearBank: (state) => {
            state.bank = []      
        },

        // Bank Reducer
    },
})

export const { setSubcategory, clearSubcategory,addSubcategory, addBank, setBank, clearBank } = settingSlice.actions
export default settingSlice.reducer
