"use client";
import { FolderLock } from "lucide-react";
import { LoginForm } from "@/features/auth/components/login-form.jsx";
import EnhancedLoginLeftSection from "@/features/auth/components/EnhancedLoginLeftSection.jsx";

function LoginPage() {
	return (
		<div className="grid h-svh w-full overflow-hidden lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-6">
				{/* Logo section with enhanced styling */}
				<a href="/" className="relative z-10 mb-8 flex items-center gap-3">
					<div className="flex size-8 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
						<FolderLock className="size-6" />
					</div>
					<div className="flex flex-col">
						<span className="bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-xl font-bold text-transparent">
							Archeo
						</span>
						<span className="text-xs font-medium text-blue-500/80">
							Document Management
						</span>
					</div>
				</a>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<LoginForm />
					</div>
				</div>
			</div>
			<EnhancedLoginLeftSection />
		</div>
	);
}

export default LoginPage;
