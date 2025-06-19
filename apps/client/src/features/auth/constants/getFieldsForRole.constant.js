import { ROLES } from "@/shared/constants/roles.constant.js";

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
			label: "Organization Name",
			required: true,
			initialValue: "",
		},
		{
			name: "verifier email",
			type: "email",
			label: "Organization Email",
			required: true,
			initialValue: "",
		},
		{
			name: "verifier password",
			type: "password",
			label: "Organization Password",
			required: true,
			initialValue: "",
		},
	],
};

export const getRegisterFieldsForRole = {
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
		},
		{
			name: "password",
			type: "password",
			label: "Password",
			required: true,
			initialValue: "",
		},
	],
};
