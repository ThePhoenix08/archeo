"use client";
import { MapPin } from "lucide-react";

const ThreeLineAddressInputWithPreview = ({
	address1,
	address2,
	address3,
	onAddress1Change,
	onAddress2Change,
	onAddress3Change,
	onKeyPress,
	className = "",
	disabled = false,
}) => {
	const baseInputClasses = `
    w-full border-2 border-gray-300 bg-white px-8 py-6 text-xl 
    transition-all duration-200 hover:border-gray-400 
    focus:border-blue-600 focus:outline-none
    ${className}
  `;

	const clipPathStyle = {
		clipPath:
			"polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
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
				onChange={(e) => onAddress1Change(e.target.value)}
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
				onChange={(e) => onAddress2Change(e.target.value)}
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
				onChange={(e) => onAddress3Change(e.target.value)}
				onKeyDown={onKeyPress}
				placeholder="Address Line 3 (ZIP Code, Country)"
				className={baseInputClasses}
				style={clipPathStyle}
				disabled={disabled}
			/>

			{/* Address Preview */}
			<div
				className="border-2 border-gray-200 bg-gray-50 p-6 transition-all duration-200"
				style={clipPathStyle}
			>
				<div className="flex items-start space-x-3">
					<MapPin className="mt-1 h-6 w-6 flex-shrink-0 text-gray-500" />
					<div className="flex-1">
						<h3 className="mb-2 font-semibold text-gray-900">
							Address Preview
						</h3>
						<p
							className={`text-lg ${address1 || address2 || address3 ? "text-gray-900" : "text-gray-500 italic"}`}
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
