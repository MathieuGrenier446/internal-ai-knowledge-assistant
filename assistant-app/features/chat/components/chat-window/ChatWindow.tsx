import { ChatContainer } from "./chat-container/ChatContainer";
import { ChatBar } from "./chat-bar/ChatBar";

export function ChatWindow() {
  return (
    <div className="w-full h-full justify-end flex flex-col p-4">
      <ChatContainer />
      <ChatBar />
    </div>
  );
}
