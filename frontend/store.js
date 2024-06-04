import { configureStore } from '@reduxjs/toolkit';
import authReducer from './src/features/Auth/authSlice';
import ticketReducer from './src/features/Tickets/ticketSlice';
import noteReducer from './src/features/Notes/noteSlice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		tickets: ticketReducer,
		notes: noteReducer,
	},
});

export default store;
