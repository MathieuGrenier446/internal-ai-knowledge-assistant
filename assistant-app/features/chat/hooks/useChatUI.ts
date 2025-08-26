import { create } from "zustand";

type ChatUIStore = {
  activeChatId: string | null;
  setActiveChat: (id: string) => void;
};

export const useChatUIStore = create<ChatUIStore>((set) => ({
  activeChatId: null,
  setActiveChat: (id) => set({ activeChatId: id }),
}));
