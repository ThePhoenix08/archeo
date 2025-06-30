import { createSlice } from "@reduxjs/toolkit";

/* utils */
function getTokenExpiry(token, type) {
	try {
		const payload = JSON.parse(atob(token.split('.')[1]));
		return payload.exp * 1000;
	} catch (error) {
		console.warn(`Could not decode ${type} token expiry`);
		console.log('Error decoding token: ', error);
	}
}

const initialState = {
	agentType: null,
	agentId: null,
	email: null,
	emailVerifyId: null,
	user: null,
	isAuthenticated: false,
	accesstokenExpiry: null,
	refreshTokenExpiry: null,
	isLoading: false,
	isRefreshing: false,
	error: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			const { accessToken, refreshToken, ...userData } = action.payload;
			state.user = { ...userData, accessToken, refreshToken }
			state.isAuthenticated = true;
			state.error = null;

			if (accessToken) state.accesstokenExpiry = getTokenExpiry(accessToken, "access");
			if (refreshToken) state.refreshTokenExpiry = getTokenExpiry(refreshToken, "refresh");
		},
		updateTokens: (state, action) => {
			const { accessToken, refreshToken } = action.payload;
			if (state.user) {
				state.user.accessToken = accessToken;
				if (refreshToken) state.user.refreshToken = refreshToken;
			}

			if (accessToken) state.accesstokenExpiry = getTokenExpiry(accessToken, "access");
			if (refreshToken) state.refreshTokenExpiry = getTokenExpiry(refreshToken, "refresh");
		}
	},

	clearCredentials: () => initialState,
	setAgent: (state, { payload }) => {
		const { agentId, agentType, email, emailVerifyId } = payload;
		state.agentType = agentType;
		state.agentId = agentId;
		state.email = email;
		state.emailVerifyId = emailVerifyId;
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
});

export const { 
	setCredentials,
	updateTokens,
	clearCredentials,
	setAgent,
	clearAgent,
	setLoading,
	setRefreshing,
	setError,
	clearError,
	updateUserProfile 
} = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectCurrentUserRole = (state) => state.auth.user?.role;
export const selectAgent = (state) => state.auth.agent;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;

// Token selectors
export const selectAccessToken = (state) => state.auth.user?.accessToken;
export const selectRefreshToken = (state) => state.auth.user?.refreshToken;
export const selectTokenExpiry = (state) => state.auth.tokenExpiry;
export const selectRefreshTokenExpiry = (state) => state.auth.refreshTokenExpiry;

// Computed selectors
export const selectIsTokenExpired = (state) => {
	const expiry = selectTokenExpiry(state);
	return expiry ? Date.now() >= expiry : false;
};

export const selectIsRefreshTokenExpired = (state) => {
	const expiry = selectRefreshTokenExpiry(state);
	return expiry ? Date.now() >= expiry : false;
};

export const selectTokenExpiresIn = (state) => {
	const expiry = selectTokenExpiry(state);
	return expiry ? Math.max(0, expiry - Date.now()) : 0;
};