import { z } from "zod";

export const shiftFromSchema = z
  .object({
    selectedDevice: z.string().min(1, {
      message: "デバイス名を入力してください",
    }),
    startTime: z.date(),
    endTime: z.date(),
  })
  .refine((data) => data.startTime < data.endTime, {
    message: "終了時刻は開始時刻より後にしてください",
    path: ["endTime"],
  });
