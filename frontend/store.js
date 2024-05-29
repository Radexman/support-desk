import { configureStore } from '@reduxjs/toolkit';
import authReducer from './src/features/Auth/authSlice';

const store = configureStore({
	reducer: {
		auth: authReducer,
	},
});

export default store;
