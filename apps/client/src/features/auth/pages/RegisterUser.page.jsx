"use client";
import { useEffect, useState } from "react";
import { User, Calendar, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Validators,
	validatorsNames,
} from "@/features/auth/validators/form.validator.js";
import { ROUTES } from "@/shared/constants/routes.constant.js";
import LogoText from "@/components/brand/LogoText.sc.jsx";
import { Link, useNavigate } from "react-router";
import TextInputWithCharacterLimit from "@/features/auth/components/sub-components/register/text-input-with-character-limit.sc.jsx";
import PhoneNumberInput from "@/features/auth/components/sub-components/register/phone-number-input.sc.jsx";
import DateOfBirthDrawer from "@/features/auth/components/sub-components/register/date-of-birth-input.sc.jsx";

const FORMDATA_BLUEPRINT = {
	fullName: "",
	dateOfBirth: "",
	phoneNumber: "",
};

const FORM_FIELDS_VALIDATION = Object.freeze({
	fullName: {
		required: true,
		minLength: 2,
		maxLength: 100,
		checkers: [validatorsNames.ONLY_ALPHA],
	},
	dateOfBirth: {
		required: true,
		type: "date",
		options: {
			minAge: 16,
			maxAge: 100,
		},
		checkers: [validatorsNames.DATE_WITHIN_LIMITS],
	},
	phoneNumber: {
		required: true,
		checkers: [validatorsNames.PHONE_NUMBER],
	},
});

export default function UserDetailsPage() {
	const [formData, setFormData] = useState(FORMDATA_BLUEPRINT);
	const [errors, setErrors] = useState(FORMDATA_BLUEPRINT);

	const [isSubmitAllowed, setSubmitToAllowed] = useState(false);
	const navigate = useNavigate();

	const handleInputChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	useEffect(() => {
		if (Object.values(formData).every(Boolean)) {
			setSubmitToAllowed(true);
		} else {
			setSubmitToAllowed(false);
		}
	}, [formData]);

	const validateField = (fieldName, value) => {
		const { checkers: validators } = FORM_FIELDS_VALIDATION[fieldName] || {};

		if (!validators) {
			return {
				isValid: false,
				errorMessage: `No validators found for field: ${fieldName}`,
			};
		}

		for (const validatorName of validators) {
			const validator = Validators[validatorName];

			if (!validator) {
				return {
					isValid: false,
					errorMessage: `Validator '${validatorName}' not found`,
				};
			}

			const options = {};
			if (FORM_FIELDS_VALIDATION[fieldName].minLength)
				options.minLength = FORM_FIELDS_VALIDATION[fieldName].minLength;
			if (FORM_FIELDS_VALIDATION[fieldName].maxLength)
				options.maxLength = FORM_FIELDS_VALIDATION[fieldName].maxLength;
			if (FORM_FIELDS_VALIDATION[fieldName].options)
				Object.assign(options, FORM_FIELDS_VALIDATION[fieldName].options);

			const result = validator(fieldName, value, options);

			if (!result.isValid) {
				return result;
			}
		}

		return { isValid: true, errorMessage: null };
	};

	const getFormValidationResult = () => {
		const errorsSet = {};
		const isFormDataValid = Object.entries(formData).every(([key, val]) => {
			const { isValid, errorMessage } = validateField(key, val);
			errorsSet[key] = !isValid && errorMessage ? errorMessage : null;
			return isValid;
		});

		return {
			isValid: isFormDataValid,
			errorsSet,
		};
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const { isValid, errorsSet } = getFormValidationResult();
		setErrors((prev) => ({ ...prev, ...errorsSet }));
		if (isValid) {
			console.log("User Details Data:", formData);
			alert("User details saved successfully!");
			navigate(ROUTES.REGISTER_SELECT_ROLES);
		}
	};

	/* DEBUG ONLY */
	useEffect(() => {
		console.log("Errors:", errors);
	}, [errors]);

	return (
		<div className="relative min-h-screen bg-background">
			<div className="w-full focus:outline-none">
				<div className="box pt-4 pl-4">
					<LogoText />
				</div>
			</div>
			<div className="mx-auto max-w-2xl px-6 py-2">
				{/* Title */}
				<div className="mb-8 text-center">
					<h1 className="mb-4 text-4xl font-bold text-foreground">
						Let's get know you better
					</h1>
					<p className="text-lg text-muted-foreground">
						Fill in your personal information to help us serve you better.
					</p>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} className="space-y-8">
					{/* Full Name Field */}
					<div>
						<TextInputWithCharacterLimit
							value={formData.fullName}
							onChange={(value) => handleInputChange("fullName", value)}
							type="text"
							placeholder="Enter your full name here"
							autoFocus={true}
							customData={{
								maxLength: 108,
								minLength: 3,
								icon: <User className="text-muted-foreground" />,
								name: "fullName",
								text: "Full Name",
								required: true,
							}}
						/>
						{errors.fullName && (
							<p className="mt-2 text-sm text-destructive">{errors.fullName}</p>
						)}
					</div>

					{/* Date of Birth Field */}
					<div>
						<DateOfBirthDrawer
							value={formData.dateOfBirth}
							onChange={(value) => handleInputChange("dateOfBirth", value)}
							customData={{
								icon: <Calendar className="text-muted-foreground" />,
								text: "Date of Birth",
								name: "dateOfBirth",
								required: true,
								minAge: 16,
								maxAge: 100,
							}}
						/>
						{errors.dateOfBirth && (
							<p className="mt-2 text-sm text-destructive">{errors.dateOfBirth}</p>
						)}
					</div>

					{/* Phone Number Field */}
					<div>
						<PhoneNumberInput
							value={formData.phoneNumber}
							onChange={(value) => handleInputChange("phoneNumber", value)}
							customData={{
								icon: <Phone className="text-muted-foreground" />,
								text: "Phone Number",
								name: "phoneNumber",
								required: true,
							}}
						/>
						{errors.phoneNumber && (
							<p className="mt-2 text-sm text-destructive">{errors.phoneNumber}</p>
						)}
					</div>

					{/* Submit Button */}
					<div className="pt-6">
						<Button
							type="submit"
							disabled={!isSubmitAllowed}
							size="lg"
							className="w-full px-8 py-4 text-xl font-medium"
							style={{
								clipPath:
									"polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
							}}
						>
							Continue
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
