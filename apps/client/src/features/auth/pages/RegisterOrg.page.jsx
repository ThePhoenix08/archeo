import FeaturePreview from "@/features/auth/components/FeaturePreview.jsx";
import FormStage from "@/features/auth/components/FormStage.jsx";
import FormStepper from "@/features/auth/components/FormStepper.jsx";
import { registerFieldsForOrg } from "@/features/auth/constants/getFieldsForRole.constant.js";
import { cn } from "@/lib/utils.js";
import { Building2, FolderLock, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { validateFullAddress } from "@/features/auth/utils/address.utils.js";
import { Button } from "@/components/ui/button.jsx";
import { useOrgAuthFlow } from "@/features/auth/flows/orgAuth.flow.js";
import { useParams } from "react-router";
import { ValidationChecks } from "@/features/auth/validators/register.validator.js";
import { FEATURE_PREVIEWS } from "@/features/auth/constants/featurePreview.constant.js";

const formStages = Object.keys(registerFieldsForOrg);
const FORMDATA_BLUEPRINT = {
	orgname: "",
	orgtype: "",
	email: registerFieldsForOrg["Basic Info"].email.initialValue,
	website: registerFieldsForOrg["Contact Info"].website.initialValue,
	address: [],
	contactname: "",
	designation: "",
	phonenumber: "",
	prooftype: registerFieldsForOrg["Verification"].prooftype.initialValue,
	prooffilename: "",
	prooffiletype: "",
};

const SUBMIT_CHECKLIST_BLUEPRINT = {
	BasicInfoStageCompleted: false,
	ContactInfoStageCompleted: false,
	ContactPersonStageCompleted: false,
	VerificationStageCompleted: false,
	FileUploadSuccessful: false,
	EmailVerified: false,
};

function RegisterOrgPage() {
	const [currentStage, setCurrentStage] = useState(0);
	const [formData, setFormData] = useState(FORMDATA_BLUEPRINT);
	const [errors, setErrors] = useState(FORMDATA_BLUEPRINT);
	const [submitCheckList, setSubmitCheckList] = useState(
		SUBMIT_CHECKLIST_BLUEPRINT
	);
	const currentStageName = formStages[currentStage];
	const currentStageFields = registerFieldsForOrg[currentStageName];
	const { role } = useParams();
	const { flow } = useOrgAuthFlow({ role });
	const [isLoading, setIsLoading] = useState(false);

	// handlers
	const handleFieldChange = (fieldName, value) => {
		setFormData((prev) => ({ ...prev, [fieldName]: value }));

		// reset error message
		if (errors[fieldName]) {
			setErrors((prev) => ({ ...prev, [fieldName]: "" }));
		}
	};

	// DEBUG ONLY
	useEffect(() => {
		console.log(formData);
	}, [formData]);

	// Main validation function
	const validateStage = () => {
		const stageErrors = {};

		Object.values(currentStageFields).forEach((field) => {
			const value = formData[field.name];
			const fieldName = field.name;

			// Special handling for address fields
			if (field.type === "address") {
				const addressValidation = validateFullAddress(value, field.required);
				if (!addressValidation.isValid) {
					stageErrors[fieldName] = addressValidation.error;
				}
				return;
			}

			// Run all applicable validation checks
			const errors = [];

			// Run validation checks in order
			const checks = [
				ValidationChecks.required,
				ValidationChecks.fileRequired,
				ValidationChecks.emailFormat,
				ValidationChecks.urlFormat,
				ValidationChecks.phoneFormat,
				ValidationChecks.validOption,
				ValidationChecks.fileType,
				ValidationChecks.fileName,
				ValidationChecks.fileSize,
				ValidationChecks.documentIntegrity,
				ValidationChecks.minLength,
				ValidationChecks.maxLength,
				ValidationChecks.onlyAlphabets,
				ValidationChecks.onlyAlphanumeric,
				ValidationChecks.allowedSpecialChars,
				ValidationChecks.noConsecutiveSpaces,
				ValidationChecks.noLeadingTrailingSpaces,
				ValidationChecks.customChecker,
			];

			checks.forEach((check) => {
				const error = check(value, field);
				if (error) {
					errors.push(error);
				}
			});

			// Sort errors by priority and take the highest priority one
			if (errors.length > 0) {
				errors.sort((a, b) => a.priority - b.priority);
				stageErrors[fieldName] = errors[0].message;
			}
		});

		setErrors(stageErrors);
		const isValid = Object.keys(stageErrors).length === 0;

		setSubmitCheckList((prev) => ({
			...prev,
			[formStages[currentStage]]: isValid,
		}));

		return isValid;
	};

	// Helper function to validate file immediately on upload
	const validateFileUpload = (file, field) => {
		const errors = [];

		// Create a temporary validation context
		const fileValidationChecks = [
			ValidationChecks.fileType,
			ValidationChecks.fileName,
			ValidationChecks.fileSize,
			ValidationChecks.documentIntegrity,
		];

		fileValidationChecks.forEach((check) => {
			const error = check(null, field, file);
			if (error) {
				errors.push(error);
			}
		});

		// Sort by priority and return the most important error
		if (errors.length > 0) {
			errors.sort((a, b) => a.priority - b.priority);
			return { isValid: false, error: errors[0].message };
		}

		return { isValid: true, error: null };
	};

	// Enhanced file upload handler with immediate validation
	const handleFileUploadChange = (files) => {
		if (files && files.length > 0 && files[0].file) {
			const file = files[0].file;

			// Get the proof document field for validation
			const proofDocumentField = {
				type: "file",
				label: "Proof Document",
				validation: {
					allowedFileTypes: [
						"application/pdf",
						"application/msword",
						"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
						"application/vnd.ms-excel",
						"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
						"text/plain",
						"application/rtf",
					],
					allowedExtensions: [
						"pdf",
						"doc",
						"docx",
						"xls",
						"xlsx",
						"txt",
						"rtf",
					],
					maxFileSize: 10 * 1024 * 1024, // 10MB
					minFileSize: 1024, // 1KB
				},
			};

			// Validate file immediately
			const validation = validateFileUpload(file, proofDocumentField);

			if (!validation.isValid) {
				// Set error and don't update form data
				setErrors((prev) => ({
					...prev,
					proofDocument: validation.error,
				}));

				// Clear file data
				setFormData((prev) => ({
					...prev,
					fileUpload: null,
					prooffilename: "",
					prooffiletype: "",
				}));

				return;
			}

			// Clear any previous errors and update form data
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors.proofDocument;
				return newErrors;
			});

			setFormData((prev) => ({
				...prev,
				fileUpload: file,
				prooffilename: file.name ?? "",
				prooffiletype: file.type ?? "",
			}));
		} else {
			// Clear file data when no file is selected
			setFormData((prev) => ({
				...prev,
				prooffilename: "",
				prooffiletype: "",
				fileUpload: null,
			}));

			// Clear file-related errors
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors.proofDocument;
				return newErrors;
			});
		}
	};

	const handleNext = () => {
		if (validateStage()) {
			// checks if data is valid
			if (currentStage < formStages.length - 1) {
				// checks if its not the last stage
				setCurrentStage((prev) => prev + 1);
			}
		}
	};

	const handlePrevious = () => {
		if (currentStage > 0) {
			setCurrentStage((prev) => prev - 1);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		if (!validateStage()) {
			setIsLoading(false);
			return;
		}

		const form = new FormData();
		form.append("orgname", formData.orgname);
		form.append("orgtype", formData.orgtype);
		form.append("email", formData.email);
		form.append("website", formData.website);
		form.append("contactname", formData.contactname);
		form.append("designation", formData.designation);
		form.append("phonenumber", formData.phonenumber);
		form.append("prooftype", formData.prooftype);
		form.append("prooffilename", formData.prooffilename);
		form.append("prooffiletype", formData.prooffiletype);
		form.append("file", formData.fileUpload);
		form.append("address", JSON.stringify(formData.address));

		try {
			const response = await flow("register", form);
			setIsLoading(false);
			console.log("Form Submitted Successfully:", response);
		} catch (err) {
			setIsLoading(false);
			console.error("Form Submission Error:", err);
		}
	};

	const isLastStage = currentStage === formStages.length - 1;
	const isFirstStage = currentStage === 0;

	return (
		<div className="flex h-screen items-stretch justify-items-stretch overflow-hidden">
			<div className="left min-h-screen w-1/2">
				{/* Feature Previews */}
				<div className="blocks h-full w-full bg-accent-foreground">
					<div
						className="relative grid h-full w-full place-items-center bg-muted bg-cover bg-center"
						style={{
							backgroundImage:
								"url('https://res.cloudinary.com/ddzcbt9uh/image/upload/v1750655002/Full_Color_Image_in_ai-img-gen_com_a_warehouse_szqpom.jpg')",
						}}
					>
						<div className="flex h-full flex-col p-8">
							<div className="mb-8 flex items-center gap-2">
								<div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
									<FolderLock className="size-5" />
								</div>
								<span className="text-2xl font-bold text-white">Archeo</span>
							</div>
							<div className="flex flex-1 items-center justify-center rounded-md border border-gray-100/10 bg-gray-100/10 bg-clip-padding p-4 backdrop-blur-xl backdrop-filter">
								<FeaturePreview
									features={FEATURE_PREVIEWS}
									currentIndex={currentStage}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Right Side - Registration Form */}
			<div className="blocks w-1/2 overflow-y-scroll">
				<div className="flex h-full flex-col gap-4 p-6 md:p-10">
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
							<RegisterOrgForm
								currentStage={currentStage}
								currentStageName={currentStageName}
								currentStageFields={currentStageFields}
								formData={formData}
								errors={errors}
								handleFieldChange={handleFieldChange}
								handleNext={handleNext}
								handlePrevious={handlePrevious}
								handleSubmit={handleSubmit}
								isFirstStage={isFirstStage}
								isLastStage={isLastStage}
								formStages={formStages}
								submitCheckList={submitCheckList}
								handleFileUploadChange={handleFileUploadChange}
								setCurrentStage={setCurrentStage}
								isLoading={isLoading}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RegisterOrgPage;

const RegisterOrgForm = ({
	className,
	currentStage,
	currentStageName,
	currentStageFields,
	formData,
	errors,
	handleFieldChange,
	handleNext,
	handlePrevious,
	handleSubmit,
	isFirstStage,
	isLastStage,
	formStages,
	submitCheckList,
	setCurrentStage,
	handleFileUploadChange,
	isLoading,
}) => {
	return (
		<form
			className={cn("flex flex-col gap-6", className)}
			onSubmit={handleSubmit}
		>
			{/* Header */}
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">
					<span className="bg-gradient-to-r from-pink-400 via-purple-800 to-blue-500 bg-clip-text text-transparent">
						Register
					</span>{" "}
					your organization <Building2 className="inline-block text-black/45" />
				</h1>
				<p className="text-sm text-balance text-muted-foreground">
					Complete the registration process to join our secure document platform
				</p>
			</div>

			{/* Stepper */}
			<div className="mb-6">
				<FormStepper
					steps={formStages.map((stage, index) => ({
						title: stage,
						completed: submitCheckList[stage],
						index: index,
					}))}
					currentStep={currentStage}
					setCurrentStep={setCurrentStage}
				/>
			</div>

			{/* Current Stage Form */}
			<div className="grid gap-6">
				<FormStage
					currentStageName={currentStageName}
					currentStageFields={currentStageFields}
					formData={formData}
					errors={errors}
					handleFieldChange={handleFieldChange}
					handleFileUploadChange={handleFileUploadChange}
				/>
			</div>

			{/* Navigation Buttons */}
			<div className="flex gap-4">
				{!isFirstStage && (
					<Button
						type="button"
						variant="outline"
						onClick={handlePrevious}
						className="flex-1"
					>
						Previous
					</Button>
				)}

				{isLastStage ? (
					<Button
						type="submit"
						className="flex-1 cursor-pointer bg-primary"
						disabled={isLoading}
					>
						{isLoading && <LoaderCircle className="animate-spin" />}
						Complete Registration
					</Button>
				) : (
					<Button
						type="button"
						onClick={handleNext}
						className="flex-1 cursor-pointer bg-primary"
					>
						Next
					</Button>
				)}
			</div>

			{/* Login Link */}
			<div className="text-center text-sm">
				Already have an organization account?{" "}
				<a href="/login/org" className="underline underline-offset-4">
					Sign in
				</a>
			</div>
		</form>
	);
};
