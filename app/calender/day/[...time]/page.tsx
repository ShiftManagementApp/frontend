"use client";
import React, { useState } from "react";
import Calender from "@/app/pages/Calender";
import { useSwipeable } from "react-swipeable";
import { useRouter } from "next/navigation";

const DayCalender = ({ params }: { params: { time: number } }) => {
  const router = useRouter();

  // Date型にすることで、あり得ない日付を入力された場合に自動的に補正してくれる
  console.log("day.route.ts.params.time:", params.time);
  const time =  params.time;
  const date = new Date(time);
  console.log("day.route.ts.date:", date);
  let [year, month, day] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ];

  const handlers = useSwipeable({
    onSwiped: (event) => {
      if (event.dir == "Left") {
        const nextDate = new Date(date);
        nextDate.setDate(date.getDate() + 1);
        router.push(
          `/calender/day/${nextDate.getFullYear()}/${
            nextDate.getMonth() + 1
          }/${nextDate.getDate()}`
        );
      }
      if (event.dir == "Right") {
        const prevDate = new Date(date);
        prevDate.setDate(date.getDate() - 1);
        router.push(
          `/calender/day/${prevDate.getFullYear()}/${
            prevDate.getMonth() + 1
          }/${prevDate.getDate()}`
        );
      }
    },
    trackMouse: true, //マウス操作でのスワイプを許可する場合はtrue
  });

  return (
    <div {...handlers}>
      <Calender year={year} month={month} day={day} />
    </div>
  );
};

export default DayCalender;
