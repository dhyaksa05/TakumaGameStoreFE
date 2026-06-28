"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, LogIn, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";

interface UserData {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
}

export default function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    router.push("/");
  };

  const navLinks = [
    { label: "Beranda", href: "/" },
    { label: "Cek Pesanan", href: "/cek-pesanan" },
    { label: "Tentang Kami", href: "/tentang-kami" },
  ];

  return (
    <nav style={{ background: "rgba(19,19,43,0.95)", borderBottom: "1px solid #2A2A50", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: 800, background: "linear-gradient(135deg, #4ECDC4, #9B5DE5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            TakumaGS
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ color: "#8888AA", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500, transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#4ECDC4")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#8888AA")}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {user ? (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{ display: "flex", alignItems: "center", gap: "8px", background: "#1C1C3A", border: "1px solid #2A2A50", borderRadius: "9999px", padding: "6px 14px 6px 8px", cursor: "pointer", transition: "border-color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#4ECDC4")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#2A2A50")}
              >
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} style={{ width: "28px", height: "28px", borderRadius: "50%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg, #4ECDC4, #9B5DE5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <User size={14} color="#fff" />
                  </div>
                )}
                <span style={{ color: "#ffffff", fontSize: "0.875rem", fontWeight: 500 }}>
                  {user.name.split(" ")[0]}
                </span>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, background: "#1C1C3A", border: "1px solid #2A2A50", borderRadius: "12px", padding: "8px", minWidth: "180px", zIndex: 100 }}>
                  <div style={{ padding: "8px 12px", borderBottom: "1px solid #2A2A50", marginBottom: "4px" }}>
                    <div style={{ color: "#ffffff", fontSize: "0.875rem", fontWeight: 600 }}>{user.name}</div>
                    <div style={{ color: "#8888AA", fontSize: "0.75rem" }}>{user.email}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", background: "none", border: "none", color: "#FF6B6B", fontSize: "0.875rem", cursor: "pointer", borderRadius: "8px", transition: "background 0.2s" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,107,107,0.1)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "none")}
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              style={{ display: "flex", alignItems: "center", gap: "6px", color: "#ffffff", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500, padding: "8px 20px", borderRadius: "9999px", border: "2px solid #00F5A0", transition: "all 0.2s" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#00F5A0";
                (e.currentTarget as HTMLElement).style.color = "#13132B";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "#ffffff";
              }}
            >
              <LogIn size={16} /> Login
            </Link>
          )}

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer", display: "none" }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ background: "#1C1C3A", borderTop: "1px solid #2A2A50", padding: "16px 24px" }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
              style={{ display: "block", color: "#8888AA", textDecoration: "none", padding: "12px 0", borderBottom: "1px solid #2A2A50", fontSize: "0.95rem" }}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}