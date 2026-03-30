import Link from "next/link";
import { Instagram, Send, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-border bg-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Ваня Кошарный</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Начинающий миллионер. Создаю уникальные проекты и делюсь своим путем
              к успеху.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Навигация</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Главная
                </Link>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Галерея
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Обо мне
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Связаться</h4>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/vaneakosha?igsh=MWNveHlsbXR6Y3l0cQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted text-foreground hover:bg-border transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/vancukosha"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted text-foreground hover:bg-border transition-all duration-300"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="mailto:ivancosharnii@gmail.com"
                className="p-3 rounded-full bg-muted text-foreground hover:bg-border transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-muted-foreground text-sm">
              ivancosharnii@gmail.com
            </p>
          </div>
        </div>

        <div className="h-px bg-border" />

        <div className="py-6 flex flex-col md:flex-row items-center justify-center md:justify-start gap-4">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            © {currentYear} Ваня Кошарный. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}