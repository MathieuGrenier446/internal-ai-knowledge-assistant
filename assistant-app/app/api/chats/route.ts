import { NextResponse } from "next/server";
import { prisma } from "@/services/db/prisma";
import { generateSuggestedTitle } from "@/services/llm/generation";

export async function GET() {
  const chats = await prisma.chat.findMany({
    include: { messages: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(chats);
}

export async function POST(req: Request) {
  const { content } = await req.json();

  if (!content) {
    return NextResponse.json({ error: "Missing content" }, { status: 400 });
  }

  const chat = await prisma.chat.create({
    data: { title: "New Chat" },
  });

  await prisma.message.create({
    data: {
      chatId: chat.id,
      sender: "USER",
      content,
    },
  });

  const suggestedTitle = await generateSuggestedTitle(content);

  const updatedChat = await prisma.chat.update({
    where: { id: chat.id },
    data: { title: suggestedTitle },
    include: { messages: true },
  });

  return NextResponse.json(updatedChat);
}
