import { z } from "zod";

export const blogCreationSchema = z.object({
    title: z.string(),
    content: z.string()
});