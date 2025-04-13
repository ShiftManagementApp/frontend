import React, { useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import InputShiftForm from "./InputShiftForm";
import { ShiftBlockType } from "@/app/types/ShiftBlockType";
import { NowPageTime } from "@/app/types/NowPageTime";

interface UserShiftBlockProps {
  inputtedShiftBlock: ShiftBlockType;
  deviceNames: string[];
  nowPageTime: NowPageTime;
  top: number;
  height: number;
  left: number;
  index: number;
  shiftBlocks: ShiftBlockType[];
}
function UserShiftBlock({
  inputtedShiftBlock,
  deviceNames,
  nowPageTime,
  top,
  height,
  left,
  index,
  shiftBlocks,
}: UserShiftBlockProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger>
        <div
          key={index}
          className="absolute w-full border-2 border-white bg-white rounded-xl text-center text-black"
          style={{
            top: `${top}px`,
            height: `${height}px`,
            left: `${left}px`,
            backgroundColor:
              inputtedShiftBlock.isOverlapShiftId.length > 0
                ? "red"
                : inputtedShiftBlock.color,
          }}
          onClick={() => {
            setIsSheetOpen(true);
          }}
        >
          {inputtedShiftBlock.name}
        </div>
      </SheetTrigger>
      <SheetContent className="w-screen h-[80vh]" side={"bottom"}>
        <InputShiftForm
          key={index}
          id={inputtedShiftBlock.id}
          userId={inputtedShiftBlock.userId}
          deviceNames={deviceNames}
          dateTime={inputtedShiftBlock.startTime}
          start={inputtedShiftBlock.startTime}
          end={inputtedShiftBlock.endTime}
          defaultDeviceName={inputtedShiftBlock.selectedDevice}
          isEdit={true}
          nowPageTime={nowPageTime}
          shiftBlocks={shiftBlocks}
          setIsSheetOpen={setIsSheetOpen}
        />
      </SheetContent>
    </Sheet>
  );
}

export default UserShiftBlock;
