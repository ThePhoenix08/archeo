"use client";
import { MapPin } from "lucide-react";

const ThreeLineAddressInputWithPreview = ({
	address1,
	address2,
	address3,
	onAddressChange,
	onKeyPress,
	className = "",
	disabled = false,
}) => {
	const baseInputClasses = `
    w-full border-2 border-gray-300 dark:border-gray-700 bg-background px-8 py-6 pr-16 text-xl
    transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-600
    focus:border-blue-600 dark:focus:border-blue-600 focus:outline-none
    ${className}
  `;

	const clipPathStyle = {
		clipPath:
			"polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
	};

	const handleAddressChange = (index, value) => {
		const completeAddress = [address1, address2, address3].filter(
			(part) => part && part.trim()
		);
		completeAddress[index] = value;
		onAddressChange(completeAddress.join(", "));
	};

	const getCompleteAddress = () => {
		const parts = [address1, address2, address3].filter(
			(part) => part && part.trim()
		);
		return parts.join(", ") || "Address will appear here as you type...";
	};

	return (
		<div className="space-y-4">
			{/* Address Line 1 */}
			<input
				type="text"
				value={address1}
				onChange={(e) => handleAddressChange(0, e.target.value)}
				onKeyDown={onKeyPress}
				placeholder="Address Line 1 (Street, House Number)"
				className={baseInputClasses}
				style={clipPathStyle}
				disabled={disabled}
			/>

			{/* Address Line 2 */}
			<input
				type="text"
				value={address2}
				onChange={(e) => handleAddressChange(1, e.target.value)}
				onKeyDown={onKeyPress}
				placeholder="Address Line 2 (City, State)"
				className={baseInputClasses}
				style={clipPathStyle}
				disabled={disabled}
			/>

			{/* Address Line 3 */}
			<input
				type="text"
				value={address3}
				onChange={(e) => handleAddressChange(2, e.target.value)}
				onKeyDown={onKeyPress}
				placeholder="Address Line 3 (ZIP Code, Country)"
				className={baseInputClasses}
				style={clipPathStyle}
				disabled={disabled}
			/>

			{/* Address Preview */}
			<div
				className="border-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-6 transition-all duration-200"
				style={clipPathStyle}
			>
				<div className="flex items-start space-x-3">
					<MapPin className="mt-1 h-6 w-6 flex-shrink-0 text-muted-foreground" />
					<div className="flex-1">
						<h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
							Address Preview
						</h3>
						<p
							className={`text-lg ${address1 || address2 || address3 ? "text-gray-900 dark:text-gray-100" : "text-gray-500 italic"}`}
						>
							{getCompleteAddress()}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ThreeLineAddressInputWithPreview;
