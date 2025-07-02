import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, clearCredentials } from "@/features/auth/reducer/authSlice.reducer.js";
import { ENVS } from "@/shared/constants/env.constant.js";

const baseQuery = fetchBaseQuery({
	baseUrl: ENVS.SERVER_BASE, // API base URL
	credentials: "same-origin", // CORS
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth?.accessToken;
		// console.log("token", token);
		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}
		headers.set("content-type", "application/json");
		return headers;
	},
});

const refreshQuery = fetchBaseQuery({
	baseUrl: "/auth",
	credentials: "include", // ✅ Cookies sent automatically here
});

// Base query with error handling
const baseQueryWithReauth = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);

	// Handle 401 responses (unauthorized)
	if (result?.error?.status === 401) {
		console.log("Access token expired, attempting refresh...");
		const refreshResult = await refreshQuery({
			url: "/refresh",
			method: "POST",
		},
			api,
			extraOptions
		);
		if (refreshResult?.data) {
			const { accessToken, user } = refreshResult.data;
			api.dispatch(setCredentials({ accessToken, user }));
			result = await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(clearCredentials());
			if (typeof window !== "undefined") {
				window.location.href = "/login";
			}
		}
	};

	return result;
};

const queryWithRetry = async (args, api, extraOptions) => {
	const maxRetries = ENVS.MAX_RETRIES;
	let attempt = 0;
	
	while (attempt < maxRetries) {
		const result = await baseQueryWithReauth(args, api, extraOptions);
		
		if (result.error?.status >= 400 && result.error?.status < 500 && result.error?.status !== 401) {
			return result;
		}
		
		if (result.error && (result.error.status >= 500 || result.error.status === 'FETCH_ERROR')) {
			attempt++;
			if (attempt < maxRetries) {
				console.log(`Request failed, retrying... (${attempt}/${maxRetries})`);
				// Exponential backoff: wait 1s, 2s, 4s
				await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt - 1) * 1000));
				continue;
			}
		}
		
		return result;
	}
};

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: queryWithRetry,
	tagTypes: [
		// Authentication tags
		"auth", 
		"currentUser",
		
		// Document management tags
		"document", 
		"documentList",
		"documentTemplate",
		"demplate", 
		"demplateList",
		
		// User management tags
		"user",
		"userProfile",
		"userList",
		
		// Account/Organization tags
		"account", 
		"organization",
		"organizationMembers",
		
		// Agent tags
		"agent",
		"agentList",
		
		// Settings and configuration tags
		"settings",
		"permissions",
		"roles",
		
		// Notification tags
		"notifications",
		"unreadCount",
		
		// Analytics/Dashboard tags
		"dashboard",
		"analytics",
		"reports"
	], // Add your entity types
	keepUnusedDataFor: 60,
	refetchOnMountOrArgChange: 30,
	refetchOnFocus: true,
	refetchOnReconnect: true,
	// eslint-disable-next-line no-unused-vars
	endpoints: (builder) => ({}), // Individual endpoints will be injected in feature slices
});
