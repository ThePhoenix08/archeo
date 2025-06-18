import { apiSlice } from "../../../shared/reducer/slice.barrel";

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (authCredentials) => ({
				url: "/auth/login",
				method: "POST",
				body: authCredentials,
			}),
			invalidatesTags: ["Auth"],
		}),

		register: builder.mutation({
			query: (userData) => ({
				url: "/auth/register",
				method: "POST",
				body: userData,
			}),
		}),

		logout: builder.mutation({
			query: () => ({
				url: "/auth/logout",
				method: "POST",
			}),
			invalidatesTags: ["Auth"],
		}),

		getCurrentUser: builder.query({
			query: () => "/auth/current-user",
			providesTags: ["Auth"],
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useGetCurrentUserQuery } =
	authApi;
