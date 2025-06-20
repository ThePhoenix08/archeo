"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

export function LoginForm({ className, ...props }) {
	const [loginType, setLoginType] = useState("email"); // "email" or "username"
	const navigate = useNavigate();
	let { role } = useParams();
	console.log(role);

	return (
		<form className={cn("flex flex-col gap-6", className)} {...props}>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">Login to your account</h1>
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
						onClick={() => setLoginType("email")}
						className="text-sm"
					>
						Email
					</Button>
					<Button
						type="button"
						variant={loginType === "username" ? "default" : "ghost"}
						size="sm"
						onClick={() => setLoginType("username")}
						className="text-sm"
					>
						Username
					</Button>
				</div>

				{/* Dynamic input field based on login type */}
				<div className="grid gap-3">
					<Label htmlFor={loginType}>
						{loginType === "email" ? "Email" : "Username"}
					</Label>
					<Input
						id={loginType}
						type={loginType === "email" ? "email" : "text"}
						placeholder={loginType === "email" ? "m@example.com" : "username"}
						required
					/>
				</div>

				<div className="grid gap-3">
					<div className="flex items-center">
						<Label htmlFor="password">Password</Label>
						<a
							href="#"
							className="ml-auto text-sm underline-offset-4 hover:underline"
						>
							Forgot your password?
						</a>
					</div>
					<Input
						id="password"
						placeholder="************"
						type="password"
						required
					/>
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
