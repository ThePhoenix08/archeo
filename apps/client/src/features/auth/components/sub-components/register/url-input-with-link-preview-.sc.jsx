"use client";
import { useLinkPreview } from "@/hooks/use-link-preview.hook.js";
import { ExternalLink, Globe } from "lucide-react";

const URLInputWithLinkPreview = ({
	value,
	onChange,
	onKeyPress,
	placeholder = "Enter URL",
	className = "",
	disabled = false,
	autoFocus = false,
}) => {
	const { preview, loading, error } = useLinkPreview(value);

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

	return (
		<div className="space-y-4">
			{/* URL Input */}
			<div className="relative">
				<input
					type="url"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					onKeyDown={onKeyPress}
					placeholder={placeholder}
					className={baseInputClasses}
					style={clipPathStyle}
					disabled={disabled}
					autoFocus={autoFocus}
				/>
				<Globe className="absolute top-1/2 right-6 h-6 w-6 -translate-y-1/2 transform text-gray-500" />
			</div>

			{/* Link Preview */}
			{value && (
				<div
					className="border-2 border-gray-200 bg-gray-50 p-4 transition-all duration-200"
					style={clipPathStyle}
				>
					{loading && (
						<div className="flex items-center space-x-2 text-gray-500">
							<div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
							<span>Loading preview...</span>
						</div>
					)}

					{error && (
						<div className="text-sm text-red-500">
							Unable to load preview for this URL
						</div>
					)}

					{preview && !loading && !error && (
						<div className="space-y-3">
							<div className="flex items-start space-x-3">
								{preview.image && (
									<img
										src={preview.image || "/placeholder.svg"}
										alt={preview.title}
										className="h-16 w-16 rounded object-cover"
										onError={(e) => (e.target.style.display = "none")}
									/>
								)}
								<div className="min-w-0 flex-1">
									<h3 className="truncate font-semibold text-gray-900">
										{preview.title || "No title available"}
									</h3>
									<p className="line-clamp-2 text-sm text-gray-600">
										{preview.description || "No description available"}
									</p>
									<div className="mt-1 flex items-center space-x-1">
										<ExternalLink className="h-3 w-3 text-gray-400" />
										<span className="truncate text-xs text-gray-500">
											{preview.domain || new URL(value).hostname}
										</span>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default URLInputWithLinkPreview;
