"use server";
import { z } from "zod";
// import prisma from "@/lib/prisma";
// import { Devices } from "@prisma/client";
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

export const postShift = async ({
  selectedDevice,
  startTime,
  endTime,
  isOverlapShiftId,
  overlapShifts,
}: {
  selectedDevice: ShiftBlockType["selectedDevice"];
  startTime: ShiftBlockType["startTime"];
  endTime: ShiftBlockType["endTime"];
  isOverlapShiftId: ShiftBlockType["isOverlapShiftId"];
  overlapShifts: ShiftBlockType[] | null;
}) => {
  // // バリデーションを実行
  // const validationResult = shiftFromSchema.safeParse({
  //   selectedDevice,
  //   startTime,
  //   endTime,
  // });

  // if (!validationResult.success) {
  //   throw new Error("Validation failed: " + validationResult.error.message);
  // }

  // const session = await getServerSession(nextAuthOptions);

  // if (!session) {
  //   throw new Error("Unauthorized");
  // }

  // const userId = session.user.id;

  // try {
  //   const newShift = await prisma.shift.create({
  //     data: {
  //       selectedDevice: selectedDevice as Devices,
  //       startTime: new Date(startTime),
  //       endTime: new Date(endTime),
  //       isOverlapShiftId: isOverlapShiftId || [],
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
  //       const updatedOverlapShiftId = [
  //         ...((overlapShift.isOverlapShiftId as string[]) || []),
  //         newShift.id,
  //       ];

  //       await prisma.shift.update({
  //         where: { id: overlapShift.id },
  //         data: {
  //           isOverlapShiftId: updatedOverlapShiftId, // 更新された配列を設定
  //         },
  //       });
  //     }
  //   }

  //   console.log("newShift.id:", newShift.id, "overlapShifts", overlapShifts);

  //   // シフト作成が成功した場合、成功メッセージを返す
  //   return { success: true, shift: newShift };
  // } catch (error) {
  //   console.error("Error creating shift:", error);
  // }
};
