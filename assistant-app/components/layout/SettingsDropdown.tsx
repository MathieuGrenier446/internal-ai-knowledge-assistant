"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { openJiraOAuthWindow } from "@/services/jira/jira-auth";

export function SettingsDropdown() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="ghost" isIconOnly={true}>
          <Bars3Icon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem onClick={() => openJiraOAuthWindow()} key="new">
          Connect To Jira
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
