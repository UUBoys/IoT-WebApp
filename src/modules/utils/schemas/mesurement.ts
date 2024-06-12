import { z } from "zod";

export const measurementSchema = z.object({
  id: z.string(),
  value: z.number(),
  date: z.date(),
});

export type IMesurement = z.infer<typeof measurementSchema>;
