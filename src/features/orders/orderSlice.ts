// features/orders/ordersSlice.ts
"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Order {
  id: string
  name: string
  address: string
  phone: string
  receiveTime: string
  pricePerKg: string
  totalKg: string
}

interface OrdersState {
  orders: Order[]
}

const initialState: OrdersState = {
  orders: [],
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
        console.log('addOrders is running', action)
      state.orders.push(action.payload)
    },
    clearOrders: (state) => {
      state.orders = []
    },
    getOrder:(state, action: PayloadAction<Order>)=>{
        state.orders.push(action.payload)
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
        console.log('setOrders is running', action);
        state.orders = action.payload; // Replace all orders with the new array from payload
      },
  },
})

export const { addOrder, clearOrders, getOrder , setOrders} = ordersSlice.actions
export default ordersSlice.reducer
