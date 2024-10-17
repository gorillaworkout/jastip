// features/orders/ordersSlice.ts
"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Expense {
  id: string
  description: string
  expense: number
    bank: string
}

interface ExpensesState {
  expenses: Expense[]
}

const initialState: ExpensesState = {
  expenses: [],
}

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Expense>) => {
        console.log('addExpenses is running', action)
      state.expenses.push(action.payload)
    },
    clearExpenses: (state) => {
      state.expenses = []
    },
    getExpense:(state, action: PayloadAction<Expense>)=>{
        state.expenses.push(action.payload)
    },
    setExpenses: (state, action: PayloadAction<Expense[]>) => {
        console.log('setExpenses is running', action);
        state.expenses = action.payload; // Replace all expenses with the new array from payload
      },
  },
})

export const { addExpense, clearExpenses, getExpense , setExpenses} = expensesSlice.actions
export default expensesSlice.reducer
