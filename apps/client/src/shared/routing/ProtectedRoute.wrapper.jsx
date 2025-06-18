import { Navigate, useLocation } from "react-router";
import { ROUTES } from "./routes.constant";
import AccessDeniedPage from "./AccessDenied.page";

/**
 * @param {object} props
 * @param {ReactNode} props.children React children
 * @param {string[]} props.allowedRoles Roles Array
 * @param {string} props.userRole user's role
 * @param {string} props.fallbackRoute fallback route to redirect to if access denied
 * @param {boolean} props.showMessageFlag a flag to set show "access denied" or not
 *
 * @returns {JSX.ELEMENT}
 * @Purpose Ensures route is only accessed to allowed roles
 */
const ProtectedRoute = ({
	children,
	allowedRoles,
	userRole,
	fallbackRoute = ROUTES.DASHBOARD,
}) => {
	const location = useLocation();

	if (!allowedRoles.includes(userRole)) {
		return showMessageFlag ? (
			<AccessDeniedPage
        allowedRoles={allowedRoles}
        userRole={userRole}
      />
		) : (
			<Navigate
				to={fallbackRoute}
				replace
				state={{
					from: location,
					message: `Access denied. Required role: ${allowedRoles.join(" or ")}`,
				}}
			/>
		);
	}

	return children;
};
export default ProtectedRoute;
