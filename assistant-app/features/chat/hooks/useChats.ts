import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Chat, Message } from "@prisma/client";
import { ChatWithMessages } from "@/features/chat/utils/types";
import {
  fetchAllChats,
  fetchChat,
  createChatWithMessage,
  createMessage,
} from "@/features/chat/controller";
import {
  chatQueryKeys,
  createOptimisticMessage,
} from "@/features/chat/utils/query-utils";

export function useAllChats() {
  return useQuery<Chat[]>({
    queryKey: chatQueryKeys.chats(),
    queryFn: fetchAllChats,
  });
}

export function useChat(id: string | null) {
  return useQuery<ChatWithMessages>({
    queryKey: chatQueryKeys.chat(id),
    queryFn: () => fetchChat(id!),
    enabled: !!id,
  });
}

export function useCreateChatWithMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => createChatWithMessage(content),
    onSuccess: (chat) => {
      queryClient.setQueryData(chatQueryKeys.chats(), (old: Message[] = []) => [
        ...old,
        chat,
      ]);
    },
  });
}

export function useSendMessage(chatId: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (content: string) => createMessage(chatId, content),
    onMutate: async (content: string) => {
      await queryClient.cancelQueries({ queryKey: chatQueryKeys.chat(chatId) });

      const previousQueryData = queryClient.getQueryData<ChatWithMessages>(
        chatQueryKeys.chat(chatId),
      );

      const optimisticMessage = createOptimisticMessage({ content, chatId });

      if (previousQueryData) {
        queryClient.setQueryData<ChatWithMessages>(chatQueryKeys.chat(chatId), {
          ...previousQueryData,
          messages: [...previousQueryData.messages, optimisticMessage],
        });
      }

      return { previousQueryData };
    },
    onError: (error, content, context) => {
      if (context?.previousQueryData) {
        queryClient.setQueryData<ChatWithMessages>(
          chatQueryKeys.chat(chatId),
          context.previousQueryData,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.chat(chatId) });
    },
  });

  return mutation;
}
