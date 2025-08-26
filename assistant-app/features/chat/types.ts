import { Prisma } from "@prisma/client";

export type ChatWithMessages = Prisma.ChatGetPayload<{
  include: { messages: true };
}>;
