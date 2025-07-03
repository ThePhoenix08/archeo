"use client";
import { useNavigate } from "react-router";
import { useMultiStepOrganizationForm } from "@/features/auth/components/utils/useMultiStepOrganizationForm.hook.js";
import OrganizationStepForm from "@/features/auth/components/sub-components/register/organization-step-form.sc.jsx";
import { ROUTES } from "@/shared/constants/routes.constant.js";
import LogoText from "@/components/brand/LogoText.sc.jsx";

import {
	Building,
	Globe,
	User,
	Shield,
	Phone,
	MapPin,
	FileText,
	QrCode,
	BookOpenText,
	Contact,
	UserRound,
	SquareArrowOutUpRight,
} from "lucide-react";

// Organization form categories with their respective fields
const organizationCategories = [
	{
		category: "Basic Info",
		icon: <BookOpenText size={18} />,
		title: "Tell us about your organization",
		description: "Basic information about your organization",
		checklistKey: "BasicInfoStageCompleted",
		fields: [
			{
				field: "orgname",
				label: "What's your organization name?",
				placeholder: "Enter organization name",
				description: "The official name of your organization",
				customData: {
					icon: <Building />,
					text: "Organization Name",
					name: "orgname",
					required: true,
					maxLength: 100,
					minLength: 2,
				},
			},
			{
				field: "orgtype",
				label: "What type of organization is this?",
				placeholder: "Select organization type",
				description:
					"Choose the category that best describes your organization",
				customData: {
					icon: <Building />,
					text: "Organization Type",
					name: "orgtype",
					required: true,
					options: [
						{ value: "government", label: "Government" },
						{
							value: "educational institution",
							label: "Educational Institution",
						},
						{ value: "commercial entity", label: "Commercial Entity" },
						{
							value: "non-governmental organization",
							label: "Non-Governmental Organization",
						},
						{
							value: "hospital / medical institution",
							label: "Hospital / Medical Institution",
						},
						{ value: "financial institution", label: "Financial Institution" },
						{
							value: "legal / judicial authority",
							label: "Legal / Judicial Authority",
						},
						{
							value: "research & development body",
							label: "Research & Development Body",
						},
						{ value: "regulatory authority", label: "Regulatory Authority" },
						{ value: "military / defense", label: "Military / Defense" },
						{
							value: "embassy / diplomatic mission",
							label: "Embassy / Diplomatic Mission",
						},
						{
							value: "accredited lab / testing facility",
							label: "Accredited Lab / Testing Facility",
						},
						{
							value: "utility / infrastructure provider",
							label: "Utility / Infrastructure Provider",
						},
						{
							value: "training & certification body",
							label: "Training & Certification Body",
						},
						{ value: "other", label: "Other" },
					],
				},
			},
		],
	},
	{
		category: "Contact Info",
		icon: <Contact size={18} />,
		title: "Where can we find you?",
		description: "Contact and location information",
		checklistKey: "ContactInfoStageCompleted",
		fields: [
			{
				field: "website",
				label: "What's your organization's website?",
				placeholder: "https://yourorganization.com",
				description: "Your official website URL (optional)",
				customData: {
					icon: <Globe />,
					text: "Website",
					name: "website",
					required: false,
				},
			},
			{
				field: "address",
				label: "Where is your organization located?",
				placeholder: "Enter your complete address",
				description:
					"Full address including street, city, state, and postal code",
				customData: {
					icon: <MapPin />,
					text: "Address",
					name: "address",
					required: true,
				},
			},
		],
	},
	{
		category: "Contact Person",
		icon: <UserRound size={18} />,
		title: "Who should we contact?",
		description: "Primary contact person details",
		checklistKey: "ContactPersonStageCompleted",
		fields: [
			{
				field: "contactname",
				label: "What's the contact person's name?",
				placeholder: "Enter full name",
				description: "Full name of the primary contact person",
				customData: {
					icon: <User />,
					text: "Contact Name",
					name: "contactname",
					required: true,
					maxLength: 50,
					minLength: 2,
				},
			},
			{
				field: "designation",
				label: "What's their designation?",
				placeholder: "Enter job title or position",
				description: "Job title or position in the organization",
				customData: {
					icon: <User />,
					text: "Designation",
					name: "designation",
					required: true,
					maxLength: 50,
				},
			},
			{
				field: "phonenumber",
				label: "What's their phone number?",
				placeholder: "Enter phone number",
				description: "Primary contact phone number",
				customData: {
					icon: <Phone />,
					text: "Phone Number",
					name: "phonenumber",
					required: true,
				},
			},
		],
	},
	{
		category: "Verification",
		icon: <QrCode size={18} />,
		title: "Verify your organization",
		description: "Upload documents to verify your organization",
		checklistKey: "VerificationStageCompleted",
		fields: [
			{
				field: "prooftype",
				label: "What type of proof document?",
				placeholder: "Select document type",
				description: "Choose the type of verification document",
				customData: {
					icon: <Shield />,
					text: "Proof Type",
					name: "prooftype",
					required: true,
					options: [
						{ value: "gst certificate", label: "GST Certificate" },
						{
							value: "company incorporation certificate",
							label: "Company Incorporation Certificate",
						},
						{ value: "organization pan card", label: "Organization PAN Card" },
						{
							value: "udyam / msme certificate",
							label: "Udyam / MSME Certificate",
						},
						{
							value: "ngo registration certificate",
							label: "NGO Registration Certificate",
						},
						{
							value: "government issuance letter",
							label: "Government Issuance Letter",
						},
						{ value: "operational license", label: "Operational License" },
						{
							value: "tax registration document",
							label: "Tax Registration Document",
						},
						{
							value: "mou with government body",
							label: "MOU with Government Body",
						},
						{
							value: "regulatory registration certificate",
							label: "Regulatory Registration Certificate",
						},
						{ value: "insurance certificate", label: "Insurance Certificate" },
						{
							value: "letter of consent / authorization",
							label: "Letter of Consent / Authorization",
						},
						{
							value: "identity proof of authorized signatory",
							label: "Identity Proof of Authorized Signatory",
						},
						{
							value: "address proof (utility bill, rent agreement)",
							label: "Address Proof (Utility Bill, Rent Agreement)",
						},
						{
							value: "business registration number proof",
							label: "Business Registration Number Proof",
						},
						{ value: "tax", label: "Tax Registration" },
						{ value: "other", label: "Other Government Document" },
					],
				},
			},
			{
				field: "prooffilename",
				label: "Upload your verification document",
				placeholder: "Choose file to upload",
				description: "Upload a clear copy of your verification document",
				customData: {
					icon: <FileText />,
					text: "Verification Document",
					name: "prooffilename",
					required: true,
					fileTypes: [".pdf", ".jpg", ".jpeg", ".png"],
					maxSize: "5MB",
				},
			},
		],
	},
];

