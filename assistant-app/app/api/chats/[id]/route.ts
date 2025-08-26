import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { openaiClient } from "@/lib/openai"; // assume you have OpenAI client set up

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  const chat = await prisma.chat.findUnique({
    where: { id: params.id },
    include: { messages: true },
  });

  if (!chat) {
    return NextResponse.json({ error: "Chat not found" }, { status: 404 });
  }

  return NextResponse.json(chat);
}

// export async function POST(req: Request, { params }: Params) {
//   const { sender, content } = await req.json();
//   const message = await prisma.message.create({
//     data: {
//       chatId: params.id,
//       sender,
//       content,
//     },
//   });
//   return NextResponse.json(message);
// }

export async function POST(req: Request) {
  const { content } = await req.json();

  if (!content) {
    return NextResponse.json({ error: "Missing content" }, { status: 400 });
  }

  // 1️⃣ Create the chat first (temporary title)
  const chat = await prisma.chat.create({
    data: { title: "New Chat" },
  });

  // 2️⃣ Create the first message
  await prisma.message.create({
    data: {
      chatId: chat.id,
      sender: "USER",
      content,
    },
  });

  // 3️⃣ Ask OpenAI for a suggested title (you can also generate a response)
  const aiResponse = await openaiClient.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: `Suggest a title for this chat: "${content}"` },
    ],
  });

  const suggestedTitle =
    aiResponse.choices?.[0]?.message?.content?.trim() ?? "New Chat";

  // 4️⃣ Update the chat with AI-generated title
  const updatedChat = await prisma.chat.update({
    where: { id: chat.id },
    data: { title: suggestedTitle },
    include: { messages: true },
  });

  return NextResponse.json(updatedChat);
}
