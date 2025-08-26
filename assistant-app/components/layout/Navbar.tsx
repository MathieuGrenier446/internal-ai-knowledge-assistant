import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { SettingsDropdown } from "@/components/layout/SettingsDropdown";
import { Divider } from "@heroui/divider";

export function Navbar() {
  return (
    <div className="flex flex-col">
      <div className="flex align-center justify-between px-16 py-4 w-full h-fit">
        <div className="flex gap-4 align-center">
          <GlobeAltIcon className="size-6 m-auto" />
          <h1 className="m-auto text-xl">Sparrow</h1>
        </div>
        <div>
          <SettingsDropdown />
        </div>
      </div>
      <Divider />
    </div>
  );
}
