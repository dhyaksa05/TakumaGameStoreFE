import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #2A2A50",
        marginTop: "80px",
        padding: "48px 24px 32px",
        background: "#0E0E25",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "40px",
            marginBottom: "40px",
          }}
        >
          {/* Brand */}
          <div>
            <span
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                background: "linear-gradient(135deg, #4ECDC4, #9B5DE5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "block",
                marginBottom: "12px",
              }}
            >
              TakumaGS
            </span>
            <p style={{ color: "#8888AA", fontSize: "0.875rem", lineHeight: 1.7, maxWidth: "280px" }}>
              Platform top up game terpercaya untuk semua gamer Indonesia.
              Cepat, aman, dan harga terbaik.
            </p>
          </div>

          {/* Links */}
          <div>
            <div style={{ color: "#ffffff", fontWeight: 600, marginBottom: "16px", fontSize: "0.9rem" }}>
              Navigasi
            </div>
            {[
              { label: "Beranda", href: "/" },
              { label: "Cek Pesanan", href: "/cek-pesanan" },
              { label: "Tentang Kami", href: "/tentang-kami" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "block",
                  color: "#8888AA",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  marginBottom: "8px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#4ECDC4")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#8888AA")}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Support */}
          <div>
            <div style={{ color: "#ffffff", fontWeight: 600, marginBottom: "16px", fontSize: "0.9rem" }}>
              Dukungan
            </div>
            {[
              { label: "FAQ", href: "#" },
              { label: "Hubungi Kami", href: "#" },
              { label: "Syarat & Ketentuan", href: "#" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  display: "block",
                  color: "#8888AA",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  marginBottom: "8px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#4ECDC4")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#8888AA")}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid #2A2A50",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <span style={{ color: "#8888AA", fontSize: "0.8rem" }}>
            © 2025 Takuma Game Store. All rights reserved.
          </span>
          <span style={{ color: "#8888AA", fontSize: "0.8rem" }}>
            Kelompok 13 — Kewirausahaan Berbasis Teknologi
          </span>
        </div>
      </div>
    </footer>
  );
}
