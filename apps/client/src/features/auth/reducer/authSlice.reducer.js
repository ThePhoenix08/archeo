import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	agent: {
		type: null,
		id: null,
		email: null,
		emailVerifyId: null,
	},
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
		setAgent: (state, { payload }) => {
			const { agentId, agentType, email, emailVerifyId } = payload;
			state.agent.id = agentId;
			state.agent.type = agentType;
			state.agent.email = email;
			state.agent.emailVerifyId = emailVerifyId;
		}
	},
});

export const { setCredentials, logout, setAgent } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectCurrentUserRole = (state) => state.auth.user.role;
export const selectAgent = (state) => state.auth.agent;