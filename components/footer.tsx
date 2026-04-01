export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-[var(--chat-border)] bg-[var(--header-bg)]">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-[var(--muted-foreground)] leading-relaxed max-w-2xl">
        <p>
          Это учебный помощник: он не заменяет учителя. В интернете не делись
          личными данными и паролями.
        </p>
        <p className="mt-2 text-xs opacity-90">© {year}</p>
      </div>
    </footer>
  );
}
