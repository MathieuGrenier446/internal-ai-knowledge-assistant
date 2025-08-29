"use client";
import { Chat } from "@/features/chat/components/Chat";
import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Chat />
    </div>
  );
}
