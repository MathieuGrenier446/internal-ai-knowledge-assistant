import { useChat, useChatUIStore } from "@/features/chat/hooks";

import { useEffect, useRef } from "react";
import { ChatCard } from "@/features/chat/components/chat-window/chat-card";
import { Spinner } from "@heroui/react";
import { ChatAssistantCard } from "../chat-card/ChatAssistantCard";

export function ChatContainer() {
  const { activeChatId } = useChatUIStore();
  const { data: chat, isLoading, isError } = useChat(activeChatId);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat?.messages]);
  if (chat) {
    return (
      <div
        ref={scrollRef}
        className="flex-1 px-4 py-8 overflow-y-scroll min-h-0 flex flex-col-reverse"
      >
        <div className="flex flex-col gap-8">
          {chat.messages.map((message, index) => (
            <ChatCard key={index} message={message} />
          ))}
        </div>
      </div>
    );
  } else if (isLoading) {
    return <Spinner className="m-auto" size="lg" />;
  } else if (isError) {
    return (
      <ChatAssistantCard
        content={"Error loading messages, sorry about that."}
      />
    );
  }
}
