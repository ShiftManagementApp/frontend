import Image from "next/image";
import { useSession } from "next-auth/react";
import UserButton from "@/app/components/day/user-button";
import { deviceLabelMap } from "@/app/types/devices";
import SettingsButton from "@/app/components/calender/SettingsButton";

interface HeaderProps {
  shiftLineLeftAndWidth: { left: number; width: number }[];
  deviceNames: string[];
  year: number;
  month: number;
  day: number;
  dayOfWeek: string;
}

function Header({
  shiftLineLeftAndWidth,
  deviceNames,
  year,
  month,
  day,
  dayOfWeek,
}: HeaderProps) {
  const imagePaths = [
    "/Icons/bi_pc-display-horizontal.svg",
    "/Icons/game-icons_pc.svg",
    "/Icons/raphael_pc.svg",
    "/Icons/bi_apple.svg",
    "/Icons/ri_apple-line.svg",
  ];

  const { data: session } = useSession();
  const user = session?.user;

  // デバイス名と区切り線を表示する
  const devices = () => {
    return shiftLineLeftAndWidth.map((shiftLine, index) => {
      const deviceKey = deviceNames[index] as keyof typeof deviceLabelMap;

      return (
        <div
          key={index}
          className="absolute flex items-end justify-center bottom-0"
          style={{
            width: `${shiftLine.width}px`,
            left: `${shiftLine.left + 1}px`,
          }}
        >
          <div className="flex flex-col items-center">
            <div className="relative w-8 h-8">
              <Image
                src={imagePaths[index]}
                alt="device"
                fill
                sizes="100vw"
                className="object-scale-down"
              />
            </div>
            <div className="text-center text-sm lg:text-xl">
              {deviceLabelMap[deviceKey]}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <header className="flex flex-col bg-gray-200 w-full h-full">
      <div className="flex w-full h-1/2 lg:flex-row-reverse border-2 ">
        <div className="lg:w-full lg:h-full w-1/6  lg:left-0">
          <SettingsButton />
        </div>
        <div className="w-1/6 lg:w-[8vw] h-[5vh] text-[3vh] font-medium mt-3 lg:ml-2 flex items-center justify-center ">
          {month}月
        </div>
      </div>
      <div className="absolute right-5 mt-3 lg:mt-5 ">
        <UserButton />
      </div>

      <div className="relative w-full h-full flex mb-1">
        <div className="absolute w-1/6 lg:w-[8vw] h-full flex flex-col lg:flex-row-reverse items-center justify-end lg:justify-center  lg:text-xl">
          <div className="text-sm lg:text-xl">{dayOfWeek}</div>
          {year === new Date().getFullYear() &&
          month === new Date().getMonth() + 1 &&
          day === new Date().getDate() ? (
            <div className="text-sm lg:text-xl rounded-full bg-black text-white w-[8vw] lg:w-[4vw] h-[8vw] lg:h-[4vw] flex items-center justify-center lg:mr-3">
              {day}
            </div>
          ) : (
            <div className="text-md lg:text-2xl text-black w-[8vw] lg:w-[4vw] h-[8vw] lg:h-[4vw] flex items-center justify-center">
              {day}
            </div>
          )}
        </div>
        <div className="h-full">{devices()}</div>
      </div>
    </header>
  );
}

export default Header;
