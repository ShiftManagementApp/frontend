"use server";
// import prisma from "@/lib/prisma";

export const deleteShift = async ({
  shiftId,
}: {
  shiftId: string; // ここで型定義を行います
}) => {
  // try {
  //   const deleteShift = await prisma.shift.delete({
  //     where: {
  //       id: shiftId,
  //     },
  //   });

  //   console.log("Shift deleted successfully", deleteShift);

  //   // シフトの削除が成功した場合、成功メッセージを返す
  //   return { success: true, shift: deleteShift };
  // } catch (error) {
  //   console.error("Error creating shift:", error);
  // }
};
