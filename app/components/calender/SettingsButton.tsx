import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function SettingsButton() {
  const router = useRouter();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  const onClickDay = () => {
    router.push(`/calender/day/${year}/${month}/${day}`);
  };
  const onClickMonth = () => {
    router.push(`/calender/month/${year}/${month}`);
  };

  return (
    <div className="container flex h-16 lg:h-full items-center justify-between px-4 md:px-6 lg:ml-0 ">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="xl:hidden bg-gray-200 drop-shadow-xl mb-2"
          >
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-background p-6 shadow-xl">
          <div className="flex flex-col items-start gap-6 mx-3">
            <Button
              variant="ghost"
              className="border border-gray-400 w-full  text-black text-lg font-medium transition-colors hover:bg-gray-200"
              onClick={onClickMonth}
            >
              月
            </Button>
            <Button
              variant="outline"
              className="border border-gray-400 w-full text-black text-lg font-medium transition-colors hover:bg-gray-200"
              onClick={onClickDay}
            >
              日
            </Button>
            <Button
              variant="outline"
              className="text-sm w-full p-2 text-gray-400 hover:bg-white hover:text-gray-400 cursor-default"
            >
              ユーザー登録 (Coming soon...)
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <nav className="hidden lg:space-x-4 xl:flex lg:grid-rows-4 lg:gap-10 ">
        <Button
          className="bg-gray-300 text-black text-lg font-medium transition-colors hover:bg-gray-400"
          onClick={onClickMonth}
        >
          月
        </Button>
        <Button
          className="bg-gray-300 text-black text-lg font-medium transition-colors hover:bg-gray-400"
          onClick={onClickDay}
        >
          日
        </Button>
        <Button
          variant={"outline"}
          className="text-lg font-medium bg-gray-300 text-gray-400 hover:bg-gray-300 hover:text-gray-400 cursor-default"
        >
          ユーザー登録 (Coming soon...)
        </Button>
      </nav>
    </div>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

export default SettingsButton;
