import RegisterOrgPage from "@/features/auth/pages/RegisterOrg.page.jsx";
import UserDetailsPage from "@/features/auth/pages/RegisterUser.page.jsx";
import { AGENT_TYPES, AGENT_TYPES_LIST } from "@/shared/constants/roles.constant.js";
import { useParams } from "react-router";

function AgentDetailsFormPage() {
  let { agentType } = useParams();
  if(!agentType || !AGENT_TYPES_LIST.includes(agentType))
    agentType = AGENT_TYPES.INDIVIDUAL;

  return agentType === AGENT_TYPES.INDIVIDUAL 
    ? <UserDetailsPage/> 
    : <RegisterOrgPage/>;
}
export default AgentDetailsFormPage;
