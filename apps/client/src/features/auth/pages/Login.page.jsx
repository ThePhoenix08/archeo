import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";

function LoginPage() {
	const navigate = useNavigate();
	const role = useParams();

	const validRoles = ["issuer", "verifier", "user"];
	if (!validRoles.includes(role)) {
		navigate("/");
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
