import { openai } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai";

import { HOMEWORK_SYSTEM_PROMPT } from "@/lib/homework-system-prompt";

export const maxDuration = 60;

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey?.trim()) {
    return Response.json(
      {
        error:
          "Сервер не настроен: добавь переменную окружения OPENAI_API_KEY.",
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Некорректное тело запроса." }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("messages" in body) ||
    !Array.isArray((body as { messages: unknown }).messages)
  ) {
    return Response.json(
      { error: "Ожидался объект с полем messages (массив)." },
      { status: 400 },
    );
  }

  const messages = (body as { messages: UIMessage[] }).messages;
  const modelId = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";

  const modelMessages = await convertToModelMessages(
    messages.map(({ id, ...rest }) => {
      void id;
      return rest;
    }),
  );

  const result = streamText({
    model: openai(modelId),
    system: HOMEWORK_SYSTEM_PROMPT,
    messages: modelMessages,
  });

  return result.toUIMessageStreamResponse();
}
