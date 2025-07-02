import NavigationButtons from "@/features/auth/components/sub-components/register/form-nav-btns.sc.jsx";
import ProgressIndicator from "@/features/auth/components/sub-components/register/progress-indicator.sc.jsx";
import Header from "@/features/auth/components/sub-components/register/register-header.sc.jsx";
import StepForm from "@/features/auth/components/sub-components/register/step-form.sc.jsx";
import { useMultiStepForm } from "@/features/auth/hooks/useMultiStepForm.hook.js";
import { ROUTES } from "@/shared/constants/routes.constant.js";
import { Cake, LockKeyhole, Mail, User } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { Separator } from "@/components/ui/separator";

const steps = [
	{
		field: "fullName",
		label: "What's your full name?",
		placeholder: "Enter your full name",
		description: "We'll use this to personalize your experience",
		customData: {
			icon: <User />,
			text: "Full Name",
			name: "fullname",
			required: true,
			maxLength: 35 * 3 + 3,
			minLength: 3,
		},
	},
	{
		field: "dateOfBirth",
		label: "When were you born?",
		placeholder: "26-06-2025",
		type: "date",
		description: "This helps us verify your identity",
		customData: {
			icon: <Cake />,
			text: "Date of Birth",
			name: "dateOfBirth",
			required: true,
			minDate: new Date(1900, 0, 1),
			maxDate: new Date(),
		},
	},
	{
		field: "email",
		label: "What's your email address?",
		placeholder: "your.email@example.com",
		type: "email",
		description: "We'll send you important updates here",
		customData: {
			icon: <Mail />,
			text: "Email",
			name: "email",
			required: true,
			maxLength: 254,
		},
	},
	{
		field: "username",
		label: "Choose a username",
		placeholder: "Pick something unique",
		description: "This will be your unique identifier",
		customData: {
			icon: <User />,
			text: "Username",
			name: "username",
			required: true,
			maxLength: 100,
			minLength: 2,
		},
	},
	{
		field: "password",
		label: "Create a secure password",
		placeholder: "Make it strong",
		type: "password",
		description: "Keep your account secure with a strong password",
		customData: {
			icon: <LockKeyhole />,
			text: "Password",
			name: "password",
			required: true,
			minLength: 8,
			maxLength: 128,
			validation: {
				noConsecutiveSpaces: true,
				noLeadingTrailingSpaces: true,
			},
		},
	},
];

const RegisterUser = () => {
	const {
		currentStep,
		direction,
		formData,
		handleInputChange,
		handleNext,
		handleBack,
		handleKeyPress,
		isStepValid,
		totalSteps,
		isLastStep,
		currentStepData,
		handleStepChange,
	} = useMultiStepForm(steps);

	const handleSubmit = () => {
		alert("Account created successfully!");
		// Add your submission logic here
	};

	const handleFormKeyPress = (e) => {
		const shouldSubmit = handleKeyPress(e);
		if (shouldSubmit) {
			handleSubmit();
		}
	};

	return (
		<div className="relative min-h-screen bg-gray-50">
			{/* Main Content */}
			<div className="mx-auto max-w-fit px-6 py-12">
				{/* Back button */}
				<div className="heading my-4 flex items-center gap-4">
					<NavigationButtons.BackButton
						onClick={handleBack}
						show={currentStep > 0}
					/>
					<span className="text-2xl text-gray-600">{" | "}</span>
					<div className="text-gray-600">
						Already have an account?{" "}
						<Link
							to={ROUTES.LOGIN}
							className="ml-2 font-medium text-green-600 hover:text-green-700"
						>
							Sign in
						</Link>
					</div>
				</div>

				{/* Progress indicator */}
				<ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} handleStepChange={handleStepChange} />

				{/* Step Form */}
				<StepForm
					currentStep={currentStep}
					direction={direction}
					stepData={currentStepData}
					formData={formData}
					onInputChange={handleInputChange}
					onNext={handleNext}
					onSubmit={handleSubmit}
					onKeyPress={handleFormKeyPress}
					isValid={isStepValid()}
					isLastStep={isLastStep}
				/>
			</div>
		</div>
	);
};

export default RegisterUser;
