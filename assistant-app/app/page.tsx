import ChatCard from "@/components/sections/ChatCard";
import ChatNavbar from "@/components/sections/ChatNavbar";
import ChatWindow from "@/components/sections/ChatWindow";
import Navbar from "@/components/sections/Navbar";
import SettingsDropdown from "@/components/sections/SettingsDropdown";
import InputBar from "@/components/ui/InputBar";
import { dummyChats } from "@/lib/dummyData";

export default function Home() {

  const chats = dummyChats;

  return (
    <div className="flex flex-col h-screen">
      <Navbar/>
      <div className="flex flex-1">
        <ChatNavbar chats={chats}/>
        <div className="flex flex-col w-full justify-end p-4">
          <ChatWindow chat={chats[0]}/>
          <InputBar placeholder="Search for something..."/>
        </div>
      </div>
    </div>
  );
}
