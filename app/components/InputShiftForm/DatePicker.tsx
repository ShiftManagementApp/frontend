"use client";

import * as React from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ja } from "date-fns/locale";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function DatePicker({ date, setDate }: DatePickerProps) {
  const [tempDate, setTempDate] = React.useState<Date | undefined>(date); // Calenderコンポーネント内で直接操作するための変数

  // DatePickerで選択された tempDate は、時間が 00:00:00 になるため、日付情報だけを date にセットする
  React.useEffect(() => {
    if (date && tempDate) {
      const newDate = new Date(tempDate); // 更新用の Date 変数を作成（date は時間が 00:00:00 になっている）
      newDate.setHours(date.getHours()); // tempDateの時間をnewDateにセット(00:00:00 -> tempDateのHoursをセット)
      newDate.setMinutes(date.getMinutes()); // tempDateの分をnewDateにセット(00:00:00 -> tempDateのMinutesをセット)
      setDate(newDate); // 日付と時間が正しく更新された newDate を date にセット
    }
  }, [tempDate?.getFullYear(), tempDate?.getMonth(), tempDate?.getDay()]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-auto justify-start text-left font-normal ml-1 mr-1 text-xs",
            !date && "text-muted-foreground"
          )}
        >
          {date ? (
            format(date, "PPP(E)", { locale: ja })
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          month={date}
          selected={tempDate}
          onSelect={setTempDate}
          locale={ja}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
