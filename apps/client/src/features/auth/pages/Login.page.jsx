import { ROLES } from "@/shared/constants/roles.constant";
import React, { useState } from "react";
import { useUserAuthFlow } from "@/features/auth/flows/userAuth.flow.js";
import { useParams } from "react-router";
import { getLoginFieldsForRole } from "@/features/auth/constants/getFieldsForRole.constant.js";
import ErrorPage from "@/shared/routing/Error.page.jsx";

function LoginPage() {
	let role = useParams();
	if (!Object.values(ROLES).includes(role)) {
		role = ROLES.USER; // if role invalid or missing, default to "user"
	}

	const { flow } = useUserAuthFlow();
	const fields = getLoginFieldsForRole[role];

	const [formData, setFormData] = useState(
		// maps field[] => formData object with (name, initialValue) pairs
		fields.reduce((accum, curr) => {
			accum[curr.name] = curr.initialValue;
			return accum;
		}, {})
	);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await flow("login", formData);

		if (result?.error) {
			return (
				<ErrorPage
					message="Login Page Error"
					error={result.error}
					fallbackRoute={ROUTES.LOGIN}
				/>
			);
		}
	};

	return <div>LoginPage</div>;
}

export default LoginPage;
