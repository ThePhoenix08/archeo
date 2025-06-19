import ProtectedRoute from "@/features/auth/components/ProtectedRoute.wrapper.jsx";

/**
 * @param {object} props
 * @param {string[]} props.allowedRoles list of roles allowed to access this route
 * @param {JSX.Element} props.routeComponent component to render at this route
 */
export const RouteGuard = ({ allowedRoles, routeComponent }) => (
	<ProtectedRoute allowedRoles={allowedRoles}>{routeComponent}</ProtectedRoute>
);
