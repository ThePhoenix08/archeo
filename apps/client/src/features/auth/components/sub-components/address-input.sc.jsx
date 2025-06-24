("use client");

import { useId } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";

export default function AddressInput({
	fieldDetails,
	handleFieldChange,
	value = ["", "", ""],
	error,
}) {
	const id = useId();
	const { name, required, label, maxLength = 100 } = fieldDetails;

	const handleAddressLineChange = (lineIndex, newValue) => {
		const newAddress = [...value];
		newAddress[lineIndex] = newValue;
		handleFieldChange(name, newAddress);
	};

	const getCharacterCount = (lineIndex) => {
		return value[lineIndex]?.length ?? 0;
	};

	const getPlaceholder = (lineIndex) => {
		const placeholders = [
			"Street Address, Building No., House No.",
			"Area, Locality, Landmark",
			"City, State, PIN Code",
		];
		return placeholders[lineIndex];
	};

	const getLineLabel = (lineIndex) => {
		const labels = ["Address Line 1", "Address Line 2", "Address Line 3"];
		return labels[lineIndex];
	};

	return (
		<div className="space-y-4">
			<Label htmlFor={`${id}-line1`} className="flex items-center gap-2">
				<MapPin size={16} />
				{label}
				{required && <span className="text-destructive">*</span>}
			</Label>

			{/* Address Lines */}
			<div className="space-y-3">
				{[0, 1, 2].map((lineIndex) => (
					<div key={lineIndex} className="space-y-1">
						<Label
							htmlFor={`${id}-line${lineIndex + 1}`}
							className="text-sm font-normal text-muted-foreground"
						>
							{getLineLabel(lineIndex)}
						</Label>
						<div className="relative">
							<Input
								id={`${id}-line${lineIndex + 1}`}
								className="peer pe-14"
								type="text"
								value={value[lineIndex] || ""}
								maxLength={maxLength}
								onChange={(e) =>
									handleAddressLineChange(lineIndex, e.target.value)
								}
								placeholder={getPlaceholder(lineIndex)}
								aria-describedby={`${id}-line${lineIndex + 1}-description`}
							/>
							<div
								id={`${id}-line${lineIndex + 1}-description`}
								className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-xs text-muted-foreground tabular-nums peer-disabled:opacity-50"
								aria-live="polite"
								role="status"
							>
								{getCharacterCount(lineIndex)}/{maxLength}
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Address Preview */}
			{value.some((line) => line.trim().length > 0) && (
				<div className="mt-4 rounded-md border-l-4 border-primary bg-muted/50 p-3">
					<div className="mb-1 text-sm text-muted-foreground">
						Address Preview:
					</div>
					<div className="text-sm">
						{value
							.filter((line) => line.trim().length > 0)
							.map((line, index) => (
								<div key={index}>{line}</div>
							))}
					</div>
				</div>
			)}

			{error && <p className="text-xs text-destructive">{error}</p>}
		</div>
	);
}
