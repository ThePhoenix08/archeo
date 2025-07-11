import { apiSlice } from "@/shared/state/redux-apis/slice.barrel.js";
import {
	setCredentials,
	clearCredentials,
	setLoading,
	setError,
	updateTokens,
	// setAgent,
} from "@/features/auth/state/slices/auth.slice.js";
import { API_ROUTES } from "@/shared/constants/api.constant.js";

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// REGISTER
		registerAgent: builder.mutation({
			query: (agentData) => ({
				url: API_ROUTES.REGISTER_AGENT,
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
				url: API_ROUTES.REGISTER_USER,
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
				url: API_ROUTES.REGISTER_ORG,
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
		sendOTPforVerification: builder.mutation({
			query: ({ identifier, purpose}) => ({
				url: API_ROUTES.SEND_OTP,
				method: "POST",
				body: { identifier, purpose },
			}),
			// No cache needed for verification endpoints
			keepUnusedDataFor: 0,
		}),

		verifyOTP: builder.mutation({
			query: ({ email, otp }) => ({
				url: API_ROUTES.VERIFY_OTP,
				method: "POST",
				body: { email, otp },
			}),
			keepUnusedDataFor: 0,
		}),

		// LOGIN
		login: builder.mutation({
			query: (authCredentials) => ({
				url: API_ROUTES.LOGIN,
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
				url: API_ROUTES.LOGOUT,
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
			query: () => API_ROUTES.GET_CURRENT_USER,
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
				url: API_ROUTES.UPDATE_PROFILE,
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
				url: API_ROUTES.CHANGE_PASSWORD,
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
				url: API_ROUTES.FORGOT_PASSWORD,
				method: "POST",
				body: { email },
			}),
			keepUnusedDataFor: 0,
		}),

		// CHECK USERNAME AVAILABILITY
		checkUsernameAvailability: builder.query({
			query: ({ username }) => `/auth/verify/username?username=${encodeURIComponent(username)}`,
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

	// Utility hooks
	useLazyCheckUsernameAvailabilityQuery,
} = authApi;

export const {
	endpoints: { getCurrentUser, logout, login },
} = authApi;
