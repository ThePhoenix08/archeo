import { ENVS } from "@/shared/constants/env.constant";
import { ROUTES } from "@/shared/routing/routes.constant";
import { Link } from "react-router";

/**
 * @param {object} props
 * @param {string} props.message error message
 * @param {Error} props.error error object (actual error)
 *
 * @returns {JSX.Element}
 * @purpose Shows an Error page to user with link to dashboard
 */
function ErrorPage({ message, error }) {
	return (
		<div className="error">
			<h2>Oops! An Error occured</h2>
			<p>{message}</p>
			{ENVS.DEV_MODE && <p>{error}</p>}
			<Link to={ROUTES.DASHBOARD}>Go to Dashboard</Link>
		</div>
	);
}
export default ErrorPage;
