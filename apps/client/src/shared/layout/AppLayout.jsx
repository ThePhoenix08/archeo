import { Navigate, Outlet } from "react-router";

/** AppLayout: app wrapper, protected routes logic */
function AppLayout() {
	// useSelector(selectIsAuthenticated)
	let auth = { token: true }; 

	return auth.token ? <Outlet /> : <Navigate to="/login" />;
}
export default AppLayout;
