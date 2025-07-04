"use client";
import { useState, useRef } from "react";
import { Upload, X, Check } from "lucide-react";

const FileUploadWithPreview = ({
	value,
	onChange,
	onKeyPress,
	placeholder,
	autoFocus,
	customData = {},
}) => {
	const [isDragOver, setIsDragOver] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isUploading, setIsUploading] = useState(false);
	const [uploadedFile, setUploadedFile] = useState(null);
	const [previewUrl, setPreviewUrl] = useState(null);
	const fileInputRef = useRef(null);

	const {
		fileTypes = [".pdf", ".jpg", ".jpeg", ".png"],
		maxSize = "5MB",
		icon,
	} = customData;

	// Helper function to parse max size string to bytes
	const parseMaxSize = (sizeString) => {
		const units = { B: 1, KB: 1024, MB: 1024 * 1024, GB: 1024 * 1024 * 1024 };
		const match = sizeString.match(/^(\d+(?:\.\d+)?)\s*(B|KB|MB|GB)$/i);
		if (!match) return 5 * 1024 * 1024; // Default 5MB
		const [, size, unit] = match;
		return Number.parseFloat(size) * units[unit.toUpperCase()];
	};

	// Format file size for display
	const formatFileSize = (bytes) => {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const sizes = ["Bytes", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return (
			Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
		);
	};

	const handleFileSelect = (file) => {
		if (!file) return;

		// Validate file type
		const fileExtension = "." + file.name.split(".").pop().toLowerCase();
		if (fileTypes.length > 0 && !fileTypes.includes(fileExtension)) {
			alert(
				`Please select a file with one of these extensions: ${fileTypes.join(", ")}`
			);
			return;
		}

		// Validate file size (convert maxSize string to bytes)
		const maxSizeBytes = parseMaxSize(maxSize);
		if (file.size > maxSizeBytes) {
			alert(`File size must be less than ${maxSize}`);
			return;
		}

		// Create preview URL for images
		if (file.type.startsWith("image/")) {
			const url = URL.createObjectURL(file);
			setPreviewUrl(url);
		}

		// Store file information
		setUploadedFile(file);

		// Simulate upload progress
		setIsUploading(true);
		setUploadProgress(0);

		const interval = setInterval(() => {
			setUploadProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					setIsUploading(false);

					// Update form data with file information
					onChange(file.name);

					// You would also set the file type in a real implementation
					// This would typically be handled by a parent component or form state
					if (onChange && typeof onChange === "function") {
						// Simulate setting file type in form data
						// In a real implementation, you'd pass this through props or context
						setTimeout(() => {
							// This would be handled by the parent component
							// formData.fileType = file.type;
							// formData.fileSize = file.size;
						}, 100);
					}

					return 100;
				}
				return prev + Math.random() * 15;
			});
		}, 200);
	};

	const handleDragOver = (e) => {
		e.preventDefault();
		setIsDragOver(true);
	};

	const handleDragLeave = (e) => {
		e.preventDefault();
		setIsDragOver(false);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		setIsDragOver(false);
		const files = e.dataTransfer.files;
		if (files.length > 0) {
			handleFileSelect(files[0]);
		}
	};

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	const handleInputChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			handleFileSelect(file);
		}
	};

	const handleRemoveFile = () => {
		setUploadedFile(null);
		setPreviewUrl(null);
		setUploadProgress(0);
		setIsUploading(false);
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
		}
		onChange("");
		// Reset the file input
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const getFileIcon = (file) => {
		if (file.type.startsWith("image/")) {
			return "🖼️";
		} else if (file.type === "application/pdf") {
			return "📄";
		} else if (file.type.includes("word")) {
			return "📝";
		} else {
			return "📁";
		}
	};

	return (
		<div className="w-full">
			{/* Upload Area */}
			{!uploadedFile && (
				<div
					onClick={handleClick}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
					className={`cursor-pointer rounded-lg border-2 border-dashed p-10 text-center transition-all duration-200 ease-in-out ${
						isDragOver
							? "border-primary bg-primary/10"
							: "border-border bg-muted hover:border-primary hover:bg-primary/10"
					} `}
				>
					<div className="mb-4 flex justify-center text-muted-foreground">
						{icon || <Upload size={48} />}
					</div>
					<p className="mb-1 text-lg font-medium text-foreground">
						{placeholder || "Drop your file here or click to select"}
					</p>
					<p className="m-0 text-sm text-muted-foreground">
						Supported formats: {fileTypes.join(", ")} • Max size: {maxSize}
					</p>
				</div>
			)}

			{/* Hidden File Input */}
			<input
				ref={fileInputRef}
				type="file"
				accept={fileTypes.join(",")}
				onChange={handleInputChange}
				className="hidden"
				autoFocus={autoFocus}
				onKeyPress={onKeyPress}
			/>

			{/* Upload Progress */}
			{isUploading && (
				<div className="mt-4 rounded-lg border border-border bg-card p-4">
					<div className="mb-2 flex items-center">
						<Upload size={20} className="mr-2 text-primary" />
						<span className="text-sm text-card-foreground">Uploading...</span>
					</div>
					<div className="h-1 w-full overflow-hidden rounded-full bg-muted">
						<div
							className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
							style={{ width: `${uploadProgress}%` }}
						/>
					</div>
					<p className="mt-1 text-xs text-muted-foreground">
						{Math.round(uploadProgress)}% complete
					</p>
				</div>
			)}

			{/* File Preview */}
			{uploadedFile && !isUploading && (
				<div className="relative mt-4 rounded-lg border border-border bg-card p-4">
					{/* Success Icon */}
					<div className="absolute top-2 left-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
						<Check size={12} />
					</div>

					{/* Remove Button */}
					<button
						onClick={handleRemoveFile}
						className="absolute top-2 right-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-none bg-destructive text-destructive-foreground transition-colors duration-200 hover:bg-destructive/90"
					>
						<X size={14} />
					</button>

					<div className="mt-4 flex items-center">
						{/* File Preview */}
						<div className="mr-4">
							{previewUrl ? (
								<img
									src={previewUrl || "/placeholder.svg"}
									alt={uploadedFile.name}
									className="h-20 w-20 rounded border border-border object-cover"
								/>
							) : (
								<div className="flex h-20 w-20 items-center justify-center rounded border border-border bg-muted text-3xl">
									{getFileIcon(uploadedFile)}
								</div>
							)}
						</div>

						{/* File Info */}
						<div className="flex-1">
							<p className="mb-1 text-sm font-medium text-card-foreground">
								{uploadedFile.name}
							</p>
							<p className="mb-1 text-xs text-muted-foreground">
								{formatFileSize(uploadedFile.size)}
							</p>
							<p className="text-xs font-medium text-green-600">
								✓ Upload complete
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default FileUploadWithPreview;
