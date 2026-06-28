'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// 1. Mengimpor generator QR Code lokal asli, anti-blokir browser internet!
import { QRCodeSVG } from 'qrcode.react'; 

export default function PembayaranPage() {
  const router = useRouter();
  const [transactionId, setTransactionId] = useState<string>('');
  const [statusTransaksi, setStatusTransaksi] = useState<string>('PENDING');

  useEffect(() => {
    // Mengambil data ID transaksi yang disimpan di memori browser sebelumnya
    const id = localStorage.getItem('checkout_transactionId') || 'TRX-UNKNOWN';
    setTransactionId(id);
  }, []);

  const handleSimulasiLunas = () => {
    setStatusTransaksi('SUCCESS');
    alert(`Simulasi Pembayaran untuk ${transactionId} Berhasil Dilunasi!`);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-white">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-6 rounded-2xl text-center space-y-6 shadow-2xl">
        
        <div>
          <h1 className="text-xl font-bold text-blue-400">Invoice Pembayaran QRIS</h1>
          <div className="bg-slate-800 p-3 rounded-lg text-xs border border-slate-700 font-mono mt-3 inline-block">
            <span className="text-slate-400">ID Transaksi:</span> <span className="text-yellow-400 font-bold">{transactionId}</span>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-300 mb-3">Silakan scan QRIS di bawah ini:</p>
          
          {/* 2. GENERATOR QR LOKAL MURNI: Digambar langsung lewat kode HTML SVG, 100% WAJIB MUNCUL KOTAK HITAM PUTIH ASLI */}
          <div className="bg-white p-4 rounded-xl inline-block my-2 mx-auto shadow-inner">
            <QRCodeSVG 
              value={`TakumaStore_Invoice_${transactionId}`} 
              size={170}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"M"}
            />
          </div>
        </div>

        <div>
          <p className="text-xs text-slate-400 mb-2">Status Pembayaran:</p>
          <span
            className={`inline-block font-bold uppercase px-4 py-1 rounded text-xs tracking-wider ${
              statusTransaksi === 'SUCCESS'
                ? 'bg-green-500 text-white shadow'
                : 'bg-yellow-500 text-slate-900 shadow animate-pulse'
            }`}
          >
            {statusTransaksi === 'SUCCESS' ? '🟢 LUNAS' : '⏳ PENDING'}
          </span>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={handleSimulasiLunas}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition shadow-lg"
          >
            Lunas
          </button>

          <button
            onClick={() => router.push('/')}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs text-slate-400 transition"
          >
            Kembali ke Beranda
          </button>
        </div>

      </div>
    </div>
  );
}
