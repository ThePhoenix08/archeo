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
	const { label, name, required } = fieldDetails;
	const options = Object.values(fieldDetails.options);
	const [searchValue, setSearchValue] = useState("");

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
								? options.find((option) => option === value)
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
							value={searchValue}
							onValueChange={(value) => setSearchValue(value)}
						/>
						<CommandList>
							<CommandEmpty>{`No ${label} found.`}</CommandEmpty>
							<CommandGroup>
								{options.map((option, index) => {
									return (
										<CommandItem
											key={index}
											value={option}
											onSelect={(currentValue) => {
												handleFieldChange(name, currentValue);
												setSearchValue(currentValue);
												setOpen(false);
											}}
											className={value === option && "border-2 border-primary"}
										>
											{option}
											{value === option && (
												<CheckIcon size={16} className="ml-auto" />
											)}
										</CommandItem>
									);
								})}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			{error && <p className="text-sm text-destructive">{error}</p>}
		</div>
	);
}
