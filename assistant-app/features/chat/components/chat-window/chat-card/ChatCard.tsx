import { ChatAssistantCard } from "./ChatAssistantCard";
import { ChatUserCard } from "./ChatUserCard";
import { ChatCardProps } from "./types";

export function ChatCard(props: ChatCardProps) {
  const isAssistant = props.message.sender === "ASSISTANT";
  return isAssistant ? (
    <ChatAssistantCard content={props.message.content} />
  ) : (
    <ChatUserCard message={props.message} />
  );
}
