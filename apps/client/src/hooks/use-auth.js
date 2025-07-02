import { selectAuthError, selectAuthLoading, selectCurrentUser, selectIsAuthenticated, selecttokenExpiryEstimate } from "@/features/auth/reducer/authSlice.reducer.js";
import { useSelector } from "react-redux";

export const useAuth = () => {
	const user = useSelector(selectCurrentUser);
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const isLoading = useSelector(selectAuthLoading);
	const error = useSelector(selectAuthError);
	const tokenExpiryEstimate = useSelector(selecttokenExpiryEstimate); 
	
	return {
		user,
		isAuthenticated,
		isLoading,
		error,
		tokenExpiryEstimate,
		isValidSession: isAuthenticated && !(tokenExpiryEstimate && tokenExpiryEstimate < Date.now()),
	};
};