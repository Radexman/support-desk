import { configureStore } from '@reduxjs/toolkit';
import authReducer from './src/features/Auth/authSlice';
import ticketReducer from './src/features/Tickets/ticketSlice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		tickets: ticketReducer,
	},
});

export default store;
