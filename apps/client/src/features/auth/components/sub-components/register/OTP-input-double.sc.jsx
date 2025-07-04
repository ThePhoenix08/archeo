"use client";

import { useState, useRef, useEffect } from "react";
import { Minus } from "lucide-react";

const OTPInputDouble = ({
	value = "",
	onChange,
	onComplete,
	className = "",
	disabled = false,
}) => {
	const [otp, setOtp] = useState(value.split(""));
	const inputRefs = useRef([]);

	useEffect(() => {
		setOtp(value.split("").slice(0, 6));
	}, [value]);

	const baseInputClasses = `
    w-16 h-16 text-center text-2xl font-semibold border-2 border-gray-300 dark:border-gray-700 
		bg-background transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-600
    focus:border-blue-600 dark:focus:border-blue-600 focus:outline-none
    ${className}
  `;

	const clipPathStyle = {
		clipPath:
			"polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
	};

	const handleChange = (index, digit) => {
		if (!/^\d*$/.test(digit)) return;

		const newOtp = [...otp];
		newOtp[index] = digit.slice(-1); // Only take the last digit

		setOtp(newOtp);
		const otpString = newOtp.join("");
		onChange(otpString);

		// Auto-focus next input
		if (digit && index < 5) {
			inputRefs.current[index + 1]?.focus();
		}

		// Call onComplete when all 6 digits are filled
		if (otpString.length === 6 && onComplete) {
			onComplete(otpString);
		}
	};

	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !otp[index] && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
		if (e.key === "ArrowLeft" && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
		if (e.key === "ArrowRight" && index < 5) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handlePaste = (e) => {
		e.preventDefault();
		const pastedData = e.clipboardData
			.getData("text")
			.replace(/\D/g, "")
			.slice(0, 6);
		const newOtp = pastedData
			.split("")
			.concat(Array(6 - pastedData.length).fill(""));
		setOtp(newOtp);
		onChange(pastedData);

		if (pastedData.length === 6 && onComplete) {
			onComplete(pastedData);
		}
	};

	return (
		<div className="flex items-center justify-center space-x-4">
			{/* First 3 digits */}
			<div className="flex space-x-2">
				{[0, 1, 2].map((index) => (
					<input
						key={index}
						ref={(el) => (inputRefs.current[index] = el)}
						type="text"
						inputMode="numeric"
						maxLength={1}
						value={otp[index] || ""}
						onChange={(e) => handleChange(index, e.target.value)}
						onKeyDown={(e) => handleKeyDown(index, e)}
						onPaste={handlePaste}
						className={baseInputClasses}
						style={clipPathStyle}
						disabled={disabled}
					/>
				))}
			</div>

			{/* Separator */}
			<div className="text-gray-400">
				<Minus className="h-4 w-4" />
			</div>

			{/* Last 3 digits */}
			<div className="flex space-x-2">
				{[3, 4, 5].map((index) => (
					<input
						key={index}
						ref={(el) => (inputRefs.current[index] = el)}
						type="text"
						inputMode="numeric"
						maxLength={1}
						value={otp[index] || ""}
						onChange={(e) => handleChange(index, e.target.value)}
						onKeyDown={(e) => handleKeyDown(index, e)}
						onPaste={handlePaste}
						className={baseInputClasses}
						style={clipPathStyle}
						disabled={disabled}
					/>
				))}
			</div>
		</div>
	);
};

export default OTPInputDouble;
