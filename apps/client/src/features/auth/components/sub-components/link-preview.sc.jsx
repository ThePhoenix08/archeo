"use client";

import { useState, useEffect } from "react";
import { ExternalLink, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function LinkPreview({ showPreview, url, onValidation }) {
	const [previewData, setPreviewData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!url || !isValidUrl(url) || !showPreview) {
			setPreviewData(null);
			setError(null);
			onValidation?.(false);
			return;
		}

		const fetchPreviewData = async () => {
			setLoading(true);
			setError(null);

			try {
				// In a real app, you'd call your backend API that fetches the metadata
				// For demo purposes, we'll simulate this with mock data
				await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

				const domain = new URL(url).hostname;

				// Mock data - in reality this would come from your API
				const mockData = {
					title: `${domain.charAt(0).toUpperCase() + domain.slice(1)} - Welcome`,
					description: `This is a preview of ${domain}. In a real implementation, this would show the actual meta description from the website.`,
					image: `/placeholder.svg?height=200&width=400`,
					favicon: `/placeholder.svg?height=32&width=32`,
					domain: domain,
				};

				setPreviewData(mockData);
				onValidation?.(true);
			} catch (err) {
				setError("Failed to fetch link preview");
				console.log("Link Preview Fetch error: ", err);
				onValidation?.(false);
			} finally {
				setLoading(false);
			}
		};

		fetchPreviewData();
	}, [url, onValidation, showPreview]);

	const isValidUrl = (string) => {
		try {
			const url = new URL(
				string.startsWith("http") ? string : `https://${string}`
			);
			return url.protocol === "http:" || url.protocol === "https:";
		} catch {
			return false;
		}
	};

	const handleClick = () => {
		if (previewData && url) {
			const fullUrl = url.startsWith("http") ? url : `https://${url}`;
			window.open(fullUrl, "_blank", "noopener,noreferrer");
		}
	};

	if (!url || !isValidUrl(url)) {
		return null;
	}

	if (loading) {
		return (
			<Card className="w-full">
				<CardContent className="p-4">
					<div className="flex space-x-4">
						<Skeleton className="h-20 w-20 rounded-md" />
						<div className="flex-1 space-y-2">
							<Skeleton className="h-4 w-3/4" />
							<Skeleton className="h-3 w-full" />
							<Skeleton className="h-3 w-2/3" />
							<Skeleton className="h-3 w-1/2" />
						</div>
					</div>
				</CardContent>
			</Card>
		);
	}

	if (error) {
		return (
			<Card className="w-full border-destructive/50">
				<CardContent className="p-4">
					<div className="flex items-center space-x-2 text-destructive">
						<Globe className="h-4 w-4" />
						<span className="text-sm">{error}</span>
					</div>
				</CardContent>
			</Card>
		);
	}

	if (!previewData) {
		return null;
	}

	return (
		<Card
			className="w-full cursor-pointer transition-all hover:shadow-md"
			onClick={handleClick}
		>
			<CardContent className="p-4">
				<div className="flex space-x-4">
					{previewData.image && (
						<div className="flex-shrink-0">
							<img
								src={previewData.image || "/placeholder.svg"}
								alt="Link preview"
								className="h-20 w-20 rounded-md object-cover"
								onError={(e) => {
									e.currentTarget.style.display = "none";
								}}
							/>
						</div>
					)}
					<div className="min-w-0 flex-1">
						<div className="flex items-start justify-between">
							<div className="min-w-0 flex-1">
								<h3 className="mb-1 line-clamp-2 text-sm font-semibold">
									{previewData.title}
								</h3>
								<p className="mb-2 line-clamp-2 text-xs text-muted-foreground">
									{previewData.description}
								</p>
								<div className="flex items-center space-x-2">
									{previewData.favicon && (
										<img
											src={previewData.favicon || "/placeholder.svg"}
											alt="Favicon"
											className="h-4 w-4"
											onError={(e) => {
												e.currentTarget.style.display = "none";
											}}
										/>
									)}
									<Badge variant="secondary" className="text-xs">
										{previewData.domain}
									</Badge>
								</div>
							</div>
							<Button variant="ghost" size="sm" className="ml-2 flex-shrink-0">
								<ExternalLink className="h-3 w-3" />
							</Button>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
