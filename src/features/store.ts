import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './orders/orderSlice'; // Ensure you import the correct reducer
import expensesReducer from './expense/expenseSlice'
const store = configureStore({
  reducer: {
    orders: ordersReducer, // Your slice reducer here
    expenses:expensesReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
