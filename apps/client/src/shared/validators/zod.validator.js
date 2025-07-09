import ErrorPage from "@/shared/pages/Error.page.jsx";
import { z } from "zod";

/** 
 * Validates the object against the zod schema
 * @param {ZodSchema} schema - Zod schema to validate against
 * @param {Object} object - Object to validate
 * @param {String} context - Context of the validation (optional)
 * @returns {Object | JSX.Element} Validated object
 */
export const zodValidator = (schema, object, context = null) => {
	const parsed = schema.safeParse(object);
	if (!parsed.success) {
		const errorMessage = z.prettifyError(parsed.error);
		return (
			<ErrorPage
				error={errorMessage}
				title={`Zod Validation Error in: ${context || "unknown"}`}
			/>
		);
	}
	return parsed.data;
};
