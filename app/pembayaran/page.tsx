'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PembayaranPage() {
  const router = useRouter();
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [statusTransaksi, setStatusTransaksi] = useState('PENDING');

  useEffect(() => {
    // Mengambil data QRIS yang disimpan sementara dari halaman detail game sebelumnya
    const savedQr = localStorage.getItem('checkout_qrCodeUrl');
    const savedId = localStorage.getItem('checkout_transactionId');

    if (savedQr && savedId) {
      setQrCodeUrl(savedQr);
      setTransactionId(savedId);
    } else {
      alert("Tidak ada data transaksi aktif. Mengalihkan ke halaman utama.");
      router.push('/');
    }
  }, [router]);

  // Fungsi untuk mengubah status menjadi SUCCESS (Simulasi Lunas) ke Backend Port 8081
  const handleSimulasiLunas = async () => {
    if (!transactionId) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions/${transactionId}/status?status=SUCCESS`, {
        method: 'PUT',
      });

      if (response.ok) {
        setStatusTransaksi('SUCCESS');
        alert('Berhasil! Status transaksi kini SUCCESS.');
      } else {
        alert('Gagal mengubah status transaksi.');
      }
    } catch (error) {
      console.error('Error simulasi:', error);
      alert('Gagal menghubungi server untuk mengubah status.');
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-slate-900 border border-slate-800 rounded-xl text-white text-center space-y-6 shadow-md">
      <h1 className="text-2xl font-bold text-blue-400">Invoice Pembayaran QRIS</h1>

      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
        <p className="text-xs text-slate-400 mb-1">ID Transaksi:</p>
        <p className="font-mono text-sm font-semibold text-yellow-400">{transactionId}</p>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-300 mb-2">Silakan scan QRIS di bawah ini:</p>
        <div className="bg-white p-4 rounded-lg inline-block shadow-inner">
          {qrCodeUrl && <img src={qrCodeUrl} alt="QRIS Simulator" className="w-48 h-48 mx-auto" />}
        </div>
      </div>

      <div>
        <p className="text-sm">
          Status Pembayaran:{' '}
          <span className={`font-bold uppercase px-3 py-1 rounded text-xs ${statusTransaksi === 'SUCCESS' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-slate-900'}`}>
            {statusTransaksi}
          </span>
        </p>
      </div>

      {statusTransaksi === 'PENDING' && (
        <div className="pt-4 border-t border-slate-800">
          <p className="text-xs text-slate-400 mb-2">Sudah scan QRIS? Silakan konfirmasi di bawah ini:</p>
          <button onClick={handleSimulasiLunas} className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded transition shadow">
            Lunas
          </button>
        </div>
      )}

      {/* AMAN: Hanya menghapus data transaksi kita saja, data Google login milik teman Anda TIDAK IKUT TERHAPUS */}
      <button 
        onClick={() => { 
          localStorage.removeItem('checkout_qrCodeUrl');
          localStorage.removeItem('checkout_transactionId');
          router.push('/'); 
        }} 
        className="text-sm text-slate-400 hover:text-white underline block mx-auto pt-2"
      >
        Kembali ke Beranda
      </button>
    </div>
  );
}
