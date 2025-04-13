"use server";
// import { Devices } from "@prisma/client";
// import prisma from "@/lib/prisma";
import { ShiftBlockType } from "../types/ShiftBlockType";

export const overlapUpdateShift = async ({
  results,
}: {
  results: {
    select: ShiftBlockType | undefined;
    unSelect: ShiftBlockType | undefined;
  }[];
}) => {
  // try {
  //   console.log("overlapUpdateShift.results", results);

  //   const updatePromises = results.map((result) => {
  //     const promises = [];

  //     if (result.unSelect && result.select) {
  //       const overlapStart = Math.max(
  //         result.unSelect.startTime.getTime(),
  //         result.select.startTime.getTime()
  //       );
  //       const overlapEnd = Math.min(
  //         result.unSelect.endTime.getTime(),
  //         result.select.endTime.getTime()
  //       );

  //       if (overlapStart < overlapEnd) {
  //         const overlapDuration = overlapEnd - overlapStart;
  //         // 入れ子の状態で親のほうが選択されている場合
  //         if (
  //           result.select.startTime.getTime() <
  //             result.unSelect.startTime.getTime() &&
  //           result.unSelect.endTime.getTime() < result.select.endTime.getTime()
  //         ) {
  //           promises.push(
  //             prisma.shift.delete({
  //               where: {
  //                 id: result.unSelect.id,
  //               },
  //             })
  //           );
  //           promises.push(
  //             prisma.shift.update({
  //               where: {
  //                 id: result.select.id,
  //               },
  //               data: {
  //                 isOverlapShiftId: [],
  //               },
  //             })
  //           );
  //         } else if (
  //           // 入れ子の状態で子のほうが選択されている場合
  //           result.select.startTime.getTime() >
  //             result.unSelect.startTime.getTime() &&
  //           result.unSelect.endTime.getTime() > result.select.endTime.getTime()
  //         ) {
  //           promises.push(
  //             prisma.shift.update({
  //               where: {
  //                 id: result.unSelect.id,
  //               },
  //               data: {
  //                 endTime: result.select.startTime,
  //                 isOverlapShiftId: [],
  //               },
  //             })
  //           );
  //           promises.push(
  //             prisma.shift.create({
  //               data: {
  //                 selectedDevice: result.unSelect.selectedDevice as Devices,
  //                 startTime: result.select.endTime,
  //                 endTime: result.unSelect.endTime,
  //                 isOverlapShiftId: [],
  //                 user: {
  //                   connect: {
  //                     id: result.unSelect.userId,
  //                   },
  //                 },
  //               },
  //             })
  //           );
  //           promises.push(
  //             prisma.shift.update({
  //               where: {
  //                 id: result.select.id,
  //               },
  //               data: {
  //                 isOverlapShiftId: [],
  //               },
  //             })
  //           );
  //         } else if (
  //           // 選択されなかったシフトの開始時刻が選択されたシフトの開始時刻よりも早い場合
  //           result.unSelect.startTime.getTime() <
  //           result.select.startTime.getTime()
  //         ) {
  //           const newEndTime = new Date(
  //             result.unSelect.endTime.getTime() - overlapDuration
  //           );
  //           promises.push(
  //             prisma.shift.update({
  //               where: {
  //                 id: result.unSelect.id,
  //               },
  //               data: {
  //                 endTime: newEndTime,
  //                 isOverlapShiftId: [],
  //               },
  //             })
  //           );
  //           promises.push(
  //             prisma.shift.update({
  //               where: {
  //                 id: result.select.id,
  //               },
  //               data: {
  //                 isOverlapShiftId: [],
  //               },
  //             })
  //           );
  //         } else if (
  //           result.unSelect.startTime.getTime() >
  //           result.select.startTime.getTime()
  //         ) {
  //           // 選択されなかったシフトの開始時刻が選択されたシフトの開始時刻よりも遅い場合
  //           const newStartTime = new Date(
  //             result.unSelect.startTime.getTime() + overlapDuration
  //           );
  //           promises.push(
  //             prisma.shift.update({
  //               where: {
  //                 id: result.unSelect.id,
  //               },
  //               data: {
  //                 startTime: newStartTime,
  //                 isOverlapShiftId: [],
  //               },
  //             })
  //           );
  //           promises.push(
  //             prisma.shift.update({
  //               where: {
  //                 id: result.select.id,
  //               },
  //               data: {
  //                 isOverlapShiftId: [],
  //               },
  //             })
  //           );
  //         }
  //       }
  //     }

  //     return Promise.all(promises); // 各`result`の`promises`を並行実行
  //   });

  //   // すべての更新が完了するのを待つ
  //   await Promise.all(updatePromises);

  //   console.log("Shift updated successfully", updatePromises);

  //   // シフト作成が成功した場合、成功メッセージを返す
  //   return { success: true, shift: updatePromises };
  // } catch (error) {
  //   console.error("Error creating shift:", error);
  //   return { success: false, error: "Error creating shift" };
  // }
};
