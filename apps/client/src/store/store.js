import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../Redux_features/api";
import authReducer from "../Redux_features/auth/authSlice.js";

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
