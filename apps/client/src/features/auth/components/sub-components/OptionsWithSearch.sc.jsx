"use client";

import { useId, useState } from "react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

// {value, label}

export default function OptionsWithSearch({
	fieldDetails,
	handleFieldChange,
	value,
	error,
}) {
	const id = useId();
	const [open, setOpen] = useState(false);
	const { label, name, required, options } = fieldDetails;

	return (
		<div className="*:not-first:mt-2">
			<Label htmlFor={id}>{label}</Label>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						id={id}
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-full justify-between border-input bg-background px-3 font-normal outline-offset-0 outline-none hover:bg-background focus-visible:outline-[3px]"
					>
						<span className={cn("truncate", !value && "text-muted-foreground")}>
							{value
								? options.find((option) => option.value === value)?.label
								: `Select ${label}`}
						</span>
						<ChevronDownIcon
							size={16}
							className="shrink-0 text-muted-foreground/80"
							aria-hidden="true"
						/>
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0"
					align="start"
				>
					<Command>
						<CommandInput
							placeholder={`Search ${label}...`}
							required={required}
							name={name}
							value={value}
						/>
						<CommandList>
							<CommandEmpty>No framework found.</CommandEmpty>
							<CommandGroup>
								{options.map((option) => (
									<CommandItem
										key={option.value}
										value={option.value}
										onSelect={(currentValue) => {
											handleFieldChange(
												name,
												currentValue === value ? "" : currentValue
											);
											setOpen(false);
										}}
									>
										{option.label}
										{value === option.value && (
											<CheckIcon size={16} className="ml-auto" />
										)}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			{error && <p className="text-sm text-destructive">{error}</p>}
		</div>
	);
}
