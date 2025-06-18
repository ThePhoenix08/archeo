import { ROUTES } from "./routes.constant";

/**
 * 
 * @param {object} props
 * @param {string[]} props.allowedRoles list of roles allowed to access the previous route
 * @param {string} props.userRole user's role
 *  
 * @returns {JSX.Element}
 * @purpose Shows an Access Denied page to user with link to dashboard
 */
function AccessDeniedPage({
  allowedRoles,
  userRole,
}) {
	return (
		<div className="access-denied">
			<h2>Access Denied</h2>
			<p>You don't have permission to access this page.</p>
			<p>Required role: {allowedRoles.join(" or ")}</p>
			<p>Your role: {userRole}</p>
			<Link to={ROUTES.DASHBOARD}>Go to Dashboard</Link>
		</div>
	);
}
export default AccessDeniedPage;
