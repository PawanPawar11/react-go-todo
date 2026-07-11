import { z } from "zod";

export const createTodoSchema = z.object({
  body: z
    .string()
    .trim()
    .min(1, "Task cannot be empty")
    .max(100, "Maximum length is 100 characters"),
});

export type CreateTodoForm = z.infer<typeof createTodoSchema>;
