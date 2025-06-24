import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	isAuthenticated: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.user = action.payload; // store the whole response as user
			state.isAuthenticated = true;
		},

		logout: (state) => {
			state.user = null;
			state.isAuthenticated = false;
		},
	},
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectCurrentUserRole = (state) => state.auth.user.role;
