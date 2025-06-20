/* eslint-disable no-useless-escape */
import { ROLES } from "@/shared/constants/roles.constant.js";

export const EMAIL_REGEX =
	/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
export const URL_REGEX =
	/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
export const PHONE_NUMBER_REGEX =
	/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

export const getLoginFieldsForRole = {
	[ROLES.USER]: [
		{
			name: "username",
			type: "text",
			label: "Username",
			required: true,
			initialValue: "",
		},
		{
			name: "email",
			type: "email",
			label: "Email",
			required: true,
			initialValue: "",
			regex: EMAIL_REGEX,
		},
		{
			name: "password",
			type: "password",
			label: "Password",
			required: true,
			initialValue: "",
		},
	],
	[ROLES.ISSUER]: [
		{
			name: "org name",
			type: "text",
			label: "Organization Name",
			required: true,
			initialValue: "",
		},
		{
			name: "org email",
			type: "email",
			label: "Organization Email",
			required: true,
			initialValue: "",
			regex: EMAIL_REGEX,
		},
		{
			name: "org password",
			type: "password",
			label: "Organization Password",
			required: true,
			initialValue: "",
		},
	],
	[ROLES.VERIFIER]: [
		{
			name: "verifier name",
			type: "text",
			label: "Verifier Name",
			required: true,
			initialValue: "",
		},
		{
			name: "verifier email",
			type: "email",
			label: "Verifier Email",
			required: true,
			initialValue: "",
			regex: EMAIL_REGEX,
		},
		{
			name: "verifier password",
			type: "password",
			label: "Verifier Password",
			required: true,
			initialValue: "",
		},
	],
};

// Register User
// Basic data: Full Name, Email ID, Date Of Birth
// Auth Creds: Username, Password

export const registerFieldsForUser = [
	{
		name: "username",
		type: "text",
		label: "Username",
		required: true,
		initialValue: "",
	},
	{
		name: "email",
		type: "email",
		label: "Email",
		required: true,
		initialValue: "",
		regex: EMAIL_REGEX,
	},
	{
		name: "password",
		type: "password",
		label: "Password",
		required: true,
		initialValue: "",
	},
	{
		name: "fullname",
		type: "text",
		label: "Full Name",
		required: true,
		initialValue: "",
	},
	{
		name: "dob",
		type: "date",
		label: "Date Of Birth",
		required: true,
		initialValue: "",
	},
];

// Register Org
// basic data: org name, type,
// contact info: official email, website?, address
// representative contact: contact person name, designation, official contact number
// proof of legitmacy document upload

const ORG_TYPES = {
	GOV: "Government",
	EDU: "Educational Institution",
	COM: "Commercial Entity",
	NGO: "Non-Governmental Organization",
	HOS: "Hospital / Medical Institution",
	FIN: "Financial Institution",
	LEG: "Legal / Judicial Authority",
	RND: "Research & Development Body",
	REG: "Regulatory Authority",
	MIL: "Military / Defense",
	EMB: "Embassy / Diplomatic Mission",
	LAB: "Accredited Lab / Testing Facility",
	UTL: "Utility / Infrastructure Provider",
	TRN: "Training & Certification Body",
};

const PROOF_TYPES = {
	GST: "GST Certificate",
	CIN: "Company Incorporation Certificate",
	PAN: "Organization PAN Card",
	UDY: "Udyam / MSME Certificate",
	NGO: "NGO Registration Certificate",
	GOV: "Government Issuance Letter",
	LIC: "Operational License",
	TAX: "Tax Registration Document",
	MOU: "MOU with Government Body",
	REG: "Regulatory Registration Certificate",
	INS: "Insurance Certificate",
	LOC: "Letter of Consent / Authorization",
	IDP: "Identity Proof of Authorized Signatory",
	ADD: "Address Proof (Utility Bill, Rent Agreement)",
	BRN: "Business Registration Number Proof",
};

export const registerFieldsForOrg = {
	basic: [
		{
			name: "orgname",
			type: "text",
			label: "Organization Name",
			required: true,
			initialValue: "",
		},
		{
			name: "orgtype",
			type: "select",
			label: "Organization Type",
			required: true,
			initialValue: ORG_TYPES.COM,
			options: ORG_TYPES,
		},
	],
	contactInfo: [
		{
			name: "email",
			type: "email",
			label: "Official Email ID",
			required: true,
			initialValue: "email@example.com",
			regex: EMAIL_REGEX,
		},
		{
			name: "website",
			type: "url",
			label: "Organization Website",
			required: false,
			initialValue: "https://www.example.com",
			regex: URL_REGEX,
		},
		{
			name: "address",
			type: "address",
			label: "Organization Address",
			required: false,
			initialValue: [],
			lineCount: 3,
		},
	],
	contactPersonInfo: [
		{
			name: "contactname",
			type: "text",
			label: "Contact Person Name",
			required: true,
			initialValue: "",
		},
		{
			name: "desgination",
			type: "text",
			label: "Designation",
			required: true,
			initialValue: "",
		},
		{
			name: "phonenumber",
			type: "phoneNumber",
			label: "Official Contact Number",
			required: true,
			initialValue: "",
			regex: PHONE_NUMBER_REGEX,
		},
	],
	proof: [
		{
			name: "proof",
			type: "file",
			label: "Document - Proof Of Legitmacy",
			required: true,
		},
		{
			name: "prooftype",
			type: "select",
			label: "Type of Proof Document",
			required: true,
			options: PROOF_TYPES,
		},
	],
};
