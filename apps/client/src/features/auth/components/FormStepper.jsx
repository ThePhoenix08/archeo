import { useState } from "react";

// import { Button } from "@/components/ui/button";
import {
	Stepper,
	StepperIndicator,
	StepperItem,
	StepperSeparator,
	StepperTrigger,
} from "@/components/ui/stepper";

export default function FormStepper({ currentStep, setCurrentStep, steps }) {
	const [isLoading, setIsLoading] = useState(false);

	// const handleNextStep = () => {
	// 	setIsLoading(true);
	// 	setTimeout(() => {
	// 		setCurrentStep((prev) => prev + 1);
	// 		setIsLoading(false);
	// 	}, 1000);
	// };

	return (
		<div className="mx-auto max-w-xl space-y-8 text-center">
			<Stepper value={currentStep} onValueChange={setCurrentStep}>
				{steps.map((step) => (
					<StepperItem
						key={step.title}
						step={step.index}
						className="not-last:flex-1"
						loading={!isLoading && currentStep > step.index}
					>
						<StepperTrigger asChild>
							<StepperIndicator />
						</StepperTrigger>
						{step.index < steps.length && <StepperSeparator />}
					</StepperItem>
				))}
			</Stepper>
			{/* <div className="flex justify-center space-x-4">
				<Button
					variant="outline"
					className="w-32"
					onClick={() => setCurrentStep((prev) => prev - 1)}
					disabled={currentStep === 1}
				>
					Prev step
				</Button>
				<Button
					variant="outline"
					className="w-32"
					onClick={handleNextStep}
					disabled={currentStep > steps.length}
				>
					Next step
				</Button>
			</div> */}
		</div>
	);
}
