import rawChats from "@/data/dummyChats.json";
import type { Chat } from "@/types/chat";

// Optional: helper function to validate the state
function parseState(state: string): Chat["state"] {
  if (state === "valid" || state === "warning" || state === "error") {
    return state;
  }
  return "valid"; // fallback if unknown
}

// Map JSON to typed Chat[]
export const dummyChats: Chat[] = rawChats.map(chat => ({
  ...chat,
  state: parseState(chat.state),
  messages: chat.messages.map(msg => ({
    ...msg,
    sender: msg.sender === "user" ? "user" : "assistant", // ensure sender literal type
    timestamp: new Date(msg.timestamp)
  }))
}));
