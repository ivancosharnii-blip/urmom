"use client";

import Link from "next/link";
import { Instagram, Send, Mail } from "lucide-react";

export function Navigation() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <div className="flex flex-col">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-foreground"
            >
              Ваня Кошарный
            </Link>
            <span className="text-xs text-muted-foreground">
              начинающий миллионер
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="https://www.instagram.com/vaneakosha?igsh=MWNveHlsbXR6Y3l0cQ%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link
              href="https://t.me/vancukosha"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Telegram"
            >
              <Send className="w-5 h-5" />
            </Link>
            <Link
              href="mailto:ivancosharnii@gmail.com"
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
