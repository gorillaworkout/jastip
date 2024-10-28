// features/orders/ordersSlice.ts
"use client"
import { OrderData } from '@/interface/interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'



interface OrdersState {
  orders: OrderData[]
}

const initialState: OrdersState = {
  orders: [],
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<OrderData>) => {
        console.log('addOrders is running', action)
      state.orders.push(action.payload)
    },
    clearOrders: (state) => {
      state.orders = []
    },
    getOrder:(state, action: PayloadAction<OrderData>)=>{
        state.orders.push(action.payload)
    },
    setOrders: (state, action: PayloadAction<OrderData[]>) => {
        state.orders = action.payload; // Replace all orders with the new array from payload
      },
  },
})

export const { addOrder, clearOrders, getOrder , setOrders} = ordersSlice.actions
export default ordersSlice.reducer
