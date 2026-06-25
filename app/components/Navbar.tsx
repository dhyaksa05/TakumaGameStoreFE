"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, User, LogIn } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Beranda", href: "/" },
    { label: "Cek Pesanan", href: "/cek-pesanan" },
    { label: "Tentang Kami", href: "/tentang-kami" },
  ];

  return (
    <nav
      style={{
        background: "rgba(19, 19, 43, 0.95)",
        borderBottom: "1px solid #2A2A50",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              background: "linear-gradient(135deg, #4ECDC4, #9B5DE5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.5px",
            }}
          >
            TakumaGS
          </span>
        </Link>

        {/* Desktop nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
          }}
          className="hidden-mobile"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: "#8888AA",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#4ECDC4")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#8888AA")
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link
            href="/login"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#ffffff",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: 500,
              padding: "8px 20px",
              borderRadius: "9999px",
              border: "2px solid #00F5A0",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#00F5A0";
              (e.currentTarget as HTMLElement).style.color = "#13132B";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "#ffffff";
            }}
          >
            <LogIn size={16} />
            Login
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "none",
              border: "none",
              color: "#ffffff",
              cursor: "pointer",
              display: "none",
            }}
            className="show-mobile"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            background: "#1C1C3A",
            borderTop: "1px solid #2A2A50",
            padding: "16px 24px",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                color: "#8888AA",
                textDecoration: "none",
                padding: "12px 0",
                borderBottom: "1px solid #2A2A50",
                fontSize: "0.95rem",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
