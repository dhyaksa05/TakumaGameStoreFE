"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import GameCard from "./components/GameCard";
import Footer from "./components/Footer";
import { Search, Loader2 } from "lucide-react";

interface Category {
  id: number;
  name: string;
  code: string;
  imageUrl: string;
  isActive: boolean;
}

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
        if (!res.ok) throw new Error("Gagal mengambil data game");
        const data: Category[] = await res.json();
        // Filter hanya yang aktif
        setCategories(data.filter((c) => c.isActive));
      } catch (err) {
        setError("Tidak dapat terhubung ke server. Pastikan backend sudah berjalan.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main style={{ minHeight: "100vh", background: "#13132B" }}>
      <Navbar />
      <Hero />

      {/* Games section */}
      <section
        id="games"
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 60px" }}
      >
        {/* Section header */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "32px" }}>
          <div>
            <div
              style={{
                display: "inline-block",
                background: "rgba(78, 205, 196, 0.1)",
                border: "1px solid rgba(78, 205, 196, 0.3)",
                color: "#4ECDC4",
                fontSize: "0.7rem",
                fontWeight: 700,
                padding: "4px 12px",
                borderRadius: "9999px",
                marginBottom: "10px",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              🎮 Game Tersedia
            </div>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 800,
                color: "#ffffff",
              }}
            >
              Pilih Game Favoritmu
            </h2>
          </div>

          {/* Search */}
          <div style={{ position: "relative", maxWidth: "320px" }}>
            <Search
              size={16}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#8888AA",
              }}
            />
            <input
              type="text"
              placeholder="Cari game..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px 10px 36px",
                background: "#1C1C3A",
                border: "1px solid #2A2A50",
                borderRadius: "10px",
                color: "#ffffff",
                fontSize: "0.875rem",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "#4ECDC4")}
              onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "#2A2A50")}
            />
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#8888AA" }}>
            <Loader2
              size={40}
              style={{
                margin: "0 auto 16px",
                display: "block",
                animation: "spin 1s linear infinite",
                color: "#4ECDC4",
              }}
            />
            <div style={{ fontSize: "1rem" }}>Memuat daftar game...</div>
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 24px",
              background: "#1C1C3A",
              border: "1px solid rgba(255, 100, 100, 0.3)",
              borderRadius: "16px",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>⚠️</div>
            <div style={{ color: "#ffffff", fontWeight: 600, marginBottom: "8px" }}>
              Koneksi Gagal
            </div>
            <div style={{ color: "#8888AA", fontSize: "0.875rem", marginBottom: "20px" }}>
              {error}
            </div>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: "10px 24px",
                background: "transparent",
                border: "1.5px solid #4ECDC4",
                color: "#4ECDC4",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#8888AA" }}>
            <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🎮</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>
              {searchQuery ? "Game tidak ditemukan" : "Belum ada game tersedia"}
            </div>
            <div style={{ fontSize: "0.875rem", marginTop: "8px" }}>
              {searchQuery ? "Coba kata kunci lain" : "Tunggu update selanjutnya!"}
            </div>
          </div>
        )}

        {/* Game grid */}
        {!loading && !error && filtered.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "20px",
            }}
          >
            {filtered.map((game) => (
              <GameCard
                key={game.id}
                id={String(game.id)}
                name={game.name}
                slug={game.code}
                image={game.imageUrl || `/images/games/${game.code}.jpg`}
                category="Game"
              />
            ))}
          </div>
        )}
      </section>

      {/* Why us section */}
      <section
        style={{
          background: "#0E0E25",
          padding: "60px 24px",
          borderTop: "1px solid #2A2A50",
          borderBottom: "1px solid #2A2A50",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 800,
              color: "#ffffff",
              marginBottom: "8px",
            }}
          >
            Kenapa Pilih{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #4ECDC4, #9B5DE5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              TakumaGS?
            </span>
          </h2>
          <p style={{ color: "#8888AA", marginBottom: "48px" }}>
            Platform top up terpercaya untuk gamer Indonesia
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "24px",
            }}
          >
            {[
              { icon: "⚡", title: "Proses Cepat", desc: "Top up otomatis dalam hitungan detik" },
              { icon: "🔒", title: "100% Aman", desc: "Transaksi terlindungi & terenkripsi" },
              { icon: "💰", title: "Harga Terbaik", desc: "Harga kompetitif tanpa biaya tersembunyi" },
              { icon: "🎮", title: "50+ Game", desc: "Semua game populer tersedia disini" },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: "#1C1C3A",
                  border: "1px solid #2A2A50",
                  borderRadius: "16px",
                  padding: "28px 20px",
                  transition: "border-color 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#4ECDC4";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#2A2A50";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{item.icon}</div>
                <div style={{ color: "#ffffff", fontWeight: 700, marginBottom: "8px" }}>{item.title}</div>
                <div style={{ color: "#8888AA", fontSize: "0.875rem", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}