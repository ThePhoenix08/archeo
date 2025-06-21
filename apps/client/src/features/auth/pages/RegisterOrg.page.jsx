import RegisterFormTV from "@/features/auth/components/RegisterFormTV.c.jsx";
import Timeline from "@/features/auth/components/sub-components/Timeline.sc.jsx";
import { registerFieldsForOrg } from "@/features/auth/constants/getFieldsForRole.constant.js";
import { useState } from "react";

const formStages = Object.keys(registerFieldsForOrg);
const FORMDATA_BLUEPRINT = {
	orgname: "",
	orgtype: registerFieldsForOrg["Basic Info"].orgtype.initialValue,
	email: registerFieldsForOrg["Contact Info"].email.initialValue,
	emailotp: "",
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

	const validateStage = () => {
		const stageErrors = {};

		Object.values(currentStageFields).forEach((field) => {
			const value = formData[field.name];

			if (field.required && (!value || !value === "")) {
				stageErrors[field.name] = `${field.label} is required.`;
			} else if (value && field.regex && !field.regex.test(value)) {
				stageErrors[field.name] =
					`Please enter a valid ${field.label.toLowerCase()}`;
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

	const handleSubmit = () => {
		if (!validateStage()) return;
	};

	const isLastStage = currentStage === formStages.length - 1;

	return (
		<div className="flex min-h-screen items-center justify-center bg-background">
			<div className="left min-h-screen w-1/2">
				<div className="heading"></div>
				<div className="formBox">
					<div className="timelineBox">
						<Timeline />
					</div>
					<div className="formContainer"></div>
				</div>
			</div>
			<div className="right min-h-screen w-1/2 bg-accent-foreground">
				<RegisterFormTV />
			</div>
		</div>
	);
}

export default RegisterOrgPage;
