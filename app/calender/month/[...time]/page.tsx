"use client";
import React, { useEffect, useState } from "react";
import Month from "@/app/pages/Month";
import { ShiftBlockType } from "@/app/types/ShiftBlockType";
import { NowPageTime } from "@/app/types/NowPageTime";
import { Devices } from "@/app/types/devices";
import { useRouter } from "next/navigation";
import { useSwipeable } from "react-swipeable";

async function getShiftMonthData({
  year,
  month,
  day,
}: NowPageTime): Promise<ShiftBlockType[]> {
  const response = await fetch(`/api/shift/month/${year}/${month}/`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const shiftDayBlocks: ShiftBlockType[] = await response.json();
  // startTimeとendTimeをDateオブジェクトに変換
  shiftDayBlocks.forEach((block) => {
    block.startTime = new Date(block.startTime);
    block.endTime = new Date(block.endTime);
  });

  return shiftDayBlocks;
}

const MonthCalender = ({ params }: { params: { time: number } }) => {
  const router = useRouter();

  const today = new Date();
  let date = new Date(params.time);
  let [year, month, day] = [
    date.getFullYear(),
    date.getMonth() + 1,
    today.getDate(),
  ];
  const nowPageTime: NowPageTime = { year, month, day };

  // 指定可能なデバイス名のリスト
  const deviceNames: string[] = Object.values(Devices).filter(
    (value) => typeof value === "string"
  ) as string[];

  // シフトデータの状態を保持するstate
  const [shiftBlocks, setShiftBlocks] = useState<ShiftBlockType[]>([]);

  useEffect(() => {
    // シフトデータを非同期で取得
    const fetchShiftData = async () => {
      try {
        const data = await getShiftMonthData({ year, month, day });
        setShiftBlocks(data);
      } catch (error) {
        console.error("Error fetching shift data:", error);
      }
    };

    fetchShiftData();
  }, [year, month]); // 空の依存配列で初回レンダリング時に実行

  const handlers = useSwipeable({
    onSwiped: (event) => {
      if (event.dir === "Left") {
        const nextMonth = new Date(year, month, 1);
        console.log("Left");
        console.log("nextMonth", nextMonth);
        nextMonth.setMonth(month); // 次の月に移動
        router.push(
          `/calender/month/${nextMonth.getFullYear()}/${
            nextMonth.getMonth() + 1
          }`
        );
      } else if (event.dir === "Right") {
        const prevMonth = new Date(year, month - 2, 1);
        prevMonth.setMonth(month - 2); // 前の月に移動
        router.push(
          `/calender/month/${prevMonth.getFullYear()}/${
            prevMonth.getMonth() + 1
          }`
        );
      }
    },
    trackMouse: true, // マウス操作でのスワイプを許可
  });

  return (
    <div className="w-screen h-screen" {...handlers}>
      <Month
        shiftBlocks={shiftBlocks}
        nowPageTime={nowPageTime}
        deviceNames={deviceNames}
      />
    </div>
  );
};

export default MonthCalender;
