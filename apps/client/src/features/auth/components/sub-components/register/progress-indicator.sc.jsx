import React from "react";

const ProgressIndicator = ({
	currentStep,
	totalSteps,
	handleStepChange,
	showStepText = true,
}) => {
	return (
		<div className="mb-6">
			<div className="mb-6 flex items-center space-x-4">
				{Array.from({ length: totalSteps }, (_, index) => (
					<div key={index} className="flex items-center">
						<div
							className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-all duration-300 ${
								index <= currentStep
									? "cursor-pointer border-green-600 bg-green-600 text-white"
									: "border-gray-300 bg-white text-gray-400"
							}`}
							onClick={() => handleStepChange(index)}
						>
							{index + 1}
						</div>
						{index < totalSteps - 1 && (
							<div
								className={`mx-4 h-0.5 w-16 transition-all duration-300 ${
									index < currentStep ? "bg-green-600" : "bg-gray-300"
								}`}
							/>
						)}
					</div>
				))}
			</div>
			{showStepText && (
				<p className="text-gray-600">
					Step {currentStep + 1} of {totalSteps}
				</p>
			)}
		</div>
	);
};

export default ProgressIndicator;
