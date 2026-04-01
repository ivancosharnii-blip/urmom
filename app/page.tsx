import { HomeworkChat } from "@/components/homework-chat";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col min-h-0 container mx-auto px-4 py-6 md:py-10 max-w-3xl w-full">
      <p className="text-center text-sm text-[var(--muted-foreground)] mb-4 md:mb-6 leading-relaxed">
        Не решаю за тебя — задаю вопросы и помогаю додуматься. Если нужен только
        готовый ответ, спроси у учителя или родителей.
      </p>
      <HomeworkChat />
    </main>
  );
}
