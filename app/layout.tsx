import type { Metadata } from "next";
import Script from "next/script"; // <-- 1. Tambah import ini
import "./globals.css";

export const metadata: Metadata = {
  title: "Takuma Game Store - Top Up Game Murah & Terpercaya",
  description: "Platform top up game terpercaya untuk semua gamer Indonesia.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        {/* 2. Selipkan script Snap Midtrans di dalam head */}
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key="Mid-client-KUGWnmUnM5M0EsUw" 
          strategy="beforeInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}