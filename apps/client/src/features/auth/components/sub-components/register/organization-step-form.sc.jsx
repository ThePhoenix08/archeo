"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
	ChevronLeft,
	ChevronRight,
	ListRestart,
	AlertCircle,
} from "lucide-react";
import StepContent from "@/features/auth/components/sub-components/register/step-content.sc.jsx";
import TextInputWithCharacterLimit from "@/features/auth/components/sub-components/register/text-input-with-character-limit.sc.jsx";
import TextInputWithIcon from "@/features/auth/components/sub-components/register/text-input-with-icon.sc.jsx";
import PhoneNumberInput from "@/features/auth/components/sub-components/register/phone-number-input.sc.jsx";
import ThreeLineAddressInputWithPreview from "@/features/auth/components/sub-components/register/three-line-address-input-with-preview.sc.jsx";
import URLInputWithLinkPreview from "@/features/auth/components/sub-components/register/url-input-with-link-preview-.sc.jsx";
import SelectWithSearch from "@/features/auth/components/sub-components/register/select-with-search.sc.jsx";
import FileUploadWithPreview from "@/features/auth/components/sub-components/register/file-upload-with-preview.sc.jsx";

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
	resetForm,
	isCategoryCompleted,
	isLastCategory,
	showBackButton = false,
	helperText,
	fieldErrors,
	touchedFields,
	submitButtonText = "Continue",
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

	const clipPathStyle = {
		clipPath:
			"polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
	};

	const getInputComponent = (fieldData, props) => {
		const hasError =
			fieldErrors[fieldData.field] && touchedFields[fieldData.field];
		const enhancedProps = {
			...props,
			hasError,
			errorMessage: fieldErrors[fieldData.field],
			hasError: hasError,
			onBlur: () => handleFieldBlur(fieldData.field),
			onFocus: () => handleFieldFocus(fieldData.field),
		};

		switch (fieldData.field) {
			case "orgname":
			case "contactname":
			case "designation":
				return <TextInputWithCharacterLimit {...enhancedProps} />;

			case "phonenumber":
				return <PhoneNumberInput {...enhancedProps} />;

			case "address":
				// Special handling for address field
				const addressValue = formData[fieldData.field] || {};
				return (
					<ThreeLineAddressInputWithPreview
						address1={addressValue.address1 || ""}
						address2={addressValue.address2 || ""}
						address3={addressValue.address3 || ""}
						onAddress1Change={(value) =>
							handleAddressChange(fieldData.field, "address1", value)
						}
						onAddress2Change={(value) =>
							handleAddressChange(fieldData.field, "address2", value)
						}
						onAddress3Change={(value) =>
							handleAddressChange(fieldData.field, "address3", value)
						}
						onKeyPress={onKeyPress}
						hasError={hasError}
						errorMessage={fieldErrors[fieldData.field]}
						onBlur={() => handleFieldBlur(fieldData.field)}
						onFocus={() => handleFieldFocus(fieldData.field)}
					/>
				);

			case "website":
				return <URLInputWithLinkPreview {...enhancedProps} />;

			case "orgtype":
			case "prooftype":
				return <SelectWithSearch {...enhancedProps} />;

			case "prooffilename":
				return <FileUploadWithPreview {...enhancedProps} />;

			default:
				return <TextInputWithIcon {...enhancedProps} />;
		}
	};

	const handleFieldChange = (fieldName, value) => {
		onInputChange(fieldName, value);
	};

	const getHelperText = () => {
		if (helperText) return helperText;

		// Count invalid fields in current category
		const invalidFields = categoryData.fields.filter((field) => {
			const fieldError = fieldErrors[field.field];
			const isEmpty =
				!formData[field.field] ||
				(typeof formData[field.field] === "string" &&
					formData[field.field].trim() === "") ||
				(field.field === "address" &&
					(!formData[field.field] ||
						(!formData[field.field].address1 &&
							!formData[field.field].address2 &&
							!formData[field.field].address3)));

			return fieldError || (field.customData?.required && isEmpty);
		});

		if (invalidFields.length > 0) {
			return `Please complete ${invalidFields.length} field${invalidFields.length > 1 ? "s" : ""} to continue`;
		}

		if (isLastCategory) {
			return "All fields completed! Click 'Continue' to proceed further.";
		}

		return "All fields completed! Click 'Next' to continue";
	};

	const getNextButtonText = () => {
		if (isLastCategory) {
			return submitButtonText;
		}
		return "Next";
	};

	// Special handler for address field
	const handleAddressChange = (fieldName, addressLine, value) => {
		const currentAddress = formData[fieldName] || {};
		const updatedAddress = {
			...currentAddress,
			[addressLine]: value,
		};
		onInputChange(fieldName, updatedAddress);
	};

	// Get field validation state
	const getFieldValidationState = (fieldData) => {
		const fieldName = fieldData.field;
		const hasError = fieldErrors[fieldName];
		const isTouched = touchedFields[fieldName];
		const isEmpty =
			!formData[fieldName] ||
			(typeof formData[fieldName] === "string" &&
				formData[fieldName].trim() === "") ||
			(fieldName === "address" &&
				(!formData[fieldName] ||
					(!formData[fieldName].address1 &&
						!formData[fieldName].address2 &&
						!formData[fieldName].address3)));

		return {
			hasError: hasError && isTouched,
			isEmpty: isEmpty && fieldData.customData?.required,
			isValid: !hasError && !isEmpty,
			showError:
				(hasError || (isEmpty && fieldData.customData?.required)) && isTouched,
		};
	};

	return (
		<div className="min-h-screen bg-background">
			<div className="w-full">
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
								<div className="mb-4 flex items-center justify-between">
									<span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
										{categoryData.icon}
										{categoryData.category}
									</span>
									<button
										type="reset"
										onClick={() => resetForm()}
										style={clipPathStyle}
										className="flex cursor-pointer items-center gap-1 bg-destructive px-2 py-1 text-xs font-medium text-primary-foreground hover:bg-destructive"
									>
										Reset Form <ListRestart size={16} />
									</button>
								</div>

								<StepContent
									title={categoryData.title}
									description={categoryData.description}
								/>
							</div>

							{/* All Fields in Category */}
							<div className="mb-8 space-y-6">
								{categoryData.fields.map((fieldData, index) => {
									const validationState = getFieldValidationState(fieldData);

									return (
										<div key={fieldData.field} className="space-y-2">
											{/* Field Label */}
											<label className="block text-sm font-medium text-foreground">
												{fieldData.label}
												{fieldData.customData?.required && (
													<span className="ml-1 text-destructive">*</span>
												)}
												{/* Field validation indicator */}
												{validationState.isValid &&
													formData[fieldData.field] && (
														<span className="ml-2 inline-flex items-center text-xs text-green-600">
															✓
														</span>
													)}
											</label>

											{/* Field Description */}
											{fieldData.description && (
												<p className="mb-2 text-sm text-muted-foreground">
													{fieldData.description}
												</p>
											)}

											{/* Input Field */}
											<div className="relative">
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

											{/* Error Message */}
											{validationState.showError && (
												<div className="mt-2 flex items-center gap-1 text-sm text-destructive">
													<AlertCircle className="h-3 w-3" />
													<span>
														{fieldErrors[fieldData.field] ||
															`${fieldData.customData?.text || fieldData.label} is required`}
													</span>
												</div>
											)}

											{/* Field requirements hint */}
											{fieldData.customData?.maxLength &&
												!validationState.showError && (
													<div className="mt-1 text-xs text-muted-foreground">
														{fieldData.customData.minLength && (
															<span>
																{fieldData.customData.minLength}-
																{fieldData.customData.maxLength} characters
															</span>
														)}
														{!fieldData.customData.minLength && (
															<span>
																Max {fieldData.customData.maxLength} characters
															</span>
														)}
													</div>
												)}
										</div>
									);
								})}
							</div>

							{/* Navigation Buttons - Prominently placed */}
							<div>
								{/* Helper text */}
								<div className="mb-6 text-center">
									<p
										className={`text-sm ${
											isAllFieldsValid
												? "text-green-600"
												: "text-muted-foreground"
										}`}
									>
										{getHelperText()}
									</p>
								</div>

								{/* Navigation Buttons */}
								<div className="flex items-center justify-center gap-4">
									{/* Previous Button */}
									{showBackButton && (
										<button
											onClick={onBack}
											style={clipPathStyle}
											className="flex h-11 w-32 cursor-pointer items-center justify-center gap-2 border border-border bg-card text-sm font-medium text-card-foreground shadow-sm transition-all duration-200 hover:border-muted-foreground hover:bg-muted hover:shadow-lg focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none"
										>
											<ChevronLeft className="size-4" />
											Previous
										</button>
									)}

									{/* Next/Submit Button */}
									<button
										onClick={isLastCategory ? onSubmit : onNext}
										disabled={!isAllFieldsValid}
										style={clipPathStyle}
										className={`flex h-11 w-32 items-center justify-center gap-2 text-sm font-medium shadow-sm transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none ${
											isAllFieldsValid
												? "cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md"
												: "cursor-not-allowed bg-muted text-muted-foreground opacity-50"
										}`}
									>
										{getNextButtonText()}
										<ChevronRight className="size-4" />
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
