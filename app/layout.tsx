import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Takuma Game Store - Top Up Game Murah & Terpercaya",
  description: "Platform top up game terpercaya untuk semua gamer Indonesia.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}