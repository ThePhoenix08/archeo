"use client";

import CustomLabel from "@/features/auth/components/sub-components/register/CustomLabel.sc.jsx";

const TextInputWithCharacterLimit = ({
	type = "text",
	value,
	onChange,
	onKeyPress,
	placeholder,
	className = "",
	disabled = false,
	autoFocus = false,
	customData,
	buttonConfig = null,
	handleCheckAvailability = null,
}) => {
	const {
		maxLength = 100,
		minLength = 0,
		icon,
		name,
		text,
		required,
	} = customData || {};
	const currentLength = value ? value.length : 0;
	const isOverLimit = currentLength > maxLength;

	const baseInputClasses = `
    w-full border-2 border-gray-300 dark:border-gray-700 bg-background px-8 py-6 pr-20 text-xl 
    transition-all duration-200 hover:border-gray-400 dark:border-gray-600
    focus:border-blue-600 dark:focus:border-blue-600 focus:outline-none
    ${isOverLimit ? "border-red-500 focus:border-red-600" : ""}
    ${className}
  `;

	const clipPathStyle = {
		clipPath:
			"polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
	};

	return (
		<>
			{icon ? <CustomLabel text={text} icon={icon} /> : null}
			<div className="relative">
				<input
					name={name}
					type={type}
					value={value}
					required={required}
					onChange={(e) => onChange(e.target.value)}
					onKeyDown={onKeyPress}
					placeholder={placeholder}
					className={baseInputClasses}
					style={clipPathStyle}
					disabled={disabled}
					autoFocus={autoFocus}
					maxLength={maxLength + 10}
					minLength={minLength}
				/>
				<div className="endBox absolute top-1/2 right-6 flex -translate-y-1/2 transform">
					<div
						className={`grid place-items-center px-4 text-sm ${
							isOverLimit ? "text-red-500" : "text-gray-500"
						}`}
					>
						{currentLength}/{maxLength}
					</div>
					{buttonConfig && (
						<CheckAvailBtn
							buttonConfig={buttonConfig}
							handleCheckAvailability={handleCheckAvailability}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default TextInputWithCharacterLimit;

const CheckAvailBtn = ({ buttonConfig, handleCheckAvailability }) => {
	const {
		disabled: btnDisabled,
		text: btnText,
		icon: ButtonIcon,
	} = buttonConfig;
	return (
		<button
			type="button"
			onClick={handleCheckAvailability}
			disabled={btnDisabled}
			className={`px-3 py-2 text-sm font-medium transition-all duration-200 ${buttonConfig.className}`}
			style={{
				clipPath:
					"polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
			}}
		>
			<div className="flex items-center space-x-1">
				<ButtonIcon className="h-4 w-4" />
				<span>{btnText}</span>
			</div>
		</button>
	);
};
