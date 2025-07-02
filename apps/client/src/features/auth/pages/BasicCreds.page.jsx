"use client";
import { useEffect, useState } from "react";
import { ROUTES } from "@/shared/constants/routes.constant.js";
import { User, Mail, LockKeyhole } from "lucide-react";
import { Link } from "react-router";
import EmailInputWithOTPVerification from "@/features/auth/components/sub-components/register/email-input-with-verification.sc.jsx";
import PasswordInputWithValidation from "@/features/auth/components/sub-components/register/password-input-with-validation.sc.jsx";
import UsernameInputWithAvailability from "@/features/auth/components/sub-components/register/username-input-with-availability.sc.jsx";
import {
	Validators,
	validatorsNames,
} from "@/features/auth/validators/form.validator.js";

const FORMDATA_BLUEPRINT = {
	username: "",
	email: "",
	password: "",
};

const FORM_FIELDS_VALIDATION = Object.freeze({
	username: {
		required: true,
		minLength: 2,
		maxLength: 100,
		checkers: [validatorsNames.ONLY_ALPHA_NUMERIC],
	},
	email: {
		required: true,
		type: "email",
		checkers: [validatorsNames.EMAIL_REGEX],
	},
	password: {
		required: true,
		minLength: 8,
		maxLength: 128,
		checkers: [validatorsNames.PASSWORD_STRONG],
	},
});

function BasicCredsPage() {
	const [formData, setFormData] = useState(FORMDATA_BLUEPRINT);
	const [errors, setErrors] = useState(FORMDATA_BLUEPRINT);

	const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
	const [isEmailVerified, setIsEmailVerified] = useState(false);
	const [isPasswordValid, setIsPasswordValid] = useState(false);

	const [isSubmitAllowed, setSubmitToAllowed] = useState(false);

	const handleInputChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleUsernameAvailabilityCheck = async (username) => {
		// Mock API call to check username availability
		console.log("Checking username availability:", username);

		// Simulate API delay
		await new Promise((resolve) => setTimeout(resolve, 1500));

		// Mock logic - usernames starting with 'admin' are taken
		const isAvailable = !username.toLowerCase().startsWith("admin");
		setIsUsernameAvailable(isAvailable);
		return isAvailable;
	};

	const handleEmailVerify = async (email) => {
		console.log("Verifying email:", email);
		setIsEmailVerified(true);
		return true;
	};

	const handlePasswordValidation = (isValid) => {
		setIsPasswordValid(isValid);
	};

	useEffect(() => {
		if (Object.values(formData).every(Boolean)) {
			setSubmitToAllowed(true);
		} else {
			setSubmitToAllowed(false);
		}
	}, [formData]);

	const validateField = (fieldName, value) => {
		const { checkers: validators } = FORM_FIELDS_VALIDATION[fieldName] || {};

		if (!validators) {
			return {
				isValid: false,
				errorMessage: `No validators found for field: ${fieldName}`,
			};
		}

		for (const validatorName of validators) {
			const validator = Validators[validatorName];

			if (!validator) {
				return {
					isValid: false,
					errorMessage: `Validator '${validatorName}' not found`,
				};
			}

			const options = {};
			if (FORM_FIELDS_VALIDATION[fieldName].minLength)
				options.minLength = FORM_FIELDS_VALIDATION[fieldName].minLength;
			if (FORM_FIELDS_VALIDATION[fieldName].maxLength)
				options.maxLength = FORM_FIELDS_VALIDATION[fieldName].maxLength;

			const result = validator(fieldName, value, options);

			if (!result.isValid) {
				return result;
			}
		}

		return { isValid: true, errorMessage: null };
	};

	const getFormValidationResult = () => {
		const errorsSet = {};
		const isFormDataValid = Object.entries(formData).every(([key, val]) => {
			const { isValid, errorMessage } = validateField(key, val);
			errorsSet[key] = (!isValid && errorMessage) ? errorMessage : null;
			return isValid;
		});

		return {
			isValid:
				isFormDataValid &&
				isUsernameAvailable === true &&
				isEmailVerified &&
				isPasswordValid,
			errorsSet,
		};
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const { isValid, errorsSet } = getFormValidationResult();
		setErrors((prev) => ({ ...prev, ...errorsSet }));
		if (isValid) {
			console.log("Basic Credentials Data:", formData);
			alert("Basic credentials saved successfully!");
		}
	};

	useEffect(() => {
		console.log("Errors:", errors);
	}, [errors]);

	return (
		<div className="relative min-h-screen bg-gray-50">
			<div className="mx-auto max-w-2xl px-6 py-12">
				{/* Header */}
				<div className="heading my-4 flex items-center justify-center gap-4">
					<div className="text-gray-600">
						Already have an account?{" "}
						<Link
							to={ROUTES.LOGIN}
							className="ml-2 font-medium text-blue-600 hover:text-blue-700 hover:underline"
						>
							Sign in
						</Link>
					</div>
				</div>

				{/* Title */}
				<div className="mb-8 text-center">
					<h1 className="mb-4 text-4xl font-bold text-gray-900">
						Create Your Account
					</h1>
					<p className="text-lg text-gray-600">
						Enter your basic credentials to get started
					</p>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} className="space-y-8">
					{/* Username Field */}
					<div>
						<UsernameInputWithAvailability
							value={formData.username}
							onChange={(value) => handleInputChange("username", value)}
							onCheckAvailability={handleUsernameAvailabilityCheck}
							customData={{
								icon: <User />,
								text: "Username",
								name: "username",
								required: true,
								maxLength: 100,
								minLength: 2,
							}}
						/>
						{errors.username && (
							<p className="text-sm text-red-600">{errors.username}</p>
						)}
					</div>

					{/* Email Field */}
					<div>
						<EmailInputWithOTPVerification
							value={formData.email}
							onChange={(value) => handleInputChange("email", value)}
							onVerify={handleEmailVerify}
							customData={{
								icon: <Mail />,
								text: "Email",
								name: "email",
								required: true,
								maxLength: 254,
							}}
						/>
						{errors.email && (
							<p className="text-sm text-red-600">{errors.email}</p>
						)}
					</div>

					{/* Password Field */}
					<div>
						<PasswordInputWithValidation
							value={formData.password}
							onChange={(value) => handleInputChange("password", value)}
							onValidationChange={handlePasswordValidation}
							customData={{
								icon: <LockKeyhole />,
								text: "Password",
								name: "password",
								required: true,
								minLength: 8,
								maxLength: 128,
							}}
						/>
						{errors.password && (
							<p className="text-sm text-red-600">{errors.password}</p>
						)}
					</div>

					{/* Submit Button */}
					<div className="pt-6">
						<button
							type="submit"
							disabled={!isSubmitAllowed}
							className={`w-full px-8 py-4 text-xl font-medium text-white transition-all duration-200 ${
								isSubmitAllowed
									? "bg-blue-600 hover:bg-blue-700"
									: "cursor-not-allowed bg-gray-400"
							}`}
							style={{
								clipPath:
									"polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
							}}
						>
							Create Account
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default BasicCredsPage;
