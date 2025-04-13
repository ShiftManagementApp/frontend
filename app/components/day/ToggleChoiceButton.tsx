import { ShiftBlockType } from "@/app/types/ShiftBlockType";
import React, { useEffect } from "react";
import { SelectedIdType } from "@/app/types/SelectedIdType";

// カスタムボタンコンポーネント
type CustomButtonProps = {
  label: string;
  isSelected: boolean;
  onClick: () => void;
};
const CustomButton = ({ label, isSelected, onClick }: CustomButtonProps) => {
  return (
    <button
      className={`${isSelected ? "bg-black" : "bg-white"} ${
        isSelected ? "text-white" : "text-black"
      } border border-black px-4 py-2 rounded-md`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

interface ToggleChoiceButtonProps {
  shiftBlocks: ShiftBlockType[];
  myId: string;
  myName: string;
  myOverlapShiftId: string[];
  selectedIdList: SelectedIdType[];
  setSelectedIdList: (selectedId: SelectedIdType[]) => void;
}

function ToggleChoiceButton({
  shiftBlocks,
  myId,
  myName,
  myOverlapShiftId,
  selectedIdList,
  setSelectedIdList,
}: ToggleChoiceButtonProps) {
  // ボタンがクリックされた時、選択されたボタンのIDを取得
  const handleClick = (index: number, clicked: string, unClicked: string) => {
    const newSelectedId = selectedIdList.map((id, i) => {
      if (i === index) {
        return { [clicked]: true, [unClicked]: false };
      }
      return id;
    });
    setSelectedIdList(newSelectedId);
  };

  return (
    <div className="w-full">
      {myOverlapShiftId.map((overlapId, index) => {
        return (
          <div
            key={index}
            className="grid grid-cols-2 rounded-md border border-gray-400 gap-2 m-2 p-2"
          >
            <CustomButton
              label={myName}
              isSelected={selectedIdList[index][myId] === true}
              onClick={() => handleClick(index, myId, overlapId)}
            />
            <CustomButton
              label={
                shiftBlocks.find(
                  (block: ShiftBlockType) => block.id === overlapId
                )?.name || ""
              }
              isSelected={selectedIdList[index][overlapId] === true}
              onClick={() => handleClick(index, overlapId, myId)}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ToggleChoiceButton;
