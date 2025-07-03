"use client";

import { useState, useRef, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import CustomCalendar from "@/features/auth/components/sub-components/register/CustomCalender.sc.jsx";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import CustomLabel from "@/features/auth/components/sub-components/register/CustomLabel.sc.jsx";

const DateOfBirthInput = ({
	value,
	onChange,
	onKeyPress,
	placeholder,
	className = "",
	disabled = false,
	autoFocus = false,
	customData,
}) => {
	const { icon, text, name, required } = customData;
	const [isOpen, setIsOpen] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const dropdownRef = useRef(null);

	const baseInputClasses = `
    w-full border-2 border-gray-300 dark:border-gray-700 bg-background px-8 py-6 pr-16 text-xl font-semibold
    transition-all duration-200 hover:border-gray-400 dark:border-gray-600 cursor-pointer
    focus:border-blue-600 dark:focus:border-blue-600 focus:outline-none
    ${className}
  `;

	const clipPathStyle = {
		clipPath:
			"polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		if (value) {
			setInputValue(formatDate(value));
		} else {
			setInputValue("");
		}
	}, [value]);

	const formatDate = (date) => {
		if (!date) return "";
		return date.toLocaleDateString("en-US", {
			day: "2-digit",
			month: "long",
			year: "numeric",
		});
	};

	const parseDate = (dateString) => {
		// Try to parse various date formats
		const date = new Date(dateString);
		return isNaN(date.getTime()) ? null : date;
	};

	const handleDateSelect = (date) => {
		if (date) {
			onChange(date);
			setInputValue(formatDate(date));
			setIsOpen(false);
		}
	};

	const handleInputChange = (e) => {
		const inputValue = e.target.value;
		setInputValue(inputValue);

		// Try to parse the input as a date
		const parsedDate = parseDate(inputValue);
		if (parsedDate) {
			onChange(parsedDate);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter" || e.key === "ArrowDown") {
			e.preventDefault();
			setIsOpen(true);
		}
		if (e.key === "Escape") {
			setIsOpen(false);
		}
		if (onKeyPress) {
			onKeyPress(e);
		}
	};

	const today = new Date();
	const formattedPlaceholder =
		placeholder ||
		`${String(today.getDate()).padStart(2, "0")}-${String(today.getMonth() + 1).padStart(2, "0")}-${today.getFullYear()}`;

	return (
		<div className="space-y-3">
			<CustomLabel text={text} icon={icon} />

			<div className="relative" ref={dropdownRef}>
				{/* Input Field */}
				<Popover>
					<div className="relative">
						<input
							type="text"
							name={name}
							value={inputValue}
							onChange={handleInputChange}
							onKeyDown={handleKeyDown}
							placeholder={formattedPlaceholder}
							className={baseInputClasses}
							style={clipPathStyle}
							disabled={disabled}
							autoFocus={autoFocus}
							onClick={() => setIsOpen(true)}
							required={required}
						/>
						<PopoverTrigger asChild>
							<button
								type="button"
								onClick={() => setIsOpen(!isOpen)}
								className="absolute top-1/2 right-6 -translate-y-1/2 transform text-gray-500 transition-colors hover:text-blue-600"
							>
								<CalendarIcon className="h-6 w-6" />
							</button>
						</PopoverTrigger>
					</div>
					{/* Custom Calendar Dropdown */}
					<PopoverContent className="rounded-none border-none bg-transparent p-0">
						<CustomCalendar
							selected={value}
							onSelect={handleDateSelect}
							onClose={() => setIsOpen(false)}
						/>
					</PopoverContent>
				</Popover>
			</div>

			{/* Helper Text */}
			<div className="px-2 text-sm text-gray-600">
				<p>You can type the date or use the calendar picker</p>
			</div>
		</div>
	);
};

export default DateOfBirthInput;
