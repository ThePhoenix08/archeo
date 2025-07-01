export const ENVS = {
  DEV_MODE: import.meta.env.DEV,
  APP_USAGE_AGE_LOWER_LIMIT: 12,
  APP_USAGE_AGE_UPPER_LIMIT: 100,
  SERVER_BASE: "http://localhost:8080/api",
  MAX_RETRIES: 3,
  ACCESS_TOKEN_EXPIRY: 15 * 60 * 1000, // 15min => ms
};