"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";
import CustomLabel from "@/features/auth/components/sub-components/register/CustomLabel.sc.jsx";

const PasswordInputWithValidation = ({
	value: password,
	onChange,
	onKeyPress,
	className = "",
	disabled = false,
	autoFocus = false,
	customData,
}) => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [validation, setValidation] = useState({
		length: false,
		uppercase: false,
		lowercase: false,
		number: false,
		special: false,
	});
	const [passwordStrength, setPasswordStrength] = useState(0);
	const [passwordsMatch, setPasswordsMatch] = useState(false);
	const { icon, text, name, required } = customData;

	const baseInputClasses = `
    w-full border-2 border-gray-300 bg-white px-8 py-6 pr-16 text-xl 
    transition-all duration-200 hover:border-gray-400 
    focus:border-blue-600 focus:outline-none
    ${className}
  `;

	const clipPathStyle = {
		clipPath:
			"polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
	};

	// Real-time password validation
	useEffect(() => {
		if (password) {
			const newValidation = {
				length: password.length >= 8 && password.length <= 128,
				uppercase: /[A-Z]/.test(password),
				lowercase: /[a-z]/.test(password),
				number: /\d/.test(password),
				special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
			};

			setValidation(newValidation);

			// Calculate password strength based on validation criteria
			const strengthCount = Object.values(newValidation).filter(Boolean).length;
			setPasswordStrength(strengthCount);

			// Check if passwords match
			setPasswordsMatch(confirmPassword !== "" && password === confirmPassword);
		} else {
			setValidation({
				length: false,
				uppercase: false,
				lowercase: false,
				number: false,
				special: false,
			});
			setPasswordStrength(0);
			setPasswordsMatch(false);
		}
	}, [password, confirmPassword]);

	// const isPasswordValid = Object.values(validation).every(Boolean);

	const getStrengthColor = () => {
		if (passwordStrength <= 2) return "text-red-600";
		if (passwordStrength <= 4) return "text-yellow-600";
		return "text-green-600";
	};

	const getStrengthText = () => {
		if (passwordStrength <= 2) return "Weak";
		if (passwordStrength <= 4) return "Medium";
		return "Strong";
	};

	const confirmInputClasses = confirmPassword
		? passwordsMatch
			? baseInputClasses.replace(
					"focus:border-blue-600",
					"border-green-500 focus:border-green-600"
				)
			: baseInputClasses.replace(
					"focus:border-blue-600",
					"border-red-500 focus:border-red-600"
				)
		: baseInputClasses;

	return (
		<div className="space-y-6">
			<CustomLabel text={text} icon={icon} />

			{/* Password Input */}
			<div className="relative">
				<input
					type={showPassword ? "text" : "password"}
					value={password}
					onChange={(e) => {
						onChange(e.target.value);
					}}
					onKeyDown={onKeyPress}
					placeholder="Enter your password"
					className={baseInputClasses}
					style={clipPathStyle}
					disabled={disabled}
					autoFocus={autoFocus}
					required={required}
					name={name}
				/>
				<button
					type="button"
					onClick={() => setShowPassword(!showPassword)}
					className="absolute top-1/2 right-6 -translate-y-1/2 transform text-gray-500 transition-colors hover:text-gray-700"
					tabIndex={-1}
				>
					{showPassword ? (
						<EyeOff className="h-6 w-6" />
					) : (
						<Eye className="h-6 w-6" />
					)}
				</button>
			</div>

			{/* Confirm Password Input */}
			<div className="relative">
				<input
					type={showConfirmPassword ? "text" : "password"}
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					onKeyDown={onKeyPress}
					placeholder="Confirm your password"
					className={confirmInputClasses}
					style={clipPathStyle}
					disabled={disabled}
				/>
				<div className="absolute top-1/2 right-6 flex -translate-y-1/2 transform items-center space-x-2">
					{confirmPassword && (
						<div
							className={`${passwordsMatch ? "text-green-500" : "text-red-500"}`}
						>
							{passwordsMatch ? (
								<Check className="h-5 w-5" />
							) : (
								<X className="h-5 w-5" />
							)}
						</div>
					)}
					<button
						type="button"
						onClick={() => setShowConfirmPassword(!showConfirmPassword)}
						className="text-gray-500 transition-colors hover:text-gray-700"
						tabIndex={-1}
					>
						{showConfirmPassword ? (
							<EyeOff className="h-6 w-6" />
						) : (
							<Eye className="h-6 w-6" />
						)}
					</button>
				</div>
			</div>

			{/* Password Match Indicator */}
			{confirmPassword && (
				<div
					className={`flex items-center space-x-2 text-sm ${passwordsMatch ? "text-green-600" : "text-red-600"}`}
				>
					{passwordsMatch ? (
						<Check className="h-4 w-4" />
					) : (
						<X className="h-4 w-4" />
					)}
					<span>
						{passwordsMatch ? "Passwords match" : "Passwords do not match"}
					</span>
				</div>
			)}

			{/* Password Strength Indicator */}
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<span className="text-sm text-gray-600">Password Strength:</span>
					<span className={`text-sm font-medium ${getStrengthColor()}`}>
						{getStrengthText()}
					</span>
				</div>
				<div className="h-2 w-full rounded-full bg-gray-200">
					<div
						className={`h-2 rounded-full transition-all duration-300 ${
							passwordStrength <= 2
								? "bg-red-500"
								: passwordStrength <= 4
									? "bg-yellow-500"
									: "bg-green-500"
						}`}
						style={{ width: `${(passwordStrength / 5) * 100}%` }}
					/>
				</div>
			</div>

			{/* Password Requirements */}
			<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
				{[
					{ key: "length", label: "8-128 characters" },
					{ key: "uppercase", label: "Uppercase letter" },
					{ key: "lowercase", label: "Lowercase letter" },
					{ key: "number", label: "Number" },
					{ key: "special", label: "Special character" },
				].map(({ key, label }) => (
					<div key={key} className="flex items-center space-x-3">
						<div
							className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-200 ${
								validation[key]
									? "border-green-600 bg-green-600"
									: "border-gray-300"
							}`}
						>
							{validation[key] && <Check className="h-3 w-3 text-white" />}
						</div>
						<span
							className={`text-sm ${validation[key] ? "text-green-700" : "text-gray-600"}`}
						>
							{label}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default PasswordInputWithValidation;
