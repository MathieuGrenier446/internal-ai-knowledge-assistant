import { Chat } from "@prisma/client";
import { ChatNavbarCard } from "./ChatNavbarCard";
import { Divider } from "@heroui/divider";

type ChatNavbarProps = {
  chats: Chat[];
};

export function ChatNavbar(props: ChatNavbarProps) {
  return (
    <div className="flex px-2 w-full">
      <div className="p-2 flex flex-col gap-2 w-full">
        {props.chats.length > 0 ? (
          props.chats.map((chat, index) => (
            <ChatNavbarCard key={index} chat={chat} />
          ))
        ) : (
          <ChatNavbarCard />
        )}
      </div>
      <Divider orientation="vertical" />
    </div>
  );
}
