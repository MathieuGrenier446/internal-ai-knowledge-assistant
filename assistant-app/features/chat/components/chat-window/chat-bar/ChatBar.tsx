import InputBar from "@/components/ui/InputBar";
import {
  useChat,
  useChatUIStore,
  useCreateChatWithMessage,
  useSendMessage,
} from "@/features/chat/hooks";

export function ChatBar() {
  const { activeChatId } = useChatUIStore();
  const { data: chat, isLoading, isError } = useChat(activeChatId);

  const createChatMutation = useCreateChatWithMessage();
  const sendMessageMutation = useSendMessage(chat?.id ?? "");

  const handleSend = async (content: string) => {
    if (isLoading) return;
    if (!chat) {
      // If no chat exists yet, create one with the first message
      await createChatMutation.mutateAsync(content);
    } else {
      // If chat exists, just send a new message
      await sendMessageMutation.mutateAsync(content);
    }
  };

  return (
    <div className="flex w-full justify-center">
      <InputBar
        disabled={isError}
        onSubmit={handleSend}
        placeholder="Search for something..."
      />
    </div>
  );
}
