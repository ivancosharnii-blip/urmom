import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Помощник по домашке",
  description:
    "Дружелюбный помощник для школьников: наводящие вопросы и подсказки без готовых ответов.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col pt-14 md:pt-16 font-sans bg-[var(--background)] text-[var(--foreground)]">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
