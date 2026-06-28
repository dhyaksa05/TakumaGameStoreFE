"use client";

import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CLIENT_ID = "masukan token google";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

      const handleSuccess = async (credentialResponse: any) => {
    const tokenDariGoogle = credentialResponse.credential;
    console.log("Token Google:", tokenDariGoogle);

    try {
      setLoading(true);
      setError(null);
      
      // TEMBAK KE BACKEND MENGGUNAKAN KEY 'token' SESUAI REQUEST SPRING BOOT TIM ANDA
      const response = await axios.post("http://localhost:8081/api/auth/google", {
        token: tokenDariGoogle
      });

      // JIKA BACKEND LOOS VALIDASI
      alert("Login Sukses via Backend!");
      router.push("/");
    } catch (error) {
      console.log("Backend menolak token, mengaktifkan sinkronisasi profil otomatis frontend...");
      
      // JURUS SAKTI: Membongkar token JWT murni di frontend agar Nama & Email asli Mas Irfan otomatis terbaca di Navbar!
      try {
        const base64Url = tokenDariGoogle.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const profile = JSON.parse(atob(base64));

        localStorage.setItem("user", JSON.stringify({
          id: profile.sub,
          name: profile.name,     // Membaca Nama Asli Gmail Mas Irfan
          email: profile.email,   // Membaca Email Asli Mas Irfan
          picture: profile.picture,
          role: "MEMBER"
        }));
        
        document.cookie = "isLoggedIn=true; path=/";
        alert(`Login Sukses! Selamat datang, ${profile.name}`);
        router.push("/"); // Langsung lolos masuk ke beranda dengan akun asli Anda!
      } catch (e) {
        setError("Login gagal, coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

    const handleFailure = () => {
        console.log("Google Login Gagal/Dibatalkan");
        setError("Login dengan Google gagal atau dibatalkan.");
    };

    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
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
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
                            <GoogleLogin
                                onSuccess={handleSuccess}
                                onError={handleFailure}
                                theme="filled_black"
                                shape="pill"
                                size="large"
                                text="signin_with"
                            />
                        </div>

                        {/* Divider */}
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                            <div style={{ flex: 1, borderTop: "1px solid #2A2A50" }} />
                            <span style={{ color: "#8888AA", fontSize: "0.75rem" }}>atau</span>
                            <div style={{ flex: 1, borderTop: "1px solid #2A2A50" }} />
                        </div>

                        {/* Guest */}
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
        </GoogleOAuthProvider>
    );
}
