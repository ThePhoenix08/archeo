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