import { ChatAssistantCard } from "./ChatAssistantCard";
import { ChatUserCard } from "./ChatUserCard";
import { ChatCardProps } from "./types";

export function ChatCard(props: ChatCardProps) {
  const isAssistant = props.message.sender === "assistant";
  return isAssistant ? (
    <ChatAssistantCard message={props.message} />
  ) : (
    <ChatUserCard message={props.message} />
  );
}
