import { apiSlice } from "@/shared/state/redux-apis/slice.barrel.js";
import {
	setCredentials,
	clearCredentials,
	setLoading,
	setError,
	updateTokens,
	// setAgent,
} from "@/features/auth/state/slices/auth.slice.js";

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// REGISTER
		registerAgent: builder.mutation({
			query: (agentData) => ({
				url: "/auth/register-userCommon",
				method: "POST",
				body: agentData,
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				dispatch(setLoading(true));
				try {
					const { data } = await queryFulfilled;
					console.log("data", data); // DEBUG
					if (data.accessToken /* && data.email && data.username */) {
						dispatch(updateTokens({ accessToken: data.accessToken }));
						// dispatch(setAgent({ email: data.email, username: data.username }));
					}
				} catch (errors) {
					dispatch(setError({ message: "Registration failed!", error: errors?.error?.data }));
				} finally {
					dispatch(setLoading(false));
				}
			},
		}),
		registerIndividual: builder.mutation({
			query: (individualData) => ({
				url: "/auth/register/user",
				method: "POST",
				body: { ...individualData, agentType: "individual" },
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				dispatch(setLoading(true));
				try {
					await queryFulfilled();
				} catch (error) {
					dispatch(setError({ error, message: "Registration failed!" }));
				} finally {
					dispatch(setLoading(false));
				}
			},
			invalidatesTags: ["user"],
		}),
		registerOrganization: builder.mutation({
			query: (orgData) => ({
				url: "/auth/register/user",
				method: "POST",
				body: { ...orgData, userType: "organization" },
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				dispatch(setLoading(true));
				try {
					await queryFulfilled;
				} catch (error) {
					dispatch(
						setError(error.error?.data?.message || "Registration failed")
					);
				} finally {
					dispatch(setLoading(false));
				}
			},
			invalidatesTags: ["User", "Organization"],
		}),

		// EMAIL VERIFICATION
		verifyEmail: builder.mutation({
			query: (email) => ({
				url: "/auth/verify-email",
				method: "POST",
				body: { email },
			}),
			// No cache needed for verification endpoints
			keepUnusedDataFor: 0,
		}),

		verifyOTP: builder.mutation({
			query: ({ email, otp }) => ({
				url: "/auth/verify-otp",
				method: "POST",
				body: { email, otp },
			}),
			keepUnusedDataFor: 0,
		}),

		// LOGIN
		login: builder.mutation({
			query: (authCredentials) => ({
				url: "/auth/login",
				method: "POST",
				body: authCredentials,
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				dispatch(setLoading(true));
				try {
					const { data } = await queryFulfilled;
					dispatch(setCredentials(data));
				} catch (error) {
					dispatch(setError(error.error?.data?.message || "Login failed"));
				} finally {
					dispatch(setLoading(false));
				}
			},
			invalidatesTags: ["Auth", "CurrentUser"],
		}),

		// LOGOUT
		logout: builder.mutation({
			query: () => ({
				url: "/auth/logout",
				method: "POST",
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(clearCredentials());
				} catch (error) {
					// Even if logout fails on server, clear local state
					console.error("Logout failed: ", error);
					dispatch(clearCredentials());
				}
			},
			invalidatesTags: ["Auth", "CurrentUser", "UserProfile"],
		}),

		// GET CURRENT USER
		getCurrentUser: builder.query({
			query: () => "/auth/current-user",
			providesTags: ["CurrentUser"],
			// Transform response to ensure consistency
			transformResponse: (response) => {
				// Ensure we have all required fields
				return {
					id: response.id,
					email: response.email,
					role: response.role,
					profile: response.profile,
					...response,
				};
			},
			// Keep user data cached for 5 minutes
			keepUnusedDataFor: 300,
		}),

		// UPDATE USER PROFILE
		updateProfile: builder.mutation({
			query: (profileData) => ({
				url: "/auth/profile",
				method: "PATCH",
				body: profileData,
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					// Optimistically update the current user data
					dispatch(
						apiSlice.util.updateQueryData(
							"getCurrentUser",
							undefined,
							(draft) => {
								Object.assign(draft, data);
							}
						)
					);
				} catch (error) {
					dispatch(
						setError(error.error?.data?.message || "Profile update failed")
					);
				}
			},
			invalidatesTags: ["CurrentUser", "UserProfile"],
		}),

		// CHANGE PASSWORD
		changePassword: builder.mutation({
			query: ({ currentPassword, newPassword }) => ({
				url: "/auth/change-password",
				method: "POST",
				body: { currentPassword, newPassword },
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					// Password changed successfully, could show success message
				} catch (error) {
					dispatch(
						setError(error.error?.data?.message || "Password change failed")
					);
				}
			},
		}),

		// FORGOT PASSWORD
		forgotPassword: builder.mutation({
			query: (email) => ({
				url: "/auth/forgot-password",
				method: "POST",
				body: { email },
			}),
			keepUnusedDataFor: 0,
		}),

		// RESET PASSWORD
		resetPassword: builder.mutation({
			query: ({ token, newPassword }) => ({
				url: "/auth/reset-password",
				method: "POST",
				body: { token, newPassword },
			}),
			keepUnusedDataFor: 0,
		}),

		// CHECK EMAIL AVAILABILITY
		checkEmailAvailability: builder.query({
			query: (email) => `/auth/check-email?email=${encodeURIComponent(email)}`,
			// Don't cache email checks
			keepUnusedDataFor: 0,
		}),
	}),
});

export const {
	// Registration hooks
	useRegisterAgentMutation,
	useRegisterIndividualMutation,
	useRegisterOrganizationMutation,

	// Email verification hooks
	useVerifyEmailMutation,
	useVerifyOTPMutation,

	// Authentication hooks
	useLoginMutation,
	useLogoutMutation,

	// User management hooks
	useGetCurrentUserQuery,
	useUpdateProfileMutation,
	useChangePasswordMutation,

	// Password recovery hooks
	useForgotPasswordMutation,
	useResetPasswordMutation,

	// Utility hooks
	useCheckEmailAvailabilityQuery,
} = authApi;

export const {
	endpoints: { getCurrentUser, logout, login },
} = authApi;
