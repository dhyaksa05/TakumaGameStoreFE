"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ChevronLeft, Diamond, AlertCircle } from "lucide-react";
import Link from "next/link";

interface Product {
    id: number;
    name: string;
    sku: string;
    price: number;
    isAvailable: boolean;
}

interface Category {
    id: number;
    name: string;
    code: string;
    imageUrl: string;
}

interface FormErrors {
    targetId?: string;
    zoneId?: string;
    product?: string;
}

const dummyProducts: Product[] = [
    { id: 1, name: "86 Diamonds", sku: "ML86", price: 19000, isAvailable: true },
    { id: 2, name: "172 Diamonds", sku: "ML172", price: 36000, isAvailable: true },
    { id: 3, name: "257 Diamonds", sku: "ML257", price: 54000, isAvailable: true },
    { id: 4, name: "344 Diamonds", sku: "ML344", price: 72000, isAvailable: true },
    { id: 5, name: "514 Diamonds", sku: "ML514", price: 108000, isAvailable: true },
    { id: 6, name: "706 Diamonds", sku: "ML706", price: 144000, isAvailable: true },
    { id: 7, name: "878 Diamonds", sku: "ML878", price: 180000, isAvailable: true },
    { id: 8, name: "1412 Diamonds", sku: "ML1412", price: 288000, isAvailable: true },
    { id: 9, name: "2195 Diamonds", sku: "ML2195", price: 432000, isAvailable: true },
    { id: 10, name: "3688 Diamonds", sku: "ML3688", price: 720000, isAvailable: true },
];

