'use client';

// Corrigido para resolver erros de tipos em ambiente sem dependências instaladas.

import { useState, useEffect } from 'react';
import CardVeiculo, { Veiculo } from '@/components/CardVeiculo';
import { mockVeiculos } from '@/data/mockVeiculos';

export default function GaragemPage() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('veiculos');
    if (saved) {
      setVeiculos(JSON.parse(saved));
    } else {
      setVeiculos(mockVeiculos);
      localStorage.setItem('veiculos', JSON.stringify(mockVeiculos));
    }
  }, []);

  const aptos = veiculos.filter((v) => v.status === 'Apto').length;
  const inaptos = veiculos.filter((v) => v.status === 'Inapto').length;
  const pendentes = veiculos.filter((v) => v.status === 'Pendente').length;

  const veiculosFiltrados = veiculos.filter(
    (v) =>
      v.placa.toLowerCase().includes(busca.toLowerCase()) ||
      v.modelo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Topo - Contadores Calculados */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
          <p className="text-xs text-slate-500 font-semibold uppercase">Total Aptos</p>
          <p className="text-2xl font-black text-green-600">{aptos}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
          <p className="text-xs text-slate-500 font-semibold uppercase">Inaptos</p>
          <p className="text-2xl font-black text-red-600">{inaptos}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
          <p className="text-xs text-slate-500 font-semibold uppercase">Pendentes</p>
          <p className="text-2xl font-black text-yellow-600">{pendentes}</p>
        </div>
      </div>

      {/* Barra de Busca em Tempo Real */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
        <input
          type="text"
          placeholder="Buscar por placa ou modelo..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {veiculosFiltrados.map((v) => (
          <CardVeiculo key={v.id} veiculo={v} />
        ))}
      </div>
    </div>
  );
}