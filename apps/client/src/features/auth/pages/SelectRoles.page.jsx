"use client";

import { useState } from "react";
import {
	User,
	Building2,
	Shield,
	FileText,
	Code,
	ArrowRight,
	Check,
	Info,
	Sparkles,
	Zap,
	Star,
	ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ROLES = {
	USER: "USER",
	ISSUER: "ISSUER",
	VERIFIER: "VERIFIER",
	OWNER: "OWNER",
	VERIFIER_API_CONSUMER: "VERIFIER_API_CONSUMER",
};

const roleData = {
	[ROLES.USER]: {
		title: "Base User",
		subtitle: "Essential Foundation",
		description:
			"Your gateway to the platform with essential permissions and security features",
		icon: User,
		features: [
			"Platform access",
			"Basic permissions",
			"Account management",
			"Standard security",
		],
		colorClass: "role-user",
		required: true,
		useCases: ["All users need this role"],
	},
	[ROLES.OWNER]: {
		title: "Document Owner",
		subtitle: "Personal Control",
		description:
			"Take full control of your documents with advanced management and sharing capabilities",
		icon: FileText,
		features: [
			"Personal document vault",
			"Advanced sharing controls",
			"Access management",
			"Privacy settings",
		],
		colorClass: "role-owner",
		popularity: "Most Popular",
		useCases: ["Students", "Professionals", "Job seekers"],
	},
	[ROLES.ISSUER]: {
		title: "Document Issuer",
		subtitle: "Authority & Trust",
		description:
			"Create and certify official documents with institutional authority and digital signatures",
		icon: Building2,
		features: [
			"Document creation",
			"Digital certification",
			"Official signatures",
			"Institutional branding",
		],
		colorClass: "role-issuer",
		popularity: "Professional",
		useCases: ["Universities", "Companies", "Government", "Lawyers"],
	},
	[ROLES.VERIFIER]: {
		title: "Document Verifier",
		subtitle: "Trust & Security",
		description:
			"Verify document authenticity and access shared credentials for institutional purposes",
		icon: Shield,
		features: [
			"Document verification",
			"Authenticity checks",
			"Shared document access",
			"Compliance tools",
		],
		colorClass: "role-verifier",
		popularity: "Enterprise",
		useCases: ["HR departments", "Colleges", "Background checkers"],
	},
	[ROLES.VERIFIER_API_CONSUMER]: {
		title: "API Verifier",
		subtitle: "Developer Power",
		description:
			"Unlock programmatic access with full API capabilities for seamless integrations",
		icon: Code,
		features: [
			"Full API access",
			"Programmatic verification",
			"Third-party integration",
			"Developer tools",
		],
		colorClass: "role-api",
		popularity: "Advanced",
		useCases: ["Developers", "System integrators", "SaaS platforms"],
		dependsOn: ROLES.VERIFIER,
	},
};

const quickPresets = [
	{
		name: "Student Package",
		description: "Perfect for students managing academic credentials",
		roles: [ROLES.USER, ROLES.OWNER],
		icon: "🎓",
	},
	{
		name: "Institution Bundle",
		description: "Complete solution for educational institutions",
		roles: [ROLES.USER, ROLES.ISSUER, ROLES.VERIFIER],
		icon: "🏛️",
	},
	{
		name: "Developer Suite",
		description: "Full access for developers and integrators",
		roles: [ROLES.USER, ROLES.VERIFIER, ROLES.VERIFIER_API_CONSUMER],
		icon: "💻",
	},
];

export default function RolesSelectPage() {
	const [selectedRoles, setSelectedRoles] = useState(new Set([ROLES.USER]));
	const [hoveredRole, setHoveredRole] = useState(null);
	const [step, setStep] = useState(1);
	const [showPresets, setShowPresets] = useState(true);

	const handleRoleToggle = (roleKey) => {
		if (roleKey === ROLES.USER) return;

		const newSelectedRoles = new Set(selectedRoles);

		if (roleKey === ROLES.VERIFIER_API_CONSUMER) {
			// VERIFIER_API_CONSUMER requires VERIFIER
			if (newSelectedRoles.has(roleKey)) {
				newSelectedRoles.delete(roleKey);
			} else {
				newSelectedRoles.add(roleKey);
				newSelectedRoles.add(ROLES.VERIFIER); // Auto-add VERIFIER
			}
		} else if (roleKey === ROLES.VERIFIER) {
			// If removing VERIFIER, also remove VERIFIER_API_CONSUMER
			if (newSelectedRoles.has(roleKey)) {
				newSelectedRoles.delete(roleKey);
				newSelectedRoles.delete(ROLES.VERIFIER_API_CONSUMER);
			} else {
				newSelectedRoles.add(roleKey);
			}
		} else {
			// Regular role toggle
			if (newSelectedRoles.has(roleKey)) {
				newSelectedRoles.delete(roleKey);
			} else {
				newSelectedRoles.add(roleKey);
			}
		}

		setSelectedRoles(newSelectedRoles);
	};

	const handlePresetSelect = (preset) => {
		const newSelectedRoles = new Set(preset.roles);
		setSelectedRoles(newSelectedRoles);
		setStep(2);
		setShowPresets(false);
	};

	const hasRequiredRoles = () => {
		const functionalRoles = [ROLES.OWNER, ROLES.ISSUER, ROLES.VERIFIER];
		return functionalRoles.some((role) => selectedRoles.has(role));
	};

	const handleContinue = () => {
		if (step === 1) {
			setStep(2);
			setShowPresets(false);
		} else {
			if (!hasRequiredRoles()) {
				return; // Don't continue if no functional roles selected
			}
			console.log("Selected roles:", Array.from(selectedRoles));
			// Handle navigation or form submission here
		}
	};

	const handleBackToPresets = () => {
		setStep(1);
		setShowPresets(true);
		setSelectedRoles(new Set([ROLES.USER])); // Reset to base
	};

	const clipPathStyle = {
		clipPath:
			"polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
	};

	const smallClipPathStyle = {
		clipPath:
			"polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
	};

	return (
		<>
			<style jsx="true">{`
				.role-user {
					background: linear-gradient(
						135deg,
						hsl(var(--primary)),
						hsl(var(--primary) / 0.8)
					);
				}
				.role-owner {
					background: linear-gradient(
						135deg,
						hsl(142 76% 36%),
						hsl(142 76% 36% / 0.8)
					);
				}
				.role-issuer {
					background: linear-gradient(
						135deg,
						hsl(262 83% 58%),
						hsl(262 83% 58% / 0.8)
					);
				}
				.role-verifier {
					background: linear-gradient(
						135deg,
						hsl(25 95% 53%),
						hsl(25 95% 53% / 0.8)
					);
				}
				.role-api {
					background: linear-gradient(
						135deg,
						hsl(0 84% 60%),
						hsl(0 84% 60% / 0.8)
					);
				}

				.role-user-bg {
					background-color: hsl(var(--primary) / 0.1);
					border-color: hsl(var(--primary) / 0.2);
				}
				.role-owner-bg {
					background-color: hsl(142 76% 36% / 0.1);
					border-color: hsl(142 76% 36% / 0.2);
				}
				.role-issuer-bg {
					background-color: hsl(262 83% 58% / 0.1);
					border-color: hsl(262 83% 58% / 0.2);
				}
				.role-verifier-bg {
					background-color: hsl(25 95% 53% / 0.1);
					border-color: hsl(25 95% 53% / 0.2);
				}
				.role-api-bg {
					background-color: hsl(0 84% 60% / 0.1);
					border-color: hsl(0 84% 60% / 0.2);
				}

				.role-user-badge {
					background: hsl(var(--primary));
					color: hsl(var(--primary-foreground));
				}
				.role-owner-badge {
					background: hsl(142 76% 36%);
					color: white;
				}
				.role-issuer-badge {
					background: hsl(262 83% 58%);
					color: white;
				}
				.role-verifier-badge {
					background: hsl(25 95% 53%);
					color: white;
				}
				.role-api-badge {
					background: hsl(0 84% 60%);
					color: white;
				}
			`}</style>

			<div className="relative min-h-screen bg-background">
				{/* Progress Indicator */}
				<div className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm">
					<div className="mx-auto max-w-6xl px-6 py-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-4">
								<div className="text-sm font-medium text-muted-foreground">
									Step {step} of 2
								</div>
								<div className="flex gap-2">
									<div
										className={`h-2 w-8 rounded-full ${step >= 1 ? "bg-primary" : "bg-muted"}`}
									></div>
									<div
										className={`h-2 w-8 rounded-full ${step >= 2 ? "bg-primary" : "bg-muted"}`}
									></div>
								</div>
							</div>
							<div className="text-sm text-muted-foreground">
								{selectedRoles.size} role{selectedRoles.size !== 1 ? "s" : ""}{" "}
								selected
							</div>
						</div>
					</div>
				</div>

				<div className="mx-auto max-w-6xl px-6 py-8">
					{/* Header */}
					<div className="mb-12 text-center">
						<div className="mb-4 flex items-center justify-center gap-2">
							<Sparkles className="h-8 w-8 text-primary" />
							<h1 className="text-4xl font-bold text-foreground">
								Choose Your Superpowers
							</h1>
						</div>
						<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
							{step === 1
								? "Start with a quick preset or customize your role selection to match your needs"
								: "Fine-tune your selection or add additional roles for maximum flexibility"}
						</p>
						{step === 2 && (
							<div className="mt-4">
								<Button
									variant="outline"
									onClick={handleBackToPresets}
									className="gap-2 bg-transparent"
								>
									<ArrowLeft className="h-4 w-4" />
									Back to Quick Start Options
								</Button>
							</div>
						)}
					</div>

					{/* Quick Presets */}
					{showPresets && step === 1 && (
						<div className="mb-12">
							<div className="mb-6 text-center">
								<h2 className="mb-2 text-2xl font-semibold text-foreground">
									Quick Start Options
								</h2>
								<p className="text-muted-foreground">
									Choose a preset that matches your use case
								</p>
							</div>
							<div className="mb-8 grid gap-4 md:grid-cols-3">
								{quickPresets.map((preset, index) => (
									<Card
										key={index}
										className="group cursor-pointer border-2 border-dashed border-muted-foreground/30 transition-all duration-300 hover:border-primary hover:shadow-lg"
										style={clipPathStyle}
										onClick={() => handlePresetSelect(preset)}
									>
										<CardContent className="p-6 text-center">
											<div className="mb-3 text-4xl">{preset.icon}</div>
											<h3 className="mb-2 font-semibold text-foreground transition-colors group-hover:text-primary">
												{preset.name}
											</h3>
											<p className="mb-3 text-sm text-muted-foreground">
												{preset.description}
											</p>
											<div className="flex flex-wrap justify-center gap-1">
												{preset.roles.map((role) => (
													<Badge
														key={role}
														variant="secondary"
														className="text-xs"
													>
														{roleData[role].title}
													</Badge>
												))}
											</div>
										</CardContent>
									</Card>
								))}
							</div>
							<div className="text-center">
								<Button
									variant="outline"
									onClick={() => {
										setStep(2);
										setShowPresets(false);
									}}
									className="mb-4"
								>
									Or customize manually
								</Button>
							</div>
						</div>
					)}

					{/* Role Selection Grid */}
					{(!showPresets || step === 2) && (
						<div className="mb-12">
							<div className="mb-8 text-center">
								<h2 className="mb-2 text-2xl font-semibold text-foreground">
									Available Roles
								</h2>
								<p className="text-muted-foreground">
									Select all roles that apply to your use case
								</p>
							</div>
							<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
								{Object.entries(roleData).map(([roleKey, role]) => {
									const IconComponent = role.icon;
									const isSelected = selectedRoles.has(roleKey);
									const isRequired = role.required;
									const isHovered = hoveredRole === roleKey;

									return (
										<Card
											key={roleKey}
											className={`relative transform cursor-pointer border-2 transition-all duration-300 hover:scale-105 ${
												isSelected
													? `border-primary shadow-xl ${role.colorClass}-bg`
													: `border-border hover:border-muted-foreground hover:shadow-lg`
											} ${isRequired ? "ring-2 ring-primary/20" : ""}`}
											style={clipPathStyle}
											onClick={() => handleRoleToggle(roleKey)}
											onMouseEnter={() => setHoveredRole(roleKey)}
											onMouseLeave={() => setHoveredRole(null)}
										>
											<CardContent className="relative overflow-hidden p-6">
												{/* Background Pattern */}
												<div className="absolute inset-0 opacity-5">
													<div className="absolute top-0 right-0 h-32 w-32 rotate-12 transform">
														<IconComponent className="h-full w-full text-muted-foreground" />
													</div>
												</div>

												{/* Selection Indicator */}
												<div className="absolute top-4 right-4 z-10">
													<div
														className={`p-2 transition-all duration-300 ${
															isSelected ? "scale-110 bg-primary" : "bg-muted"
														}`}
														style={smallClipPathStyle}
													>
														{isSelected ? (
															<Check className="h-3 w-3 text-primary-foreground" />
														) : (
															<div className="h-3 w-3"></div>
														)}
													</div>
												</div>

												{/* Badges */}
												<div className="absolute top-4 left-4 flex gap-2">
													{isRequired && (
														<Badge className="bg-primary text-xs text-primary-foreground">
															Required
														</Badge>
													)}
													{role.popularity && (
														<Badge variant="outline" className="text-xs">
															{role.popularity}
														</Badge>
													)}
													{/* Dependency Badge */}
													{roleKey === ROLES.VERIFIER_API_CONSUMER && (
														<Badge
															variant="outline"
															className="bg-card text-xs"
														>
															Requires Verifier
														</Badge>
													)}
												</div>

												<div className="pt-8 text-center">
													{/* Role Icon */}
													<div className="mb-4 flex justify-center">
														<div
															className={`flex h-16 w-16 items-center justify-center ${role.colorClass} transform transition-all duration-300 ${
																isHovered ? "scale-110 rotate-3" : ""
															}`}
															style={clipPathStyle}
														>
															<IconComponent className="h-8 w-8 text-white" />
														</div>
													</div>

													{/* Title & Subtitle */}
													<h3 className="mb-1 text-xl font-bold text-foreground">
														{role.title}
													</h3>
													<p className="mb-3 text-sm font-medium text-primary">
														{role.subtitle}
													</p>

													{/* Description */}
													<p className="mb-4 text-sm leading-relaxed text-muted-foreground">
														{role.description}
													</p>

													{/* Features */}
													<div className="mb-4 space-y-2 text-left">
														{role.features.map((feature, index) => (
															<div
																key={index}
																className="flex items-center gap-2"
															>
																<Zap className="h-3 w-3 flex-shrink-0 text-primary" />
																<span className="text-xs text-foreground">
																	{feature}
																</span>
															</div>
														))}
													</div>

													{/* Use Cases */}
													<div className="text-left">
														<p className="mb-1 text-xs font-medium text-muted-foreground">
															Perfect for:
														</p>
														<div className="flex flex-wrap gap-1">
															{role.useCases.map((useCase, index) => (
																<Badge
																	key={index}
																	variant="secondary"
																	className="text-xs"
																>
																	{useCase}
																</Badge>
															))}
														</div>
													</div>
												</div>
											</CardContent>
										</Card>
									);
								})}
							</div>
						</div>
					)}

					{/* Selected Roles Summary */}
					{selectedRoles.size > 1 && (
						<div className="mb-8">
							<Card
								className="border-primary/20 bg-primary/5"
								style={clipPathStyle}
							>
								<CardContent className="p-6">
									<div className="mb-3 flex items-center gap-2">
										<Star className="h-5 w-5 text-primary" />
										<h3 className="text-lg font-semibold text-foreground">
											Your Selected Roles
										</h3>
									</div>
									<div className="mb-4 flex flex-wrap gap-2">
										{Array.from(selectedRoles).map((roleKey) => {
											const role = roleData[roleKey];
											return (
												<div
													key={roleKey}
													className={`${role.colorClass}-badge flex items-center gap-2 px-3 py-2 text-sm font-medium`}
													style={smallClipPathStyle}
												>
													<role.icon className="h-4 w-4" />
													{role.title}
												</div>
											);
										})}
									</div>
									<p className="text-sm text-muted-foreground">
										You'll have access to all features from these roles. You can
										always modify your roles later.
									</p>
								</CardContent>
							</Card>
						</div>
					)}

					{/* Validation Message */}
					{step === 2 && !hasRequiredRoles() && (
						<div className="mb-6">
							<Card
								className="border-destructive/20 bg-destructive/5"
								style={clipPathStyle}
							>
								<CardContent className="p-4">
									<div className="flex items-center gap-2 text-destructive">
										<Info className="h-5 w-5" />
										<p className="text-sm font-medium">
											Please select at least one functional role (Owner, Issuer,
											or Verifier) in addition to the base User role.
										</p>
									</div>
								</CardContent>
							</Card>
						</div>
					)}

					{/* Continue Button */}
					<div className="text-center">
						<Button
							onClick={handleContinue}
							size="lg"
							disabled={step === 2 && !hasRequiredRoles()}
							className="transform px-12 py-4 text-xl font-medium transition-all duration-300 hover:scale-105"
							style={clipPathStyle}
						>
							<div className="flex items-center justify-center gap-3">
								<span>
									{step === 1
										? "Customize Selection"
										: `Continue with ${selectedRoles.size} Role${selectedRoles.size !== 1 ? "s" : ""}`}
								</span>
								<ArrowRight className="h-5 w-5" />
							</div>
						</Button>
					</div>

					{/* Additional Info */}
					<div className="mt-8 space-y-2 text-center">
						<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
							<Info className="h-4 w-4" />
							<span>You can modify your roles anytime in account settings</span>
						</div>
						<p className="text-xs text-muted-foreground">
							The User role provides essential platform access. You must select
							at least one functional role (Owner, Issuer, or Verifier).
						</p>
						<p className="text-xs text-muted-foreground">
							API Verifier role requires Verifier role and adds programmatic
							access capabilities.
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
