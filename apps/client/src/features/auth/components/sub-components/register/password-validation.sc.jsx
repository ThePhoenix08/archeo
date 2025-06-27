import React from "react";
import { Check } from "lucide-react";

const PasswordValidation = ({
	validation,
	title = "Password Requirements",
	requirements = [
		{ key: "length", label: "8-128 characters" },
		{ key: "uppercase", label: "Uppercase letter" },
		{ key: "lowercase", label: "Lowercase letter" },
		{ key: "number", label: "Number" },
		{ key: "special", label: "Special character" },
	],
}) => {
	return (
		<div className="mt-8 max-w-lg">
			<h3 className="mb-4 text-lg font-medium text-gray-900">{title}</h3>
			<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
				{requirements.map(({ key, label }) => (
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
							className={`text-sm ${
								validation[key] ? "text-green-700" : "text-gray-600"
							}`}
						>
							{label}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default PasswordValidation;
