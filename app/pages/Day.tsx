"use client";

import Header from "../components/day/Header";
import Body from "../components/day/Body";
import InputShiftButton from "../components/day/InputShiftButton";
import { useState } from "react";
import type { ShiftBlockType } from "@/app/types/ShiftBlockType";
import { NowPageTime } from "../types/NowPageTime";

interface DayProps {
  year: number;
  month: number;
  day: number;
  dayOfWeek: string;
  shiftBlocks: ShiftBlockType[];
  deviceNames: string[];
  nowPageTime: NowPageTime;
}

function Day({
  year,
  month,
  day,
  dayOfWeek,
  shiftBlocks,
  deviceNames,
  nowPageTime,
}: DayProps) {
  // 各デバイス名の区切り線のleftとデバイス名を表示するためのwidth
  const [shiftLineLeftAndWidth, setShiftLineLeftAndWidth] = useState<
    { left: number; width: number }[]
  >([...Array(deviceNames.length).fill({ left: 0, width: 0 })]);

  // shiftLineLeftAndWidthのindex番目の要素を更新する
  const updateShiftLineLeftAndWidth = (
    left: number,
    width: number,
    index: number
  ) => {
    setShiftLineLeftAndWidth((prevState) => {
      const updatedArray = [...prevState];
      updatedArray[index] = { left, width };
      // console.log("updatedArray[index]: ", updatedArray[index]);
      return updatedArray;
    });
  };

  return (
    <div className="relative w-full h-full">
      <div className="w-full h-[15vh] ">
        <Header
          shiftLineLeftAndWidth={shiftLineLeftAndWidth}
          deviceNames={deviceNames}
          year={year}
          month={month}
          day={day}
          dayOfWeek={dayOfWeek}
        />
      </div>

      <div className="absolute z-10 w-full h-[85vh] bottom-0">
        <Body
          deviceNames={deviceNames}
          shiftBlocks={shiftBlocks}
          updateShiftLineLeftAndWidth={updateShiftLineLeftAndWidth}
          nowPageTime={nowPageTime}
        />
      </div>
      <div className="absolute z-20  mb-[10vw] mr-[5vw] lg:mt-3 right-0 lg:right-10 bottom-0 lg:top-0">
        <InputShiftButton
          deviceNames={deviceNames}
          dateTime={new Date(year, month - 1, day)}
          nowPageTime={nowPageTime}
          shiftBlocks={shiftBlocks}
        />
      </div>
    </div>
  );
}

export default Day;
