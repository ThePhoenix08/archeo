export const API_ROUTES = {
  // AUTH
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REGISTER: "/auth/register",
  REGISTER_AGENT: "/auth/register/agent",
  REGISTER_USER: "/auth/register/individual",
  REGISTER_ORG: "/auth/register/organization",
  SEND_OTP: "/otp/send",
  VERIFY_OTP: "/otp/verify",
  FORGOT_PASSWORD: "/auth/forgotPassword",
  VERIFY_FORGOT_PASSWORD_OTP: "/auth/verify/emailOptVerify",
  CHANGE_PASSWORD: "/auth/resetPassword",
  ACCOUNT_RECOVERY: "/auth/account-recovery",
  LINK_PREVIEW: "/auth/link-preview",
  USERNAME_AVAILABLE: "/auth/verify/username",

  // REFRESH
  REFRESH_TOKEN: "/auth/refresh-token",

  // USER
  GET_CURRENT_USER: "/auth/current-user",
  UPDATE_PROFILE: "/auth/profile",
}