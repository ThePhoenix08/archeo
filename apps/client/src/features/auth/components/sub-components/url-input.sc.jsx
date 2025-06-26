"use client";

import { useId, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, AlertCircle } from "lucide-react";
import LinkPreview from "@/features/auth/components/sub-components/link-preview.sc.jsx";

export default function URLInput({
	fieldDetails,
	handleFieldChange,
	value,
	error,
}) {
	const id = useId();
	const { label, name, required, initialValue } = fieldDetails;
	const [isValidUrl, setIsValidUrl] = useState(false);
	const [showPreview, setShowPreview] = useState(false);

	const handleValidation = useCallback((isValid) => {
		setIsValidUrl(isValid);
		setShowPreview(isValid);
	}, []);

	const handleInputChange = (e) => {
		handleFieldChange(e);
		// Reset preview state when input changes
		setShowPreview(false);
		setIsValidUrl(false);
	};

	const getValidationIcon = () => {
		if (!value) return null;
		if (isValidUrl) {
			return <CheckCircle className="h-4 w-4 text-green-500" />;
		}
		if (value && !isValidUrl) {
			return <AlertCircle className="h-4 w-4 text-destructive" />;
		}
		return null;
	};

	return (
		<div className="space-y-3">
			<div>
				<Label htmlFor={id}>{label}</Label>
				<div className="relative mt-2">
					<Input
						id={id}
						placeholder={initialValue || "example.com"}
						type="text"
						required={required}
						name={name}
						value={value}
						onChange={(e) => handleInputChange(name, e.target.value)}
					/>
					<div className="absolute inset-y-0 right-0 flex items-center pr-3">
						{getValidationIcon()}
					</div>
				</div>
				{error && <p className="mt-1 text-sm text-destructive">{error}</p>}
			</div>

			{/* Link Preview */}
			<div className="transition-all duration-200">
				<LinkPreview
					showPreview={showPreview}
					url={value}
					onValidation={handleValidation}
				/>
			</div>
		</div>
	);
}
