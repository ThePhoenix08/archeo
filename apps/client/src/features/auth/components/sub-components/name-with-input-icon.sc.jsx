import { useId } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NameInputWithIcon({
	fieldDetails,
	handleFieldChange,
	value,
	error,
	icon,
}) {
	const id = useId();
	const { label, name, required, initialValue } = fieldDetails;
	return (
		<div className="*:not-first:mt-2">
			<Label htmlFor={id}>{label}</Label>
			<div className="relative">
				<Input
					id={id}
					className="peer pe-9"
					placeholder={initialValue}
					type="text"
					required={required}
					name={name}
					value={value}
					onChange={(e) => handleFieldChange(name, e.target.value)}
				/>
				<div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
					{icon}
				</div>
			</div>
			{error && <p className="text-sm text-destructive">{error}</p>}
		</div>
	);
}
