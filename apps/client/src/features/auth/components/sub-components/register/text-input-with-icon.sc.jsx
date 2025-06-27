"use client";

const TextInputWithIcon = ({
	type = "text",
	value,
	onChange,
	onKeyPress,
	placeholder,
	className = "",
	disabled = false,
	autoFocus = false,
	icon: Icon,
}) => {
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

	return (
		<div className="relative">
			<input
				type={type}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				onKeyDown={onKeyPress}
				placeholder={placeholder}
				className={baseInputClasses}
				style={clipPathStyle}
				disabled={disabled}
				autoFocus={autoFocus}
			/>
			{Icon && (
				<div className="absolute top-1/2 right-6 -translate-y-1/2 transform text-gray-500">
					<Icon className="h-6 w-6" />
				</div>
			)}
		</div>
	);
};

export default TextInputWithIcon;
