"use client";

import { useId } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FullNameInput({
	fieldDetails,
	handleFieldChange,
	value,
	error,
}) {
	const id = useId();
	const { name, required, label, initialValue, maxLength, minLength } =
		fieldDetails;

	const characterCount = value?.length ?? 0;

	const onChange = (e) => {
		handleFieldChange(name, e.target.value);
	};

	return (
		<div className="*:not-first:mt-2">
			<Label htmlFor={id}>{label}</Label>
			<div className="relative">
				<Input
					id={id}
					className="peer pe-14"
					type="text"
					value={value}
					maxLength={maxLength}
					minLength={minLength}
					onChange={onChange}
					aria-describedby={`${id}-description`}
					name={name}
					required={required}
					placeholder={initialValue}
				/>
				<div
					id={`${id}-description`}
					className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-xs text-muted-foreground tabular-nums peer-disabled:opacity-50"
					aria-live="polite"
					role="status"
				>
					{characterCount}/{maxLength}
				</div>
			</div>
			{error && <p className="text-xs text-destructive">{error}</p>}
		</div>
	);
}
