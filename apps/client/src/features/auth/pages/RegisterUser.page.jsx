import { useCallback, useState } from "react";
import { FolderLock } from "lucide-react";
import { registerFieldsForUser } from "@/features/auth/constants/getFieldsForRole.constant.js";
import { useUserAuthFlow } from "@/features/auth/flows/userAuth.flow.js";
import { ROUTES } from "@/shared/routing/routes.constant.js";
import UserNameInput from "@/features/auth/components/sub-components/username-input.sc.jsx";
import { cn } from "@/lib/utils.js";
import PasswordInput from "@/features/auth/components/sub-components/password-input.sc.jsx";
import { Button } from "@/components/ui/button.jsx";
import FullNameInput from "@/features/auth/components/sub-components/fullname-input.sc.jsx";
import DateOfBirthInput from "@/features/auth/components/sub-components/dob-input.sc.jsx";
import EmailInput from "@/features/auth/components/sub-components/EmailInput.sc.jsx";
import { ENVS } from "@/shared/constants/env.constant.js";

const FORMDATA_BLUEPRINT = {
	username: "",
	email: "",
	password: "",
	fullname: "",
	dob: "",
};

// Register User
// Basic data: Full Name, Email ID, Date Of Birth
// Auth Creds: Username, Password

function RegisterUserPage() {
	const [formData, setFormData] = useState(FORMDATA_BLUEPRINT);
	const [errors, setErrors] = useState(FORMDATA_BLUEPRINT);
	const { flow } = useUserAuthFlow();

	const validateField = (fieldName, fieldValue) => {
		let isValid = true;

		if (fieldName !== "dob") {
			const fieldDetails = registerFieldsForUser[fieldName];

			if (!fieldDetails) {
				console.warn(`Field details not found for: ${fieldName}`);
				return false;
			}

			if (fieldDetails.required && (!fieldValue || fieldValue.trim() === "")) {
				isValid = false;
				setErrors((prev) => ({
					...prev,
					[fieldName]: `${fieldDetails.label} is required.`,
				}));
			} else if (
				fieldValue &&
				fieldDetails.regex &&
				!fieldDetails.regex.test(fieldValue)
			) {
				isValid = false;
				setErrors((prev) => ({
					...prev,
					[fieldName]: `Please enter a valid ${fieldDetails.label.toLowerCase()}`,
				}));
			} else {
				setErrors((prev) => {
					const newErrors = { ...prev };
					delete newErrors[fieldName];
					return newErrors;
				});
			}
		} else {
			const dobChecker = registerFieldsForUser.dob?.checker;
			if (!dobChecker) {
				console.warn("DOB checker function not found");
				return false;
			}

			const result = dobChecker(
				fieldValue,
				ENVS.APP_USAGE_AGE_LOWER_LIMIT,
				ENVS.APP_USAGE_AGE_UPPER_LIMIT
			);
			if (!result.valid) {
				isValid = false;
				setErrors((prev) => ({
					...prev,
					[fieldName]: result.reason,
				}));
			} else {
				setErrors((prev) => {
					const newErrors = { ...prev };
					delete newErrors[fieldName];
					return newErrors;
				});
			}
		}
		return isValid;
	};

	const handleFieldChange = useCallback((fieldName, fieldValue) => {
		setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// validate
		const isValid = Object.entries(formData).every(
			([fieldName, fieldValue]) => {
				const result = validateField(fieldName, fieldValue);
				return result;
			}
		);

		if (!isValid) return;

		// Send request
		const result = await flow("register", formData);
		if (result?.error) {
			return (
				<ErrorPage
					message="Register Page Error"
					error={result.error}
					fallbackRoute={ROUTES.HOME}
				/>
			);
		}
	};

	return (
		<div className="flex min-h-screen w-full items-stretch justify-items-stretch">
			<div className="blocks w-1/2 bg-accent-foreground">k</div>
			<div className="blocks w-1/2">
				<div className="flex flex-col gap-4 p-6 md:p-10">
					<div className="flex justify-center gap-2 md:justify-start">
						<a href="#" className="flex items-center gap-2 font-medium">
							<div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
								<FolderLock className="size-4" />
							</div>
							Archeo
						</a>
					</div>
					<div className="flex flex-1 items-center justify-center">
						<div className="w-full max-w-xs">
							<RegisterForm
								handleSubmit={handleSubmit}
								handleFieldChange={handleFieldChange}
								formData={formData}
								errors={errors}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default RegisterUserPage;

const RegisterForm = ({
	className,
	handleSubmit,
	handleFieldChange,
	formData,
	errors,
}) => {
	return (
		<form
			className={cn("flex flex-col gap-6", className)}
			onSubmit={handleSubmit}
		>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">Create your account</h1>
				<p className="text-sm text-balance text-muted-foreground">
					Enter your information below to create your account
				</p>
			</div>
			<div className="grid gap-6">
				{/* Full Name Field */}
				<div className="grid gap-3">
					<FullNameInput
						fieldDetails={registerFieldsForUser.fullname}
						handleFieldChange={handleFieldChange}
						value={formData.fullname}
						error={errors.fullname}
					/>
				</div>

				{/* Date of Birth Field */}
				<div className="grid gap-3">
					<DateOfBirthInput
						fieldDetails={registerFieldsForUser.dob}
						handleFieldChange={handleFieldChange}
						value={formData.dob}
					/>
				</div>

				{/* Email Field */}
				<div className="grid gap-3">
					<EmailInput
						fieldDetails={registerFieldsForUser.email}
						handleFieldChange={handleFieldChange}
						value={formData.email}
					/>
				</div>

				{/* Username Field */}
				<div className="grid gap-3">
					<UserNameInput
						fieldDetails={registerFieldsForUser.username}
						handleFieldChange={handleFieldChange}
						value={formData.username}
					/>
				</div>

				{/* Password Field */}
				<div className="grid gap-3">
					<PasswordInput
						fieldDetails={registerFieldsForUser.password}
						handleFieldChange={handleFieldChange}
						value={formData.password}
					/>
				</div>

				<Button type="submit" className="w-full cursor-pointer bg-primary">
					Sign up
				</Button>

				<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
					<span className="relative z-10 bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>

				<Button variant="outline" className="w-full cursor-pointer">
					{/* Google Icon */}
					Sign up with Google
				</Button>
			</div>

			<div className="text-center text-sm">
				Already have an account?{" "}
				<a href={`/login/user`} className="underline underline-offset-4">
					Sign in
				</a>
			</div>
		</form>
	);
};
