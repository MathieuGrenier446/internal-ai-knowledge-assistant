import { Chat } from "@prisma/client";
import { ChatWithMessages } from "@/features/chat/types";

/**
 * Fetch all chats
 */
export async function fetchAllChats(): Promise<Chat[]> {
  const res = await fetch("/api/chats");
  if (!res.ok) throw new Error("Failed to fetch chats");
  return res.json();
}

/**
 * Fetch a single chat with messages
 */
export async function fetchChat(id: string): Promise<ChatWithMessages> {
  const res = await fetch(`/api/chats/${id}`);
  if (!res.ok) throw new Error("Failed to fetch chat");
  return res.json();
}

/**
 * Create a chat with automatic title
 */
export async function createChatWithMessage(
  content: string,
): Promise<ChatWithMessages> {
  const res = await fetch("/api/chats", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) throw new Error("Failed to create chat with message");
  return res.json();
}

/**
 * Create a new message in a chat
 */
export async function createMessage(
  chatId: string,
  content: string,
): Promise<any> {
  const res = await fetch(`/api/chats/${chatId}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sender: "USER", content }),
  });

  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}
