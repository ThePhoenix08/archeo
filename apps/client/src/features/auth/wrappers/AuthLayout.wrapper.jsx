import { Navigate, Outlet } from "react-router";
import { ROUTES } from "@/shared/constants/routes.constant";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/features/auth/state/slices/auth.slice.js";

function AuthLayout() {
	const isAuth = useSelector(selectIsAuthenticated);

	// throw new Error("Dummy Error for development only.");

	return isAuth ? <Navigate to={ROUTES.DASHBOARD} /> : <Outlet />;
}
export default AuthLayout;
