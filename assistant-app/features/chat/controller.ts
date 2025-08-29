import { Chat } from "@prisma/client";
import { ChatWithMessages } from "@/features/chat/utils/types";
import { CustomError, ErrorCode } from "@/lib/errors";

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
 * Sends a message to the server and gets an AI response back.
 * @param chatId
 * @param content
 * @returns
 */
export async function createMessage(chatId: string, content: string) {
  try {
    const res = await fetch(`/api/chats/${chatId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    const data = await res.json();

    if (!res.ok) {
      const serverCode = data?.code as ErrorCode | undefined;
      if (serverCode && Object.values(ErrorCode).includes(serverCode)) {
        throw new CustomError({ code: serverCode });
      }
      throw new CustomError({ code: ErrorCode.UNKNOWN_ERROR });
    }

    return data.assistantMessage;
  } catch (error) {
    if (error instanceof CustomError) throw error;
    throw new CustomError({ code: ErrorCode.UNKNOWN_ERROR });
  }
}
