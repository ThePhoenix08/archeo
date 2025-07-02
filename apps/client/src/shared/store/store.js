import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/shared/reducer/apiSlice.reducer";
import authReducer from "@/features/auth/reducer/authSlice.reducer";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { ENVS } from "@/shared/constants/env.constant.js";
import { refreshApi } from "@/features/auth/actions/refreshApi.action.js";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["auth"], // only auth will be persisted
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
	reducer: {
		auth: persistedAuthReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
		[refreshApi.reducerPath]: refreshApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Required for redux-persist + RTK Query to work together
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(apiSlice.middleware, refreshApi.middleware),
	devTools: ENVS.DEV_MODE, // ✅ enables DevTools only in development
});

export const persistor = persistStore(store);
export default store;
