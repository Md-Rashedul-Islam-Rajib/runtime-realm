import { z } from "zod";

export const blogCreationSchema = z.object({
    title: z.string(),
    content: z.string()
});
export const blogUpdateSchema = z.object({
    title: z.string().optional(),
    content: z.string().optional()
});