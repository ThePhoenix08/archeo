import { ENVS } from "@/shared/constants/env.constant.js";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	agentType: null,
	agentId: null,
	email: null,
	emailVerifyId: null,
	user: null,
	isAuthenticated: false,
	isLoading: false,
	isRefreshing: false,
	error: null,
	accessToken: null,
	tokenExpiryEstimate: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			const { accessToken, ...userData } = action.payload;
			state.user = { ...userData, accessToken }
			state.isAuthenticated = true;
			state.error = null;
			state.accessToken = accessToken;
			state.tokenExpiryEstimate = Date.now() + ENVS.ACCESS_TOKEN_EXPIRY;
		},
		updateTokens: (state, action) => {
			const { accessToken } = action.payload;
			if (state.user) {
				state.user.accessToken = accessToken;
				state.tokenExpiryEstimate = Date.now() + ENVS.ACCESS_TOKEN_EXPIRY;
			}
		},
		clearCredentials: () => initialState,
		setAgent: (state, { payload }) => {
			const { agentId, email, emailVerifyId } = payload;
			state.agentId = agentId;
			state.email = email;
			state.emailVerifyId = emailVerifyId;
		},
		setAgentType: (state, { payload }) => {
			state.agentType = payload;
		},
		clearAgent: (state) => {
			state.agentType = initialState.agentType;
			state.agentId = initialState.agentId;
			state.email = initialState.email;
			state.emailVerifyId = initialState.emailVerifyId;
		},
		setLoading: (state, { payload }) => {
			state.isLoading = payload;
		},
		setRefreshing: (state, { payload }) => {
			state.isRefreshing = payload;
		},
		setError: (state, { payload }) => {
			state.error = payload;
			state.isLoading = false;
		},
		clearError: (state) => {
			state.error = null;
		},
		updateUser: (state, { payload }) => {
			if (state.user) {
				state.user = { ...state.user, ...payload };
			}
		}
	}
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

// Token selectors
export const selectAccessToken = (state) => state.auth.accessToken;
export const selecttokenExpiryEstimate = (state) => state.auth.tokenExpiryEstimate;
