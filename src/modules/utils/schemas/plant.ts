import { z } from "zod";
import { mesurementSchema } from "./mesurement";

export const plantSchema = z.object({
  id: z.string(),
  imageUrl: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.string(),
  mesurements: z.array(mesurementSchema),
  measurements: z.array(mesurementSchema),
});

export type IPlant = z.infer<typeof plantSchema>;
