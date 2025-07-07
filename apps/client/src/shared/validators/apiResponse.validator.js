import { z } from "zod";

const apiSuccessSchema = (dataSchema) => z.object({
  success: z.literal(true),
  statusCode: z.number().max(399).min(100),
  message: z.string(),
  data: dataSchema,
});

const apiErrorSchema = z.object({
  success: z.literal(false),
  statusCode: z.number().min(400).max(599),
  message: z.string(),
  errorType: z.string(),
  slug: z.string(),
  errors: z.array(z.string()).optional()
});

export const apiResponseSchema = (dataSchema) => z.discriminatedUnion("success", [
  apiSuccessSchema(dataSchema),
  apiErrorSchema
]);