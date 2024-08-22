import { z } from "zod";

export const NewUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().int().positive(),
});

export type NewUser = z.infer<typeof NewUserSchema>;
