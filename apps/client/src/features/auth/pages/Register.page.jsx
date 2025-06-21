import RegisterOrgPage from "@/features/auth/pages/RegisterOrg.page.jsx";
import RegisterUserPage from "@/features/auth/pages/RegisterUser.page.jsx";
import { ROLES } from "@/shared/constants/roles.constant.js";
import { useParams } from "react-router";

function RegisterPage() {
	let { role } = useParams();
	if (!role || !Object.values(ROLES).includes(role)) {
		role = ROLES.USER;
	}

	return role == ROLES.USER ? <RegisterUserPage /> : <RegisterOrgPage />;
}
export default RegisterPage;
