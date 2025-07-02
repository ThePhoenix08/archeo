import { authApi } from "@/features/auth/state/redux-apis/auth.api.js";
import { clearCredentials, updateTokens } from "@/features/auth/state/slices/auth.slice.js";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const refreshApi = createApi({
  reducerPath: "refreshApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/auth",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // REFRESH TOKEN
    refreshToken: builder.mutation({
      query: () => ({
        url: "/refresh-token",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateTokens({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken
          }));
        } catch (error) {
          // If refresh fails, logout user
          console.error("Refresh User failed: ", error);
          dispatch(clearCredentials());
          dispatch(authApi.util.invalidateTags(['Auth', 'CurrentUser', 'UserProfile']));
        }
      },
      keepUnusedDataFor: 0,
    }),
  })
});

export const { useRefreshTokenMutation } = refreshApi;