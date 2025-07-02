"use client";

import { useState } from "react";
import { Check, X, User, AlertCircle } from "lucide-react";
import TextInputWithCharacterLimit from "@/features/auth/components/sub-components/register/text-input-with-character-limit.sc.jsx";

const UsernameInputWithAvailability = ({
	value,
	onChange,
	onCheckAvailability,
	onKeyPress,
	placeholder = "Enter your username",
	disabled = false,
	autoFocus = false,
	customData,
}) => {
	const [availabilityState, setAvailabilityState] = useState("check"); // check, checking, available, taken, error
	const [errorMessage, setErrorMessage] = useState("");
	const { name, required } = customData;

	const handleCheckAvailability = async () => {
		if (!value || value.length < 2) {
			setErrorMessage("Username must be at least 2 characters long");
			setAvailabilityState("error");
			return;
		}

		setAvailabilityState("checking");
		setErrorMessage("");

		try {
			const isAvailable = await onCheckAvailability(value);

			if (isAvailable) {
				setAvailabilityState("available");
				setErrorMessage("");
			} else {
				setAvailabilityState("taken");
				setErrorMessage("This username is already taken");
			}
		} catch (error) {
			console.log("Username availability check failed:", error);
			setAvailabilityState("error");
			setErrorMessage("Failed to check availability. Please try again.");
		}
	};

	const getButtonConfig = () => {
		switch (availabilityState) {
			case "check":
				return {
					text: "Check",
					className: "bg-blue-600 hover:bg-blue-700 text-white",
					icon: User,
					disabled: !value || value.length < 2,
				};
			case "checking":
				return {
					text: "Checking...",
					className: "bg-blue-600 text-white cursor-not-allowed",
					icon: User,
					disabled: true,
				};
			case "available":
				return {
					text: "Available",
					className: "bg-green-600 text-white cursor-not-allowed",
					icon: Check,
					disabled: true,
				};
			case "taken":
				return {
					text: "Taken",
					className: "bg-red-600 text-white cursor-not-allowed",
					icon: X,
					disabled: true,
				};
			case "error":
				return {
					text: "Retry",
					className: "bg-red-600 hover:bg-red-700 text-white",
					icon: AlertCircle,
					disabled: false,
				};
			default:
				return {
					text: "Check",
					className: "bg-blue-600 hover:bg-blue-700 text-white",
					icon: User,
					disabled: true,
				};
		}
	};

	const buttonConfig = getButtonConfig();

	// Reset availability state when username changes
	const handleInputChange = (newValue) => {
		onChange(newValue);
		if (availabilityState !== "check") {
			setAvailabilityState("check");
			setErrorMessage("");
		}
	};

	return (
		<>
			<div className="space-y-3">
				<div className="relative">
					<TextInputWithCharacterLimit
						type="text"
						name={name}
						required={required}
						value={value}
						onChange={handleInputChange}
						onKeyPress={onKeyPress}
						placeholder={placeholder}
						disabled={disabled}
						autoFocus={autoFocus}
						customData={customData}
            buttonConfig={buttonConfig}
            handleCheckAvailability={handleCheckAvailability}
					/>
				</div>

				{/* Status Message */}
				{(availabilityState === "available" ||
					availabilityState === "taken" ||
					availabilityState === "error") && (
					<div
						className={`flex items-center space-x-2 text-sm ${
							availabilityState === "available"
								? "text-green-600"
								: "text-red-600"
						}`}
					>
						{availabilityState === "available" ? (
							<Check className="h-4 w-4" />
						) : (
							<X className="h-4 w-4" />
						)}
						<span>
							{availabilityState === "available"
								? "Username is available!"
								: errorMessage}
						</span>
					</div>
				)}
			</div>
		</>
	);
};

export default UsernameInputWithAvailability;
