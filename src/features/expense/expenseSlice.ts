// features/orders/ordersSlice.ts
"use client"
import { ExpenseData } from '@/interface/interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface ExpensesState {
  expenses: ExpenseData[]
}

const initialState: ExpensesState = {
  expenses: [],
}

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<ExpenseData>) => {
        console.log('addExpenses is running', action)
      state.expenses.push(action.payload)
    },
    clearExpenses: (state) => {
      state.expenses = []
    },
    getExpense:(state, action: PayloadAction<ExpenseData>)=>{
        state.expenses.push(action.payload)
    },
    setExpenses: (state, action: PayloadAction<ExpenseData[]>) => {
        console.log('setExpenses is running', action);
        state.expenses = action.payload; // Replace all expenses with the new array from payload
      },
  },
})

export const { addExpense, clearExpenses, getExpense , setExpenses} = expensesSlice.actions
export default expensesSlice.reducer
