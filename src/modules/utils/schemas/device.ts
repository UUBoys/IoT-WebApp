import { z } from "zod";

export const deviceSchema = z.object({
  id: z.string(),
  image: z.string(),
  name: z.string(),
  description: z.string(),
});

export type IDevice = z.infer<typeof deviceSchema>;
