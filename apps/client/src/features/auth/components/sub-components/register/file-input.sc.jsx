"use client";

import { useState, useRef, useCallback } from "react";
import {
	Upload,
	File,
	ImageIcon,
	Music,
	Video,
	Archive,
	ChevronDown,
	Calendar,
	HardDrive,
	CheckCircle,
	AlertCircle,
	Trash2,
	Download,
	Eye,
	FileText,
} from "lucide-react";

const FileInputAccordion = ({
	onFilesChange,
	maxFiles = 10,
	maxFileSize = 10 * 1024 * 1024, // 10MB
	acceptedTypes = ["image/*", "application/pdf", ".doc", ".docx", ".txt"],
	className = "",
	disabled = false,
}) => {
	const [files, setFiles] = useState([]);
	const [isDragOver, setIsDragOver] = useState(false);
	const [expandedFiles, setExpandedFiles] = useState(new Set());
	const [uploadProgress, setUploadProgress] = useState({});
	const fileInputRef = useRef(null);

	const clipPathStyle = {
		clipPath:
			"polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
	};

	const getFileIcon = (fileType) => {
		if (fileType.startsWith("image/")) return ImageIcon;
		if (fileType.startsWith("video/")) return Video;
		if (fileType.startsWith("audio/")) return Music;
		if (fileType.includes("pdf")) return FileText;
		if (fileType.includes("zip") || fileType.includes("rar")) return Archive;
		return File;
	};

	const formatFileSize = (bytes) => {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const sizes = ["Bytes", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return (
			Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
		);
	};

	const generateThumbnail = (file) => {
		return new Promise((resolve) => {
			if (file.type.startsWith("image/")) {
				const reader = new FileReader();
				reader.onload = (e) => resolve(e.target.result);
				reader.readAsDataURL(file);
			} else {
				resolve(null);
			}
		});
	};

	const processFiles = useCallback(
		async (fileList) => {
			const newFiles = [];

			for (let i = 0; i < fileList.length; i++) {
				const file = fileList[i];

				if (file.size > maxFileSize) continue;

				const thumbnail = await generateThumbnail(file);

				const fileData = {
					id: Date.now() + i,
					file,
					name: file.name,
					size: file.size,
					type: file.type,
					thumbnail,
					status: "ready",
					progress: 0,
					uploadedAt: null,
					lastModified: new Date(file.lastModified),
				};

				newFiles.push(fileData);
			}

			const updatedFiles = [...files, ...newFiles].slice(0, maxFiles);
			setFiles(updatedFiles);
			onFilesChange?.(updatedFiles);
		},
		[files, maxFileSize, maxFiles, onFilesChange]
	);

	const handleDragOver = useCallback((e) => {
		e.preventDefault();
		setIsDragOver(true);
	}, []);

	const handleDragLeave = useCallback((e) => {
		e.preventDefault();
		setIsDragOver(false);
	}, []);

	const handleDrop = useCallback(
		(e) => {
			e.preventDefault();
			setIsDragOver(false);

			if (disabled) return;

			const droppedFiles = Array.from(e.dataTransfer.files);
			processFiles(droppedFiles);
		},
		[disabled, processFiles]
	);

	const handleFileSelect = (e) => {
		const selectedFiles = Array.from(e.target.files);
		processFiles(selectedFiles);
		e.target.value = "";
	};

	const removeFile = (fileId) => {
		const updatedFiles = files.filter((file) => file.id !== fileId);
		setFiles(updatedFiles);
		onFilesChange?.(updatedFiles);
		setExpandedFiles((prev) => {
			const newSet = new Set(prev);
			newSet.delete(fileId);
			return newSet;
		});
	};

	const toggleExpanded = (fileId) => {
		setExpandedFiles((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(fileId)) {
				newSet.delete(fileId);
			} else {
				newSet.add(fileId);
			}
			return newSet;
		});
	};

	const simulateUpload = async (fileId) => {
		const fileIndex = files.findIndex((f) => f.id === fileId);
		if (fileIndex === -1) return;

		const updatedFiles = [...files];
		updatedFiles[fileIndex].status = "uploading";
		setFiles(updatedFiles);

		for (let progress = 0; progress <= 100; progress += 10) {
			await new Promise((resolve) => setTimeout(resolve, 200));

			setUploadProgress((prev) => ({
				...prev,
				[fileId]: progress,
			}));

			if (progress === 100) {
				updatedFiles[fileIndex].status = "uploaded";
				updatedFiles[fileIndex].progress = 100;
				updatedFiles[fileIndex].uploadedAt = new Date();
				setFiles([...updatedFiles]);
				onFilesChange?.([...updatedFiles]);
			}
		}
	};

	const FileAccordionCard = ({ fileData }) => {
		const FileIcon = getFileIcon(fileData.type);
		const isImage = fileData.type.startsWith("image/");
		const isExpanded = expandedFiles.has(fileData.id);

		return (
			<div
				className="border-2 border-gray-300 bg-white transition-all duration-200 hover:border-gray-400"
				style={clipPathStyle}
			>
				{/* File Header */}
				<div
					className="cursor-pointer p-6"
					onClick={() => toggleExpanded(fileData.id)}
				>
					<div className="flex items-center space-x-4">
						{/* Thumbnail or Icon */}
						<div className="flex-shrink-0">
							{isImage && fileData.thumbnail ? (
								<img
									src={fileData.thumbnail || "/placeholder.svg"}
									alt={fileData.name}
									className="h-12 w-12 rounded object-cover"
									style={{
										clipPath:
											"polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
									}}
								/>
							) : (
								<div
									className="flex h-12 w-12 items-center justify-center bg-gray-100"
									style={{
										clipPath:
											"polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
									}}
								>
									<FileIcon className="h-6 w-6 text-gray-500" />
								</div>
							)}
						</div>

						{/* File Info */}
						<div className="min-w-0 flex-1">
							<div className="flex items-center justify-between">
								<h3 className="truncate text-lg font-semibold text-gray-900">
									{fileData.name}
								</h3>
								<div className="ml-4 flex items-center space-x-2">
									{/* Status Indicator */}
									{fileData.status === "uploaded" && (
										<CheckCircle className="h-5 w-5 text-green-600" />
									)}
									{fileData.status === "error" && (
										<AlertCircle className="h-5 w-5 text-red-600" />
									)}
									{fileData.status === "uploading" && (
										<div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
									)}

									{/* Expand/Collapse Icon */}
									<ChevronDown
										className={`h-5 w-5 text-gray-500 transition-transform ${isExpanded ? "rotate-180" : ""}`}
									/>
								</div>
							</div>

							<div className="mt-1 flex items-center space-x-4 text-sm text-gray-600">
								<span>{formatFileSize(fileData.size)}</span>
								<span className="capitalize">
									{fileData.type.split("/")[0]}
								</span>
								<span
									className={`rounded px-2 py-1 text-xs font-medium ${
										fileData.status === "ready"
											? "bg-gray-100 text-gray-700"
											: fileData.status === "uploading"
												? "bg-blue-100 text-blue-700"
												: fileData.status === "uploaded"
													? "bg-green-100 text-green-700"
													: "bg-red-100 text-red-700"
									}`}
								>
									{fileData.status === "ready"
										? "Ready"
										: fileData.status === "uploading"
											? `${uploadProgress[fileData.id] || 0}%`
											: fileData.status === "uploaded"
												? "Uploaded"
												: "Error"}
								</span>
							</div>

							{/* Progress Bar */}
							{fileData.status === "uploading" && (
								<div className="mt-2">
									<div className="h-1.5 w-full rounded-full bg-gray-200">
										<div
											className="h-1.5 rounded-full bg-blue-600 transition-all duration-300"
											style={{ width: `${uploadProgress[fileData.id] || 0}%` }}
										/>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Expanded Content */}
				{isExpanded && (
					<div className="border-t border-gray-200 bg-gray-50 p-6">
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							{/* File Details */}
							<div className="space-y-4">
								<h4 className="mb-3 font-semibold text-gray-900">
									File Details
								</h4>

								<div className="space-y-3 text-sm">
									<div className="flex items-center space-x-3">
										<File className="h-4 w-4 text-gray-500" />
										<span className="text-gray-600">Name:</span>
										<span className="font-medium text-gray-900">
											{fileData.name}
										</span>
									</div>

									<div className="flex items-center space-x-3">
										<HardDrive className="h-4 w-4 text-gray-500" />
										<span className="text-gray-600">Size:</span>
										<span className="font-medium text-gray-900">
											{formatFileSize(fileData.size)}
										</span>
									</div>

									<div className="flex items-center space-x-3">
										<FileText className="h-4 w-4 text-gray-500" />
										<span className="text-gray-600">Type:</span>
										<span className="font-medium text-gray-900">
											{fileData.type}
										</span>
									</div>

									<div className="flex items-center space-x-3">
										<Calendar className="h-4 w-4 text-gray-500" />
										<span className="text-gray-600">Modified:</span>
										<span className="font-medium text-gray-900">
											{fileData.lastModified.toLocaleDateString()}
										</span>
									</div>

									{fileData.uploadedAt && (
										<div className="flex items-center space-x-3">
											<CheckCircle className="h-4 w-4 text-green-500" />
											<span className="text-gray-600">Uploaded:</span>
											<span className="font-medium text-gray-900">
												{fileData.uploadedAt.toLocaleString()}
											</span>
										</div>
									)}
								</div>
							</div>

							{/* Preview and Actions */}
							<div className="space-y-4">
								<h4 className="mb-3 font-semibold text-gray-900">
									Preview & Actions
								</h4>

								{/* Large Preview */}
								{isImage && fileData.thumbnail && (
									<div className="mb-4">
										<img
											src={fileData.thumbnail || "/placeholder.svg"}
											alt={fileData.name}
											className="h-32 w-full rounded object-cover"
											style={{
												clipPath:
													"polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
											}}
										/>
									</div>
								)}

								{/* Action Buttons */}
								<div className="flex flex-wrap gap-2">
									{fileData.status === "ready" && (
										<button
											onClick={(e) => {
												e.stopPropagation();
												simulateUpload(fileData.id);
											}}
											className="bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
											style={{
												clipPath:
													"polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))",
											}}
										>
											<Upload className="mr-1 inline h-4 w-4" />
											Upload
										</button>
									)}

									{isImage && fileData.thumbnail && (
										<button
											onClick={(e) => {
												e.stopPropagation();
												window.open(fileData.thumbnail, "_blank");
											}}
											className="border-2 border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
											style={{
												clipPath:
													"polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))",
											}}
										>
											<Eye className="mr-1 inline h-4 w-4" />
											Preview
										</button>
									)}

									<button
										onClick={(e) => {
											e.stopPropagation();
											const url = URL.createObjectURL(fileData.file);
											const a = document.createElement("a");
											a.href = url;
											a.download = fileData.name;
											a.click();
											URL.revokeObjectURL(url);
										}}
										className="border-2 border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
										style={{
											clipPath:
												"polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))",
										}}
									>
										<Download className="mr-1 inline h-4 w-4" />
										Download
									</button>

									<button
										onClick={(e) => {
											e.stopPropagation();
											removeFile(fileData.id);
										}}
										className="border-2 border-red-300 px-3 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-50"
										style={{
											clipPath:
												"polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))",
										}}
									>
										<Trash2 className="mr-1 inline h-4 w-4" />
										Remove
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	};

	return (
		<div className={`space-y-6 ${className}`}>
			{/* Drag and Drop Zone */}
			<div
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				onClick={() => !disabled && fileInputRef.current?.click()}
				className={`relative cursor-pointer border-2 border-dashed transition-all duration-200 ${isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"} ${disabled ? "cursor-not-allowed opacity-50" : ""} bg-white p-12 text-center`}
				style={clipPathStyle}
			>
				<input
					ref={fileInputRef}
					type="file"
					multiple
					accept={acceptedTypes.join(",")}
					onChange={handleFileSelect}
					className="hidden"
					disabled={disabled}
				/>

				<div className="space-y-4">
					<div
						className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
							isDragOver ? "bg-blue-100" : "bg-gray-100"
						}`}
					>
						<Upload
							className={`h-8 w-8 ${isDragOver ? "text-blue-600" : "text-gray-500"}`}
						/>
					</div>

					<div>
						<h3 className="mb-2 text-xl font-semibold text-gray-900">
							{isDragOver ? "Drop files here" : "Upload Files"}
						</h3>
						<p className="mb-4 text-gray-600">
							Drag and drop files here, or click to select files
						</p>
						<div className="space-y-1 text-sm text-gray-500">
							<p>
								Maximum {maxFiles} files • Maximum {formatFileSize(maxFileSize)}{" "}
								per file
							</p>
							<p>Supported: {acceptedTypes.join(", ")}</p>
						</div>
					</div>
				</div>
			</div>

			{/* File Accordion List */}
			{files.length > 0 && (
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h3 className="text-xl font-semibold text-gray-900">
							Files ({files.length})
						</h3>
						<div className="flex items-center space-x-4 text-sm text-gray-600">
							<span>
								{files.filter((f) => f.status === "uploaded").length} uploaded
							</span>
							<span>
								{files.filter((f) => f.status === "ready").length} pending
							</span>
						</div>
					</div>

					<div className="space-y-3">
						{files.map((fileData) => (
							<FileAccordionCard key={fileData.id} fileData={fileData} />
						))}
					</div>

					{/* Bulk Actions */}
					<div className="flex items-center justify-between border-t border-gray-200 pt-4">
						<div className="text-sm text-gray-600">
							Total:{" "}
							{formatFileSize(files.reduce((sum, file) => sum + file.size, 0))}
						</div>

						<div className="flex space-x-3">
							<button
								onClick={() => {
									files
										.filter((f) => f.status === "ready")
										.forEach((f) => simulateUpload(f.id));
								}}
								disabled={!files.some((f) => f.status === "ready")}
								className="bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
								style={{
									clipPath:
										"polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
								}}
							>
								Upload All
							</button>

							<button
								onClick={() =>
									setExpandedFiles((prev) =>
										prev.size === files.length
											? new Set()
											: new Set(files.map((f) => f.id))
									)
								}
								className="border-2 border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
								style={{
									clipPath:
										"polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
								}}
							>
								{expandedFiles.size === files.length
									? "Collapse All"
									: "Expand All"}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default FileInputAccordion;
