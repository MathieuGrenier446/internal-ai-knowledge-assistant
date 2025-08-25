export interface Chat {
  id: string;
  title: string;
  state: "valid" | "warning" | "error";
  messages: Message[];
}

export interface Message {
  id: string;
  sender: "user" | "assistant";
  content: string;
  timestamp: Date;
}

