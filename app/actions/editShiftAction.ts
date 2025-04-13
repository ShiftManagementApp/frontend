"use server";
import { z } from "zod";
// import prisma from "@/lib/prisma";
// import { Devices, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth/next";
// import { nextAuthOptions } from "@/lib/next-auth/options";
import { ShiftBlockType } from "../types/ShiftBlockType";

const shiftFromSchema = z
  .object({
    selectedDevice: z.string().min(1, "デバイス名を入力してください"),
    startTime: z.date(),
    endTime: z.date(),
  })
  .refine((data) => data.startTime < data.endTime, {
    message: "終了時刻は開始時刻より後にしてください",
    path: ["endTime"],
  });

export const editShift = async ({
  userId,
  shiftId,
  selectedDevice,
  startTime,
  endTime,
  isOverlapShiftId,
  overlapShifts,
}: {
  userId: ShiftBlockType["userId"];
  shiftId: ShiftBlockType["id"];
  selectedDevice: ShiftBlockType["selectedDevice"];
  startTime: ShiftBlockType["startTime"];
  endTime: ShiftBlockType["endTime"];
  isOverlapShiftId: ShiftBlockType["isOverlapShiftId"];
  overlapShifts?: ShiftBlockType[] | [];
}) => {
  // const session = await getServerSession(nextAuthOptions);
  // if (!session) {
  //   throw new Error("Unauthorized");
  // }

  // // バリデーションを実行
  // const validationResult = shiftFromSchema.safeParse({
  //   selectedDevice,
  //   startTime,
  //   endTime,
  // });

  // if (!validationResult.success) {
  //   throw new Error("Validation failed: " + validationResult.error.message);
  // }

  // try {
  //   const editShift = await prisma.shift.update({
  //     where: {
  //       id: shiftId,
  //     },
  //     data: {
  //       selectedDevice: selectedDevice as Devices,
  //       startTime: new Date(startTime),
  //       endTime: new Date(endTime),
  //       isOverlapShiftId: isOverlapShiftId.length > 0 ? isOverlapShiftId : [],
  //       user: {
  //         connect: {
  //           id: userId,
  //         },
  //       },
  //     },
  //   });

  //   if (overlapShifts && overlapShifts.length > 0) {
  //     // 重複シフトのisOverlapShiftIdに新しいshiftIdを追加
  //     for (const overlapShift of overlapShifts) {
  //       await prisma.shift.update({
  //         where: { id: overlapShift.id },
  //         data: {
  //           isOverlapShiftId: [
  //             ...((overlapShift.isOverlapShiftId as string[]) || []),
  //             shiftId,
  //           ],
  //         },
  //       });
  //     }
  //   }

  //   console.log(
  //     "Shift updated successfully,editShift",
  //     editShift,
  //     "overlapShifts",
  //     overlapShifts
  //   );

  //   // シフトの編集が成功した場合、成功メッセージを返す
  //   return { success: true, shift: editShift };
  // } catch (error) {
  //   console.error("Error creating shift:", error);
  // }
};
