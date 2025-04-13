import Image from "next/image";
import { DatePicker } from "./DatePicker";
import TimePicker from "./TimePicker";

interface SelectDateAndTimeProps {
  dateTime: Date | undefined;
  setDateTime: (date: Date | undefined) => void;
}

function SelectDateAndTime({
  dateTime,
  setDateTime,
}: SelectDateAndTimeProps): JSX.Element {
  return (
    <div className=" border-b border-black">
      <div className="flex justify-between items-center m-3">
        <Image
          src="/Icons/uil_calender.svg"
          alt="calender"
          width={80}
          height={80}
        />
        <DatePicker date={dateTime} setDate={setDateTime} />
        <TimePicker date={dateTime} setDate={setDateTime} />
      </div>
    </div>
  );
}

export default SelectDateAndTime;
