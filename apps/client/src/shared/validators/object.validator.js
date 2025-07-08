import { z } from "zod";

// INDIVIDUAL
export const individualSchema = z.object({
  // credentials
  userId: z.string().uuid(),
  username: z.string().min(2),
  email: z.string().email(),

  // details
  fullName: z.string().min(2),
  
  dateOfBirth: z.iso.date().optional(),
  avatar: z.string().url().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  address: z.string().min(1).optional(),
  phone: z.string().min(10).max(15).optional(),
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