import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { generateResponse } from "@/lib/llm/generation";
import { CustomError, ErrorCode } from "@/lib/errors";
import { Sender } from "@prisma/client";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const chat = await prisma.chat.findUnique({
    where: { id },
    include: { messages: true },
  });

  if (!chat) {
    return NextResponse.json({ error: "Chat not found" }, { status: 404 });
  }

  return NextResponse.json(chat);
}

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    if (!id) {
      const error = new CustomError({
        code: ErrorCode.INVALID_INPUT,
      });
      return NextResponse.json(error.toJSON(), { status: 400 });
    }

    let body;
    try {
      body = await req.json();
    } catch {
      const error = new CustomError({
        code: ErrorCode.INVALID_INPUT,
      });
      return NextResponse.json(error.toJSON(), { status: 400 });
    }

    let { content } = body;
    content = content.trim();

    if (!content || typeof content !== "string" || content.length === 0) {
      const error = new CustomError({
        code: ErrorCode.INVALID_INPUT,
      });
      return NextResponse.json(error.toJSON(), { status: 400 });
    }

    let aiResponse;
    try {
      aiResponse = await generateResponse(content);

      if (!aiResponse || typeof aiResponse !== "string") {
        throw new Error("AI service returned invalid response");
      }
    } catch {
      const error = new CustomError({
        code: ErrorCode.AI_SERVICE_UNAVAILABLE,
      });
      return NextResponse.json(error.toJSON(), { status: 503 });
    }

    let assistantMessage;
    let userMessage;
    try {
      userMessage = await prisma.message.create({
        data: {
          chatId: id,
          sender: Sender.USER,
          content: content,
        },
      });
      assistantMessage = await prisma.message.create({
        data: {
          chatId: id,
          sender: Sender.ASSISTANT,
          content: aiResponse,
        },
      });
    } catch {
      const error = new CustomError({
        code: ErrorCode.DATABASE_ERROR,
      });
      return NextResponse.json(error.toJSON(), { status: 500 });
    }

    return NextResponse.json({
      userMessage,
      assistantMessage,
    });
  } catch (error) {
    console.error("Failed to process message:", error);
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 },
    );
  }
}
