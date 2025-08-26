import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const chats = await prisma.chat.findMany({
    include: { messages: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(chats);
}

export async function POST(req: Request) {
  const { title } = await req.json();
  const chat = await prisma.chat.create({
    data: { title },
  });
  return NextResponse.json(chat);
}
