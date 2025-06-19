import { Navigate, Outlet } from "react-router";
import { ROUTES } from "@/shared/routing/routes.constant";

function AuthLayout() {
	const auth = false;
	// useSelector(selectIsAuthenticated)

	return auth ? <Navigate to={ROUTES.DASHBOARD} /> : <Outlet />;
}
export default AuthLayout;
