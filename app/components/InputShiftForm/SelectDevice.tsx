import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { deviceLabelMap } from "@/app/types/devices";

interface SelecteDeviceProps {
  deviceNames: string[];
  defaultDeviceName?: string | null;
  setSelectedDevice: (value: string | undefined) => void;
  setIsAllowInput: (value: boolean) => void;
}

function SelecteDevice({
  deviceNames,
  defaultDeviceName,
  setSelectedDevice,
  setIsAllowInput,
}: SelecteDeviceProps): JSX.Element {
  const reverseDeviceLabelMap = Object.fromEntries(
    Object.entries(deviceLabelMap).map(([key, value]) => [value, key])
  );
  {
    const selectContents = () => {
      return (
        <div>
          {deviceNames.map((deviceName, index) => (
            <SelectItem
              key={deviceName}
              value={deviceLabelMap[deviceName as keyof typeof deviceLabelMap]}
            >
              {deviceLabelMap[deviceName as keyof typeof deviceLabelMap]}
            </SelectItem>
          ))}
        </div>
      );
    };
    const placeholder: string = defaultDeviceName
      ? deviceLabelMap[defaultDeviceName as keyof typeof deviceLabelMap]
      : "デバイス名を選択";
    return (
      <div className="flex justify-between items-center m-3">
        <Image
          src="/Icons/bi_pc-display-horizontal.svg"
          alt="device"
          width={68}
          height={68}
        />
        <Select
          onValueChange={(value) => {
            const originalDeviceName = reverseDeviceLabelMap[value];
            setSelectedDevice(originalDeviceName);
          }}
          onOpenChange={(isOpen) => {
            if (isOpen) {
              setIsAllowInput(false);
            }
          }}
        >
          <SelectTrigger className="w-[60vw] text-xs">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>{selectContents()}</SelectContent>
        </Select>
      </div>
    );
  }
}

export default SelecteDevice;
