import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Chat } from "@prisma/client";
import { ChatWithMessages } from "@/features/chat/types";
import {
  fetchAllChats,
  fetchChat,
  createChatWithMessage,
} from "@/features/chat/controller";

export function useAllChats() {
  return useQuery<Chat[]>({
    queryKey: ["chats"],
    queryFn: fetchAllChats,
  });
}

export function useChat(id: string | null) {
  return useQuery<ChatWithMessages>({
    queryKey: ["chat", id],
    queryFn: () => fetchChat(id!),
    enabled: !!id,
  });
}

export function useCreateChatWithMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => createChatWithMessage(content),
    onSuccess: (chat) => {
      // Add new chat to the list
      queryClient.setQueryData(["chats"], (old: any[] = []) => [...old, chat]);
      // Optionally set active chat in Zustand store
    },
  });
}
