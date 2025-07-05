"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import CustomLabel from "@/features/auth/components/sub-components/register/CustomLabel.sc.jsx";

const PhoneNumberInput = ({
	value,
	onChange,
	onKeyPress,
	placeholder = "Enter phone number",
	className = "",
	disabled = false,
	autoFocus = false,
	customData = {},
}) => {
	const [selectedCountry, setSelectedCountry] = useState(countries[0]);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const dropdownRef = useRef(null);
	const { icon, text, name, required } = customData || {};

	const filteredCountries = countries.filter(
		(country) =>
			country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
			country.dialCode.includes(searchTerm)
	);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsDropdownOpen(false);
				setSearchTerm("");
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Auto-detect country code from input
	useEffect(() => {
		if (value && value.startsWith("+")) {
			const matchedCountry = countries.find((country) =>
				value.startsWith(country.dialCode)
			);
			if (
				matchedCountry &&
				matchedCountry.dialCode !== selectedCountry.dialCode
			) {
				setSelectedCountry(matchedCountry);
			}
		}
	}, [value, selectedCountry.dialCode]);

	const baseInputClasses = `
    w-full border-2 border-input bg-background px-8 py-6 text-xl text-foreground
    transition-all duration-200 hover:border-border
    focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20
    disabled:cursor-not-allowed disabled:opacity-50
    ${className}
  `;

	const clipPathStyle = {
		clipPath:
			"polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
	};

	const handleCountrySelect = (country) => {
		setSelectedCountry(country);
		setIsDropdownOpen(false);
		setSearchTerm("");

		// Update the phone number with new country code
		const currentNumber = value.replace(/^\+\d+\s*/, "");
		onChange(`${country.dialCode} ${currentNumber}`.trim());
	};

	const handlePhoneChange = (inputValue) => {
		// If user types a + at the beginning, try to auto-detect country
		if (inputValue.startsWith("+") && inputValue !== value) {
			onChange(inputValue);
		} else {
			// Ensure the country code is always present
			const numberWithoutCode = inputValue
				.replace(selectedCountry.dialCode, "")
				.trim();
			onChange(`${selectedCountry.dialCode} ${numberWithoutCode}`.trim());
		}
	};

	const FlagComponent = ({ country }) => {
		return (
			<span className="flex h-4 w-6 items-center justify-center overflow-hidden rounded-sm text-lg">
				{country.flag}
			</span>
		);
	};

	return (
		<>
			<CustomLabel text={text} icon={icon} />
			<div className="relative" ref={dropdownRef}>
				<div className="flex">
					{/* Country Code Selector */}
					<div
						onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
						className={`flex cursor-pointer items-center space-x-2 border-2 border-r-0 border-input bg-card px-4 py-6 transition-all duration-200 hover:border-border focus:border-ring focus:ring-2 focus:ring-ring/20 ${
							disabled ? "cursor-not-allowed opacity-50" : ""
						}`}
						style={{
							clipPath:
								"polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
						}}
					>
						<FlagComponent country={selectedCountry} />
						<span className="text-lg font-medium text-card-foreground">
							{selectedCountry.dialCode}
						</span>
						<ChevronDown
							className={`h-5 w-5 text-muted-foreground transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
						/>
					</div>
					{/* Phone Number Input */}
					<input
						type="tel"
						value={value.replace(selectedCountry.dialCode, "").trim()}
						onChange={(e) =>
							handlePhoneChange(`${selectedCountry.dialCode} ${e.target.value}`)
						}
						required={required}
						name={name}
						onKeyDown={onKeyPress}
						placeholder={placeholder}
						className={`${baseInputClasses} rounded-l-none border-l-0`}
						style={{
							clipPath:
								"polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
						}}
						disabled={disabled}
						autoFocus={autoFocus}
					/>
				</div>
				{/* Country Dropdown */}
				{isDropdownOpen && (
					<div
						className="absolute z-50 mt-2 max-h-60 w-full overflow-hidden border-2 border-border bg-card shadow-lg"
						style={clipPathStyle}
					>
						{/* Search Input */}
						<div className="border-b border-border p-4">
							<input
								type="text"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								placeholder="Search countries..."
								className="w-full rounded border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 focus:outline-none"
							/>
						</div>
						{/* Countries List */}
						<div className="max-h-40 overflow-y-auto">
							{filteredCountries.length > 0 ? (
								filteredCountries.map((country) => (
									<div
										key={country.code}
										onClick={() => handleCountrySelect(country)}
										className={`flex cursor-pointer items-center space-x-3 px-4 py-3 transition-colors hover:bg-accent hover:text-accent-foreground ${
											selectedCountry.code === country.code
												? "bg-primary/10 text-primary"
												: "text-card-foreground"
										}`}
									>
										<FlagComponent country={country} />
										<span className="text-sm font-medium">
											{country.dialCode}
										</span>
										<span className="flex-1 text-sm">{country.name}</span>
									</div>
								))
							) : (
								<div className="px-4 py-3 text-muted-foreground">
									No countries found
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</>
	);
};

// Enhanced countries data with more countries
export const countries = [
	{ name: "United States", code: "US", dialCode: "+1", flag: "🇺🇸" },
	{ name: "United Kingdom", code: "GB", dialCode: "+44", flag: "🇬🇧" },
	{ name: "Canada", code: "CA", dialCode: "+1", flag: "🇨🇦" },
	{ name: "Australia", code: "AU", dialCode: "+61", flag: "🇦🇺" },
	{ name: "Germany", code: "DE", dialCode: "+49", flag: "🇩🇪" },
	{ name: "France", code: "FR", dialCode: "+33", flag: "🇫🇷" },
	{ name: "Japan", code: "JP", dialCode: "+81", flag: "🇯🇵" },
	{ name: "China", code: "CN", dialCode: "+86", flag: "🇨🇳" },
	{ name: "India", code: "IN", dialCode: "+91", flag: "🇮🇳" },
	{ name: "Brazil", code: "BR", dialCode: "+55", flag: "🇧🇷" },
	{ name: "Mexico", code: "MX", dialCode: "+52", flag: "🇲🇽" },
	{ name: "Spain", code: "ES", dialCode: "+34", flag: "🇪🇸" },
	{ name: "Italy", code: "IT", dialCode: "+39", flag: "🇮🇹" },
	{ name: "Netherlands", code: "NL", dialCode: "+31", flag: "🇳🇱" },
	{ name: "Sweden", code: "SE", dialCode: "+46", flag: "🇸🇪" },
	{ name: "Norway", code: "NO", dialCode: "+47", flag: "🇳🇴" },
	{ name: "Denmark", code: "DK", dialCode: "+45", flag: "🇩🇰" },
	{ name: "Finland", code: "FI", dialCode: "+358", flag: "🇫🇮" },
	{ name: "Switzerland", code: "CH", dialCode: "+41", flag: "🇨🇭" },
	{ name: "Austria", code: "AT", dialCode: "+43", flag: "🇦🇹" },
];

export default PhoneNumberInput;
