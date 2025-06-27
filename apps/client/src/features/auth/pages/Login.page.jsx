"use client";
import { FolderLock } from "lucide-react";
import { LoginForm } from "@/features/auth/components/login-form.jsx";
import EnhancedLoginLeftSection from "@/features/auth/components/EnhancedLoginLeftSection.jsx";

function LoginPage() {
	return (
		<div className="grid h-svh w-full overflow-hidden lg:grid-cols-2">
			<EnhancedLoginLeftSection />
			<div className="flex flex-col gap-4 p-6 md:p-6">
				<div className="flex justify-center gap-2 md:justify-start">
					<a href="/" className="flex items-center gap-2 font-medium">
						<div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
							<FolderLock className="size-4" />
						</div>
						Archeo
					</a>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<LoginForm />
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
