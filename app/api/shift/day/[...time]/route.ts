import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { time: string } }
): Promise<NextResponse> {
  /*
  const date = new Date(params.time);
  console.log("day.route.ts.date:", date);
  const [year, month, day] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ];

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return NextResponse.json(
      { error: "Invalid year, month, or day" },
      { status: 400 }
    );
  }

  const startDate = new Date(year, month - 1, day, 0, 0, 0);
  const endDate = new Date(year, month - 1, day, 23, 59, 59);

  try {
    const shiftDayData = await prisma.shift.findMany({
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

    const shiftDayBlocks: ShiftBlockType[] = shiftDayData.map((shift) => {
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

    console.log("shiftDayBlocks:", shiftDayBlocks);

    return NextResponse.json(shiftDayBlocks, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch shifts:", error);
    return NextResponse.json(
      { error: "Failed to fetch shifts" },
      { status: 500 }
    );
  }
  */

  // 👇 一時的なダミーの戻り値（空配列）
  return NextResponse.json([], { status: 200 });
}
