"use client";
import { useState } from "react";
import { ROUTES } from "@/shared/constants/routes.constant.js";
import { User, Mail, LockKeyhole } from "lucide-react";
import { Link } from "react-router";
import EmailInputWithOTPVerification from "@/features/auth/components/sub-components/register/email-input-with-verification.sc.jsx";
import PasswordInputWithValidation from "@/features/auth/components/sub-components/register/password-input-with-validation.sc.jsx";
import UsernameInputWithAvailability from "@/features/auth/components/sub-components/register/username-input-with-availability.sc.jsx";

function BasicCredsPage() {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});

	const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
	const [isEmailVerified, setIsEmailVerified] = useState(false);
	const [isPasswordValid, setIsPasswordValid] = useState(false);

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

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Basic Credentials Data:", formData);
		alert("Basic credentials saved successfully!");
	};

	const isFormValid = () => {
		return (
			formData.username &&
			isUsernameAvailable === true &&
			formData.email &&
			isEmailVerified &&
			formData.password &&
			isPasswordValid
		);
	};

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
					</div>

					{/* Submit Button */}
					<div className="pt-6">
						<button
							type="submit"
							disabled={!isFormValid()}
							className={`w-full px-8 py-4 text-xl font-medium text-white transition-all duration-200 ${
								isFormValid()
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