export default function TopupPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const [category, setCategory] = useState<Category | null>(null);
    const [products, setProducts] = useState<Product[]>(dummyProducts);
    const [loadingCategory, setLoadingCategory] = useState(true);

    const [targetId, setTargetId] = useState("");
    const [zoneId, setZoneId] = useState("");
    const [email, setEmail] = useState("");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState({ targetId: false, zoneId: false });

    const formatRupiah = (num: number) =>
        new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);

    // Validasi realtime
    useEffect(() => {
        const newErrors: FormErrors = {};
        if (touched.targetId) {
            if (!targetId) newErrors.targetId = "User ID wajib diisi";
            else if (!/^\d+$/.test(targetId)) newErrors.targetId = "User ID hanya boleh berisi angka";
            else if (targetId.length < 6) newErrors.targetId = "User ID minimal 6 digit";
        }
        if (touched.zoneId) {
            if (!zoneId) newErrors.zoneId = "Zone / Server ID wajib diisi";
            else if (!/^\d+$/.test(zoneId)) newErrors.zoneId = "Zone ID hanya boleh berisi angka";
        }
        setErrors(newErrors);
    }, [targetId, zoneId, touched]);

    // Fetch category & products
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
                if (res.ok) {
                    const data: Category[] = await res.json();
                    const found = data.find((c) => c.code === slug);
                    if (found) {
                        setCategory(found);
                        const prodRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/category/${found.id}`);
                        if (prodRes.ok) {
                            const prodData: Product[] = await prodRes.json();
                            if (prodData.length > 0) setProducts(prodData.filter((p) => p.isAvailable));
                        }
                    }
                }
            } catch {
                // fallback dummy
            } finally {
                setLoadingCategory(false);
            }
        };
        fetchData();
    }, [slug]);

    const validateAll = (): boolean => {
        setTouched({ targetId: true, zoneId: true });
        const newErrors: FormErrors = {};
        if (!targetId) newErrors.targetId = "User ID wajib diisi";
        else if (!/^\d+$/.test(targetId)) newErrors.targetId = "User ID hanya boleh berisi angka";
        else if (targetId.length < 6) newErrors.targetId = "User ID minimal 6 digit";
        if (!zoneId) newErrors.zoneId = "Zone / Server ID wajib diisi";
        else if (!/^\d+$/.test(zoneId)) newErrors.zoneId = "Zone ID hanya boleh berisi angka";
        if (!selectedProduct) newErrors.product = "Pilih nominal diamond terlebih dahulu";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBayar = () => {
        if (!validateAll()) return;
        const query = new URLSearchParams({
            productId: String(selectedProduct!.id),
            productName: selectedProduct!.name,
            price: String(selectedProduct!.price),
            targetId,
            zoneId,
            email,
            gameName: category?.name || slug,
        });
        router.push(`/checkout?${query.toString()}`);
    };

    const inputStyle = (hasError: boolean) => ({
        width: "100%",
        padding: "12px 14px",
        background: "#13132B",
        border: `1.5px solid ${hasError ? "#FF6B6B" : "#2A2A50"}`,
        borderRadius: "10px",
        color: "#ffffff",
        fontSize: "0.9rem",
        outline: "none",
        transition: "border-color 0.2s",
    });

    const ErrorMsg = ({ msg }: { msg?: string }) =>
        msg ? (
            <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#FF6B6B", fontSize: "0.75rem", marginTop: "6px" }}>
                <AlertCircle size={13} /> {msg}
            </div>
        ) : null;

    const StepBadge = ({ num }: { num: number }) => (
        <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg, #4ECDC4, #9B5DE5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 700, color: "#fff", flexShrink: 0 }}>
            {num}
        </div>
    );

    const cardStyle = { background: "#1C1C3A", border: "1px solid #2A2A50", borderRadius: "16px", padding: "20px" };

    return (
        <main style={{ minHeight: "100vh", background: "#13132B" }}>
            <Navbar />
            <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px 80px" }}>

                {/* Back */}
                <Link
                    href="/"
                    style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#8888AA", textDecoration: "none", fontSize: "0.875rem", marginBottom: "24px", transition: "color 0.2s" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#4ECDC4")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#8888AA")}
                >
                    <ChevronLeft size={16} /> Kembali ke Beranda
                </Link>

                {/* Game Header */}
                <div style={{ ...cardStyle, display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                    <img
                        src={category?.imageUrl || `/images/games/${slug}.jpg`}
                        alt={category?.name || slug}
                        style={{ width: "72px", height: "72px", borderRadius: "14px", objectFit: "cover", border: "2px solid #2A2A50" }}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                    />
                    <div>
                        {loadingCategory ? (
                            <div style={{ color: "#8888AA" }}>Memuat...</div>
                        ) : (
                            <>
                                <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#ffffff" }}>{category?.name || slug}</div>
                                <div style={{ color: "#8888AA", fontSize: "0.875rem", marginTop: "4px" }}>Top up langsung ke akun kamu • Proses otomatis</div>
                            </>
                        )}
                    </div>
                    <div style={{ marginLeft: "auto", background: "rgba(0,245,160,0.1)", border: "1px solid rgba(0,245,160,0.3)", color: "#00F5A0", fontSize: "0.7rem", fontWeight: 700, padding: "4px 12px", borderRadius: "9999px" }}>
                        ⚡ AKTIF
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "24px", alignItems: "start" }}>
                    {/* LEFT */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                        {/* Step 1 - Input ID */}
                        <div style={cardStyle}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                                <StepBadge num={1} />
                                <span style={{ fontWeight: 700, color: "#ffffff", fontSize: "1rem" }}>Masukkan ID Game</span>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                                <div>
                                    <label style={{ display: "block", color: "#8888AA", fontSize: "0.78rem", fontWeight: 600, marginBottom: "6px", letterSpacing: "0.5px", textTransform: "uppercase" }}>
                                        User ID *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Contoh: 123456789"
                                        value={targetId}
                                        onChange={(e) => setTargetId(e.target.value)}
                                        onBlur={() => setTouched((t) => ({ ...t, targetId: true }))}
                                        style={inputStyle(!!errors.targetId)}
                                        onFocus={(e) => { if (!errors.targetId) (e.target as HTMLElement).style.borderColor = "#4ECDC4"; }}
                                    />
                                    <ErrorMsg msg={errors.targetId} />
                                </div>
                                <div>
                                    <label style={{ display: "block", color: "#8888AA", fontSize: "0.78rem", fontWeight: 600, marginBottom: "6px", letterSpacing: "0.5px", textTransform: "uppercase" }}>
                                        Zone / Server ID *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Contoh: 2345"
                                        value={zoneId}
                                        onChange={(e) => setZoneId(e.target.value)}
                                        onBlur={() => setTouched((t) => ({ ...t, zoneId: true }))}
                                        style={inputStyle(!!errors.zoneId)}
                                        onFocus={(e) => { if (!errors.zoneId) (e.target as HTMLElement).style.borderColor = "#4ECDC4"; }}
                                    />
                                    <ErrorMsg msg={errors.zoneId} />
                                </div>
                            </div>
                        </div>

                        {/* Step 2 - Pilih Nominal */}
                        <div style={cardStyle}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                                <StepBadge num={2} />
                                <span style={{ fontWeight: 700, color: "#ffffff", fontSize: "1rem" }}>Pilih Nominal</span>
                            </div>
                            {errors.product && (
                                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#FF6B6B", fontSize: "0.8rem", marginBottom: "12px", padding: "10px 14px", background: "rgba(255,107,107,0.08)", border: "1px solid rgba(255,107,107,0.2)", borderRadius: "8px" }}>
                                    <AlertCircle size={14} /> {errors.product}
                                </div>
                            )}
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "10px" }}>
                                {products.map((product) => {
                                    const isSelected = selectedProduct?.id === product.id;
                                    return (
                                        <div
                                            key={product.id}
                                            onClick={() => { setSelectedProduct(product); setErrors((e) => ({ ...e, product: undefined })); }}
                                            style={{ padding: "14px 12px", background: isSelected ? "rgba(78,205,196,0.1)" : "#13132B", border: isSelected ? "2px solid #4ECDC4" : "1.5px solid #2A2A50", borderRadius: "12px", cursor: "pointer", transition: "all 0.2s", textAlign: "center" }}
                                            onMouseEnter={(e) => { if (!isSelected) (e.currentTarget as HTMLElement).style.borderColor = "#4ECDC4"; }}
                                            onMouseLeave={(e) => { if (!isSelected) (e.currentTarget as HTMLElement).style.borderColor = "#2A2A50"; }}
                                        >
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", marginBottom: "6px" }}>
                                                <Diamond size={13} style={{ color: isSelected ? "#4ECDC4" : "#8888AA" }} />
                                                <span style={{ color: isSelected ? "#4ECDC4" : "#ffffff", fontWeight: 700, fontSize: "0.9rem" }}>
                                                    {product.name.replace(" Diamonds", "")}
                                                </span>
                                            </div>
                                            <div style={{ color: isSelected ? "#00F5A0" : "#8888AA", fontSize: "0.75rem", fontWeight: 600 }}>
                                                {formatRupiah(product.price)}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Step 3 - Email */}
                        <div style={cardStyle}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                                <StepBadge num={3} />
                                <span style={{ fontWeight: 700, color: "#ffffff", fontSize: "1rem" }}>
                                    Email <span style={{ color: "#8888AA", fontWeight: 400, fontSize: "0.85rem" }}>(opsional)</span>
                                </span>
                            </div>
                            <input
                                type="email"
                                placeholder="email@contoh.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={inputStyle(false)}
                                onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "#4ECDC4")}
                                onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "#2A2A50")}
                            />
                            <div style={{ color: "#8888AA", fontSize: "0.78rem", marginTop: "8px" }}>
                                Notifikasi transaksi akan dikirim ke email ini
                            </div>
                        </div>
                    </div>

                    {/* RIGHT - Ringkasan */}
                    <div style={{ ...cardStyle, position: "sticky", top: "80px" }}>
                        <div style={{ fontWeight: 700, color: "#ffffff", marginBottom: "16px" }}>Ringkasan Pesanan</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "16px" }}>
                            {[
                                { label: "Game", value: category?.name || slug },
                                { label: "Item", value: selectedProduct ? selectedProduct.name : "-" },
                                { label: "User ID", value: targetId || "-" },
                                { label: "Zone ID", value: zoneId || "-" },
                            ].map((row) => (
                                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
                                    <span style={{ color: "#8888AA", fontSize: "0.83rem" }}>{row.label}</span>
                                    <span style={{ color: "#ffffff", fontSize: "0.83rem", fontWeight: 500, textAlign: "right", wordBreak: "break-all" }}>{row.value}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ borderTop: "1px solid #2A2A50", paddingTop: "14px", marginBottom: "20px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ color: "#ffffff", fontWeight: 700 }}>Total</span>
                                <span style={{ color: "#00F5A0", fontWeight: 800, fontSize: "1.1rem" }}>
                                    {selectedProduct ? formatRupiah(selectedProduct.price) : "Rp 0"}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={handleBayar}
                            style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg, #4ECDC4, #9B5DE5)", border: "none", borderRadius: "12px", color: "#ffffff", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", transition: "opacity 0.2s" }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.9")}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                        >
                            Bayar Sekarang →
                        </button>
                        <div style={{ textAlign: "center", color: "#8888AA", fontSize: "0.75rem", marginTop: "12px" }}>
                            🔒 Transaksi aman & terenkripsi
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}