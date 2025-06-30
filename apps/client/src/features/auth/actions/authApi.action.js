import { apiSlice } from "@/shared/reducer/slice.barrel";

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// REGISTER
		registerAgent: builder.mutation({
			query: (agentData) => ({
				url: "/auth/register/agent",
				method: "POST",
				body: agentData,
			}),
		}),
		registerIndividual: builder.mutation({
			query: (individualData) => ({
				url: "/auth/register/user",
				method: "POST",
				body: individualData,
			}),
		}),
		registerOrganization: builder.mutation({
			query: (orgData) => ({
				url: "/auth/register/user",
				method: "POST",
				body: orgData,
			}),
		}),
		
		// VERIFY EMAIL
		verifyEmail: builder.mutation({
      query: (email) => ({
        url: "/verify-email",
        method: "POST",
        body: { email },
      }),
		}),
		verifyOTP: builder.mutation({
			query: ({email, otp}) => ({
				url: "/verify-otp",
        method: "POST",
        body: { email, otp },
			}),
		}),
			
		login: builder.mutation({
			query: (authCredentials) => ({
				url: "/auth/login",
				method: "POST",
				body: authCredentials,
			}),
			invalidatesTags: ["Auth"],
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

export const {
	useLoginMutation,
	useRegisterMutation,
	useRegisterOrganizationMutation,
	useLogoutMutation,
	useGetCurrentUserQuery,
	useVerifyEmailMutation,
	useVerifyEmailOTPMutation,
} = authApi;
