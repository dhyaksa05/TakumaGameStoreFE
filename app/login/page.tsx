"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGoogleSuccess = async (credentialResponse: any) => {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken: credentialResponse.credential }),
            });

            if (!res.ok) throw new Error("Login gagal, coba lagi.");

            const user = await res.json();

            // Simpen data user ke localStorage
            localStorage.setItem("user", JSON.stringify(user));

            // Redirect ke homepage
            router.push("/");
        } catch (err: any) {
            setError(err.message || "Terjadi kesalahan, coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main
            style={{
                minHeight: "100vh",
                background: "#13132B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
            }}
        >
            {/* Background blobs */}
            <div style={{ position: "fixed", top: "-100px", right: "-100px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(155,93,229,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "fixed", bottom: "-100px", left: "-100px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(78,205,196,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

            <div style={{ width: "100%", maxWidth: "420px", position: "relative", zIndex: 1 }}>
                {/* Logo */}
                <div style={{ textAlign: "center", marginBottom: "32px" }}>
                    <Link href="/" style={{ textDecoration: "none" }}>
                        <span
                            style={{
                                fontSize: "2rem",
                                fontWeight: 900,
                                background: "linear-gradient(135deg, #4ECDC4, #9B5DE5)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            TakumaGS
                        </span>
                    </Link>
                    <div style={{ color: "#8888AA", fontSize: "0.875rem", marginTop: "8px" }}>
                        Login untuk menikmati benefit member
                    </div>
                </div>

                {/* Card */}
                <div
                    style={{
                        background: "#1C1C3A",
                        border: "1px solid #2A2A50",
                        borderRadius: "20px",
                        padding: "32px",
                    }}
                >
                    <h1 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#ffffff", marginBottom: "6px", textAlign: "center" }}>
                        Login to Your Account
                    </h1>
                    <p style={{ color: "#8888AA", fontSize: "0.875rem", textAlign: "center", marginBottom: "28px" }}>
                        Masuk dengan akun Google kamu
                    </p>

                    {/* Error */}
                    {error && (
                        <div
                            style={{
                                background: "rgba(255,107,107,0.1)",
                                border: "1px solid rgba(255,107,107,0.3)",
                                borderRadius: "10px",
                                padding: "12px 16px",
                                color: "#FF6B6B",
                                fontSize: "0.875rem",
                                marginBottom: "20px",
                                textAlign: "center",
                            }}
                        >
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Loading */}
                    {loading && (
                        <div style={{ textAlign: "center", color: "#4ECDC4", marginBottom: "20px", fontSize: "0.875rem" }}>
                            Memproses login...
                        </div>
                    )}

                    {/* Google Login Button */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "24px",
                        }}
                    >
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => setError("Login dengan Google gagal, coba lagi.")}
                            theme="filled_black"
                            shape="pill"
                            size="large"
                            text="signin_with"

                        />
                    </div>

                    {/* Divider */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "20px",
                        }}
                    >
                        <div style={{ flex: 1, borderTop: "1px solid #2A2A50" }} />
                        <span style={{ color: "#8888AA", fontSize: "0.75rem" }}>atau</span>
                        <div style={{ flex: 1, borderTop: "1px solid #2A2A50" }} />
                    </div>

                    {/* Guest topup */}
                    <Link
                        href="/#games"
                        style={{
                            display: "block",
                            textAlign: "center",
                            padding: "12px",
                            background: "transparent",
                            border: "1.5px solid #2A2A50",
                            borderRadius: "12px",
                            color: "#8888AA",
                            textDecoration: "none",
                            fontSize: "0.875rem",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = "#4ECDC4";
                            (e.currentTarget as HTMLElement).style.color = "#4ECDC4";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = "#2A2A50";
                            (e.currentTarget as HTMLElement).style.color = "#8888AA";
                        }}
                    >
                        🎮 Lanjut sebagai Guest
                    </Link>

                    <p style={{ textAlign: "center", color: "#8888AA", fontSize: "0.75rem", marginTop: "20px", lineHeight: 1.6 }}>
                        Dengan login, kamu menyetujui{" "}
                        <span style={{ color: "#4ECDC4" }}>Syarat & Ketentuan</span>{" "}
                        dan{" "}
                        <span style={{ color: "#4ECDC4" }}>Kebijakan Privasi</span>{" "}
                        Takuma Game Store.
                    </p>
                </div>

                {/* Back */}
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <Link
                        href="/"
                        style={{ color: "#8888AA", fontSize: "0.875rem", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#4ECDC4")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#8888AA")}
                    >
                        ← Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </main>
    );
}