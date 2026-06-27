'use client';

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

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

  const fetchSemuaTransaksi = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions`);
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

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto my-10 p-6 bg-slate-900 border border-slate-800 rounded-xl text-white space-y-6 shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-400">📋 Semua Riwayat Transaksi</h1>
          <p className="text-xs text-slate-400 mt-1">Daftar pemantauan status transaksi real-time terintegrasi database</p>
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
                  <tr key={trx.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-4 py-3 font-mono font-semibold text-yellow-400">{trx.id}</td>
                    <td className="px-4 py-3 text-slate-200">
                      {trx.targetId || trx.userId} <span className="text-slate-500 text-xs">({trx.zoneId || '-'})</span>
                    </td>
                    <td className="px-4 py-3 text-xs font-medium text-slate-400">{trx.paymentMethod}</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-block font-bold uppercase px-3 py-1 rounded text-[10px] tracking-wider ${
                          trx.status === 'SUCCESS'
                            ? 'bg-green-500 text-white shadow'
                            : 'bg-yellow-500 text-slate-900 shadow'
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
    </>
  );
}
