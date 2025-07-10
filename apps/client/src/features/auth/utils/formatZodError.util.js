import { z } from "zod";

export const formatZodError = (error) => {
  return z.prettifyError(error);
};