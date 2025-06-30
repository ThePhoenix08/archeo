import RegisterOrgPage from "@/features/auth/pages/RegisterOrg.page.jsx";
import RegisterUserPage from "@/features/auth/pages/RegisterUser.page.jsx";
import { AGENT_TYPES, AGENT_TYPES_LIST } from "@/shared/constants/roles.constant.js";
import { useParams } from "react-router";

function RegisterPage() {
	let { role } = useParams();
	if (!role || !AGENT_TYPES_LIST.includes(role)) {
		role = AGENT_TYPES.INDIVIDUAL;
	}

	return role === AGENT_TYPES.INDIVIDUAL ? <RegisterUserPage /> : <RegisterOrgPage />;
}
export default RegisterPage;
