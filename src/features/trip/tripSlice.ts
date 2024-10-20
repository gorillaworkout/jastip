// features/orders/ordersSlice.ts
"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TripData } from '@/components/ModalToggleTrip'

interface tripsState {
  trips: TripData[]
}

const initialState: tripsState = {
  trips: [],
}

const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    addTrip: (state, action: PayloadAction<TripData>) => {
        console.log('addtrips is running', action)
      state.trips.push(action.payload)
    },
    clearTrips: (state) => {
      state.trips = []
    },
    getTrip:(state, action: PayloadAction<TripData>)=>{
        state.trips.push(action.payload)
    },
    setTrips: (state, action: PayloadAction<TripData[]>) => {
        console.log('settrips is running', action);
        state.trips = action.payload; // Replace all trips with the new array from payload
      },
  },
})

export const { addTrip, clearTrips, getTrip , setTrips} = tripsSlice.actions
export default tripsSlice.reducer
