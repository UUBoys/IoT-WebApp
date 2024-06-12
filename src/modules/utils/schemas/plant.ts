import { z } from "zod";
import { measurementSchema } from "./mesurement";

export const plantSchema = z.object({
  id: z.string(),
  imageUrl: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.string(),
  isOnline: z.boolean(),
  measurements: z.array(measurementSchema),
});

export type IPlant = z.infer<typeof plantSchema>;
