import EmailInput from "@/features/auth/components/sub-components/EmailInput.sc.jsx";
import NameInputWithIcon from "@/features/auth/components/sub-components/name-with-input-icon.sc.jsx";
import { BriefcaseBusiness, Contact, Landmark } from "lucide-react";
import OptionsWithSearch from "@/features/auth/components/sub-components/OptionsWithSearch.sc.jsx";
import URLInput from "@/features/auth/components/sub-components/url-input.sc.jsx";
import PhoneNumberInput from "@/features/auth/components/sub-components/PhoneNumberInput.sc.jsx";
import AddressInput from "@/features/auth/components/sub-components/address-input.sc.jsx";

const FormStage = ({
	currentStageName,
	currentStageFields,
	formData,
	errors,
	handleFieldChange,
	handleFileUploadChange,
}) => {
	const renderField = (field) => {
		const commonProps = {
			fieldDetails: field,
			handleFieldChange,
			value: formData[field.name],
			error: errors[field.name],
		};

		switch (field.name) {
			case "orgName":
				return (
					<NameInputWithIcon
						key={field.name}
						{...commonProps}
						icon={<Landmark size={16} aria-hidden="true" />}
					/>
				);
			case "contactName":
				return (
					<NameInputWithIcon
						key={field.name}
						{...commonProps}
						icon={<Contact size={16} aria-hidden="true" />}
					/>
				);
			case "designation":
				return (
					<NameInputWithIcon
						key={field.name}
						{...commonProps}
						icon={<BriefcaseBusiness size={16} aria-hidden="true" />}
					/>
				);
			case "phoneNumber":
				return (
					<PhoneNumberInput
						key={field.name}
						{...commonProps}
						icon={<Phone size={16} aria-hidden="true" />}
					/>
				);
			case "proofType":
				return <OptionsWithSearch key={field.name} {...commonProps} />;
			case "fileUpload":
				return (
					<FileUploadInput
						key={field.name}
						{...commonProps}
						handleFileUploadChange={handleFileUploadChange}
					/>
				);
			case "orgType":
				return <OptionsWithSearch key={field.name} {...commonProps} />;
			case "address":
				return <AddressInput key={field.name} {...commonProps} />;
			case "website":
				return <URLInput key={field.name} {...commonProps} />;
			case "email":
				return (
					<EmailInput
						key={field.name}
						{...commonProps}
						icon={<Mail size={16} aria-hidden="true" />}
					/>
				);
			default:
				return null;
		}
	};
	return (
		<div className="space-y-4">
			<div className="mb-6">
				<h3 className="mb-2 text-lg font-semibold">{currentStageName}</h3>
				<div className="h-px bg-border" />
			</div>

			{Object.values(currentStageFields).map((field) => (
				<div key={field.name} className="grid gap-3">
					{renderField(field)}
				</div>
			))}
		</div>
	);
};

export default FormStage;
