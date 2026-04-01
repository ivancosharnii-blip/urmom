"use client";

import { useChat as useHomeworkChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { Loader2, SendHorizontal, Square } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";

function textFromParts(message: UIMessage): string {
  return message.parts
    .filter(
      (p): p is { type: "text"; text: string } =>
        p.type === "text" && typeof (p as { text?: string }).text === "string",
    )
    .map((p) => p.text)
    .join("");
}

export function HomeworkChat() {
  const [input, setInput] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status, stop, error } = useHomeworkChat();

  const busy = status === "streaming" || status === "submitted";

  React.useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, status]);

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || busy) return;
    setInput("");
    await sendMessage({ text: trimmed });
  }

  function onFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    void handleSend();
  }

  return (
    <div className="flex flex-1 flex-col min-h-0 rounded-2xl border border-[var(--chat-border)] bg-[var(--chat-surface)] shadow-[var(--chat-shadow)]">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-5 md:px-6 space-y-4 scroll-smooth"
      >
        {messages.length === 0 ? (
          <div className="rounded-xl bg-[var(--chat-bubble-assistant)] px-4 py-3 text-[var(--foreground)] leading-relaxed">
            <p className="font-medium text-[var(--chat-accent-strong)]">
              Привет! Я помогаю с домашкой — но не решаю за тебя.
            </p>
            <p className="mt-2 text-[var(--muted-foreground)] text-sm">
              Расскажи, какой предмет и что именно непонятно: вместе разберём
              условие и подумаем, с чего начать. Готового ответа на твою задачу
              ты здесь не получишь — зато научишься думать сам.
            </p>
          </div>
        ) : null}

        {messages.map((m) => {
          const text = textFromParts(m);
          if (!text) return null;
          const isUser = m.role === "user";
          return (
            <div
              key={m.id}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={
                  isUser
                    ? "max-w-[min(100%,36rem)] rounded-2xl rounded-br-md bg-[var(--chat-bubble-user)] px-4 py-3 text-[var(--chat-bubble-user-fg)] shadow-sm"
                    : "max-w-[min(100%,36rem)] rounded-2xl rounded-bl-md bg-[var(--chat-bubble-assistant)] px-4 py-3 text-[var(--foreground)] border border-[var(--chat-border)]"
                }
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {text}
                </p>
              </div>
            </div>
          );
        })}

        {busy && messages.at(-1)?.role === "user" ? (
          <div className="flex justify-start">
            <div className="inline-flex items-center gap-2 rounded-2xl rounded-bl-md border border-[var(--chat-border)] bg-[var(--chat-bubble-assistant)] px-4 py-2 text-sm text-[var(--muted-foreground)]">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Думаю…
            </div>
          </div>
        ) : null}

        {error ? (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {error.message}
          </p>
        ) : null}
      </div>

      <form
        onSubmit={onFormSubmit}
        className="border-t border-[var(--chat-border)] p-3 md:p-4 bg-[var(--chat-input-bg)] rounded-b-2xl"
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
          <label htmlFor="homework-input" className="sr-only">
            Твоё сообщение
          </label>
          <textarea
            id="homework-input"
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void handleSend();
              }
            }}
            placeholder="Например: не понимаю задачу про скорость в математике за 6 класс…"
            className="min-h-[3rem] w-full resize-y rounded-xl border border-[var(--chat-border)] bg-[var(--background)] px-3 py-2.5 text-base text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            disabled={busy}
          />
          <div className="flex shrink-0 gap-2 sm:flex-col">
            {busy ? (
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => stop()}
              >
                <Square className="h-4 w-4 mr-1.5" aria-hidden />
                Стоп
              </Button>
            ) : null}
            <Button
              type="submit"
              disabled={busy || !input.trim()}
              className="w-full sm:w-auto bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90"
            >
              <SendHorizontal className="h-4 w-4 mr-1.5" aria-hidden />
              Отправить
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
