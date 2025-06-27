import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const FormInput = ({
	type = "text",
	value,
	onChange,
	onKeyPress,
	placeholder,
	className = "",
	disabled = false,
	autoFocus = false,
	showPasswordToggle = false,
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const inputType = type === "password" && showPassword ? "text" : type;

	const baseInputClasses = `
    w-full border-2 border-gray-300 bg-white px-8 py-6 text-xl 
    transition-all duration-200 hover:border-gray-400 
    focus:border-green-600 focus:outline-none
    ${className}
  `;

	const clipPathStyle = {
		clipPath:
			"polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
	};

	if (type === "password" && showPasswordToggle) {
		return (
			<div className="relative">
				<input
					type={inputType}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					onKeyDown={onKeyPress}
					placeholder={placeholder}
					className={baseInputClasses}
					style={clipPathStyle}
					disabled={disabled}
					autoFocus={autoFocus}
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
		);
	}

	return (
		<input
			type={inputType}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			onKeyDown={onKeyPress}
			placeholder={placeholder}
			className={baseInputClasses}
			style={clipPathStyle}
			disabled={disabled}
			autoFocus={autoFocus}
		/>
	);
};

export default FormInput;
