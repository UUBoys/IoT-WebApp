import { z } from "zod";

import { plantSchema } from "./device";

export const roomSchema = z.object({
  id: z.string(),
  name: z.string(),
  plants: z.array(plantSchema),
});

export type IRoom = z.infer<typeof roomSchema>;
