// custom hook
import { authApi } from "@/features/auth/state/redux-apis/auth.api.js";
import { setCredentials } from "@/features/auth/state/slices/auth.slice.js";
import { ROUTES } from "@/shared/constants/routes.constant.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

// custom hook
export const useOrgAuthFlow = ({ role }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const apiCalls = {
    login: authApi.endpoints.login.initiate,
    register: authApi.endpoints.registerOrganization.initiate,
  }

  const flow = async (type, formData) => {
    try {
      if (!Object.keys(apiCalls).includes(type))
        throw new Error(`No type ${type} flow available for role ${role}.`)
      const apiCall = apiCalls[type];
      const result = await dispatch(apiCall(formData)).unwrap();
      // validate result.user
      dispatch(setCredentials({ ...result.user }));
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      console.error(`[${type.toUpperCase()} ERROR]:`, error);
      return { error: error.message || 'Something went wrong' };
    }
  }

  return { flow };
}