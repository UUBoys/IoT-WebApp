import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
});

export const userSessionSchema = z
  .object({
    jwt: z.string().optional(),
    user: userSchema.optional(),
  })
  .optional();

export type IUserSession = z.infer<typeof userSessionSchema>;
export type IUser = z.infer<typeof userSchema>;
