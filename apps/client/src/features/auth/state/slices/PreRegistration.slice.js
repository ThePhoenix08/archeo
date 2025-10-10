import { ENVS } from "@/shared/constants/env.constant.js";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	agent: {
		email: null,
		username: null,
	},
	agentType: null,
	userBasicCreds: null,
	error: null,
	accessToken: null,
	tokenExpiryEstimate: null,
};

const userSlice = createSlice({
	name: "preRegistration",
	initialState,
	reducers: {
		setUserData: (state, action) => {
			const { user } = action.payload;
			state.userBasicCreds = user;
			state.error = null;
		},
		updateTokens: (state, action) => {
			const { accessToken } = action.payload;
			state.accessToken = accessToken;
			state.tokenExpiryEstimate = Date.now() + ENVS.ACCESS_TOKEN_EXPIRY;
		},
		clearUserData: () => initialState,
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
		setError: (state, { payload }) => {
			state.error = payload;
		},
		clearError: (state) => {
			state.error = null;
		},
		updateUserData: (state, { payload }) => {
			if (state.userBasicCreds) {
				state.userBasicCreds = { ...state.userBasicCreds, ...payload };
			}
		},
		setPreferences: (state, { payload }) => {
			state.prefersDarkMode = payload;
		},
	},
});

export const {
	setUserData,
	updateTokens,
	clearUserData,
	updateUserData,
	setAgent,
	setAgentType,
	clearAgent,
	setLoading,
	setError,
	clearError,
	setPreferences,
} = userSlice.actions;

export default userSlice.reducer;

// Selectors
export const selectCurrentUserData = (state) =>
	state.preRegistration.userBasicCreds;
export const selectAgent = (state) => state.preRegistration.agent;
export const selectAgentType = (state) => state.preRegistration.agentType;
export const selectAuthLoading = (state) => state.preRegistration.isLoading;
export const selectAuthError = (state) => state.preRegistration.error;
export const selectPreferences = (state) =>
	state.preRegistration.prefersThemeMode;

// Token selectors
export const selectAccessToken = (state) => state.preRegistration.accessToken;
export const selecttokenExpiryEstimate = (state) =>
	state.preRegistration.tokenExpiryEstimate;
