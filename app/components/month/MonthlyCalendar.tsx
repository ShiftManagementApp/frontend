// Calendar.tsx
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import interactionPlugin from "@fullcalendar/interaction";
import { ShiftBlockType } from "@/app/types/ShiftBlockType";
import { NowPageTime } from "@/app/types/NowPageTime";
import { useRouter } from "next/navigation";

interface MonthCalendarProps {
  shiftBlocks: ShiftBlockType[];
  setIsOpen: (isOpen: boolean) => void;
  setClickedBlock: (block: ShiftBlockType | null) => void;
  nowPageTime: NowPageTime;
}

function MonthlyCalender({
  shiftBlocks,
  setIsOpen,
  setClickedBlock,
  nowPageTime,
}: MonthCalendarProps) {
  const router = useRouter();
  // カレンダー上に表示するイベントのデータ
  const events: { title: string; start: Date; end: Date }[] = shiftBlocks.map(
    (shiftBlock) => {
      return {
        id: shiftBlock.id,
        backgroundColor: shiftBlock.color,
        title: shiftBlock.name,
        start: shiftBlock.startTime,
        end: shiftBlock.endTime,
      };
    }
  );

  // クリックされたシフトの id と同じ id のシフトブロックを取得
  const handleClick = (info: any) => {
    const index = shiftBlocks.findIndex((block) => {
      return block.id === info.event.id;
    });
    setClickedBlock(shiftBlocks[index]); // クリックされたシフトと同じ id のシフトブロックをセット
    setIsOpen(true); // イベント編集シートを開く
  };

  // クリックされたら該当の日付の日表示カレンダーに遷移
  const handleDateClick = (clickedDate: any) => {
    const date = new Date(clickedDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const path = `/calender/day/${year}/${month}/${day}`;
    return router.push(path);
  };

  // 重複しているシフトのが存在する日付の背景色を赤にする
  const backgroundEvents: {
    start: string;
    end: string;
    display: string;
    color: string;
  }[] = shiftBlocks.map((shiftBlock) => {
    if (shiftBlock.isOverlapShiftId.length > 0) {
      return {
        start:
          `${shiftBlock.startTime.getFullYear()}` +
          "-" +
          `${shiftBlock.startTime.getMonth() + 1}`.padStart(2, "0") +
          "-" +
          `${shiftBlock.startTime.getDate()}`.padStart(2, "0"),
        end:
          `${shiftBlock.endTime.getFullYear()}` +
          "-" +
          `${shiftBlock.endTime.getMonth() + 1}`.padStart(2, "0") +
          "-" +
          `${shiftBlock.endTime.getDate()}`.padStart(2, "0"),
        display: "background",
        color: "red",
      };
    } else {
      return {
        start: "",
        end: "",
        display: "",
        color: "",
      };
    }
  });

  return (
    <FullCalendar
      plugins={[dayGridPlugin, dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      initialDate={`${nowPageTime.year}-${String(nowPageTime.month).padStart(
        2,
        "0"
      )}-01`} // `initialDate` を指定して月の初日を表示
      height="auto"
      locales={[jaLocale]}
      locale="ja"
      dateClick={(info) => {
        handleDateClick(info.date);
      }}
      dayCellContent={(info) => {
        return <div>{info.dayNumberText.replace("日", "")}</div>;
      }}
      dayMaxEvents={3}
      headerToolbar={{
        start: "",
        center: "title",
        end: "",
      }}
      events={[...events, ...backgroundEvents]}
      eventClick={(info) => {
        return handleClick(info);
      }}
      eventContent={(info) => {
        return (
          <div
            style={{
              backgroundColor: info.event.backgroundColor,
              color: "white",
              borderRadius: "5px",
              padding: "5px",
              width: "100%",
              textAlign: "center",
            }}
          >
            {info.event.title}
          </div>
        );
      }}
    />
  );
}

export default MonthlyCalender;
