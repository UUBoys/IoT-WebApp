import { z } from "zod";

export const mesurementSchema = z.object({
  id: z.string(),
  value: z.number(),
  date: z.date(),
});

export type IMesurement = z.infer<typeof mesurementSchema>;
