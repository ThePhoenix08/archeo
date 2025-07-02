import ProtectedRoute from "@/features/auth/wrappers/ProtectedRoute.wrapper.jsx";
import { ROUTE_PERMISSIONS } from "@/shared/constants/routePermissions.constant.js";

/**
 * @param {object} props
 * @param {string[]} props.allowedRoles list of roles allowed to access this route
 * @param {JSX.Element} props.routeComponent component to render at this route
 */
export const RouteGuard = ({ routeComponent }) => {
	return (
		<ProtectedRoute allowedRoles={ROUTE_PERMISSIONS[routeComponent.name]}>
			{routeComponent}
		</ProtectedRoute>
	);
};
