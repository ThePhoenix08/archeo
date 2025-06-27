"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Check } from "lucide-react";

const SelectWithSearch = ({
	options = [],
	value,
	onChange,
	placeholder = "Select an option",
	searchPlaceholder = "Search options...",
	className = "",
	disabled = false,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [highlightedIndex, setHighlightedIndex] = useState(-1);
	const dropdownRef = useRef(null);
	const searchInputRef = useRef(null);
	const optionsRef = useRef([]);

	const filteredOptions = options.filter((option) =>
		option.label.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const selectedOption = options.find((option) => option.value === value);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
				setSearchTerm("");
				setHighlightedIndex(-1);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		if (isOpen && searchInputRef.current) {
			searchInputRef.current.focus();
		}
	}, [isOpen]);

	useEffect(() => {
		setHighlightedIndex(-1);
	}, [searchTerm]);

	const baseSelectClasses = `
    w-full border-2 border-gray-300 bg-white px-8 py-6 pr-16 text-xl 
    transition-all duration-200 hover:border-gray-400 cursor-pointer
    focus:border-blue-600 focus:outline-none
    ${className}
  `;

	const clipPathStyle = {
		clipPath:
			"polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
	};

	const handleSelect = (option) => {
		onChange(option.value);
		setIsOpen(false);
		setSearchTerm("");
		setHighlightedIndex(-1);
	};

	const handleKeyDown = (e) => {
		if (!isOpen) return;

		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				setHighlightedIndex((prev) =>
					prev < filteredOptions.length - 1 ? prev + 1 : 0
				);
				break;
			case "ArrowUp":
				e.preventDefault();
				setHighlightedIndex((prev) =>
					prev > 0 ? prev - 1 : filteredOptions.length - 1
				);
				break;
			case "Enter":
				e.preventDefault();
				if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
					handleSelect(filteredOptions[highlightedIndex]);
				}
				break;
			case "Escape":
				setIsOpen(false);
				setSearchTerm("");
				setHighlightedIndex(-1);
				break;
		}
	};

	return (
		<div className="relative" ref={dropdownRef} onKeyDown={handleKeyDown}>
			<div
				onClick={() => !disabled && setIsOpen(!isOpen)}
				className={baseSelectClasses}
				style={clipPathStyle}
			>
				<span className={selectedOption ? "text-black" : "text-gray-500"}>
					{selectedOption ? selectedOption.label : placeholder}
				</span>
				<ChevronDown
					className={`absolute top-1/2 right-6 h-6 w-6 -translate-y-1/2 transform text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
				/>
			</div>

			{isOpen && (
				<div
					className="absolute z-50 mt-2 max-h-60 w-full overflow-hidden border-2 border-gray-300 bg-white shadow-lg"
					style={clipPathStyle}
				>
					{/* Search Input */}
					<div className="border-b border-gray-200 p-4">
						<div className="relative">
							<Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
							<input
								ref={searchInputRef}
								type="text"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								placeholder={searchPlaceholder}
								className="w-full rounded border border-gray-300 py-2 pr-4 pl-10 focus:border-blue-600 focus:outline-none"
							/>
						</div>
					</div>

					{/* Options List */}
					<div className="max-h-40 overflow-y-auto">
						{filteredOptions.length > 0 ? (
							filteredOptions.map((option, index) => (
								<div
									key={option.value}
									ref={(el) => (optionsRef.current[index] = el)}
									onClick={() => handleSelect(option)}
									className={`flex cursor-pointer items-center justify-between px-8 py-4 transition-colors ${
										index === highlightedIndex
											? "bg-blue-50"
											: value === option.value
												? "bg-blue-50"
												: "hover:bg-gray-100"
									} ${value === option.value ? "text-blue-600" : "text-gray-900"}`}
								>
									<span>{option.label}</span>
									{value === option.value && (
										<Check className="h-5 w-5 text-blue-600" />
									)}
								</div>
							))
						) : (
							<div className="px-8 py-4 text-gray-500">No options found</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default SelectWithSearch;
