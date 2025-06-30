import { useRegisterMutation } from "@/features/auth/actions/authApi.action.js";
import { setCredentials } from "@/features/auth/reducer/authSlice.reducer.js";
import { ROUTES } from "@/shared/routing/routes.constant.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useLoginMutation } from "@/features/auth/actions/authApi.action.js";
import { toast, Bounce } from "react-toastify";

// custom hook
export const useUserAuthFlow = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [login, loginResult] = useLoginMutation();
	const [register, registerResult] = useRegisterMutation();

	//👉🏻loginResult or registerResult contains the following properties:
	// isLoading: true while the mutation is in progress.
	// isSuccess: true if the mutation was successful.
	// isError: true if there was an error.
	// error: error object (if any).
	// data: the response from the server (if successful).
	// status: "uninitialized", "pending", "fulfilled", or "rejected"

	const flow = async (type, formData) => {
		try {
			let fn, resultMeta;

			if (type === "login") {
				fn = login;
				resultMeta = loginResult;
			} else if (type === "register") {
				fn = register;
				resultMeta = registerResult;
			} else {
				throw new Error(`No type ${type} flow available for role user.`);
			}

			const result = await fn(formData).unwrap();
			console.log({ result, resultMeta });
			dispatch(setCredentials(result));
			navigate(ROUTES.DASHBOARD);
			toast.success(
				`${type === "login" ? "Login" : "Registration"} successful!`,
				{
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: true,
					draggable: false,
					progress: undefined,
					theme: "dark",
					transition: Bounce,
				}
			);
		} catch (error) {
			console.error(`[${type.toUpperCase()} ERROR]:`, error);
			return { error: error.message || "Something went wrong" };
		}
	};

	return { flow };
};
// auth flow notes
// login / register link click
// User Agent Operations > 1. Basic Credentials Form open
	// if login:
		// form
			// username
			// email
			// password
			// OAuth option: Sign In
		// after submit flow:
			// validate formData
			// send formData on /auth/login route
				// if success redirect
				// if failure show error
	// if register:
		// form
			// username
			// email
			// password
			// OAuth option: Sign Up
		// after submit flow:
			// validate formData
			// send formData on /auth/registerAgent
				// if failure error quit, if success next
			// ask "Individual" or "Organization"
				// if Individual:
					// form:
						// fullname
						// date of birth
						// phone number
					// after submit flow:
						// validate formData
						// store formData for next step
				// if Organization:
					// form:
						// basic details: orgname, orgtype, org official phone no, office address, org website URL (optional)
						// contact details: contact person name,  contact mobile no, contact designation
						// document proof
					// after submit flow:
						// validate new formData
						// combine formData with older formData stored from last step
						// store formData for next step
			// ROLES questions:
				// form:
					// ISSUER: 'Will you be issuing documents to users?',
					// VERIFIER: 'Will you be verifying user documents?',
					// OWNER: 'Will you be managing document ownership and access?',
					// VERIFIER_API: 'Do you need API access for document verification?'
				// after submit flow:
					// validate formData
					// combine form data with last step's formdata
					// finally send formData on /auth/register/:agentType, :agentType = ENUM["individual", "organization"]
						// if success, log in to ROUTES.DASHBOARD
						// if failure, show error or redirect to error page

