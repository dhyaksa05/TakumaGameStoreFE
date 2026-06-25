import Link from "next/link";
import Image from "next/image";

interface GameCardProps {
  id: string;
  name: string;
  slug: string;
  image: string;
  category: string;
  badge?: string; // e.g. "HOT", "NEW"
}

export default function GameCard({
  name,
  slug,
  image,
  category,
  badge,
}: GameCardProps) {
  return (
    <Link href={`/game/${slug}`} style={{ textDecoration: "none" }}>
      <div className="game-card" style={{ position: "relative" }}>
        {/* Badge */}
        {badge && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background:
                badge === "HOT"
                  ? "linear-gradient(135deg, #FF6B6B, #FF8E53)"
                  : "linear-gradient(135deg, #4ECDC4, #9B5DE5)",
              color: "#fff",
              fontSize: "0.65rem",
              fontWeight: 700,
              padding: "3px 8px",
              borderRadius: "6px",
              letterSpacing: "0.5px",
              zIndex: 1,
            }}
          >
            {badge}
          </div>
        )}

        {/* Game image */}
        <div
          style={{
            width: "100%",
            aspectRatio: "1/1",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src={image}
            alt={name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.transform = "scale(1)")
            }
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              background:
                "linear-gradient(to top, #1C1C3A, transparent)",
            }}
          />
        </div>

        {/* Info */}
        <div style={{ padding: "12px 14px 16px" }}>
          <div
            style={{
              fontSize: "0.7rem",
              color: "#4ECDC4",
              fontWeight: 600,
              letterSpacing: "0.5px",
              marginBottom: "4px",
              textTransform: "uppercase",
            }}
          >
            {category}
          </div>
          <div
            style={{
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "0.9rem",
              lineHeight: 1.3,
              marginBottom: "14px",
            }}
          >
            {name}
          </div>
          <button
            style={{
              width: "100%",
              padding: "8px",
              background: "transparent",
              border: "1.5px solid #00F5A0",
              color: "#00F5A0",
              borderRadius: "8px",
              fontSize: "0.8rem",
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.5px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#00F5A0";
              (e.currentTarget as HTMLElement).style.color = "#13132B";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "#00F5A0";
            }}
          >
            TOP UP
          </button>
        </div>
      </div>
    </Link>
  );
}
