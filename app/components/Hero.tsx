"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "500px",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        padding: "60px 24px",
      }}
    >
      {/* Background blobs */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(155, 93, 229, 0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "-50px",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(78, 205, 196, 0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "48px",
          alignItems: "center",
        }}
      >
        {/* Text */}
        <div>
          <div
            style={{
              display: "inline-block",
              background: "rgba(78, 205, 196, 0.1)",
              border: "1px solid rgba(78, 205, 196, 0.3)",
              color: "#4ECDC4",
              fontSize: "0.75rem",
              fontWeight: 600,
              padding: "6px 14px",
              borderRadius: "9999px",
              marginBottom: "20px",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            ⚡ Top Up Cepat & Aman
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: "16px",
              color: "#ffffff",
            }}
          >
            Welcome to 👋{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #4ECDC4, #9B5DE5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "block",
              }}
            >
              Takuma
              <br />
              Game Store
            </span>
          </h1>

          <p
            style={{
              color: "#8888AA",
              fontSize: "1rem",
              lineHeight: 1.7,
              marginBottom: "32px",
              maxWidth: "420px",
            }}
          >
            Aplikasi terbaik untuk memenuhi kebutuhan bermain Game anda!
            Top up murah, cepat, dan terpercaya untuk semua game favorit kamu.
          </p>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <a
              href="#games"
              style={{
                padding: "12px 32px",
                background: "linear-gradient(135deg, #4ECDC4, #9B5DE5)",
                color: "#ffffff",
                borderRadius: "9999px",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "0.95rem",
                transition: "opacity 0.2s, transform 0.2s",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "0.9";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Top Up Sekarang
            </a>
            <Link
              href="/cek-pesanan"
              style={{
                padding: "12px 32px",
                background: "transparent",
                color: "#ffffff",
                borderRadius: "9999px",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: "0.95rem",
                border: "2px solid #2A2A50",
                transition: "all 0.2s",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#4ECDC4";
                (e.currentTarget as HTMLElement).style.color = "#4ECDC4";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#2A2A50";
                (e.currentTarget as HTMLElement).style.color = "#ffffff";
              }}
            >
              Cek Pesanan
            </Link>
          </div>
        </div>

        {/* Logo kanan */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Glow ring */}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "320px",
                height: "320px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(155, 93, 229, 0.25) 0%, transparent 70%)",
              }}
            />
            {/* Logo placeholder — ganti src dengan path logo asli lo */}
            <img
              src="/logo.png"
              alt="Takuma Game Store"
              style={{
                width: "240px",
                height: "240px",
                objectFit: "contain",
                position: "relative",
                zIndex: 1,
                filter: "drop-shadow(0 0 40px rgba(78, 205, 196, 0.4))",
              }}
              onError={(e) => {
                // Fallback: tampilkan teks logo kalau file belum ada
                const el = e.currentTarget as HTMLImageElement;
                el.style.display = "none";
                const fallback = el.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = "flex";
              }}
            />
            {/* Fallback teks kalau logo.png belum ada */}
            <div
              style={{
                display: "none",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                border: "3px solid #2A2A50",
                position: "relative",
                zIndex: 1,
              }}
            >
              <span
                style={{
                  fontSize: "3rem",
                  fontWeight: 900,
                  background: "linear-gradient(135deg, #4ECDC4, #9B5DE5)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1,
                }}
              >
                TGS
              </span>
              <span style={{ color: "#8888AA", fontSize: "0.75rem", marginTop: "4px" }}>
                Takuma Game Store
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
