"use client";
import { Chat } from "@/features/chat/components/Chat";
import { Navbar } from "@/components/layout/Navbar";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "jira-auth-success") {
        console.log("Jira connected!");
        // maybe refetch user data
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Chat />
    </div>
  );
}
