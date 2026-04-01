import Link from "next/link";

export function Navigation() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--chat-border)] bg-[var(--header-bg)]/95 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-14 md:h-16">
          <Link
            href="/"
            className="text-lg md:text-xl font-semibold tracking-tight text-[var(--foreground)]"
          >
            Помощник по домашке
          </Link>
          <span className="text-xs md:text-sm text-[var(--muted-foreground)] max-w-[12rem] md:max-w-none text-right leading-snug">
            Без готовых ответов
          </span>
        </nav>
      </div>
    </header>
  );
}
