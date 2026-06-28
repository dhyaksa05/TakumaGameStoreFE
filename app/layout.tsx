import type { Metadata } from "next";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const metadata: Metadata = {
  title: "Takuma Game Store - Top Up Game Murah & Terpercaya",
  description: "Platform top up game terpercaya untuk semua gamer Indonesia.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        {/* KUNCI ASLI: Memasang Client ID Google langsung di dalam tanda kutip agar langsung terbaca mutlak oleh sistem */}
        <GoogleOAuthProvider clientId="masukan token google">
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
