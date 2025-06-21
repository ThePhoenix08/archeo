"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

function formatDate(date) {
	if (!date) {
		return "";
	}

	return date.toLocaleDateString("en-IN", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});
}

function isValidDate(date) {
	if (!date) {
		return false;
	}
	return !isNaN(date.getTime());
}

export default function DateOfBirthInput({
	fieldDetails,
	handleFieldChange,
	value,
}) {
	const [open, setOpen] = useState(false);
	const [date, setDate] = useState(null);
	const [month, setMonth] = useState(date);
	const { name, label, required } = fieldDetails;

	const today = new Date();
	const formattedTodaysDate = `${String(today.getDate()).padStart(2, "0")}-${String(today.getMonth() + 1).padStart(2, "0")}-${today.getFullYear()}`;

	return (
		<div className="flex flex-col gap-3">
			<Label htmlFor="date" className="px-1">
				{label}
			</Label>
			<div className="relative flex gap-2">
				<Input
					id="date"
					value={formatDate(value)}
					name={name}
					required={required}
					placeholder={formattedTodaysDate}
					className="bg-background pr-10"
					onChange={(e) => {
						const date = new Date(e.target.value);
						if (isValidDate(date)) {
							handleFieldChange(name, date);
							setDate(date);
							setMonth(date);
						}
					}}
					onKeyDown={(e) => {
						if (e.key === "ArrowDown") {
							e.preventDefault();
							setOpen(true);
						}
					}}
				/>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							id="date-picker"
							variant="ghost"
							className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
						>
							<CalendarIcon className="size-3.5" />
							<span className="sr-only">Select date</span>
						</Button>
					</PopoverTrigger>
					<PopoverContent
						className="w-auto overflow-hidden p-0"
						align="end"
						alignOffset={-8}
						sideOffset={10}
					>
						<Calendar
							mode="single"
							selected={date}
							captionLayout="dropdown"
							month={month}
							onMonthChange={setMonth}
							onSelect={(date) => {
								if (date) {
									handleFieldChange(name, date);
									setDate(date);
									setOpen(false);
								}
							}}
						/>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}
