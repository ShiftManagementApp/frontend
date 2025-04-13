import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ToggleChoiceButton from "./ToggleChoiceButton";
import type { ShiftBlockType } from "@/app/types/ShiftBlockType";
import { SelectedIdType } from "@/app/types/SelectedIdType";
import { z } from "zod";
import { overlapUpdateShift } from "@/app/actions/overlapUpdateShiftAction";

interface AdminShiftBlockProps {
  inputtedShiftBlock: ShiftBlockType;
  shiftBlocks: ShiftBlockType[];
  top: number;
  height: number;
  left: number;
  index: number;
}

function AdminShiftBlock({
  inputtedShiftBlock,
  shiftBlocks,
  top,
  height,
  left,
  index,
}: AdminShiftBlockProps) {
  const [selectedIdList, setSelectedIdList] = useState<SelectedIdType[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // selectedIdListの初期化
  useEffect(() => {
    const initialSelectedId = inputtedShiftBlock.isOverlapShiftId.map(
      (overlapId) => {
        return { [inputtedShiftBlock.id]: false, [overlapId]: false };
      }
    ); // inputtedShiftBlockのisOverlapShiftIdの要素数分のオブジェクトを作成. それぞれのkeyはinputtedShiftBlock.idとisOverlapShiftIdの要素
    setSelectedIdList(initialSelectedId);
  }, [inputtedShiftBlock.id, inputtedShiftBlock.isOverlapShiftId]);

  // 決定ボタンがクリックされた時の処理
  const onConfirmClick = async () => {
    console.log("決定", selectedIdList);
    const results = selectedIdList.map((item, index) => {
      const selectedId = Object.keys(item).find((key) => item[key] === true); // 選択されたシフトのID
      const unSelectedId = Object.keys(item).find((key) => item[key] === false); // 選択されなかったシフトのID
      return {
        // 選択されたシフトのIDと同じIDを持つshiftBlocksの要素をselectの値にする
        select: shiftBlocks.find((block) => block.id === selectedId),
        // 選択されなかったシフトのIDと同じIDを持つshiftBlocksの要素をunSelectの値にする
        unSelect: shiftBlocks.find((block) => block.id === unSelectedId),
      };
    });
    // Zodバリデーションスキーマ
    const ResultsSchema = z.array(
      z.object({
        select: z
          .object({
            id: z.string(),
          })
          .nullable(), // nullableにしておくことで、バリデーションの際にnullかどうかをチェック
        unSelect: z
          .object({
            id: z.string(),
          })
          .nullable(),
      })
    );

    const validation = ResultsSchema.safeParse(results);

    if (!validation.success) {
      alert("選択されていない項目があります");
    } else {
      const updatedShift = await overlapUpdateShift({
        results: results,
      });
      setIsSheetOpen(false);
      console.log("results: ", results);
      return updatedShift;
    }
  };

  return (
    <Dialog open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      {inputtedShiftBlock.isOverlapShiftId.length > 0 ? (
        <DialogTrigger>
          <div
            key={index}
            className="absolute w-full border-2 border-white bg-white rounded-xl text-center text-black drop-shadow-md"
            style={{
              top: `${top}px`,
              height: `${height}px`,
              left: `${left}px`,
              backgroundColor: "red", // 背景色が赤の場合
            }}
          >
            {inputtedShiftBlock.name}
          </div>
        </DialogTrigger>
      ) : (
        <div
          key={index}
          className="absolute w-full border-2 border-white bg-white rounded-xl text-center text-black drop-shadow-md"
          style={{
            top: `${top}px`,
            height: `${height}px`,
            left: `${left}px`,
            backgroundColor: inputtedShiftBlock.color, // 背景色が赤でない場合
          }}
        >
          {inputtedShiftBlock.name}
        </div>
      )}

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>どちらのシフトを優先しますか？</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center w-full py-4">
          <ToggleChoiceButton
            shiftBlocks={shiftBlocks}
            myId={inputtedShiftBlock.id}
            myName={inputtedShiftBlock.name}
            myOverlapShiftId={inputtedShiftBlock.isOverlapShiftId}
            selectedIdList={selectedIdList}
            setSelectedIdList={setSelectedIdList}
          />
        </div>
        <DialogFooter className="justify-start px-20">
          <Button
            type="button"
            variant="default"
            className="bg-white text-black font-bold py-2 px-4 rounded hover:bg-black hover:text-white border-2 border-black hover:border"
            onClick={onConfirmClick}
          >
            決定
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AdminShiftBlock;