const FORMDATA_BLUEPRINT = {
	orgname: "",
	orgtype: "",
	email: "",
	website: "",
	address: [],
	contactname: "",
	designation: "",
	phonenumber: "",
	prooftype: "",
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
	const navigate = useNavigate();
	const {
		currentCategory,
		direction,
		formData,
		checklist,
		handleInputChange,
		handleNext,
		handleBack,
		handleKeyPress,
		areAllCategoryFieldsValid,
		isCurrentCategoryCompleted,
		totalCategories,
		currentCategoryData,
		handleCategoryChange,
		handleSubmit: submitForm,
		progress,
		isLastCategory,
	} = useMultiStepOrganizationForm(
		organizationCategories,
		FORMDATA_BLUEPRINT,
		SUBMIT_CHECKLIST_BLUEPRINT
	);

	const handlePrevious = () => {
		if (currentCategory > 0) {
			handleBack();
		}
	};

	const handleSubmit = () => {
		console.log("Organization Registration Data:", formData);
		console.log("Completion Checklist:", checklist);
		alert("Organization registered successfully!");
		// Add your submission logic here
	};

	const handleFormKeyPress = (e) => {
		const shouldSubmit = handleKeyPress(e);
		if (shouldSubmit) {
			handleSubmit();
		}
	};

	return (
		<div className="relative min-h-screen bg-background">
			{/* Header with Project Name and Quit Button */}
			<div className="mx-auto flex w-full items-center justify-between">
				{/* Project Name */}
				<div className="w-full">
					<div className="box pt-4 pl-4">
						<LogoText />
					</div>
				</div>

				{/* Quit Button */}
				<button
					onClick={() => navigate(ROUTES.HOME)}
					className="mt-4 mr-4 flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground shadow-sm transition-colors hover:border-destructive hover:bg-destructive hover:font-semibold hover:text-destructive-foreground hover:shadow-lg"
				>
					Quit
					<SquareArrowOutUpRight className="size-4" />
				</button>
			</div>

			{/* Main Content */}
			<div className="mx-auto max-w-4xl">
				{/* Progress indicator */}
				<div className="px-1">
					<div className="mb-4 flex items-center justify-between">
						<h2 className="text-lg font-semibold text-foreground">
							{currentCategoryData.title}
						</h2>
						<div className="text-sm text-muted-foreground">
							Step {currentCategory + 1} of {totalCategories}
						</div>
					</div>

					{/* Overall progress */}
					<div className="mb-4 h-2 w-full rounded-full bg-muted">
						<div
							className="h-2 rounded-full bg-primary transition-all duration-300"
							style={{ width: `${progress.overall}%` }}
						/>
					</div>

					{/* Category navigation dots */}
					<div className="flex justify-center space-x-2">
						{organizationCategories.map((category, index) => (
							<button
								key={category.category}
								onClick={() => handleCategoryChange(index)}
								className={`h-3 w-5 rounded-full transition-all duration-200 ${
									index === currentCategory
										? "bg-primary"
										: checklist[category.checklistKey]
											? "bg-primary/70"
											: "bg-muted"
								}`}
								title={category.category}
							/>
						))}
					</div>
				</div>

				{/* Step Form */}
				<div className="flex items-center justify-center">
					<OrganizationStepForm
						currentCategory={currentCategory}
						direction={direction}
						categoryData={currentCategoryData}
						formData={formData}
						onInputChange={handleInputChange}
						onNext={handleNext}
						onBack={handlePrevious}
						onSubmit={handleSubmit}
						onKeyPress={handleFormKeyPress}
						isAllFieldsValid={areAllCategoryFieldsValid()}
						isCategoryCompleted={isCurrentCategoryCompleted()}
						isLastCategory={isLastCategory}
						showBackButton={currentCategory > 0}
					/>
				</div>
			</div>
		</div>
	);
}

export default RegisterOrgPage;
