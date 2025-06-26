import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepContent from "@/features/auth/components/sub-components/register/step-content.sc.jsx";
import NavigationButtons from "@/features/auth/components/sub-components/register/form-nav-btns.sc.jsx";
import TextInputWithCharacterLimit from "@/features/auth/components/sub-components/register/text-input-with-character-limit.sc.jsx";
import DateOfBirthInput from "@/features/auth/components/sub-components/register/date-of-birth-input.sc.jsx";
import EmailInputWithOTPVerification from "@/features/auth/components/sub-components/register/email-input-with-verification.sc.jsx";
import PasswordInputWithValidation from "@/features/auth/components/sub-components/register/password-input-with-validation.sc.jsx";
import TextInputWithIcon from "@/features/auth/components/sub-components/register/text-input-with-icon.sc.jsx";
import PhoneNumberInput from "@/features/auth/components/sub-components/register/phone-number-input.sc.jsx";
import ThreeLineAddressInputWithPreview from "@/features/auth/components/sub-components/register/three-line-address-input-with-preview.sc.jsx";
import URLInputWithLinkPreview from "@/features/auth/components/sub-components/register/url-input-with-link-preview-.sc.jsx";
import SelectWithSearch from "@/features/auth/components/sub-components/register/select-with-search.sc.jsx";

const StepForm = ({
	currentStep,
	direction,
	stepData,
	formData,
	onInputChange,
	onNext,
	onSubmit,
	onKeyPress,
	isValid,
	isLastStep,
	helperText = "Press Enter to continue or use the arrow button →",
	submitButtonText = "Create Account",
}) => {
	const variants = {
		enter: (dir) => ({
			x: dir === "forward" ? 300 : -300,
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: (dir) => ({
			x: dir === "forward" ? -300 : 300,
			opacity: 0,
		}),
	};

	const stepsToInput = (props) => {
		switch (stepData.field) {
			case "fullName":
			case "username":
				return <TextInputWithCharacterLimit {...props} />;
			case "dateOfBirth":
				return <DateOfBirthInput {...props} />;
			case "email":
				return <EmailInputWithOTPVerification {...props} />;
			case "password":
				return <PasswordInputWithValidation {...props} />;
			case "phoneNumber":
				return <PhoneNumberInput {...props} />;
			case "address":
				return <ThreeLineAddressInputWithPreview {...props} />;
			case "website":
				return <URLInputWithLinkPreview {...props} />;
			case "prooftype":
			case "orgtype":
				return <SelectWithSearch {...props} />;
			default:
				return <TextInputWithIcon {...props} />;
		}
	};

	return (
		<AnimatePresence custom={direction} mode="wait">
			<motion.div
				key={currentStep}
				custom={direction}
				variants={variants}
				initial="enter"
				animate="center"
				exit="exit"
				transition={{ duration: 0.4 }}
			>
				{/* Step Content */}
				<StepContent
					title={stepData.label}
					description={stepData.description}
				/>

				{/* Input Field */}
				<div className="mb-8 overflow-hidden">
					<div className="relative flex max-w-2xl items-center">
						<div className="relative flex-1">
							{stepsToInput({
								value: formData[stepData.field],
								onChange: onInputChange,
								onKeyPress: onKeyPress,
								placeholder: stepData.placeholder,
								autoFocus: true,
								customData: stepData.customData || {},
							})}
						</div>

						{/* Next/Submit Button */}
						<div className="ml-6">
							<NavigationButtons.NextButton
								onClick={isLastStep ? onSubmit : onNext}
								disabled={!isValid}
								isLast={isLastStep}
								lastStepText={submitButtonText}
							/>
						</div>
					</div>
				</div>

				{/* Helper text */}
				<div className="max-w-2xl transform text-sm text-gray-500 transition-all duration-300 ease-in-out">
					{helperText}
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default StepForm;
