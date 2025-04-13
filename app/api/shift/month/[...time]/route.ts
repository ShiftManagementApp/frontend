import { NextResponse } from "next/server";
// import { ShiftBlockType } from "@/app/types/ShiftBlockType";
// import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { time: string } }
): Promise<NextResponse> {
  /*
  const date = new Date(params.time);
  const [year, month] = [date.getFullYear(), date.getMonth() + 1];

  if (isNaN(year) || isNaN(month)) {
    return NextResponse.json(
      { error: "Invalid year, month, or day" },
      { status: 400 }
    );
  }

  const startDate = new Date(year, month - 1, 1, 0, 0, 0);
  const endDate = new Date(year, month, 0, 23, 59, 59);

  try {
    const shiftMonthData = await prisma.shift.findMany({
      where: {
        startTime: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        id: true,
        selectedDevice: true,
        startTime: true,
        endTime: true,
        isOverlapShiftId: true,
        user: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
    });

    const shiftMonthBlocks: ShiftBlockType[] = shiftMonthData.map((shift) => {
      return {
        id: shift.id,
        userId: shift.user.id,
        name: shift.user.name,
        selectedDevice: shift.selectedDevice,
        startTime: shift.startTime,
        endTime: shift.endTime,
        isOverlapShiftId: Array.isArray(shift.isOverlapShiftId)
          ? (shift.isOverlapShiftId as string[])
          : [],
        color: shift.user.color,
      };
    });

    console.log("shiftMonthBlocks:", shiftMonthBlocks);

    return NextResponse.json(shiftMonthBlocks, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch shifts:", error);
    return NextResponse.json(
      { error: "Failed to fetch shifts" },
      { status: 500 }
    );
  }
  */

  // 👇 ダミーの戻り値（空配列 or メッセージ）
  return NextResponse.json([], { status: 200 });
}
