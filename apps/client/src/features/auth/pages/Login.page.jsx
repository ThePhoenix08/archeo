"use client";
import { LoginForm } from "@/features/auth/components/login/login-form.c.jsx";
import EnhancedLoginLeftSection from "@/features/auth/components/login/EnhancedLoginLeftSection.c.jsx";
import LogoText from "@/components/brand/LogoText.sc.jsx";

function LoginPage() {
	return (
		<div className="grid h-svh w-full overflow-hidden lg:grid-cols-2">
			<div className="flex flex-col gap-6 p-6 md:p-6">
				{/* Logo section with enhanced styling */}
				{/* Project Name */}
				<div className="w-full">
					<div className="box">
						<LogoText />
					</div>
				</div>
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
