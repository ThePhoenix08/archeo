import React, { useState } from "react";
import { useParams } from "react-router";
import { FolderLock } from "lucide-react";
import { ROLES } from "@/shared/constants/roles.constant";
import { useUserAuthFlow } from "@/features/auth/flows/userAuth.flow.js";
import { getLoginFieldsForRole } from "@/features/auth/constants/getFieldsForRole.constant.js";
import ErrorPage from "@/shared/routing/Error.page.jsx";
import { LoginForm } from "@/features/auth/components/login-form.jsx";
import EnhancedLoginLeftSection from "@/features/auth/components/EnhancedLoginLeftSection.jsx";

function LoginPage() {
	let { role } = useParams();
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
	return (
		<div className="grid h-svh w-full overflow-hidden lg:grid-cols-2">
			<EnhancedLoginLeftSection />
			<div className="flex flex-col gap-4 p-6 md:p-6">
				<div className="flex justify-center gap-2 md:justify-start">
					<a href="/" className="flex items-center gap-2 font-medium">
						<div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
							<FolderLock className="size-4" />
						</div>
						Archeo
					</a>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<LoginForm />
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
