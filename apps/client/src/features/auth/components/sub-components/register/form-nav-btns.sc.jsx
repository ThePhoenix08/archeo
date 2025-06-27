import React from "react";
import { ChevronRight, ArrowLeft } from "lucide-react";

const BackButton = ({ onClick, show = true, text = "Back" }) => {
	if (!show) return null;

	return (
		<button
			onClick={onClick}
			className="flex items-center space-x-2 text-lg text-gray-600 transition-colors hover:text-gray-900"
		>
			<ArrowLeft className="h-5 w-5" />
			<span>{text}</span>
		</button>
	);
};

const NextButton = ({
	onClick,
	disabled = false,
	isLast = false,
	lastStepText = "Create Account",
}) => {
	const baseClasses = `
    transform shadow-lg transition-all duration-200 hover:scale-105 
    disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:scale-100
  `;

	if (isLast) {
		return (
			<button
				onClick={onClick}
				disabled={disabled}
				className={`${baseClasses} bg-green-600 px-8 py-6 text-lg font-medium text-white hover:bg-green-700 hover:shadow-xl`}
				style={{
					clipPath:
						"polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
				}}
			>
				{lastStepText}
			</button>
		);
	}

	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`${baseClasses} flex h-16 w-16 items-center justify-center rounded-full bg-green-600 hover:bg-green-700 hover:shadow-xl`}
			style={{
				clipPath:
					"polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
			}}
		>
			<ChevronRight className="h-8 w-8 text-white" />
		</button>
	);
};

const SubmitButton = ({ onClick, disabled }) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`focus:shadow-outline rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none ${
				disabled ? "cursor-not-allowed opacity-50" : ""
			}`}
		>
			Submit
		</button>
	);
};

const NavigationButtons = {
	BackButton,
	NextButton,
	SubmitButton,
};

export default NavigationButtons;
