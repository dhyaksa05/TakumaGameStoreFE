'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// FIX 1: Tambahan wajib untuk TypeScript biar ngenalin window.snap bawaan Midtrans
declare global {
  interface Window {
    snap: any;
  }
}

export default function PembayaranPage() {
  const router = useRouter();
  
  // FIX 2: Kita butuh state untuk nyimpen token dari Midtrans, bukan cuma URL-nya
  const [snapToken, setSnapToken] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [statusTransaksi, setStatusTransaksi] = useState('PENDING');

  useEffect(() => {
    // FIX 3: Ambil snapToken dari localStorage. 
    // PASTIKAN di halaman sblmnya (pas nge-fetch API create transaction), lo nyimpen 'checkout_snapToken' ke localStorage!
    const savedToken = localStorage.getItem('checkout_snapToken'); 
    const savedId = localStorage.getItem('checkout_transactionId');

    if (savedToken && savedId) {
      setSnapToken(savedToken);
      setTransactionId(savedId);
    } else {
      alert("Tidak ada data transaksi aktif. Mengalihkan ke halaman utama.");
      router.push('/');
    }
  }, [router]);

  // FIX 4: Ini fungsi baru untuk memicu Pop-up Midtrans keluar!
  const handleBayarMidtrans = () => {
    if (!snapToken) return;

    window.snap.pay(snapToken, {
      onSuccess: function (result: any) {
        alert('Berhasil! Pembayaran selesai.');
        setStatusTransaksi('SUCCESS'); // Otomatis ubah UI jadi lunas
        console.log("Sukses:", result);
      },
      onPending: function (result: any) {
        alert('Menunggu pembayaran lo nih, cek QRIS di pop-up ya!');
        console.log("Pending:", result);
      },
      onError: function (result: any) {
        alert('Pembayaran gagal atau error!');
        console.log("Error:", result);
      },
      onClose: function () {
        alert('Pop-up ditutup sebelum bayar selesai.');
      }
    });
  };

  // AMAN: Fungsi bawaan lo gak gua sentuh sama sekali
  const handleSimulasiLunas = async () => {
    if (!transactionId) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081';
      const response = await fetch(`${apiUrl}/api/transactions/${transactionId}/status?status=SUCCESS`, {
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
        <p className="text-sm font-medium text-slate-300 mb-4">Silakan selesaikan pembayaran di bawah ini:</p>
        
        {/* FIX 5: Tag <img> diganti jadi tombol pemicu Pop-up Midtrans */}
        <button 
          onClick={handleBayarMidtrans}
          disabled={statusTransaksi === 'SUCCESS'}
          className={`w-full py-3 font-bold rounded-xl transition shadow-lg ${
            statusTransaksi === 'SUCCESS' 
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/20'
          }`}
        >
          Buka Pembayaran Midtrans
        </button>
      </div>

      <div>
        <p className="text-sm">
          Status Pembayaran:{' '}
          <span className={`font-bold uppercase px-3 py-1 rounded text-xs ${statusTransaksi === 'SUCCESS' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-slate-900'}`}>
            {statusTransaksi}
          </span>
        </p>
      </div>

      {/* AMAN: Tombol simulasi manual lo tetap ada di sini */}
      {statusTransaksi === 'PENDING' && (
        <div className="pt-4 border-t border-slate-800">
          <p className="text-xs text-slate-400 mb-2">Tombol bypass developer (bypass transaksi):</p>
          <button onClick={handleSimulasiLunas} className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded transition shadow">
            Simulasi Lunas
          </button>
        </div>
      )}

      {/* AMAN: Tombol hapus storage tetap ada */}
      <button 
        onClick={() => { 
          localStorage.removeItem('checkout_snapToken');
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