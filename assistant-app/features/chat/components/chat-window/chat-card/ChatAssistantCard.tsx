import { ChatCardProps } from "./types";

export function ChatAssistantCard(props: ChatCardProps) {
  return (
    <div className="self-center max-w-2xl">
      <p>{props.message.content}</p>
    </div>
  );
}
