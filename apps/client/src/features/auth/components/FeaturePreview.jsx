"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeaturePreview = ({ features, currentIndex }) => {
	const [activeFeature, setActiveFeature] = useState(0);

	// Auto-rotate features every 5 seconds, but sync with form stage
	useEffect(() => {
		setActiveFeature(currentIndex % features.length);
	}, [currentIndex, features.length]);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveFeature((prev) => (prev + 1) % features.length);
		}, 5000);

		return () => clearInterval(interval);
	}, [features.length]);

	const handlePrevious = () => {
		setActiveFeature((prev) => (prev - 1 + features.length) % features.length);
	};

	const handleNext = () => {
		setActiveFeature((prev) => (prev + 1) % features.length);
	};

	const currentFeature = features[activeFeature];

	return (
		<div className="mx-auto max-w-lg text-white">
			<div className="mb-8 text-center">
				<div className="mb-4 text-6xl">{currentFeature.icon}</div>
				<h2 className="mb-4 text-3xl font-bold">{currentFeature.title}</h2>
				<p className="text-lg leading-relaxed text-white/80">
					{currentFeature.description}
				</p>
			</div>

			{/* Feature Illustration */}
			<div className="mb-8 overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm">
				<img
					src={currentFeature.illustration || "/placeholder.svg"}
					alt={currentFeature.title}
					className="h-48 w-full object-cover"
				/>
			</div>

			{/* Navigation */}
			<div className="flex items-center justify-between">
				<Button
					variant="ghost"
					size="sm"
					onClick={handlePrevious}
					className="text-white hover:bg-white/10"
				>
					<ChevronLeft className="mr-1 h-4 w-4" />
					Previous
				</Button>

				{/* Dots Indicator */}
				<div className="flex gap-2">
					{features.map((_, index) => (
						<button
							key={index}
							onClick={() => setActiveFeature(index)}
							className={`h-2 w-2 rounded-full transition-colors ${
								index === activeFeature ? "bg-white" : "bg-white/30"
							}`}
						/>
					))}
				</div>

				<Button
					variant="ghost"
					size="sm"
					onClick={handleNext}
					className="text-white hover:bg-white/10"
				>
					Next
					<ChevronRight className="ml-1 h-4 w-4" />
				</Button>
			</div>
		</div>
	);
};

export default FeaturePreview;
