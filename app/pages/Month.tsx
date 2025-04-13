"use client";
import React from "react";
import MonthlyCalendar from "../components/month/MonthlyCalendar";
import { ShiftBlockType } from "../types/ShiftBlockType";
import { SheetContent, Sheet } from "@/components/ui/sheet";

import InputShiftForm from "@/app/components/day/InputShiftForm";
import { NowPageTime } from "@/app/types/NowPageTime";
import SettingsButton from "../components/calender/SettingsButton";
import InputShiftButton from "../components/day/InputShiftButton";
import UserButton from "../components/day/user-button";

interface MonthProps {
  shiftBlocks: ShiftBlockType[];
  nowPageTime: NowPageTime;
  deviceNames: string[];
}

function Month({ shiftBlocks, nowPageTime, deviceNames }: MonthProps) {
  const [isOpen, setIsOpen] = React.useState(false); // シフト編集シートの開閉状態
  const [clickedBlock, setClickedBlock] = React.useState<ShiftBlockType | null>(
    null
  ); // クリックされたシフトブロック

  const inputShiftDate = () => {
    const today = new Date();
    if (
      nowPageTime.year === today.getFullYear() &&
      nowPageTime.month === today.getMonth() + 1
    ) {
      return new Date(nowPageTime.year, nowPageTime.month - 1, nowPageTime.day);
    }
    return new Date(nowPageTime.year, nowPageTime.month - 1, 1);
  };

  // シフト編集シートを閉じる
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div className="relative w-full h-full">
      <div className="absolute z-20 lg:mt-5">
        <SettingsButton />
      </div>
      <div className="absolute z-10 mt-3 w-full h-full">
        <MonthlyCalendar
          shiftBlocks={shiftBlocks}
          setIsOpen={setIsOpen}
          setClickedBlock={setClickedBlock}
          nowPageTime={nowPageTime}
        />
      </div>
      <div className="absolute z-20 mb-[10vw] mr-[5vw] right-0 bottom-0 lg:mt-3 lg:right-10 lg:top-0">
        <InputShiftButton
          deviceNames={deviceNames}
          dateTime={inputShiftDate()}
          nowPageTime={nowPageTime}
          shiftBlocks={shiftBlocks}
        />
      </div>
      <div className="absolute z-20 right-5 mt-3 lg:right-16 lg:top-2">
        <UserButton />
      </div>
      <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetContent className="w-screen h-[80vh]" side={"bottom"}>
          <InputShiftForm
            id={clickedBlock?.id}
            userId={clickedBlock?.userId}
            deviceNames={deviceNames}
            defaultDeviceName={clickedBlock?.selectedDevice || ""}
            dateTime={clickedBlock?.startTime || new Date()}
            start={clickedBlock?.startTime || new Date()}
            end={clickedBlock?.endTime || new Date()}
            nowPageTime={nowPageTime}
            isEdit={true}
            shiftBlocks={shiftBlocks}
            setIsSheetOpen={handleClose}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Month;
