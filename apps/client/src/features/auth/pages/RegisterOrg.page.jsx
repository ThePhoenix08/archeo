import FeaturePreview from "@/features/auth/components/FeaturePreview.jsx";
import FormStage from "@/features/auth/components/FormStage.jsx";
import FormStepper from "@/features/auth/components/FormStepper.jsx";
import { registerFieldsForOrg } from "@/features/auth/constants/getFieldsForRole.constant.js";
import { cn } from "@/lib/utils.js";
import { Building2, FolderLock } from "lucide-react";
import { useState } from "react";
import { validateFullAddress } from "@/features/auth/components/utils/address.utils.js";
import { Button } from "@/components/ui/button.jsx";

const formStages = Object.keys(registerFieldsForOrg);
const FORMDATA_BLUEPRINT = {
	orgname: "",
	orgtype: "",
	email: registerFieldsForOrg["Contact Info"].email.initialValue,
	website: registerFieldsForOrg["Contact Info"].website.initialValue,
	address: [],
	contactname: "",
	designation: "",
	phonenumber: "",
	proof: registerFieldsForOrg["Verification"].proof.initialValue,
	prooftype: registerFieldsForOrg["Verification"].prooftype.initialValue,
};

const SUBMIT_CHECKLIST_BLUEPRINT = {
	BasicInfoStageCompleted: false,
	ContactInfoStageCompleted: false,
	ContactPersonStageCompleted: false,
	VerificationStageCompleted: false,
	FileUploadSuccessful: false,
	EmailVerified: false,
};

const FEATURE_PREVIEWS = [
	{
		title: "Document Templates",
		description:
			"Create reusable, customizable templates with dynamic data injection for certificates, transcripts, and official documents.",
		icon: "📄",
		illustration: "/placeholder.svg?height=200&width=300",
	},
	{
		title: "Digital Signatures",
		description:
			"Tamper-proof signing system ensures document authenticity and legal validity with cryptographic verification.",
		icon: "✍️",
		illustration: "/placeholder.svg?height=200&width=300",
	},
	{
		title: "Blockchain Verification",
		description:
			"On-chain registry entries provide immutable proof of document issuance and validation for ultimate security.",
		icon: "⛓️",
		illustration: "/placeholder.svg?height=200&width=300",
	},
	{
		title: "Role-Based Access Control",
		description:
			"Fine-grained permission settings with view-only, download, and time-bound link controls for secure document sharing.",
		icon: "🔐",
		illustration: "/placeholder.svg?height=200&width=300",
	},
];

function RegisterOrgPage() {
	const [currentStage, setCurrentStage] = useState(0);
	const [formData, setFormData] = useState(FORMDATA_BLUEPRINT);
	const [errors, setErrors] = useState(FORMDATA_BLUEPRINT);
	const [submitCheckList, setSubmitCheckList] = useState(
		SUBMIT_CHECKLIST_BLUEPRINT
	);
	const currentStageName = formStages[currentStage];
	const currentStageFields = registerFieldsForOrg[currentStageName];

	// handlers
	const handleFieldChange = (fieldName, value) => {
		setFormData((prev) => ({ ...prev, [fieldName]: value }));

		// reset error message
		if (errors[fieldName]) {
			setErrors((prev) => ({ ...prev, [fieldName]: "" }));
		}
	};

	const handleFileUploadChange = (files) => {
		// console.log("files", files);
		if (files && files[0] && files[0].file) {
			setFormData((prev) => ({ ...prev, fileUpload: files[0]?.file }));
			if (files[0]?.file.name) {
				setFormData((prev) => ({ ...prev, proof: files[0]?.file.name }));
			}
			console.log(files[0]?.file.name ? files[0]?.file.name : "");
			console.log(files[0]?.file.type ? files[0]?.file.type : "");
		} else {
			setFormData((prev) => ({ ...prev, proof: "", fileUpload: null }));
			console.log("files", files);
			console.error("File upload error");
		}
	};

	const validateStage = () => {
		const stageErrors = {};

		Object.values(currentStageFields).forEach((field) => {
			const value = formData[field.name];

			if (field.name === "address") {
				const addressValidation = validateFullAddress(value, field.required);
				if (!addressValidation.isValid) {
					stageErrors[field.name] = addressValidation.error;
				}
			} else {
				if (field.required && (!value || !value === "")) {
					stageErrors[field.name] = `${field.label} is required.`;
				} else if (value && field.regex && !field.regex.test(value)) {
					stageErrors[field.name] =
						`Please enter a valid ${field.label.toLowerCase()}`;
				}
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

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!validateStage()) return;
		console.log(formData);
	};

	const isLastStage = currentStage === formStages.length - 1;
	const isFirstStage = currentStage === 0;

	return (
		<div className="flex min-h-screen items-stretch justify-items-stretch">
			<div className="left min-h-screen w-1/2">
				{/* Feature Previews */}
				<div className="blocks h-full w-full bg-accent-foreground">
					<div className="flex h-full flex-col p-8">
						<div className="mb-8 flex items-center gap-2">
							<div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
								<FolderLock className="size-5" />
							</div>
							<span className="text-2xl font-bold text-white">Archeo</span>
						</div>

						<div className="flex flex-1 items-center justify-center">
							<FeaturePreview
								features={FEATURE_PREVIEWS}
								currentIndex={currentStage}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Right Side - Registration Form */}
			<div className="blocks w-1/2">
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
					<Button type="submit" className="flex-1 cursor-pointer bg-primary">
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
