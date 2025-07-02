import { selectIsAuthenticated } from "@/features/auth/reducer/authSlice.reducer.js";
import { useTokenRefresh } from "@/hooks/use-token-refresh.js";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

/** AppLayout: app wrapper, protected routes logic */
function AppLayout() {
	const isAuthenticated = useSelector(selectIsAuthenticated);

	// Use token refresh hook
	useTokenRefresh();

	return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
export default AppLayout;
