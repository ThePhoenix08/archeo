"use client";

import { useState } from "react";
import { Check, X, Mail } from "lucide-react";
import OTPInputDouble from "@/features/auth/components/sub-components/register/OTP-input-double.sc.jsx";
import CustomLabel from "@/features/auth/components/sub-components/register/CustomLabel.sc.jsx";

const EmailInputWithOTPVerification = ({
	value,
	onChange,
	onKeyPress,
	placeholder = "Enter your email",
	className = "",
	disabled = false,
	autoFocus = false,
	onVerify,
	customData,
}) => {
	const [verificationState, setVerificationState] = useState("verify"); // verify, sending, sent, verifying, verified, retry
	const [showModal, setShowModal] = useState(false);
	const [otp, setOtp] = useState("");
	const [otpError, setOtpError] = useState("");
	const { icon, text, name, required } = customData;

	const baseInputClasses = `
    w-full border-2 border-gray-300 bg-white px-8 py-6 pr-32 text-xl 
    transition-all duration-200 hover:border-gray-400 
    focus:border-blue-600 focus:outline-none
    ${className}
  `;

	const clipPathStyle = {
		clipPath:
			"polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
	};

	const handleSendVerificationEmail = async () => {
		if (!value || !value.includes("@")) return;

		setVerificationState("sending");

		try {
			// Simulate sending verification email
			await new Promise((resolve) => setTimeout(resolve, 2000));

			if (onVerify) {
				const result = await onVerify(value);
				if (result) {
					setVerificationState("sent");
					setShowModal(true);
				} else {
					setVerificationState("retry");
				}
			} else {
				// Mock success
				setVerificationState("sent");
				setShowModal(true);
			}
		} catch (error) {
			console.log("Email verification failed: ", error);
			setVerificationState("retry");
		}
	};

	const handleOTPSubmit = async (otpValue) => {
		setVerificationState("verifying");
		setOtpError("");

		try {
			// Simulate OTP verification
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Mock verification - accept "123456" as valid OTP
			if (otpValue === "123456") {
				setVerificationState("verified");
				setTimeout(() => {
					setShowModal(false);
				}, 2000);
			} else {
				setOtpError("Invalid OTP. Please try again.");
				setVerificationState("sent");
			}
		} catch (error) {
			console.log("OTP verification failed: ", error);
			setOtpError("Verification failed. Please try again.");
			setVerificationState("sent");
		}
	};

	const getButtonConfig = () => {
		switch (verificationState) {
			case "verify":
				return {
					text: "Verify",
					className: "bg-blue-600 hover:bg-blue-700 text-white",
					icon: Mail,
					disabled: !value || !value.includes("@"),
				};
			case "sending":
				return {
					text: "Sending...",
					className: "bg-blue-600 text-white cursor-not-allowed",
					icon: Mail,
					disabled: true,
				};
			case "sent":
				return {
					text: "Sent",
					className: "bg-blue-600 text-white cursor-not-allowed",
					icon: Mail,
					disabled: true,
				};
			case "verifying":
				return {
					text: "Verifying...",
					className: "bg-blue-600 text-white cursor-not-allowed",
					icon: Mail,
					disabled: true,
				};
			case "retry":
				return {
					text: "Retry",
					className: "bg-red-600 hover:bg-red-700 text-white",
					icon: X,
					disabled: false,
				};
			case "verified":
				return {
					text: "Verified",
					className: "bg-green-600 text-white cursor-not-allowed",
					icon: Check,
					disabled: true,
				};
			default:
				return {
					text: "Verify",
					className: "bg-blue-600 hover:bg-blue-700 text-white",
					icon: Mail,
					disabled: true,
				};
		}
	};

	const buttonConfig = getButtonConfig();
	const ButtonIcon = buttonConfig.icon;

	return (
		<>
			<CustomLabel text={text} icon={icon} />
			<div className="relative">
				<input
					type="email"
					name={name}
					required={required}
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
					onClick={
						verificationState === "retry"
							? handleSendVerificationEmail
							: handleSendVerificationEmail
					}
					disabled={buttonConfig.disabled}
					className={`absolute top-1/2 right-2 -translate-y-1/2 transform px-3 py-2 text-sm font-medium transition-all duration-200 ${buttonConfig.className}`}
					style={{
						clipPath:
							"polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
					}}
				>
					<div className="flex items-center space-x-1">
						<ButtonIcon className="h-4 w-4" />
						<span>{buttonConfig.text}</span>
					</div>
				</button>
			</div>

			{/* OTP Verification Modal */}
			{showModal && (
				<div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-lg">
					<div
						className="mx-4 w-full max-w-lg space-y-6 border-2 border-primary bg-background p-8"
						style={{
							clipPath:
								"polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
						}}
					>
						<div className="text-center">
							<Mail className="mx-auto mb-4 h-12 w-12 text-blue-600" />
							<h2 className="mb-2 text-2xl font-bold text-gray-900">
								Verify Your Email
							</h2>
							<p className="text-gray-600">
								We've sent a 6-digit code to <strong>{value}</strong>
							</p>
						</div>

						<div className="space-y-4">
							<OTPInputDouble
								value={otp}
								onChange={setOtp}
								onComplete={handleOTPSubmit}
								disabled={verificationState === "verifying"}
							/>

							{otpError && (
								<p className="text-center text-sm text-red-600">{otpError}</p>
							)}

							{verificationState === "verifying" && (
								<div className="flex items-center justify-center space-x-2 text-blue-600">
									<div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
									<span>Verifying...</span>
								</div>
							)}

							{verificationState === "verified" && (
								<div className="flex items-center justify-center space-x-2 text-green-600">
									<Check className="h-5 w-5" />
									<span className="font-medium">
										Email verified successfully!
									</span>
								</div>
							)}
						</div>

						<div className="flex space-x-4">
							<button
								onClick={() => setShowModal(false)}
								className="flex-1 border-2 border-gray-300 px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
								style={{
									clipPath:
										"polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
								}}
							>
								Cancel
							</button>
							<button
								onClick={handleSendVerificationEmail}
								className="flex-1 bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700"
								style={{
									clipPath:
										"polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
								}}
							>
								Resend Code
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default EmailInputWithOTPVerification;
