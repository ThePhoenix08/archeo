import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:8080/api", // API base URL
	prepareHeaders: (headers, { getState }) => {
		// Add auth token if available
		const token = getState().auth?.token; // Adjust based on your auth state structure
		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}
		headers.set("content-type", "application/json");
		return headers;
	},
});

// Base query with error handling
const baseQueryWithReauth = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);

	// Handle 401 responses (unauthorized)
	if (result?.error?.status === 401) {
		// Handle logout or token refresh here
		console.log("Unauthorized access - consider redirecting to login");
	}

	return result;
};

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["Auth", "Document", "Template", "Account"], // Add your entity types
	endpoints: (builder) => ({}), // Individual endpoints will be injected in feature slices
});
