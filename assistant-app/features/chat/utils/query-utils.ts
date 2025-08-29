import { Message, Sender } from "@prisma/client";
import { v4 as uuid } from "uuid";

/**
 * Query keys for chat-related data.
 *
 * Example:
 *   queryKeys.messages("123") -> ["messages", "123"]
 */
export const chatQueryKeys = {
  /**
   * All chats list
   */
  chats: () => ["chats"] as const,

  /**
   * A single chat by its id
   */
  chat: (chatId: string | null) => ["chat", chatId] as const,

  /**
   * Messages for a given chat
   */
  messages: (chatId: string) => ["messages", chatId] as const,
};

/**
 * Creates a message for optimistic update.
 * @param input
 * @returns Temporary optimistic message
 */
export function createOptimisticMessage(input: {
  content: string;
  chatId?: string;
}): Message {
  return {
    id: uuid(), // temp id
    chatId: input.chatId ?? "temp", // placeholder if missing
    sender: Sender.USER,
    content: input.content,
    timestamp: new Date(), // client timestamp
  };
}
