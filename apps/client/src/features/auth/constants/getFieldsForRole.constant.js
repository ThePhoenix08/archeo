/* eslint-disable no-useless-escape */
import { ROLES } from "@/shared/constants/roles.constant.js";

const EMAIL_REGEX =
	/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const ALPHA_NUMERIC_REGEX = /^[A-Za-z0-9\s_-]{2,100}$/;
const OTP_REGEX = /^\d{6}$/;
const ALPHA_REGEX = /^[A-Za-z\s]{2,100}$/;

function validatePasswordDetailed(password) {
	const errors = [];

	if (password.length < 8 || password.length > 128) {
		errors.push("Password must be between 8 and 128 characters.");
	}
	if (!/[A-Z]/.test(password)) {
		errors.push("Must include at least one uppercase letter.");
	}
	if (!/[a-z]/.test(password)) {
		errors.push("Must include at least one lowercase letter.");
	}
	if (!/\d/.test(password)) {
		errors.push("Must include at least one digit.");
	}
	if (!/[@_]/.test(password)) {
		errors.push("Must include at least one special character (@ or _).");
	}
	if (/[^A-Za-z\d@_]/.test(password)) {
		errors.push("Only alphanumeric characters and @ or _ are allowed.");
	}

	return {
		isValid: errors.length === 0,
		errors,
	};
}

function validateDOB(dobString, minAge = 18, maxAge = 100) {
	// Check valid date format (YYYY-MM-DD or ISO)
	const dob = new Date(dobString);
	if (isNaN(dob.getTime())) {
		return { valid: false, reason: "Invalid date format" };
	}

	const today = new Date();
	const age = today.getFullYear() - dob.getFullYear();
	const monthDiff = today.getMonth() - dob.getMonth();
	const dayDiff = today.getDate() - dob.getDate();

	// Adjust age if birthday hasn't occurred yet this year
	const realAge =
		monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;

	if (realAge < minAge) {
		return { valid: false, reason: `Age must be at least ${minAge}` };
	}
	if (realAge > maxAge) {
		return { valid: false, reason: `Age cannot be more than ${maxAge}` };
	}

	return { valid: true, age: realAge };
}

export const getLoginFieldsForRole = {
	[ROLES.USER]: [
		{
			name: "username",
			type: "text",
			label: "Username",
			required: true,
			initialValue: "",
			regex: ALPHA_NUMERIC_REGEX,
			regexError:
				"Username must be 2–100 characters with letters, numbers, spaces, - or _.",
		},
		{
			name: "email",
			type: "email",
			label: "Email",
			required: true,
			initialValue: "",
			regex: EMAIL_REGEX,
			regexError: "Enter a valid email (e.g., user@example.com)",
		},
		{
			name: "password",
			type: "password",
			label: "Password",
			required: true,
			initialValue: "",
			checker: validatePasswordDetailed,
		},
	],
	[ROLES.ISSUER]: [
		{
			name: "org name",
			type: "text",
			label: "Organization Name",
			required: true,
			initialValue: "",
			regex: ALPHA_NUMERIC_REGEX,
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
			checker: validatePasswordDetailed,
		},
	],
	[ROLES.VERIFIER]: [
		{
			name: "verifier username",
			type: "text",
			label: "Verifier Username",
			required: true,
			initialValue: "",
			regex: ALPHA_NUMERIC_REGEX,
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
			checker: validatePasswordDetailed,
		},
	],
};

// Register User
// Basic data: Full Name, Email ID, Date Of Birth
// Auth Creds: Username, Password

export const registerFieldsForUser = {
	username: {
		name: "username",
		type: "text",
		label: "Username",
		required: true,
		initialValue: "",
		regex: ALPHA_NUMERIC_REGEX,
	},
	email: {
		name: "email",
		type: "email",
		label: "Email",
		required: true,
		initialValue: "johndoe",
		regex: EMAIL_REGEX,
	},
	password: {
		name: "password",
		type: "password",
		label: "Password",
		required: true,
		initialValue: "",
		checker: validatePasswordDetailed,
	},
	fullname: {
		name: "fullname",
		type: "text",
		label: "Full Name",
		required: true,
		initialValue: "",
		regex: ALPHA_REGEX,
		maxLength: 35 * 3 + 3,
		minLength: 3,
	},
	dob: {
		name: "dob",
		type: "date",
		label: "Date Of Birth",
		required: true,
		initialValue: "",
		checker: validateDOB,
	},
};

// Register Org
// basic data: org name, type,
// contact info: official email, website?, address
// representative contact: contact person name, designation, official contact number

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
	"Basic Info": {
		orgname: {
			name: "orgname",
			type: "text",
			label: "Organization Name",
			required: true,
			initialValue: "",
			minLength: 2,
			maxLength: 100,
			validation: {
				onlyAlphanumeric: true,
				noConsecutiveSpaces: true,
				noLeadingTrailingSpaces: true,
			},
		},
		orgtype: {
			name: "orgtype",
			type: "select",
			label: "Organization Type",
			required: true,
			initialValue: ORG_TYPES.COM,
			options: ORG_TYPES,
		},
		email: {
			name: "email",
			type: "email",
			label: "Official Email ID",
			required: true,
			initialValue: "email@example.com",
			maxLength: 254,
		},
		password: {
			name: "password",
			type: "password",
			label: "Organization Password",
			required: true,
			initialValue: "",
			checker: validatePasswordDetailed,
			minLength: 8,
			maxLength: 128,
			validation: {
				noConsecutiveSpaces: true,
				noLeadingTrailingSpaces: true,
			},
		},
	},
	"Contact Info": {
		website: {
			name: "website",
			type: "url",
			label: "Organization Website",
			required: false,
			initialValue: "https://www.example.com",
			maxLength: 2048,
		},
		address: {
			name: "address",
			type: "address",
			label: "Organization Address",
			required: false,
			initialValue: [],
			lineCount: 3,
		},
	},
	"Contact Person": {
		contactname: {
			name: "contactname",
			type: "text",
			label: "Contact Person Name",
			required: true,
			initialValue: "",
			minLength: 2,
			maxLength: 50,
			validation: {
				onlyAlphabets: true,
				noConsecutiveSpaces: true,
				noLeadingTrailingSpaces: true,
			},
		},
		designation: {
			name: "designation",
			type: "text",
			label: "Designation",
			required: true,
			initialValue: "",
			minLength: 2,
			maxLength: 100,
			validation: {
				allowedSpecialChars: ".,&()-/",
				noConsecutiveSpaces: true,
				noLeadingTrailingSpaces: true,
			},
		},
		phonenumber: {
			name: "phonenumber",
			type: "phoneNumber",
			label: "Official Contact Number",
			required: true,
			initialValue: "",
		},
	},
	"Verification": {
		prooftype: {
			name: "prooftype",
			type: "select",
			label: "Type of Proof Document",
			required: true,
			options: PROOF_TYPES,
			initialValue: PROOF_TYPES.CIN,
		},
	},
};
