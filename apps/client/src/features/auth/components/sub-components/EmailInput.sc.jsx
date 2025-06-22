import { useId, useState, useEffect, useRef } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectNative } from "@/components/ui/select-native";
import { useVerifyEmailMutation } from "@/features/auth/actions/authApi.action.js";

import { Mail } from "lucide-react";

export default function EmailInput({
	fieldDetails,
	handleFieldChange,
	value,
	error,
}) {
	const { name, label, required, initialValue } = fieldDetails;
	const id = useId();
	const [localPart, setLocalPart] = useState(() => value?.split("@")[0] || "");
	const [domainPart, setDomainPart] = useState(
		() => "@" + (value?.split("@")[1] || "gmail.com")
	);
	// ["dormant", "loading", "success", "error"]
	const [buttonState, setButtonState] = useState("dormant");

	// RTK Query mutation hook
	const [verifyEmail] = useVerifyEmailMutation();

	const fullEmail = `${localPart}${domainPart}`;
	const handleFieldChangeRef = useRef(handleFieldChange);

	// Update the ref when handleFieldChange changes
	useEffect(() => {
		handleFieldChangeRef.current = handleFieldChange;
	});

	useEffect(() => {
		handleFieldChangeRef.current(name, fullEmail);
	}, [name, fullEmail]);

	const handleVerifyEmail = async () => {
		if (!localPart.trim()) {
			setButtonState("error");
			return;
		}

		try {
			setButtonState("loading");

			const result = await verifyEmail({ email: fullEmail }).unwrap();

			// Assuming successful verification
			setButtonState("success");
		} catch (error) {
			console.error("Email verification failed:", error);
			setButtonState("error");
		}
	};

	return (
		<div className="*:not-first:mt-2">
			<Label htmlFor={id}>
				{" "}
				<Mail size={16} />
				{label}
			</Label>
			<div className="flex w-full max-w-sm items-center gap-2">
				<div className="flex rounded-md shadow-xs">
					<Input
						id={id}
						className="-me-px rounded-e-none shadow-none focus-visible:z-10"
						placeholder={initialValue}
						type="text"
						required={required}
						name={`${name}_local`}
						value={localPart}
						onChange={(e) => setLocalPart(e.target.value)}
						readOnly={buttonState === "success"}
						disabled={buttonState === "loading"}
					/>
					<SelectNative
						className="w-fit rounded-s-none text-muted-foreground shadow-none hover:text-foreground"
						name={`${name}_domain`}
						required={required}
						value={domainPart}
						onChange={(e) => setDomainPart(e.target.value)}
						readOnly={buttonState === "success"}
						disabled={buttonState === "loading"}
					>
						<option value="@gmail.com">@gmail.com</option>
						<option value="@yahoo.com">@yahoo.com</option>
						<option value="@outlook.com">@outlook.com</option>
						<option value="@protonmail.com">@protonmail.com</option>
					</SelectNative>
				</div>
				<VerifyEmailBtn
					buttonState={buttonState}
					setButtonState={setButtonState}
					onVerify={handleVerifyEmail}
				/>
			</div>
			{error && <p className="text-xs text-destructive">{error}</p>}
		</div>
	);
}

import { LoaderCircleIcon, CheckIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils.js";

export function VerifyEmailBtn({ buttonState, setButtonState, onVerify }) {
	const handleClick = () => {
		if (buttonState === "success") {
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

	const isLoading = buttonState === "loading";
	const isSuccess = buttonState === "success";
	const isError = buttonState === "error";

	const StatesToBgColor = {
		loading: "bg-secondary text-secondary-foreground hover:bg-secondary",
		success: "bg-green-100 text-green-700 hover:bg-green-200 border-green-200",
		error:
			"bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20",
		dormant: "",
	};

	const getButtonText = () => {
		switch (buttonState) {
			case "success":
				return "Verified";
			case "error":
				return "Retry";
			default:
				return "Verify";
		}
	};

	const getIcon = () => {
		if (isLoading) {
			return (
				<LoaderCircleIcon
					className="animate-spin"
					size={16}
					aria-hidden="true"
				/>
			);
		}
		if (isSuccess) {
			return <CheckIcon size={16} aria-hidden="true" />;
		}
		if (isError) {
			return <XIcon size={16} aria-hidden="true" />;
		}
		return null;
	};

	return (
		<Button
			onClick={handleClick}
			disabled={isLoading}
			data-loading={isLoading || undefined}
			className={cn(
				"group relative min-w-[80px] disabled:opacity-100",
				StatesToBgColor[buttonState]
			)}
		>
			<span
				className={cn(
					"flex items-center gap-1",
					isLoading && "text-transparent"
				)}
			>
				{!isLoading && getIcon()}
				{getButtonText()}
			</span>
			{isLoading && (
				<div className="absolute inset-0 flex items-center justify-center">
					<LoaderCircleIcon
						className="animate-spin"
						size={16}
						aria-hidden="true"
					/>
				</div>
			)}
		</Button>
	);
}
