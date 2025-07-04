"use client";

import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { useState, useEffect, useMemo } from "react";
import CustomLabel from "@/features/auth/components/sub-components/register/CustomLabel.sc.jsx";

function formatDate(date) {
	if (!date) {
		return "";
	}
	return date.toLocaleDateString("en-US", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});
}

function isValidDate(date, minDate, maxDate) {
	if (!date || isNaN(date.getTime())) {
		return false;
	}

	if (minDate && date < minDate) {
		return false;
	}

	if (maxDate && date > maxDate) {
		return false;
	}

	return true;
}

function ageToDate(age) {
	const today = new Date();
	const birthDate = new Date(
		today.getFullYear() - age,
		today.getMonth(),
		today.getDate()
	);
	return birthDate;
}

function parseInputDate(inputValue) {
	if (!inputValue) return null;

	// Try different date parsing approaches
	let parsedDate = new Date(inputValue);

	// If direct parsing fails, try other formats
	if (isNaN(parsedDate.getTime())) {
		// Try MM/DD/YYYY format
		const mmddyyyy = inputValue.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
		if (mmddyyyy) {
			parsedDate = new Date(mmddyyyy[3], mmddyyyy[1] - 1, mmddyyyy[2]);
		}

		// Try DD/MM/YYYY format
		const ddmmyyyy = inputValue.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
		if (ddmmyyyy && isNaN(parsedDate.getTime())) {
			parsedDate = new Date(ddmmyyyy[3], ddmmyyyy[2] - 1, ddmmyyyy[1]);
		}
	}

	return isNaN(parsedDate.getTime()) ? null : parsedDate;
}

const baseInputClasses =
	"w-full border-2 border-gray-300 dark:border-gray-700 bg-background px-8 py-6 pr-16 text-xl transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-600 focus:border-blue-600 dark:focus:border-blue-600 focus:outline-none";

const clipPathStyle = {
	clipPath:
		"polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
};

function DateOfBirthDrawer({ value, onChange, customData }) {
	const [open, setOpen] = useState(false);
	const [date, setDate] = useState(null);
	const [month, setMonth] = useState(new Date());

	const {
		icon,
		text,
		name,
		required,
		minAge = 16,
		maxAge = 100,
	} = customData || {};

	// Memoize the date limits to prevent recalculation on every render
	const dateRange = useMemo(() => {
		const maxDate = ageToDate(minAge); // Maximum date (youngest age allowed)
		const minDate = ageToDate(maxAge); // Minimum date (oldest age allowed)
		return { minDate, maxDate };
	}, [minAge, maxAge]);

	// Initialize date from value prop - with proper dependency management
	useEffect(() => {
		if (value) {
			const parsedDate = parseInputDate(value);
			if (
				parsedDate &&
				isValidDate(parsedDate, dateRange.minDate, dateRange.maxDate)
			) {
				// Only update if the date actually changed
				setDate((prevDate) => {
					if (!prevDate || prevDate.getTime() !== parsedDate.getTime()) {
						return parsedDate;
					}
					return prevDate;
				});
				setMonth((prevMonth) => {
					if (!prevMonth || prevMonth.getTime() !== parsedDate.getTime()) {
						return parsedDate;
					}
					return prevMonth;
				});
			}
		} else {
			// Reset state when value is empty
			setDate(null);
		}
	}, [value, dateRange.minDate, dateRange.maxDate]);

	const handleInputChange = (e) => {
		const inputValue = e.target.value;
		onChange(inputValue);

		if (inputValue) {
			const parsedDate = parseInputDate(inputValue);
			if (
				parsedDate &&
				isValidDate(parsedDate, dateRange.minDate, dateRange.maxDate)
			) {
				setDate(parsedDate);
				setMonth(parsedDate);
			}
		}
	};

	const handleDateSelect = (selectedDate) => {
		if (selectedDate) {
			setDate(selectedDate);
			setMonth(selectedDate);
			onChange(formatDate(selectedDate));
			setOpen(false);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "ArrowDown" || e.key === "Enter") {
			e.preventDefault();
			setOpen(true);
		}
	};

	return (
		<div className="flex flex-col gap-3">
			<CustomLabel text={text} icon={icon} />
			<div className="relative flex gap-2">
				<input
					type="text"
					value={value || ""}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					placeholder={dateRange.maxDate.toLocaleDateString("en-US", {
						day: "2-digit",
						month: "long",
						year: "numeric",
					})}
					className={baseInputClasses}
					name={name}
					required={required}
					style={clipPathStyle}
				/>
				<Drawer open={open} onOpenChange={setOpen}>
					<DrawerTrigger asChild>
						<Button
							variant="ghost"
							className="absolute top-1/2 right-8 h-auto -translate-y-1/2 transform p-2 text-gray-500 hover:text-primary"
							style={{
								clipPath:
									"polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
							}}
						>
							<CalendarIcon className="h-5 w-5" />
							<span className="sr-only">Open calendar</span>
						</Button>
					</DrawerTrigger>
					<DrawerContent className="w-auto overflow-hidden p-0">
						<DrawerHeader className="sr-only">
							<DrawerTitle>Select date of birth</DrawerTitle>
							<DrawerDescription>
								Choose your date of birth from the calendar
							</DrawerDescription>
						</DrawerHeader>
						<Calendar
							mode="single"
							selected={date}
							captionLayout="dropdown"
							month={month}
							onMonthChange={setMonth}
							onSelect={handleDateSelect}
							disabled={{
								before: dateRange.minDate,
								after: dateRange.maxDate,
							}}
							initialFocus
							className="mx-auto [--cell-size:clamp(0px,calc(100vw/7.5),52px)]"
						/>
					</DrawerContent>
				</Drawer>
			</div>
		</div>
	);
}

export default DateOfBirthDrawer;
