'use client';

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
// 1. Mengimpor generator QR Code SVG asli, anti-blokir browser!
// PASTIKAN LO UDAH JALANIN: npm install qrcode.react
import { QRCodeSVG } from 'qrcode.react'; 

interface Transaksi {
  id: string;
  userId: string;
  targetId: string;
  zoneId: string;
  status: string;
  paymentMethod: string;
}

export default function CekPesananPage() {
  const [daftarTransaksi, setDaftarTransaksi] = useState<Transaksi[]>([]);
  const [loading, setLoading] = useState(true);
  const [idTerpilih, setIdTerpilih] = useState<string | null>(null);

  const fetchSemuaTransaksi = async () => {
    try {
      // FIX 1: Kasih fallback URL localhost:8081 biar gak nembak ke undefined
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081';
      const response = await fetch(`${apiUrl}/api/transactions`);
      
      if (response.ok) {
        const data = await response.json();
        setDaftarTransaksi(Array.isArray(data) ? data.reverse() : []);
      }
    } catch (error) {
      console.error('Error fetch semua transaksi:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSemuaTransaksi();
    const interval = setInterval(fetchSemuaTransaksi, 3000);
    return () => clearInterval(interval);
  }, []);

  // FIX 2: Konversi kedua ID jadi String biar gak eror pas dicocokkan (Number vs String)
  const transaksiTerpilih = daftarTransaksi.find((t) => String(t.id) === String(idTerpilih));

  const handleSimulasiLunasDariRiwayat = async (id: string) => {
    try {
      // FIX 1: Kasih fallback URL localhost:8081 juga di sini
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081';
      const response = await fetch(`${apiUrl}/api/transactions/${id}/status?status=SUCCESS`, {
        method: 'PUT',
      });

      if (response.ok) {
        alert(`Transaksi #${id} Berhasil Dilunasi!`);
        fetchSemuaTransaksi();
      } else {
        alert('Gagal mengubah status transaksi.');
      }
    } catch (error) {
      console.error('Error simulasi:', error);
      alert('Gagal menghubungi server.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto my-10 p-6 bg-slate-900 border border-slate-800 rounded-xl text-white space-y-6 shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-400">📋 Semua Riwayat Transaksi</h1>
          <p className="text-xs text-slate-400 mt-1">Klik pada baris transaksi berstatus PENDING untuk memproses pembayaran</p>
        </div>

        {loading ? (
          <p className="text-center text-sm text-slate-400">Memuat riwayat transaksi...</p>
        ) : daftarTransaksi.length === 0 ? (
          <p className="text-center text-sm text-slate-400 py-6">Belum ada riwayat transaksi di database.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-800 shadow">
            <table className="w-full text-sm text-left text-slate-300">
              <thead className="text-xs text-slate-400 uppercase bg-slate-800/80 border-b border-slate-700">
                <tr>
                  <th className="px-4 py-3">ID Transaksi</th>
                  <th className="px-4 py-3">User (Zone ID)</th>
                  <th className="px-4 py-3">Metode</th>
                  <th className="px-4 py-3 text-center">Status Pembayaran</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {daftarTransaksi.map((trx) => (
                  <tr 
                    key={trx.id} 
                    onClick={() => setIdTerpilih(String(trx.id))} // FIX 2: Pastikan yang diset adalah String
                    className="hover:bg-slate-800/60 cursor-pointer transition"
                  >
                    <td className="px-4 py-3 font-mono font-semibold text-yellow-400">#{trx.id}</td>
                    <td className="px-4 py-3 text-slate-200">
                      {trx.targetId || trx.userId} <span className="text-slate-500 text-xs">({trx.zoneId || '-'})</span>
                    </td>
                    <td className="px-4 py-3 text-xs font-medium text-slate-400">{trx.paymentMethod}</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-block font-bold uppercase px-3 py-1 rounded text-[10px] tracking-wider ${
                          trx.status === 'SUCCESS'
                            ? 'bg-green-500 text-white shadow'
                            : 'bg-yellow-500 text-slate-900 shadow animate-pulse'
                        }`}
                      >
                        {trx.status === 'SUCCESS' ? 'LUNAS' : 'PENDING'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {idTerpilih && transaksiTerpilih && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-md w-full text-white text-center space-y-4 shadow-2xl relative">
            
            <button 
              onClick={() => setIdTerpilih(null)}
              className="absolute top-3 right-4 text-slate-400 hover:text-white text-xl font-bold p-2 transition"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-blue-400">Detail Transaksi #{transaksiTerpilih.id}</h3>
            
            <div className="bg-slate-800 p-3 rounded-lg text-xs space-y-1 text-left border border-slate-700 font-mono">
              <p><span className="text-slate-400">User ID:</span> {transaksiTerpilih.targetId || transaksiTerpilih.userId}</p>
              <p><span className="text-slate-400">Zone ID:</span> {transaksiTerpilih.zoneId || '-'}</p>
              <p><span className="text-slate-400">Metode:</span> {transaksiTerpilih.paymentMethod}</p>
            </div>

            {/* 2. GENERATOR KODE QR ASLI DAN RAPAT: Digambar langsung lewat kode program lokal, 100% WAJIB MUNCUL */}
            <div className="bg-white p-4 rounded-xl inline-block my-2 mx-auto shadow-inner">
              <QRCodeSVG 
                value={`https://takumagamestore.com${transaksiTerpilih.id}`} 
                size={170}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"M"}
              />
            </div>

            <div>
              <p className="text-xs text-slate-400 mb-2">Status Saat Ini:</p>
              <span className={`font-bold uppercase px-4 py-1 rounded text-xs ${transaksiTerpilih.status === 'SUCCESS' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-slate-900'}`}>
                {transaksiTerpilih.status === 'SUCCESS' ? '🟢 LUNAS' : '⏳ PENDING'}
              </span>
            </div>

            {transaksiTerpilih.status === 'PENDING' && (
              <button
                onClick={() => handleSimulasiLunasDariRiwayat(transaksiTerpilih.id)}
                className="w-full mt-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition shadow-lg"
              >
                Set Lunas (Proses Selesai)
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}