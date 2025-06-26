import React, { useState } from "react";
import {
	ChevronRight,
	User,
	Calendar,
	Mail,
	Lock,
	Eye,
	EyeOff,
	Check,
	ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
	{
		field: "fullName",
		label: "What's your full name?",
		icon: User,
		placeholder: "Enter your full name",
	},
	{
		field: "dateOfBirth",
		label: "When were you born?",
		icon: Calendar,
		placeholder: "26-06-2025",
		type: "date",
	},
	{
		field: "email",
		label: "What's your email address?",
		icon: Mail,
		placeholder: "your.email@example.com",
		type: "email",
	},
	{
		field: "username",
		label: "Choose a username",
		icon: User,
		placeholder: "Pick something unique",
	},
	{
		field: "password",
		label: "Create a secure password",
		icon: Lock,
		placeholder: "Make it strong",
		type: "password",
	},
];

const ModernSignupForm = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const [direction, setDirection] = useState("forward");
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		fullName: "",
		dateOfBirth: "",
		email: "",
		username: "",
		password: "",
	});
	const [passwordValidation, setPasswordValidation] = useState({
		length: false,
		uppercase: false,
		lowercase: false,
		number: false,
		special: false,
	});

	const variants = {
		enter: (dir) => ({
			x: dir === "forward" ? 300 : -300,
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: (dir) => ({
			x: dir === "forward" ? -300 : 300,
			opacity: 0,
		}),
	};

	const validatePassword = (password) => {
		setPasswordValidation({
			length: password.length >= 8 && password.length <= 128,
			uppercase: /[A-Z]/.test(password),
			lowercase: /[a-z]/.test(password),
			number: /\d/.test(password),
			special: /[@$!%*?&]/.test(password),
		});
	};

	const handleInputChange = (value) => {
		setFormData((prev) => ({
			...prev,
			[steps[currentStep].field]: value,
		}));

		if (steps[currentStep].field === "password") {
			validatePassword(value);
		}
	};

	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			setDirection("forward");
			setCurrentStep((prev) => prev + 1);
		}
	};

	const handleBack = () => {
		if (currentStep > 0) {
			setDirection("backward");
			setCurrentStep((prev) => prev - 1);
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter" && formData[steps[currentStep].field]) {
			if (currentStep === steps.length - 1) {
				handleSubmit();
			} else {
				handleNext();
			}
		}
	};

	const handleSubmit = () => {
		alert("Account created successfully!");
	};

	const isStepValid = () => {
		const value = formData[steps[currentStep].field];
		if (!value) return false;

		if (steps[currentStep].field === "password") {
			return Object.values(passwordValidation).every(Boolean);
		}

		return true;
	};

	const currentStepData = steps[currentStep];

	return (
		<div className="relative min-h-screen bg-gray-50">
			{/* Header */}
			<div className="border-b border-gray-200 bg-white">
				<div className="mx-auto max-w-7xl px-6 py-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600">
								<span className="text-lg font-bold text-white">A</span>
							</div>
							<span className="text-2xl font-bold text-gray-900">Archeo</span>
						</div>
						<div className="text-sm text-gray-600">
							Already have an account?
							<a
								href="#"
								className="ml-2 font-medium text-green-600 hover:text-green-700"
							>
								Sign in
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="mx-auto max-w-4xl px-6 py-16">
				{/* Back button */}
				{currentStep > 0 && (
					<button
						onClick={handleBack}
						className="mb-12 flex items-center space-x-2 text-gray-600 transition-colors hover:text-gray-900"
					>
						<ArrowLeft className="h-5 w-5" />
						<span>Back</span>
					</button>
				)}

				{/* Progress indicator */}
				<div className="mb-16">
					<div className="mb-6 flex items-center space-x-4">
						{steps.map((_, index) => (
							<div key={index} className="flex items-center">
								<div
									className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-all duration-300 ${
										index <= currentStep
											? "border-green-600 bg-green-600 text-white"
											: "border-gray-300 bg-white text-gray-400"
									}`}
								>
									{index + 1}
								</div>
								{index < steps.length - 1 && (
									<div
										className={`mx-4 h-0.5 w-16 transition-all duration-300 ${index < currentStep ? "bg-green-600" : "bg-gray-300"}`}
									/>
								)}
							</div>
						))}
					</div>
					<p className="text-gray-600">
						Step {currentStep + 1} of {steps.length}
					</p>
				</div>

				<AnimatePresence custom={direction} mode="wait">
					<motion.div
						key={currentStep}
						custom={direction}
						variants={variants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{ duration: 0.4 }}
						className=""
					>
						{/* Question */}
						<div className="mb-12 overflow-hidden">
							<h1 className="mb-4 text-4xl font-light text-gray-900 md:text-5xl">
								{currentStepData.label}
							</h1>
							<p className="text-xl text-gray-600">
								{currentStep === 0 &&
									"We'll use this to personalize your experience"}
								{currentStep === 1 && "This helps us verify your identity"}
								{currentStep === 2 && "We'll send you important updates here"}
								{currentStep === 3 && "This will be your unique identifier"}
								{currentStep === 4 &&
									"Keep your account secure with a strong password"}
							</p>
						</div>

						{/* Input Field */}
						<div className="mb-8 overflow-hidden">
							<div
								className={`transform transition-all duration-300 ease-in-out`}
							>
								<div className="relative flex max-w-2xl items-center">
									<div className="relative flex-1">
										{currentStepData.type === "password" ? (
											<div className="relative">
												<input
													key={currentStep} // Force re-render for autofocus
													type={showPassword ? "text" : "password"}
													value={formData[currentStepData.field]}
													onChange={(e) => handleInputChange(e.target.value)}
													onKeyPress={handleKeyPress}
													placeholder={currentStepData.placeholder}
													className="clip-corner w-full border-2 border-gray-300 bg-white px-8 py-6 text-xl transition-all duration-200 hover:border-gray-400 focus:border-green-600 focus:outline-none"
													style={{
														clipPath:
															"polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
													}}
												/>
												<button
													type="button"
													onClick={() => setShowPassword(!showPassword)}
													className="absolute top-1/2 right-6 -translate-y-1/2 transform text-gray-500 transition-colors hover:text-gray-700"
												>
													{showPassword ? (
														<EyeOff className="h-6 w-6" />
													) : (
														<Eye className="h-6 w-6" />
													)}
												</button>
											</div>
										) : (
											<input
												key={currentStep} // Force re-render for autofocus
												type={currentStepData.type || "text"}
												value={formData[currentStepData.field]}
												onChange={(e) => handleInputChange(e.target.value)}
												onKeyPress={handleKeyPress}
												placeholder={currentStepData.placeholder}
												className="w-full border-2 border-gray-300 bg-white px-8 py-6 text-xl transition-all duration-200 hover:border-gray-400 focus:border-green-600 focus:outline-none"
												style={{
													clipPath:
														"polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
												}}
											/>
										)}
									</div>

									{/* Next/Submit Button */}
									<div className="ml-6">
										{currentStep < steps.length - 1 ? (
											<button
												onClick={handleNext}
												disabled={!formData[currentStepData.field]}
												className={`flex h-16 w-16 transform items-center justify-center rounded-full bg-green-600 shadow-lg transition-all duration-200 hover:scale-105 hover:bg-green-700 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:scale-100`}
												style={{
													clipPath:
														"polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
												}}
											>
												<ChevronRight className="h-8 w-8 text-white" />
											</button>
										) : (
											<button
												onClick={handleSubmit}
												disabled={!isStepValid()}
												className={`transform bg-green-600 px-8 py-6 text-lg font-medium text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-green-700 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:scale-100`}
												style={{
													clipPath:
														"polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
												}}
											>
												Create Account
											</button>
										)}
									</div>
								</div>

								{/* Password Validation */}
								{currentStepData.field === "password" && formData.password && (
									<div className="mt-8 max-w-lg">
										<h3 className="mb-4 text-lg font-medium text-gray-900">
											Password Requirements
										</h3>
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
															passwordValidation[key]
																? "border-green-600 bg-green-600"
																: "border-gray-300"
														}`}
													>
														{passwordValidation[key] && (
															<Check className="h-3 w-3 text-white" />
														)}
													</div>
													<span
														className={`text-sm ${
															passwordValidation[key]
																? "text-green-700"
																: "text-gray-600"
														}`}
													>
														{label}
													</span>
												</div>
											))}
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Helper text */}
						<div
							className={`max-w-2xl transform text-sm text-gray-500 transition-all duration-300 ease-in-out`}
						>
							Press Enter to continue or use the arrow button →
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
};

export default ModernSignupForm;
