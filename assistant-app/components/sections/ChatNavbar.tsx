import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem} from "@heroui/navbar";
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import ChatNavbarCard from "./ChatNavbarCard";
import { Divider } from "@heroui/divider";
import { Chat } from "@/types/chat";

type ChatNavbarProps = {
    chats: Chat[],
}

export default function ChatNavbar(props: ChatNavbarProps) {
    return (
        <div className="flex px-2">
            <div className="p-2 flex flex-col gap-2">
                {props.chats.map((chat, index)=>(
                    <ChatNavbarCard key={index} title={chat.title} state={chat.state}/>
                ))}
            </div>
            <Divider orientation="vertical"/>
        </div>
        
    )
}