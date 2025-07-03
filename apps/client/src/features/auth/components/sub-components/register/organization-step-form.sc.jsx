// organization-step-form.sc.jsx - Modified for category view with improved navigation
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StepContent from "@/features/auth/components/sub-components/register/step-content.sc.jsx";
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
	onBack,
	onSubmit,
	onKeyPress,
	isAllFieldsValid,
	isCategoryCompleted,
	isLastCategory,
	showBackButton = false,
	helperText,
	submitButtonText = "Register Organization",
}) => {
	const variants = {
		enter: (dir) => ({
			x: dir === "forward" ? 200 : -200,
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: (dir) => ({
			x: dir === "forward" ? -200 : 200,
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
		return "Next";
	};

	return (
		<div className="flex min-h-screen items-center justify-center">
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

							{/* Navigation Buttons - Prominently placed */}
							<div className="">
								{/* Helper text */}
								<div className="mb-6 text-center">
									<p className="text-sm text-gray-600">{getHelperText()}</p>
								</div>

								{/* Navigation Buttons */}
								<div className="flex items-center justify-center gap-4">
									{/* Previous Button */}
									{showBackButton && (
										<button
											onClick={onBack}
											className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
										>
											<ChevronLeft className="size-4" />
											Previous
										</button>
									)}

									{/* Next/Submit Button */}
									<button
										onClick={isLastCategory ? onSubmit : onNext}
										disabled={!isAllFieldsValid}
										className={`flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${
											isAllFieldsValid
												? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
												: "cursor-not-allowed bg-gray-300 text-gray-500"
										}`}
									>
										{getNextButtonText()}
										{!isLastCategory && <ChevronRight className="size-4" />}
									</button>
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
