// EmailVerificationSystem.jsx
import { useId, useState, useEffect, useRef } from "react";
import { OTPInput } from "input-otp";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SelectNative } from "@/components/ui/select-native";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import {
	useVerifyEmailMutation,
	useVerifyOTPMutation,
} from "@/features/auth/actions/authApi.action.js";

import {
	Mail,
	LoaderCircleIcon,
	CheckIcon,
	XIcon,
	ShieldCheckIcon,
} from "lucide-react";
import { cn } from "@/lib/utils.js";

export default function EmailWithVerifyInput({
	fieldDetails,
	handleFieldChange,
	value,
	error,
}) {
	const { name, label, required, initialValue } = fieldDetails;
	const id = useId();

	// Email state
	const [localPart, setLocalPart] = useState(() => value?.split("@")[0] || "");
	const [domainPart, setDomainPart] = useState(
		() => "@" + (value?.split("@")[1] || "gmail.com")
	);

	// Verification states
	const [buttonState, setButtonState] = useState("dormant");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [otpValue, setOtpValue] = useState("");
	const [otpError, setOtpError] = useState("");
	const [isVerificationComplete, setIsVerificationComplete] = useState(false);
	const [isEmailVerified, setIsEmailVerified] = useState(false);

	// RTK Query hooks
	const [verifyEmail, { isLoading: isVerifyingEmail }] =
		useVerifyEmailMutation();
	const [verifyEmailOTP, { isLoading: isVerifyingOTP }] =
		useVerifyOTPMutation();

	// Refs
	const fullEmail = `${localPart}${domainPart}`;
	const handleFieldChangeRef = useRef(handleFieldChange);
	const inputRef = useRef(null);
	const closeButtonRef = useRef(null);

	// Update the ref when handleFieldChange changes
	useEffect(() => {
		handleFieldChangeRef.current = handleFieldChange;
	});

	// Update parent component with email changes
	useEffect(() => {
		handleFieldChangeRef.current(name, fullEmail);
	}, [name, fullEmail]);

	// Focus close button when verification is complete
	useEffect(() => {
		if (isVerificationComplete && closeButtonRef.current) {
			closeButtonRef.current.focus();
		}
	}, [isVerificationComplete]);

	// Auto-close modal after successful verification (optional)
	useEffect(() => {
		if (isVerificationComplete) {
			const timer = setTimeout(() => {
				setIsModalOpen(false);
				resetOtpState();
			}, 3000); // Auto close after 3 seconds
			return () => clearTimeout(timer);
		}
	}, [isVerificationComplete]);

	const resetOtpState = () => {
		setOtpValue("");
		setOtpError("");
		setIsVerificationComplete(false);
	};

	const handleVerifyEmail = async () => {
		if (!localPart.trim()) {
			setButtonState("error");
			return;
		}

		try {
			setButtonState("loading");

			const result = await verifyEmail({ email: fullEmail }).unwrap();

			if (result.error) {
				console.error("Email verification failed:", result.error);
				setButtonState("error");
				return;
			}

			// Email verification request sent successfully
			setButtonState("success");
			setIsModalOpen(true);
			resetOtpState();
		} catch (error) {
			console.error("Email verification failed:", error);
			setButtonState("error");
		}
	};

	const handleOTPSubmit = async (e) => {
		e?.preventDefault?.();

		if (!otpValue || otpValue.length < 4) {
			setOtpError("Please enter a valid OTP");
			return;
		}

		try {
			setOtpError("");

			const result = await verifyEmailOTP({
				email: fullEmail,
				otp: otpValue,
			}).unwrap();

			if (result.error) {
				console.error("OTP verification failed:", result.error);
				setOtpError(
					result.error?.data?.message || "Invalid OTP. Please try again."
				);
				return;
			}
			// OTP verification successful
			setIsVerificationComplete(true);
			setIsEmailVerified(true);

			// Update parent form state to reflect verified email
			handleFieldChangeRef.current(`${name}_verified`, true);
		} catch (error) {
			console.error("OTP verification failed:", error);
			setOtpError(error?.data?.message || "Invalid OTP. Please try again.");

			// Clear OTP and refocus
			setOtpValue("");
			setTimeout(() => {
				inputRef.current?.focus();
			}, 100);
		}
	};

	const handleOTPComplete = (value) => {
		setOtpValue(value);
		if (value.length === 4) {
			// Auto-submit when OTP is complete
			setTimeout(() => {
				handleOTPSubmit();
			}, 100);
		}
	};

	const handleResendCode = async () => {
		try {
			await verifyEmail({ email: fullEmail }).unwrap();
			setOtpError("");
			setOtpValue("");
		} catch (error) {
			console.error("Failed to resend code:", error);
			setOtpError("Failed to resend code. Please try again.");
		}
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		resetOtpState();
	};

	return (
		<>
			<div className="*:not-first:mt-2">
				<Label htmlFor={id} className="flex items-center gap-2">
					<Mail size={16} />
					{label}
					{isEmailVerified && (
						<CheckIcon size={16} className="text-green-600" />
					)}
				</Label>

				<div className="flex w-full justify-stretch gap-2">
					<div className="flex flex-grow rounded-md shadow-xs">
						<Input
							id={id}
							className="-me-px rounded-e-none shadow-none focus-visible:z-10"
							placeholder={initialValue}
							type="text"
							required={required}
							name={`${name}_local`}
							value={localPart}
							onChange={(e) => setLocalPart(e.target.value)}
							readOnly={isEmailVerified}
							disabled={isVerifyingEmail}
						/>
						<SelectNative
							className="w-fit rounded-s-none text-muted-foreground shadow-none hover:text-foreground"
							name={`${name}_domain`}
							required={required}
							value={domainPart}
							onChange={(e) => setDomainPart(e.target.value)}
							readOnly={isEmailVerified}
							disabled={isVerifyingEmail}
						>
							<option value="@gmail.com">@gmail.com</option>
							<option value="@yahoo.com">@yahoo.com</option>
							<option value="@outlook.com">@outlook.com</option>
							<option value="@protonmail.com">@protonmail.com</option>
						</SelectNative>
					</div>

					<VerifyEmailButton
						buttonState={buttonState}
						setButtonState={setButtonState}
						onVerify={handleVerifyEmail}
						isLoading={isVerifyingEmail}
						isVerified={isEmailVerified}
					/>
				</div>

				{error && <p className="text-xs text-destructive">{error}</p>}
			</div>

			{/* OTP Verification Modal */}
			<Dialog open={isModalOpen} onOpenChange={handleModalClose}>
				<DialogContent className="sm:max-w-md">
					<div className="flex flex-col items-center gap-4">
						<div
							className="flex size-12 shrink-0 items-center justify-center rounded-full border bg-background"
							aria-hidden="true"
						>
							{isVerificationComplete ? (
								<CheckIcon className="size-6 text-green-600" />
							) : (
								<ShieldCheckIcon className="size-6 text-primary" />
							)}
						</div>

						<DialogHeader className="text-center">
							<DialogTitle>
								{isVerificationComplete
									? "Email Verified!"
									: "Enter Verification Code"}
							</DialogTitle>
							<DialogDescription>
								{isVerificationComplete
									? "Your email has been successfully verified."
									: `We've sent a 4-digit code to ${fullEmail}`}
							</DialogDescription>
						</DialogHeader>
					</div>

					{isVerificationComplete ? (
						<div className="space-y-4 text-center">
							<div className="flex items-center justify-center gap-2 text-green-600">
								<CheckIcon size={16} />
								<span className="text-sm font-medium">
									Verification Complete
								</span>
							</div>
							<DialogClose asChild>
								<Button ref={closeButtonRef} className="w-full">
									Continue
								</Button>
							</DialogClose>
						</div>
					) : (
						<div className="space-y-4">
							<div className="flex justify-center">
								<OTPInput
									ref={inputRef}
									value={otpValue}
									onChange={setOtpValue}
									onComplete={handleOTPComplete}
									containerClassName="flex items-center gap-2"
									maxLength={4}
									disabled={isVerifyingOTP}
									render={({ slots }) => (
										<div className="flex gap-2">
											{slots.map((slot, idx) => (
												<OTPSlot key={idx} {...slot} />
											))}
										</div>
									)}
								/>
							</div>

							{otpError && (
								<p
									className="text-center text-sm text-destructive"
									role="alert"
									aria-live="polite"
								>
									{otpError}
								</p>
							)}

							<div className="flex flex-col gap-2">
								<Button
									onClick={handleOTPSubmit}
									disabled={isVerifyingOTP || !otpValue}
									className="w-full"
								>
									{isVerifyingOTP ? (
										<>
											<LoaderCircleIcon className="mr-2 size-4 animate-spin" />
											Verifying...
										</>
									) : (
										"Verify Code"
									)}
								</Button>

								<Button
									variant="ghost"
									onClick={handleResendCode}
									disabled={isVerifyingEmail}
									className="w-full"
								>
									{isVerifyingEmail ? (
										<>
											<LoaderCircleIcon className="mr-2 size-4 animate-spin" />
											Resending...
										</>
									) : (
										"Resend Code"
									)}
								</Button>
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
}

// OTP Slot Component
function OTPSlot(props) {
	return (
		<div
			className={cn(
				"relative flex size-12 items-center justify-center rounded-md border border-input bg-background font-medium text-foreground shadow-sm transition-all",
				{
					"z-10 border-ring ring-2 ring-ring/20": props.isActive,
					"border-green-500 bg-green-50": props.char !== null,
				}
			)}
		>
			{props.char !== null && <div className="text-lg">{props.char}</div>}
		</div>
	);
}

// Verify Email Button Component
function VerifyEmailButton({
	buttonState,
	setButtonState,
	onVerify,
	isLoading,
	isVerified,
}) {
	const handleClick = () => {
		if (isVerified) {
			// If already verified, allow re-verification
			setButtonState("dormant");
		} else if (buttonState === "error") {
			// If error, retry verification
			onVerify();
		} else {
			// Normal verification flow
			onVerify();
		}
	};

	const isButtonLoading = isLoading || buttonState === "loading";
	const isSuccess = buttonState === "success" || isVerified;
	const isError = buttonState === "error";

	const getButtonStyles = () => {
		if (isButtonLoading) {
			return "bg-secondary text-secondary-foreground hover:bg-secondary";
		}
		if (isSuccess) {
			return "bg-green-100 text-green-700 hover:bg-green-200 border-green-200";
		}
		if (isError) {
			return "bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20";
		}
		return "";
	};

	const getButtonText = () => {
		if (isVerified) return "Verified";
		if (isSuccess) return "Code Sent";
		if (isError) return "Retry";
		return "Verify";
	};

	const getIcon = () => {
		if (isButtonLoading) {
			return <LoaderCircleIcon className="animate-spin" size={16} />;
		}
		if (isVerified) {
			return <CheckIcon size={16} />;
		}
		if (isSuccess) {
			return <Mail size={16} />;
		}
		if (isError) {
			return <XIcon size={16} />;
		}
		return null;
	};

	return (
		<Button
			onClick={handleClick}
			disabled={isButtonLoading}
			className={cn("min-w-[100px] disabled:opacity-100", getButtonStyles())}
		>
			<span className="flex items-center gap-2">
				{getIcon()}
				{getButtonText()}
			</span>
		</Button>
	);
}
