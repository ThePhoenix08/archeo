// organization-step-form.sc.jsx - Modified for category view with centered container
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepContent from "@/features/auth/components/sub-components/register/step-content.sc.jsx";
import NavigationButtons from "@/features/auth/components/sub-components/register/form-nav-btns.sc.jsx";
import TextInputWithCharacterLimit from "@/features/auth/components/sub-components/register/text-input-with-character-limit.sc.jsx";
import EmailInputWithOTPVerification from "@/features/auth/components/sub-components/register/email-input-with-verification.sc.jsx";
import TextInputWithIcon from "@/features/auth/components/sub-components/register/text-input-with-icon.sc.jsx";
import PhoneNumberInput from "@/features/auth/components/sub-components/register/phone-number-input.sc.jsx";
import ThreeLineAddressInputWithPreview from "@/features/auth/components/sub-components/register/three-line-address-input-with-preview.sc.jsx";
import URLInputWithLinkPreview from "@/features/auth/components/sub-components/register/url-input-with-link-preview-.sc.jsx";
import SelectWithSearch from "@/features/auth/components/sub-components/register/select-with-search.sc.jsx";
// import FileUploadWithPreview from "@/features/auth/components/sub-components/register/file-upload-with-preview.sc.jsx";

const OrganizationStepForm = ({
	currentCategory,
	direction,
	categoryData,
	formData,
	onInputChange,
	onNext,
	onSubmit,
	onKeyPress,
	isAllFieldsValid,
	isCategoryCompleted,
	isLastCategory,
	helperText,
	submitButtonText = "Register Organization",
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

	const getInputComponent = (fieldData, props) => {
		switch (fieldData.field) {
			case "orgname":
			case "contactname":
			case "designation":
				return <TextInputWithCharacterLimit {...props} />;

			case "email":
				return <EmailInputWithOTPVerification {...props} />;

			case "phonenumber":
				return <PhoneNumberInput {...props} />;

			case "address":
				return <ThreeLineAddressInputWithPreview {...props} />;

			case "website":
				return <URLInputWithLinkPreview {...props} />;

			case "orgtype":
			case "prooftype":
				return <SelectWithSearch {...props} />;

			// case "prooffilename":
			// 	return <FileUploadWithPreview {...props} />;

			default:
				return <TextInputWithIcon {...props} />;
		}
	};

	const handleFieldChange = (fieldName, value) => {
		onInputChange(fieldName, value);
	};

	const getHelperText = () => {
		if (helperText) return helperText;

		if (isLastCategory) {
			return "Complete all fields and click 'Register Organization' to submit";
		}

		return "Complete all fields in this section to continue to the next step";
	};

	const getNextButtonText = () => {
		if (isLastCategory) {
			return submitButtonText;
		}
		return "Continue to Next Section";
	};

	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<div className="w-full max-w-4xl">
				<AnimatePresence custom={direction} mode="wait">
					<motion.div
						key={currentCategory}
						custom={direction}
						variants={variants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{ duration: 0.4 }}
					>
						<div className="p-8">
							{/* Category Header */}
							<div className="mb-8">
								{/* Category badge */}
								<div className="mb-4">
									<span className="inline-flex items-center gap-1 rounded-md bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
										{categoryData.icon}
										{categoryData.category}
									</span>
								</div>

								<StepContent
									title={categoryData.title}
									description={categoryData.description}
								/>
							</div>

							{/* All Fields in Category */}
							<div className="mb-8 space-y-6">
								{categoryData.fields.map((fieldData, index) => (
									<div key={fieldData.field} className="space-y-2">
										{/* Field Label */}
										<label className="block text-sm font-medium text-gray-700">
											{fieldData.label}
											{fieldData.customData?.required && (
												<span className="ml-1 text-red-500">*</span>
											)}
										</label>

										{/* Field Description */}
										{fieldData.description && (
											<p className="mb-2 text-sm text-gray-500">
												{fieldData.description}
											</p>
										)}

										{/* Input Field */}
										<div className="max-w-2xl">
											{getInputComponent(fieldData, {
												value: formData[fieldData.field],
												onChange: (value) =>
													handleFieldChange(fieldData.field, value),
												onKeyPress: onKeyPress,
												placeholder: fieldData.placeholder,
												options: fieldData.customData?.options,
												autoFocus: index === 0, // Only focus first field
												customData: fieldData.customData || {},
											})}
										</div>
									</div>
								))}
							</div>

							{/* Navigation Buttons */}
							<div className="flex max-w-2xl items-center justify-between">
								<div>
									{/* Helper text */}
									<div className="text-sm text-gray-500">{getHelperText()}</div>
								</div>

								<div className="flex items-center space-x-4">
									{/* Next/Submit Button */}
									<NavigationButtons.NextButton
										onClick={isLastCategory ? onSubmit : onNext}
										disabled={!isAllFieldsValid}
										isLast={isLastCategory}
										lastStepText={getNextButtonText()}
									/>
								</div>
							</div>
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
};

export default OrganizationStepForm;
