"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CustomCalendar = ({ selected, onSelect, onClose }) => {
	const [currentDate, setCurrentDate] = useState(selected || new Date());
	const [viewMode, setViewMode] = useState("days"); // days, months, years

	const clipPathStyle = {
		clipPath:
			"polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
	};

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	const getDaysInMonth = (date) => {
		const year = date.getFullYear();
		const month = date.getMonth();
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const daysInMonth = lastDay.getDate();
		const startingDayOfWeek = firstDay.getDay();

		const days = [];

		// Add empty cells for days before the first day of the month
		for (let i = 0; i < startingDayOfWeek; i++) {
			days.push(null);
		}

		// Add days of the month
		for (let day = 1; day <= daysInMonth; day++) {
			days.push(new Date(year, month, day));
		}

		return days;
	};

	const getYearRange = () => {
		const currentYear = currentDate.getFullYear();
		const startYear = Math.floor(currentYear / 10) * 10;
		const years = [];
		for (let i = startYear; i < startYear + 12; i++) {
			years.push(i);
		}
		return years;
	};

	const navigateMonth = (direction) => {
		const newDate = new Date(currentDate);
		newDate.setMonth(currentDate.getMonth() + direction);
		setCurrentDate(newDate);
	};

	const navigateYear = (direction) => {
		const newDate = new Date(currentDate);
		newDate.setFullYear(currentDate.getFullYear() + direction);
		setCurrentDate(newDate);
	};

	const navigateYearRange = (direction) => {
		const newDate = new Date(currentDate);
		newDate.setFullYear(currentDate.getFullYear() + direction * 10);
		setCurrentDate(newDate);
	};

	const selectDate = (date) => {
		onSelect(date);
		onClose?.();
	};

	const selectMonth = (monthIndex) => {
		const newDate = new Date(currentDate);
		newDate.setMonth(monthIndex);
		setCurrentDate(newDate);
		setViewMode("days");
	};

	const selectYear = (year) => {
		const newDate = new Date(currentDate);
		newDate.setFullYear(year);
		setCurrentDate(newDate);
		setViewMode("months");
	};

	const isToday = (date) => {
		const today = new Date();
		return (
			date &&
			date.getDate() === today.getDate() &&
			date.getMonth() === today.getMonth() &&
			date.getFullYear() === today.getFullYear()
		);
	};

	const isSelected = (date) => {
		return (
			selected &&
			date &&
			date.getDate() === selected.getDate() &&
			date.getMonth() === selected.getMonth() &&
			date.getFullYear() === selected.getFullYear()
		);
	};

	const renderDaysView = () => {
		const days = getDaysInMonth(currentDate);

		return (
			<div className="space-y-4">
				{/* Header */}
				<div className="flex items-center justify-between">
					<button
						onClick={() => navigateMonth(-1)}
						className="p-2 transition-colors hover:bg-gray-100"
						style={clipPathStyle}
					>
						<ChevronLeft className="h-5 w-5 text-gray-600" />
					</button>

					<div className="flex items-center space-x-2">
						<button
							onClick={() => setViewMode("months")}
							className="px-4 py-2 text-lg font-bold text-gray-900 transition-colors hover:bg-gray-100"
							style={clipPathStyle}
						>
							{months[currentDate.getMonth()]}
						</button>
						<button
							onClick={() => setViewMode("years")}
							className="px-4 py-2 text-lg font-bold text-gray-900 transition-colors hover:bg-gray-100"
							style={clipPathStyle}
						>
							{currentDate.getFullYear()}
						</button>
					</div>

					<button
						onClick={() => navigateMonth(1)}
						className="p-2 transition-colors hover:bg-gray-100"
						style={clipPathStyle}
					>
						<ChevronRight className="h-5 w-5 text-gray-600" />
					</button>
				</div>

				{/* Week Days */}
				<div className="grid grid-cols-7 gap-1">
					{weekDays.map((day) => (
						<div
							key={day}
							className="flex h-10 items-center justify-center bg-gray-50 text-sm font-bold text-gray-600"
							style={clipPathStyle}
						>
							{day}
						</div>
					))}
				</div>

				{/* Days Grid */}
				<div className="grid grid-cols-7 gap-1">
					{days.map((date, index) => (
						<button
							key={index}
							onClick={() => date && selectDate(date)}
							disabled={!date}
							className={`flex h-12 items-center justify-center text-sm font-semibold transition-all duration-200 ${!date ? "invisible" : ""} ${
								isSelected(date)
									? "bg-blue-600 text-white shadow-lg"
									: isToday(date)
										? "border-2 border-blue-300 bg-blue-100 text-blue-800"
										: "border-2 border-gray-200 bg-white text-gray-900 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
							} `}
							style={clipPathStyle}
						>
							{date?.getDate()}
						</button>
					))}
				</div>
			</div>
		);
	};

	const renderMonthsView = () => {
		return (
			<div className="space-y-4">
				{/* Header */}
				<div className="flex items-center justify-between">
					<button
						onClick={() => navigateYear(-1)}
						className="p-2 transition-colors hover:bg-gray-100"
						style={clipPathStyle}
					>
						<ChevronLeft className="h-5 w-5 text-gray-600" />
					</button>

					<button
						onClick={() => setViewMode("years")}
						className="px-4 py-2 text-xl font-bold text-gray-900 transition-colors hover:bg-gray-100"
						style={clipPathStyle}
					>
						{currentDate.getFullYear()}
					</button>

					<button
						onClick={() => navigateYear(1)}
						className="p-2 transition-colors hover:bg-gray-100"
						style={clipPathStyle}
					>
						<ChevronRight className="h-5 w-5 text-gray-600" />
					</button>
				</div>

				{/* Months Grid */}
				<div className="grid grid-cols-3 gap-2">
					{months.map((month, index) => (
						<button
							key={month}
							onClick={() => selectMonth(index)}
							className={`flex h-12 items-center justify-center text-sm font-semibold transition-all duration-200 ${
								currentDate.getMonth() === index
									? "bg-blue-600 text-white shadow-lg"
									: "border-2 border-gray-200 bg-white text-gray-900 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
							} `}
							style={clipPathStyle}
						>
							{month.slice(0, 3)}
						</button>
					))}
				</div>
			</div>
		);
	};

	const renderYearsView = () => {
		const years = getYearRange();

		return (
			<div className="space-y-4">
				{/* Header */}
				<div className="flex items-center justify-between">
					<button
						onClick={() => navigateYearRange(-1)}
						className="p-2 transition-colors hover:bg-gray-100"
						style={clipPathStyle}
					>
						<ChevronLeft className="h-5 w-5 text-gray-600" />
					</button>

					<div className="px-4 py-2 text-xl font-bold text-gray-900">
						{years[0]} - {years[years.length - 1]}
					</div>

					<button
						onClick={() => navigateYearRange(1)}
						className="p-2 transition-colors hover:bg-gray-100"
						style={clipPathStyle}
					>
						<ChevronRight className="h-5 w-5 text-gray-600" />
					</button>
				</div>

				{/* Years Grid */}
				<div className="grid grid-cols-3 gap-2">
					{years.map((year) => (
						<button
							key={year}
							onClick={() => selectYear(year)}
							className={`flex h-12 items-center justify-center text-sm font-semibold transition-all duration-200 ${
								currentDate.getFullYear() === year
									? "bg-blue-600 text-white shadow-lg"
									: "border-2 border-gray-200 bg-white text-gray-900 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
							} `}
							style={clipPathStyle}
						>
							{year}
						</button>
					))}
				</div>
			</div>
		);
	};

	return (
		<div
			className="w-80 border-2 border-gray-300 bg-white p-6 shadow-xl"
			style={clipPathStyle}
		>
			{viewMode === "days" && renderDaysView()}
			{viewMode === "months" && renderMonthsView()}
			{viewMode === "years" && renderYearsView()}

			{/* Today Button */}
			<div className="mt-4 border-t border-gray-200 pt-4">
				<button
					onClick={() => selectDate(new Date())}
					className="w-full bg-gray-100 py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-200"
					style={clipPathStyle}
				>
					Today
				</button>
			</div>
		</div>
	);
};

export default CustomCalendar;
