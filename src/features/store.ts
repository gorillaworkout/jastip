import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './orders/orderSlice'; // Ensure you import the correct reducer

const store = configureStore({
  reducer: {
    orders: ordersReducer, // Your slice reducer here
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
