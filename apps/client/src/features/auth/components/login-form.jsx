"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "react-router";
import { LogIn, Mail, CircleUserRound, LockKeyhole } from "lucide-react";
import { getLoginFieldsForRole } from "@/features/auth/constants/getFieldsForRole.constant.js";
import { useUserAuthFlow } from "@/features/auth/flows/userAuth.flow.js";

export function LoginForm({ className, ...props }) {
	let { role } = useParams();
	const { flow } = useUserAuthFlow();
	const [loginType, setLoginType] = useState("email"); // "email" or "username"
	const [formdata, setFormdata] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState({
		username: "",
		email: "",
		password: "",
	});

	// Validation function
	const validateField = (fieldName, value) => {
		let error = "";

		if (fieldName === "email" && loginType === "email") {
			const emailRegex = getLoginFieldsForRole[role][1].regex;
			if (value && emailRegex && !new RegExp(emailRegex).test(value)) {
				error = getLoginFieldsForRole[role][1].regexError;
			}
		} else if (fieldName === "username" && loginType === "username") {
			const usernameRegex = getLoginFieldsForRole[role][0].regex;
			if (value && usernameRegex && !new RegExp(usernameRegex).test(value)) {
				error = getLoginFieldsForRole[role][0].regexError;
			}
		}

		return error;
	};

	// Handle input change with validation
	const handleInputChange = (fieldName, value) => {
		setFormdata({
			...formdata,
			[fieldName]: value,
		});

		// Clear error when user starts typing
		if (errors[fieldName]) {
			setErrors({
				...errors,
				[fieldName]: "",
			});
		}
	};

	// Handle input blur for validation
	const handleInputBlur = (fieldName, value) => {
		const error = validateField(fieldName, value);
		setErrors({
			...errors,
			[fieldName]: error,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Validate all fields before submission
		const newErrors = {};
		newErrors[loginType] = validateField(loginType, formdata[loginType]);

		// Check for empty required fields
		if (!formdata[loginType]) {
			newErrors[loginType] =
				`${loginType === "email" ? "Email" : "Username"} is required`;
		}
		if (!formdata.password) {
			newErrors.password = "Password is required";
		}

		setErrors(newErrors);

		// If there are errors, don't submit
		if (Object.values(newErrors).some((error) => error !== "")) {
			return;
		}

		const loginData = {
			[loginType]: formdata[loginType],
			password: formdata.password,
		};

		try {
			flow("login", loginData);
		} catch (error) {
			console.error(`[${loginType.toUpperCase()} ERROR]:`, error);
			return { error: error.message || "Something went wrong" };
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className={cn("flex flex-col gap-6", className)}
			noValidate
			{...props}
		>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">
					{" "}
					<span className="bg-gradient-to-r from-pink-400 via-purple-800 to-blue-500 bg-clip-text text-transparent">
						Login
					</span>{" "}
					to your account <LogIn className="inline-block text-black/45" />
				</h1>
				<p className="text-sm text-balance text-muted-foreground">
					Enter your {loginType} below to login to your account
				</p>
			</div>
			<div className="grid gap-6">
				{/* Toggle buttons for login type */}
				<div className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1">
					<Button
						type="button"
						variant={loginType === "email" ? "default" : "ghost"}
						size="sm"
						onClick={() => {
							setLoginType("email");
							// Clear errors when switching login type
							setErrors({ ...errors, username: "", email: "" });
						}}
						className="text-sm transition-all duration-300 ease-out"
					>
						<Mail />
						Email
					</Button>
					<Button
						type="button"
						variant={loginType === "username" ? "default" : "ghost"}
						size="sm"
						onClick={() => {
							setLoginType("username");
							// Clear errors when switching login type
							setErrors({ ...errors, username: "", email: "" });
						}}
						className="text-sm transition-all duration-400 ease-in-out"
					>
						<CircleUserRound />
						Username
					</Button>
				</div>

				{/* Dynamic input field based on login type */}
				<div className="grid gap-3">
					<Label htmlFor={loginType}>
						{loginType === "email" ? (
							<Mail size={16} />
						) : (
							<CircleUserRound size={16} />
						)}
						{loginType === "email"
							? getLoginFieldsForRole[role][1].label
							: getLoginFieldsForRole[role][0].label}
					</Label>
					<Input
						id={loginType}
						name={
							loginType === "email"
								? getLoginFieldsForRole[role][1].name
								: getLoginFieldsForRole[role][0].name
						}
						type={
							loginType === "email"
								? getLoginFieldsForRole[role][1].type
								: getLoginFieldsForRole[role][0].type
						}
						value={formdata[loginType]}
						onChange={(e) => handleInputChange(loginType, e.target.value)}
						onBlur={(e) => handleInputBlur(loginType, e.target.value)}
						placeholder={loginType === "email" ? "m@example.com" : "username"}
						className={
							errors[loginType] ? "border-red-500 focus:border-red-500" : ""
						}
					/>
					{errors[loginType] && (
						<p className="-mt-2 text-xs text-destructive">
							{errors[loginType]}
						</p>
					)}
				</div>

				<div className="grid gap-3">
					<div className="flex items-center">
						<Label htmlFor="password">
							<LockKeyhole size={16} />
							Password
						</Label>
						<a
							href="#"
							className="ml-auto text-sm underline-offset-4 hover:underline"
						>
							Forgot your password?
						</a>
					</div>
					<Input
						id="password"
						name={getLoginFieldsForRole[role][2].name}
						placeholder="************"
						type={getLoginFieldsForRole[role][2].type}
						value={formdata.password}
						onChange={(e) => handleInputChange("password", e.target.value)}
						className={
							errors.password ? "border-red-500 focus:border-red-500" : ""
						}
					/>
					{errors.password && (
						<p className="-mt-2 text-xs text-destructive">{errors.password}</p>
					)}
				</div>

				<Button type="submit" className="w-full cursor-pointer">
					Login
				</Button>

				<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
					<span className="relative z-10 bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>

				<Button variant="outline" className="w-full cursor-pointer">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 533.5 544.3"
						width="24"
						height="24"
					>
						<path
							fill="#4285F4"
							d="M533.5 278.4c0-17.4-1.6-34-4.6-50.2H272v95h146.9c-6.3 34-25 62.7-53.3 82v68h85.9c50.2-46.2 81-114.3 81-194.8z"
						/>
						<path
							fill="#34A853"
							d="M272 544.3c71.7 0 131.8-23.6 175.7-63.9l-85.9-68c-23.9 16.1-54.5 25.6-89.8 25.6-69 0-127.4-46.6-148.3-109.2H34.2v68.9C77.7 477.3 168.4 544.3 272 544.3z"
						/>
						<path
							fill="#FBBC05"
							d="M123.7 328.8c-10.3-30.3-10.3-63.1 0-93.4V166.5H34.2c-36.8 73.6-36.8 160.6 0 234.2l89.5-71.9z"
						/>
						<path
							fill="#EA4335"
							d="M272 107.7c37.4 0 71 12.9 97.6 38.2l73.1-73.1C403.8 27.4 343.7 0 272 0 168.4 0 77.7 66.9 34.2 166.5l89.5 68.9C144.6 154.3 203 107.7 272 107.7z"
						/>
					</svg>
					Login with Google
				</Button>
			</div>

			<div className="text-center text-sm">
				Don&apos;t have an account?{" "}
				<a href={`/register/${role}`} className="underline underline-offset-4">
					Sign up
				</a>
			</div>
		</form>
	);
}
