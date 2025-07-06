"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ListRestart } from "lucide-react";
import StepContent from "@/features/auth/components/sub-components/register/step-content.sc.jsx";
import TextInputWithCharacterLimit from "@/features/auth/components/sub-components/register/text-input-with-character-limit.sc.jsx";
import TextInputWithIcon from "@/features/auth/components/sub-components/register/text-input-with-icon.sc.jsx";
import PhoneNumberInput from "@/features/auth/components/sub-components/register/phone-number-input.sc.jsx";
import ThreeLineAddressInputWithPreview from "@/features/auth/components/sub-components/register/three-line-address-input-with-preview.sc.jsx";
import URLInputWithLinkPreview from "@/features/auth/components/sub-components/register/url-input-with-link-preview-.sc.jsx";
import SelectWithSearch from "@/features/auth/components/sub-components/register/select-with-search.sc.jsx";
import FileUploadWithPreview from "@/features/auth/components/sub-components/register/file-upload-with-preview.sc.jsx";
import CustomButton from "@/components/Button/CustomButton.jsx";

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

	const clipPathStyle = {
		clipPath:
			"polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
	};

	const getInputComponent = (fieldData, props) => {
		switch (fieldData.field) {
			case "orgname":
			case "contactname":
			case "designation":
				return <TextInputWithCharacterLimit {...props} />;

			case "phonenumber":
				return <PhoneNumberInput {...props} />;

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
					/>
				);

			case "website":
				return <URLInputWithLinkPreview {...props} />;

			case "orgtype":
			case "prooftype":
				return <SelectWithSearch {...props} />;

			case "prooffilename":
				return <FileUploadWithPreview {...props} />;

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

	// Special handler for address field
	const handleAddressChange = (fieldName, addressLine, value) => {
		const currentAddress = formData[fieldName];
		const updatedAddress = {
			...currentAddress,
			[addressLine]: value,
		};
		onInputChange(fieldName, updatedAddress);
	};

	return (
		<div className="min-h-screen bg-background">
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
								<div className="mb-4 flex items-center justify-between">
									<span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
										{categoryData.icon}
										{categoryData.category}
									</span>
									<button
										type="reset"
										onClick={() => resetForm()}
										className="flex cursor-pointer items-center gap-1 rounded-md bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive transition-colors duration-200 hover:bg-destructive/20 hover:text-destructive"
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
								{categoryData.fields.map((fieldData, index) => (
									<div key={fieldData.field} className="space-y-2">
										{/* Field Label */}
										<label className="block text-sm font-medium text-foreground">
											{fieldData.label}
											{fieldData.customData?.required && (
												<span className="ml-1 text-destructive">*</span>
											)}
										</label>

										{/* Field Description */}
										{fieldData.description && (
											<p className="mb-2 text-sm text-muted-foreground">
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

										{/* Error Message */}
										{fieldErrors[fieldData.field] && (
											<p className="mt-2 text-sm text-destructive">
												{fieldErrors[fieldData.field]}
											</p>
										)}
									</div>
								))}
							</div>

							{/* Navigation Buttons - Prominently placed */}
							<div>
								{/* Helper text */}
								<div className="mb-6 text-center">
									<p className="text-sm text-muted-foreground">
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
												: "cursor-not-allowed bg-muted text-muted-foreground"
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
