import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './orders/orderSlice'; // Ensure you import the correct reducer
import expensesReducer from './expense/expenseSlice'
import tripReducer from './trip/tripSlice'
import accountReducer from './account/accountSlice'
const store = configureStore({
  reducer: {
    orders: ordersReducer, // Your slice reducer here
    expenses:expensesReducer,
    trips: tripReducer,
    account:accountReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
