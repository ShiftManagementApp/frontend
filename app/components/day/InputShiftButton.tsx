import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import InputShiftForm from "@/app/components/day/InputShiftForm";
import { PlusIcon } from "lucide-react";
import { NowPageTime } from "@/app/types/NowPageTime";
import { ShiftBlockType } from "@/app/types/ShiftBlockType";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Role } from "@/app/types/role";

interface InputShiftButtonProps {
  deviceNames: string[];
  dateTime: Date;
  nowPageTime: NowPageTime;
  shiftBlocks: ShiftBlockType[] | null;
}

function InputShiftButton({
  deviceNames,
  dateTime,
  nowPageTime,
  shiftBlocks,
}: InputShiftButtonProps) {
  const { data: session } = useSession();
  const user = session?.user;
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  let role: Role | undefined;
  if (user?.role === Role.ADMIN) {
    role = user.role;
  } else if (user?.role === Role.USER) {
    role = user.role;
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger>
        {role === Role.USER && (
          <button className="rounded-[30%] lg:rounded-sm  bg-gray-300 w-12 lg:w-auto h-12 lg:pl-2 lg:pr-2 flex items-center justify-center drop-shadow-xl lg:drop-shadow-none hover:bg-gray-400">
            <PlusIcon className="lg:hidden text-black h-6 w-6" />
            <div className="hidden lg:flex">新規シフト登録</div>
          </button>
        )}
      </SheetTrigger>
      <SheetContent className="w-screen h-[80vh]" side={"bottom"}>
        <InputShiftForm
          deviceNames={deviceNames}
          dateTime={dateTime}
          nowPageTime={nowPageTime}
          shiftBlocks={shiftBlocks}
          userId={user?.id}
          setIsSheetOpen={setIsSheetOpen}
        />
      </SheetContent>
    </Sheet>
  );
}

export default InputShiftButton;
