import { useId } from "react";
import { AtSignIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { CircleUserRound } from "lucide-react";

export default function UserNameInput({
	fieldDetails,
	handleFieldChange,
	value,
	error,
}) {
	const id = useId();
	const { label, required, name, initialValue } = fieldDetails;
	return (
		<div className="*:not-first:mt-2">
			<Label htmlFor={id}>
				<CircleUserRound size={16} />
				{label}
			</Label>
			<div className="relative">
				<Input
					id={id}
					className="peer ps-9"
					placeholder={initialValue}
					type="text"
					required={required}
					name={name}
					value={value}
					onChange={(e) => handleFieldChange(name, e.target.value)}
				/>
				<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
					<AtSignIcon size={16} aria-hidden="true" />
				</div>
			</div>
			{error && <p className="text-xs text-destructive">{error}</p>}
		</div>
	);
}
