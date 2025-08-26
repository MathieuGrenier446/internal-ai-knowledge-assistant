import { Chat } from "@/types/chat"
import ChatCard from "./ChatCard"

type ChatWindowProps = {
    chat: Chat
}

export default function ChatWindow(props: ChatWindowProps) {
    return (
        <div className="flex flex-col p-4">
            {props.chat.messages.map((message, index) => (
                <ChatCard key={index} message={message}/>
            ))}
        </div>
    )
}