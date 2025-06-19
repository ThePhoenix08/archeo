import { ROLES } from "@/shared/constants/roles.constant";
import React, { useState } from "react";
import { useParams } from "react-router";

function LoginPage() {
	const role = useParams();

	if (!Object.values(ROLES).includes(role)) {
		role = ROLES.USER; // if role invalid or missing, default to "user"
	}

	const getFieldsForRoles = () => {
		switch (role) {
			case "issuer":
				return [
					{ name: "username", type: "text", label: "Username", required: true },
					{ name: "email", type: "email", label: "Email", required: true },
					{ name: "password", type: "password", label: "Password", required: true },
				];

			case "user":
				return [
					{ name: "username", type: "text", label: "Username", required: true },
					{ name: "email", type: "email", label: "Email", required: true },
					{ name: "password", type: "password", label: "Password", required: true },
				];

			case "verifier":
				return [
					{ name: "username", type: "text", label: "Username", required: true },
					{ name: "email", type: "email", label: "Email", required: true },
					{ name: "password", type: "password", label: "Password", required: true },
				];

			default:
				return [];
		}
	};

	const fields = getFieldsForRoles();

	return <div>LoginPage</div>;
}

export default LoginPage;
