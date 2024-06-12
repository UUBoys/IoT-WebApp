import { z } from "zod";

import { plantSchema } from "./plant";

export const roomSchema = z.object({
  id: z.string(),
  name: z.string(),
  inviteCode: z.string().optional(),
  plants: z.array(plantSchema),
});

export type IRoom = z.infer<typeof roomSchema>;
