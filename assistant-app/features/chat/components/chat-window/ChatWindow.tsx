import { ChatCard } from "./chat-card/ChatCard";
import InputBar from "@/components/ui/InputBar";
import { ChatWithMessages } from "@/features/chat/types";
import { useCreateChatWithMessage } from "@/features/chat/hooks";

type ChatWindowProps = {
  chat: ChatWithMessages | null;
};

export function ChatWindow(props: ChatWindowProps) {
  const createChatMutation = useCreateChatWithMessage();

  const handleSend = async (content: string) => {
    await createChatMutation.mutateAsync(content);
  };

  return (
    <div className="w-full flex flex-col justify-end p-4">
      {props.chat && (
        <div className="flex flex-col px-4 py-8 gap-8">
          {props.chat.messages.map((message, index) => (
            <ChatCard key={index} message={message} />
          ))}
        </div>
      )}
      <div className="flex justify-center">
        <InputBar onSubmit={handleSend} placeholder="Search for something..." />
      </div>
    </div>
  );
}
