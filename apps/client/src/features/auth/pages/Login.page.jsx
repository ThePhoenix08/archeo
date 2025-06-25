import { ROLES } from "@/shared/constants/roles.constant";
import React, { useState } from "react";
import { useUserAuthFlow } from "@/features/auth/flows/userAuth.flow.js";
import { useParams } from "react-router";
import { getLoginFieldsForRole } from "@/features/auth/constants/getFieldsForRole.constant.js";
import ErrorPage from "@/shared/routing/Error.page.jsx";
import { FolderLock } from "lucide-react";
import { LoginForm } from "@/features/auth/components/login-form.jsx";
import FeaturePreview from "@/features/auth/components/FeaturePreview.jsx";

const FEATURE_PREVIEWS = [
	{
		title: "Document Templates",
		description:
			"Create reusable, customizable templates with dynamic data injection for certificates, transcripts, and official documents.",
		icon: "📄",
		illustration: "/placeholder.svg?height=200&width=300",
	},
	{
		title: "Digital Signatures",
		description:
			"Tamper-proof signing system ensures document authenticity and legal validity with cryptographic verification.",
		icon: "✍️",
		illustration: "/placeholder.svg?height=200&width=300",
	},
	{
		title: "Blockchain Verification",
		description:
			"On-chain registry entries provide immutable proof of document issuance and validation for ultimate security.",
		icon: "⛓️",
		illustration: "/placeholder.svg?height=200&width=300",
	},
	{
		title: "Role-Based Access Control",
		description:
			"Fine-grained permission settings with view-only, download, and time-bound link controls for secure document sharing.",
		icon: "🔐",
		illustration: "/placeholder.svg?height=200&width=300",
	},
];

function LoginPage() {
	const [currentStage, setCurrentStage] = useState(0);
	let { role } = useParams();
	if (!Object.values(ROLES).includes(role)) {
		role = ROLES.USER; // if role invalid or missing, default to "user"
	}

	const { flow } = useUserAuthFlow();
	const fields = getLoginFieldsForRole[role];

	const [formData, setFormData] = useState(
		// maps field[] => formData object with (name, initialValue) pairs
		fields.reduce((accum, curr) => {
			accum[curr.name] = curr.initialValue;
			return accum;
		}, {})
	);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await flow("login", formData);

		if (result?.error) {
			return (
				<ErrorPage
					message="Login Page Error"
					error={result.error}
					fallbackRoute={ROUTES.LOGIN}
				/>
			);
		}
	};
	return (
		<div className="grid min-h-svh w-full lg:grid-cols-2">
			<div
				className="relative hidden bg-muted bg-cover bg-center lg:block"
				style={{ backgroundImage: "url('/assets/login.png')" }}
			>
				<div className="flex h-full flex-col bg-black/60 p-8">
					<div className="mb-8 flex items-center gap-2">
						<div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
							<FolderLock className="size-5" />
						</div>
						<span className="text-2xl font-bold text-white">Archeo</span>
					</div>

					<div className="flex flex-1 items-center justify-center">
						<FeaturePreview
							features={FEATURE_PREVIEWS}
							currentIndex={currentStage}
						/>
					</div>
				</div>
			</div>
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
