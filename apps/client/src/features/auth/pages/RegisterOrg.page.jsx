import React from "react";
import { useMultiStepOrganizationForm } from "@/features/auth/components/utils/useMultiStepOrganizationForm.hook.js";
import OrganizationStepForm from "@/features/auth/components/sub-components/register/organization-step-form.sc.jsx";

import {
	Building,
	Globe,
	User,
	Shield,
	Mail,
	Phone,
	MapPin,
	FileText,
	QrCode,
	BookOpenText,
	Contact,
	UserRound,
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
						{ value: "private", label: "Private Company" },
						{ value: "public", label: "Public Company" },
						{ value: "nonprofit", label: "Non-Profit Organization" },
						{ value: "government", label: "Government Entity" },
						{ value: "educational", label: "Educational Institution" },
						{ value: "healthcare", label: "Healthcare Organization" },
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
						{ value: "registration", label: "Registration Certificate" },
						{ value: "incorporation", label: "Certificate of Incorporation" },
						{ value: "license", label: "Business License" },
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

	// const { role } = useParams();

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
		<div className="relative min-h-screen">
			{/* Main Content */}
			<div className="mx-auto max-w-4xl px-6 py-12">
				{/* Back button and navigation */}
				<div className="heading my-4 flex items-center gap-4">
					{/* <NavigationButtons.BackButton
						onClick={handleBack}
						show={currentCategory > 0}
					/> */}
					{/* <span className="text-2xl text-gray-600">{" | "}</span> */}
					{/* <div className="text-gray-600">
						Already have an account?{" "}
						<Link
							to={ROUTES.LOGIN}
							className="ml-2 font-medium text-blue-600 hover:text-blue-700 hover:underline"
						>
							Sign in
						</Link>
					</div> */}
				</div>

				{/* Progress indicator */}
				<div className="mb-8">
					<div className="mb-4 flex items-center justify-between">
						<h2 className="text-lg font-semibold text-gray-800">
							{currentCategoryData.title}
						</h2>
						<div className="text-sm text-gray-500">
							Step {currentCategory + 1} of {totalCategories}
						</div>
					</div>

					{/* Overall progress */}
					<div className="mb-4 h-2 w-full rounded-full bg-gray-200">
						<div
							className="h-2 rounded-full bg-blue-600 transition-all duration-300"
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
										? "bg-blue-600"
										: checklist[category.checklistKey]
											? "bg-blue-400"
											: "bg-gray-300"
								}`}
								title={category.category}
							/>
						))}
					</div>
				</div>

				{/* Step Form */}
				<div>
					<OrganizationStepForm
						currentCategory={currentCategory}
						direction={direction}
						categoryData={currentCategoryData}
						formData={formData}
						onInputChange={handleInputChange}
						onNext={handleNext}
						onSubmit={handleSubmit}
						onKeyPress={handleFormKeyPress}
						isAllFieldsValid={areAllCategoryFieldsValid()}
						isCategoryCompleted={isCurrentCategoryCompleted()}
						isLastCategory={isLastCategory}
					/>
				</div>
			</div>
		</div>
	);
}

export default RegisterOrgPage;
