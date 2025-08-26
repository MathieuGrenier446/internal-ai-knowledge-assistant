import { ChatNavbar } from "@/components/chat";
import { ChatWindow } from "@/components/chat";
import { Navbar } from "@/components/layout/Navbar";
import InputBar from "@/components/ui/InputBar";
import { dummyChats } from "@/lib/dummyData";

export default function Home() {
  const chats = dummyChats;

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <ChatNavbar chats={chats} />
        <div className="flex flex-col w-full justify-end p-4">
          <ChatWindow chat={chats[0]} />
          <InputBar placeholder="Search for something..." />
        </div>
      </div>
    </div>
  );
}
