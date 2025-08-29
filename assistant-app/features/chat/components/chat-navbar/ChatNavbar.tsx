import { ChatNavbarCard } from "./ChatNavbarCard";
import { Divider } from "@heroui/divider";
import { useAllChats } from "../../hooks";

export function ChatNavbar() {
  const { data: fetchedChats, isLoading } = useAllChats();
  const chats = fetchedChats === undefined ? [] : fetchedChats;

  return (
    <div className="flex w-3xs">
      <div className="p-2 flex flex-col gap-2 w-full">
        {chats.length > 0 ? (
          chats.map((chat, index) => (
            <ChatNavbarCard key={index} chat={chat} isLoading={isLoading} />
          ))
        ) : (
          <ChatNavbarCard isLoading={isLoading} />
        )}
      </div>
      <Divider orientation="vertical" />
    </div>
  );
}
