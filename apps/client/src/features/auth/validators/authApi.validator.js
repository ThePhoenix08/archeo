import { z } from "zod";

// AGENT
export const agentSchema = z.object({
	agentId: z.string().uuid(),
	agentType: z.literal("individual").default("individual"),
});

// INDIVIDUAL
export const individualSchema = z.object({
	// credentials
	userId: z.string().uuid(),
	username: z.string().min(2),
	email: z.string().email(),

	// details
	fullName: z.string().min(2),
	dateOfBirth: z.iso.date(),
	gender: z.enum(["male", "female", "other"]).optional(),
	address: z.string().min(1).optional(),
	phone: z.string().min(10).max(15).optional(),
	avatar: z.string().url().optional(),
	profession: z.string().min(1).optional(),
	bio: z.string().min(1).optional(),

	// meta data
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
	mfaRequired: z.boolean().default(false),
	registerIncomplete: z.boolean().default(false),
	lastLoginAt: z.string().datetime().optional(),
	createdAt: z.string().datetime().optional(),
});

// ORGANIZATION
export const organizationSchema = z.object({
  // credentials
  orgId: z.string().uuid(),
	username: z.string().min(2),
  email: z.string().email(),

  // details
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
  organizationIdNumber: z.string().min(1).optional(),
  purpose: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  logo: z.string().url().optional(),
	
  // contact details
	website: z.string().url().optional(),
  officeAddress: z.array(z.string().min(1)).length(3),
	contactPersonName: z.string().min(1).optional(),
	contactPhone: z.string().min(10).max(15).optional(),
	contactDesignation: z.string().min(1).optional(),
  
  // approval request
  approvalStatus: z.enum(["approved", "pending", "rejected"]),
  approvalDate: z.string().datetime().optional(),
	
  // proof details
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
  proofFileName: z.string().min(1).optional(),
  proofFileUrl: z.string().url().optional(),

  // meta data
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
  mfaRequired: z.boolean().default(false),
  registerIncomplete: z.boolean().default(false),
  lastLoginAt: z.string().datetime().optional(),
  createdAt: z.string().datetime().optional(),
});

// LOGIN: GET /auth/login
export const loginRequestSchema = z.object({
	identifier: z.string().min(1),
	type: z.enum(["email", "username"]),
	password: z.string().min(6), // thoroughly validated at form level
	rememberMe: z.boolean().default(false), // quick login
	loginMethod: z.enum(["password", "google"]).optional(),
});

// TOKEN is added to INDIVIDUAL
export const loginResponseSchema = z.object({
	token: z.string().jwt(),
	user: individualSchema,
	agent: agentSchema.optional(),
	// roleSpecificData: z.object(), // TODO: ADD FIELDS
	// uiSpecificData: z.object(), // TODO: ADD FIELDS
});

// AGENT REGISTER: POST /auth/register
export const agentRegisterRequestSchema = z.object({
	username: z.string().min(1),
	email: z.string().email(),
	password: z.string().min(6),
});

export const agentRegisterResponseSchema = z.object({
	agentId: z.string().uuid(),
});

// INDIVIDUAL REGISTER: POST /auth/register/individual
export const registerIndividualRequestSchema = z.object({
	agentId: z.string().uuid(),
	agentType: z.literal("individual").default("individual"),
	fullName: z.string().min(1),
	dateOfBirth: z.iso.date(),
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
	agent: agentSchema.optional(),
	// roleSpecificData: z.object(), // TODO: ADD FIELDS
	// uiSpecificData: z.object(), // TODO: ADD FIELDS
});

// ORGANIZATION REGISTER: POST /auth/register/organization
export const registerOrganizationRequestSchema = z.object({
	agentId: z.string().uuid(),
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
	agent: agentSchema.optional(),
	// roleSpecificData: z.object(), // TODO: ADD FIELDS
	// uiSpecificData: z.object(), // TODO: ADD FIELDS
});
