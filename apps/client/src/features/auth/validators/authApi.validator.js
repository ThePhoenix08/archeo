import { z } from "zod";

import {
	individualSchema,
	organizationSchema,
} from "@/shared/validators/object.validator.js";

// LOGIN: GET /auth/login
export const loginRequestSchema = z.object({
	identifier: z.string().min(1),
	type: z.enum(["email", "username"]),
	password: z.string().min(6), // thoroughly validated at form level
	rememberMe: z.boolean().default(false),	 // quick login
	loginMethod: z.enum(["password", "google"]).optional(),
});

// TOKEN is added to INDIVIDUAL
export const loginResponseSchema = z.object({
	token: z.string().jwt(),
	user: individualSchema,
	agentType: z.literal("individual").default("individual"),
});

// AGENT REGISTER: POST /auth/register/agent
export const agentRegisterRequestSchema = z.object({
	username: z.string().min(1),
	email: z.string().email(),
	password: z.string().min(6),
});

export const agentRegisterResponseSchema = z.object({
	token: z.string().jwt(),
});

// INDIVIDUAL REGISTER: POST /auth/register/individual
export const registerIndividualRequestSchema = z.object({
	agentType: z.literal("individual").default("individual"),
	fullName: z.string().min(1),
	dateOfBirth: z.coerce.date().optional(), // ✅ works with "YYYY-MM-DD" strings
	roles: z
		.array(
			z.enum([
				"agent",
				"user",
				"owner",
				"issuer",
				"verifier",
				"verifier api consumer",
				"admin",
			])
		)
		.nonempty(),
});

export const registerIndividualResponseSchema = z.object({
	user: individualSchema,
	agentType: z.literal("individual").default("individual"),
});

// ORGANIZATION REGISTER: POST /auth/register/organization
export const registerOrganizationRequestSchema = z.object({
	agentType: z.literal("organization").default("organization"),
	organizationName: z.string().min(1),
	organizationType: z.enum([
		"government",
		"educational institution",
		"commercial entity",
		"non-governmental organization",
		"hospital / medical institution",
		"financial institution",
		"legal / judicial authority",
		"research & development body",
		"regulatory authority",
		"military / defense",
		"embassy / diplomatic mission",
		"accredited lab / testing facility",
		"utility / infrastructure provider",
		"training & certification body",
	]),
	website: z.string().url().optional(),
	officeAddress: z.array(z.string().min(1)).length(3),
	contactPersonName: z.string().min(1).optional(),
	contactPhone: z.string().min(10).max(15).optional(),
	contactDesignation: z.string().min(1).optional(),
	proofDocType: z.enum([
		"GST Certificate",
		"Company Incorporation Certificate",
		"Organization PAN Card",
		"Udyam / MSME Certificate",
		"NGO Registration Certificate",
		"Government Issuance Letter",
		"Operational License",
		"Tax Registration Document",
		"MOU with Government Body",
		"Regulatory Registration Certificate",
		"Insurance Certificate",
		"Letter of Consent / Authorization",
		"Identity Proof of Authorized Signatory",
		"Address Proof (Utility Bill, Rent Agreement)",
		"Business Registration Number Proof",
	]),
	roles: z
		.array(
			z.enum([
				"agent",
				"user",
				"owner",
				"issuer",
				"verifier",
				"verifier api consumer",
				"admin",
			])
		)
		.nonempty(),
});

export const registerOrganizationResponseSchema = z.object({
	user: organizationSchema,
	agentType: z.literal("individual").default("individual"),
});

// REFRESH TOKEN: POST /auth/refresh
export const refreshTokenResponseSchema = z.object({
	token: z.string().jwt(),
});

// REQUEST OTP: POST /auth/otp/send
export const requestForOTPRequestSchema = z.object({
	identifier: z.string().min(1),
	purpose: z.enum(["emailVerification", "passwordReset", "multiFactor"]),
});

export const requestForOTPResponseSchema = z.object({
	verifyToken: z.string().min(1),
});

// VERIFY EMAIL: POST /auth/otp/verify
export const verifyOTPRequestSchema = z.object({
	verifyToken: z.string().min(1),
	code: z.string().length(6),
});

export const verifyOTPResponseSchema = z.object({
	verifyToken: z.string().jwt(),
});

// USERNAME AVAILABILITY: GET /auth/verify/username
export const usernameAvailabilitySchema = z.object({
	username: z.string().min(1),
});

export const usernameAvailabilityResponseSchema = z.object({
	available: z.boolean(),
});
