"use client";

import { ChatNavbar } from "./chat-navbar";
import { ChatWindow } from "./chat-window";

export function Chat() {
  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex flex-1">
        <ChatNavbar />
      </div>
      <div className="flex flex-2 basis-xl">
        <ChatWindow />
      </div>
    </div>
  );
}
