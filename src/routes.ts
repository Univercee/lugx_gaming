/**
 * Array of routes that are not accessible to the public
 * There routes require authentication
 * @type {string[]}
 */
export const privateRoutes = [
    "/settings"
];

/**
 * Array of routes that are used for authentication
 * These routes will redirect logged in users to /dashboard
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/error",
    "/auth/register",
    "/auth/reset-password",
    "/auth/new-password",
    "/auth/new-verification"
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are user for API
 * authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logged in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"