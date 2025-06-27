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
import { ENVS } from "@/shared/constants/env.constant.js";
import { SquareUser } from "lucide-react";
import EmailWithVerifyInput from "@/features/auth/components/EmailWithVerifyInput.jsx";
import FeaturePreview from "@/features/auth/components/FeaturePreview.jsx";
import { FEATURE_PREVIEWS } from "@/features/auth/constants/featurePreview.constant.js";

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
		<div className="flex h-screen w-full items-stretch justify-items-stretch overflow-hidden">
			<div className="blocks grid w-1/2 place-items-center">
				<div
					className="relative grid h-full w-full place-items-center bg-muted bg-cover bg-center"
					style={{
						backgroundImage:
							"url('https://res.cloudinary.com/ddzcbt9uh/image/upload/v1750654987/download_ywbzp8.jpg')",
					}}
				>
					<div className="flex flex-1 items-center justify-center rounded-md border border-gray-100/10 bg-gray-100/10 bg-clip-padding p-8 backdrop-blur-xl backdrop-filter">
						<FeaturePreview features={FEATURE_PREVIEWS} />
					</div>
				</div>
			</div>
			<div className="blocks w-1/2 overflow-y-scroll">
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
						<div className="w-full max-w-md">
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
				<h1 className="text-2xl font-bold">
					<span className="bg-gradient-to-r from-pink-400 via-purple-800 to-blue-500 bg-clip-text text-transparent">
						Create
					</span>{" "}
					your account <SquareUser className="inline-block text-black/45" />
				</h1>
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
						error={errors.fullname}
					/>
				</div>

				{/* Email Field */}
				<div className="grid gap-3">
					<EmailWithVerifyInput
						fieldDetails={registerFieldsForUser.email}
						handleFieldChange={handleFieldChange}
						value={formData.email}
						error={errors.fullname}
					/>
				</div>

				{/* Username Field */}
				<div className="grid gap-3">
					<UserNameInput
						fieldDetails={registerFieldsForUser.username}
						handleFieldChange={handleFieldChange}
						value={formData.username}
						error={errors.fullname}
					/>
				</div>

				{/* Password Field */}
				<div className="grid gap-3">
					<PasswordInput
						fieldDetails={registerFieldsForUser.password}
						handleFieldChange={handleFieldChange}
						value={formData.password}
						error={errors.fullname}
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
					<div className="logo grid place-items-center">
						<svg
							role="img"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>Google</title>
							<path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
						</svg>
					</div>
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
