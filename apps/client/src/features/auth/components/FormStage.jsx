import NameInputWithIcon from "@/features/auth/components/sub-components/name-with-input-icon.sc.jsx";
import { BriefcaseBusiness, Contact, Landmark, Phone } from "lucide-react";
import OptionsWithSearch from "@/features/auth/components/sub-components/OptionsWithSearch.sc.jsx";
import URLInput from "@/features/auth/components/sub-components/url-input.sc.jsx";
import PhoneNumberInput from "@/features/auth/components/sub-components/PhoneNumberInput.sc.jsx";
import AddressInput from "@/features/auth/components/sub-components/address-input.sc.jsx";
import FileInput from "@/features/auth/components/sub-components/FileInput.sc.jsx";
import EmailWithVerifyInput from "@/features/auth/components/EmailWithVerifyInput.jsx";
import PasswordInput from "@/features/auth/components/sub-components/password-input.sc.jsx";

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
			case "orgname":
				return (
					<NameInputWithIcon
						key={field.name}
						{...commonProps}
						icon={<Landmark size={16} aria-hidden="true" />}
					/>
				);
			case "contactname":
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
			case "password":
				return <PasswordInput key={field.name} {...commonProps} />;
			case "phonenumber":
				return <PhoneNumberInput key={field.name} {...commonProps} />;
			case "prooftype":
				return <OptionsWithSearch key={field.name} {...commonProps} />;
			case "fileUpload":
				return (
					<FileUploadInput
						key={field.name}
						{...commonProps}
						handleFileUploadChange={handleFileUploadChange}
					/>
				);
			case "orgtype":
				return <OptionsWithSearch key={field.name} {...commonProps} />;
			case "address":
				return <AddressInput key={field.name} {...commonProps} />;
			case "website":
				return <URLInput key={field.name} {...commonProps} />;
			case "email":
				return <EmailWithVerifyInput key={field.name} {...commonProps} />;
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

			{Object.values(currentStageFields).map((field) => {
				return (
					<div key={field.name} className="grid gap-3">
						{renderField(field)}
					</div>
				);
			})}
			{currentStageName === "Verification" && (
				<>
					<div className="grid gap-3">
						<FileInput handleFileUploadChange={handleFileUploadChange} />
					</div>
					{errors.proofDocument && (
						<p className="text-sm text-destructive">{errors.proofDocument}</p>
					)}
				</>
			)}
		</div>
	);
};

export default FormStage;
