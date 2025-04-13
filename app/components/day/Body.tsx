"use client";
import ShiftLine from "@/app/components/day/ShiftLine";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLayoutEffect, useRef, useState } from "react";
import type { ShiftBlockType } from "@/app/types/ShiftBlockType";
import { NowPageTime } from "@/app/types/NowPageTime";
import { useSession } from "next-auth/react";

interface BodyProps {
  deviceNames: string[];
  shiftBlocks: ShiftBlockType[];
  updateShiftLineLeftAndWidth: (
    left: number,
    width: number,
    index: number
  ) => void;
  nowPageTime: NowPageTime;
}

function Body({
  deviceNames,
  shiftBlocks,
  updateShiftLineLeftAndWidth,
  nowPageTime,
}: BodyProps) {
  const { data: session } = useSession();

  const timeLineHeight = useRef<HTMLDivElement | null>(null); // ShiftLineの高さを取得するためのref
  const timeLinesRef = useRef<(HTMLDivElement | null)[]>([]); // 時刻の横線の高さを取得するためのrefの配列
  const shiftLinesRef = useRef<(HTMLDivElement | null)[]>([]); // ShiftLineのrefの配列

  const [shiftLineHeight, setShiftLineHeight] = useState(0); // ShiftLineの高さ

  // 1:00 ~ 23:00 の文字列を作成
  const times: string[] = Array.from(
    { length: 23 },
    (_: unknown, i: number): string => `${i + 1}:00`
  );

  useLayoutEffect(() => {
    if (timeLineHeight.current) {
      setShiftLineHeight(timeLineHeight.current.offsetHeight);
    }
    // timeLinesRef.currentの長さをtimesの長さに合わせて初期化
    timeLinesRef.current = timeLinesRef.current.slice(0, times.length);

    // shiftLinesRef.currentの長さをdeviceNamesの長さに合わせて初期化
    shiftLinesRef.current = shiftLinesRef.current.slice(0, deviceNames.length);

    // shiftLinesRef.currentの各要素のoffsetLeftとoffsetWidthを取得してsetShiftLineLeftAndWidthを呼び出す
    shiftLinesRef.current.forEach((shiftLine, index) => {
      if (shiftLine) {
        updateShiftLineLeftAndWidth(
          shiftLine.offsetLeft,
          shiftLine.offsetWidth,
          index
        );
      }
    });
  }, [times.length, deviceNames.length]);

  // 時刻の隣に横線を描く要素を作成
  const timeWithLine = (time: string, index: number) => {
    const isFirst: boolean = index === 0; // 最初の行かどうか
    const isLast: boolean = index === times.length - 1; // 最後の行かどうか
    return (
      <div
        className={`flex items-center h-[4vh] w-full ${isFirst ? "mt-2" : ""} ${
          isLast ? "mb-2" : "mb-1"
        }`} // 最初の行と最後の行のマージンを調整。それ以外は通常のマージン
      >
        <span className="w-[15vw] lg:w-[8vw] text-lg flex justify-center">
          {time}
        </span>{" "}
        {/* 時刻 */}
        <div
          className="flex-grow border-t border-gray-300"
          ref={(el) => {
            timeLinesRef.current[index] = el;
          }}
        ></div>{" "}
        {/* 時刻の横に引く線 */}
      </div>
    );
  };

  // 時刻と横線の背景を作成
  const timeLines = (
    <div className="w-[100vw] absolute z-10" ref={timeLineHeight}>
      {/* timeLineの高さを shiftLine の縦幅とするために ref で取得 */}
      {times.map((time: string, index: number) => (
        <div key={index}>{timeWithLine(time, index)}</div> // 時刻と横線を表示
      ))}
    </div>
  );

  // ShiftBlockの時間(Hour)の位置を計算
  function calcPosition(hour: number, minute: number) {
    let position = 0;
    if (
      // Hour の位置を計算
      timeLinesRef.current[hour - 1] !== undefined &&
      timeLinesRef.current[hour - 1] !== null
    ) {
      position = timeLinesRef.current[hour - 1]!.offsetTop;
    }

    if (
      // 0時以降の場合
      timeLinesRef.current[hour] !== undefined &&
      timeLinesRef.current[hour] !== null
    ) {
      position +=
        (timeLinesRef.current[hour]!.offsetTop - position) / (60 / minute); // 1分ごとの位置を計算
    } else if (
      // 24時の場合
      timeLinesRef.current[hour - 2] !== undefined &&
      timeLinesRef.current[hour - 2] !== null
    ) {
      position +=
        (timeLinesRef.current[hour - 2]!.offsetTop - position) / (60 / minute); // 1分ごとの位置を計算
    }
    return position;
  }

  // ShiftBlockの位置を計算
  const calcBlockPosition = (startTime: Date, endTime: Date) => {
    const startHour = startTime.getHours();
    const startMinute = startTime.getMinutes();
    const endHour = endTime.getHours();
    const endMinute = endTime.getMinutes();

    const top: number = calcPosition(startHour, startMinute); // 開始時間（Hour）のtopを計算
    const end: number = calcPosition(endHour, endMinute); // 終了時間（Hour）のtopを計算

    const height = end - top;

    return { top: top, left: 0, height: height };
  };

  // 各ShiftLineを作成
  const shiftLines = [...deviceNames].map((deviceName, i) => {
    return (
      <div
        key={deviceName}
        className="w-[16vw] lg:w-[18vw] flex-none z-20 border-l-2 border-black"
        ref={(el) => {
          shiftLinesRef.current[i] = el;
        }}
        style={{ height: `${shiftLineHeight}px` }}
      >
        <ShiftLine
          deviceNames={deviceNames}
          deviceName={deviceName}
          shiftBlocks={shiftBlocks}
          calcBlockPosition={calcBlockPosition}
          nowPageTime={nowPageTime}
          session={session}
        />
      </div>
    );
  });

  return (
    <ScrollArea className="w-full h-full rounded-md border">
      <div className="relative w-full">
        {timeLines}
        <div className="flex w-full justify-end">{shiftLines}</div>
      </div>
    </ScrollArea>
  );
}

export default Body;
