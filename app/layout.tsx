import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Takuma Game Store - Top Up Game Murah & Terpercaya",
  description: "Platform top up game terpercaya untuk semua gamer Indonesia. Top up Mobile Legends, Free Fire, PUBG, Genshin Impact, dan 50+ game lainnya.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
