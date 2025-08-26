"use client";

import { useChatUIStore, useAllChats, useChat } from "@/features/chat/hooks";
import { ChatNavbar } from "./chat-navbar";
import { ChatWindow } from "./chat-window";

export function Chat() {
  const { data: chats } = useAllChats();
  const { activeChatId } = useChatUIStore();
  const { data: chat, isLoading } = useChat(activeChatId);

  return (
    <div className="flex flex-1">
      <div className="flex flex-1">
        <ChatNavbar chats={chats ?? []} />
      </div>
      <div className="flex flex-2 basis-xl">
        <ChatWindow chat={chat ?? null} />
      </div>
    </div>
  );
}
