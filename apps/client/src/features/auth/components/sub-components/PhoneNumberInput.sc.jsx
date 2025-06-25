import React, { useId } from "react";
import { ChevronDownIcon, PhoneIcon } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PhoneNumberInput({
	fieldDetails,
	handleFieldChange,
	value,
	error,
}) {
	const id = useId();
	const { label, name, required } = fieldDetails;
	return (
		<div className="*:not-first:mt-2" dir="ltr">
			<Label htmlFor={id}>{label}</Label>
			<RPNInput.default
				className="flex rounded-md shadow-xs"
				international
				flagComponent={FlagComponent}
				countrySelectComponent={CountrySelect}
				inputComponent={PhoneInput}
				id={id}
				placeholder="Enter phone number"
				value={value}
				onChange={(newValue) => handleFieldChange(name, newValue)}
				name={name}
				required={required}
			/>
			{error && <p className="text-sm text-destructive">{error}</p>}
		</div>
	);
}

const PhoneInput = ({ className, ...props }) => {
	return (
		<Input
			data-slot="phone-input"
			className={cn(
				"-ms-px rounded-s-none shadow-none focus-visible:z-10",
				className
			)}
			{...props}
		/>
	);
};

PhoneInput.displayName = "PhoneInput";

const CountrySelect = ({ disabled, value, onChange, options }) => {
	const handleSelect = (event) => {
		onChange(event.target.value);
	};

	return (
		<div className="relative inline-flex items-center self-stretch rounded-s-md border border-input bg-background py-2 ps-3 pe-2 text-muted-foreground transition-[color,box-shadow] outline-none focus-within:z-10 focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 hover:bg-accent hover:text-foreground has-disabled:pointer-events-none has-disabled:opacity-50 has-aria-invalid:border-destructive/60 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40">
			<div className="inline-flex items-center gap-1" aria-hidden="true">
				<FlagComponent country={value} countryName={value} aria-hidden="true" />
				<span className="text-muted-foreground/80">
					<ChevronDownIcon size={16} aria-hidden="true" />
				</span>
			</div>
			<select
				disabled={disabled}
				value={value}
				onChange={handleSelect}
				className="absolute inset-0 text-sm opacity-0"
				aria-label="Select country"
			>
				<option key="default" value="">
					Select a country
				</option>
				{options
					.filter((x) => x.value)
					.map((option, i) => (
						<option key={option.value ?? `empty-${i}`} value={option.value}>
							{option.label}{" "}
							{option.value &&
								`+${RPNInput.getCountryCallingCode(option.value)}`}
						</option>
					))}
			</select>
		</div>
	);
};

const FlagComponent = ({ country, countryName }) => {
	const Flag = flags[country];

	return (
		<span className="w-5 overflow-hidden rounded-sm">
			{Flag ? (
				<Flag title={countryName} />
			) : (
				<PhoneIcon size={16} aria-hidden="true" />
			)}
		</span>
	);
};
