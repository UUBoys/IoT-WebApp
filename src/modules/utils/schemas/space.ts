import { z } from "zod";

import { deviceSchema } from "./device";

export const spaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  devices: z.array(deviceSchema),
});

export type ISpace = z.infer<typeof spaceSchema>;
