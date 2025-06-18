import { ROUTE_PERMISSIONS } from "./routes.permissions";

// Utils for permission checking
export const hasRouteAccess = (route, userRole) => {
  if (!ROUTE_PERMISSIONS[route]) return false;
  return ROUTE_PERMISSIONS[route].includes(userRole);
};

export const getAccessibleRoutes = (userRole) => {
  return Object.entries(ROUTE_PERMISSIONS)
    .filter(([route, roles]) => roles.includes(userRole))
    .map(([route]) => route);
};

// Hook for route access
export const useRouteAccess = (route, userRole) => {
  return hasRouteAccess(route, userRole);
};