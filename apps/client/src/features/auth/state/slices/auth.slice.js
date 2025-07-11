import { ENVS } from "@/shared/constants/env.constant.js";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	agent: {
		email: null,
		username: null,
	},
	agentType: null,
	user: null,
	isAuthenticated: false,
	isLoading: false,
	isRefreshing: false,
	error: null,
	accessToken: null,
	tokenExpiryEstimate: null,
	prefersThemeMode: "system",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			const { user } = action.payload;
			state.user = user;
			state.isAuthenticated = true;
			state.error = null;
		},
		updateTokens: (state, action) => {
			const { accessToken } = action.payload;
			state.accessToken = accessToken;
			state.tokenExpiryEstimate = Date.now() + ENVS.ACCESS_TOKEN_EXPIRY;
		},
		clearCredentials: () => initialState,
		setAgent: (state, { payload }) => {
			const { email, username } = payload;
			state.agent.email = email;
			state.agent.username = username;
		},
		setAgentType: (state, { payload }) => {
			state.agentType = payload;
		},
		clearAgent: (state) => {
			state.agentType = initialState.agentType;
			state.agent = initialState.agent;
		},
		setLoading: (state, { payload }) => {
			state.isLoading = payload;
		},
		setRefreshing: (state, { payload }) => {
			state.isRefreshing = payload;
		},
		setError: (state, { payload }) => {
			state.error = payload;
		},
		clearError: (state) => {
			state.error = null;
		},
		updateUser: (state, { payload }) => {
			if (state.user) {
				state.user = { ...state.user, ...payload };
			}
		},
		setPreferences: (state, { payload }) => {
			state.prefersDarkMode = payload;
		},
	},
});

export const {
	setCredentials,
	updateTokens,
	clearCredentials,
	setAgent,
	setAgentType,
	clearAgent,
	setLoading,
	setRefreshing,
	setError,
	clearError,
	updateUser,
	setPreferences,
} = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectCurrentUserRole = (state) => state.auth.user?.role;
export const selectAgent = (state) => state.auth.agent;
export const selectAgentType = (state) => state.auth.agentType;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectPreferences = (state) => state.auth.prefersThemeMode;

// Token selectors
export const selectAccessToken = (state) => state.auth.accessToken;
export const selecttokenExpiryEstimate = (state) =>
	state.auth.tokenExpiryEstimate;
