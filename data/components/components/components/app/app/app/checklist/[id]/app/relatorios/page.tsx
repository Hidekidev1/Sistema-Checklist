'use client';
import { useState, useEffect } from 'react';
import { mockVeiculos, mockHistoricoInicial } from '@/data/mockVeiculos';

export default function RelatoriosPage() {
  const [veiculos, setVeiculos] = useState<any[]>([]);
  const [historico, setHistorico] = useState<any[]>([]);

  useEffect(() => {
    const savedVeiculos = localStorage.getItem('veiculos');
    setVeiculos(savedVeiculos ? JSON.parse(savedVeiculos) : mockVeiculos);

    const savedHist = localStorage.getItem('historicoChecklists');
    setHistorico(savedHist ? JSON.parse(savedHist) : mockHistoricoInicial);
  }, []);

  
  const totalVeiculos = veiculos.length || 1;
  const aptosCount = veiculos.filter((v) => v.status === 'Apto').length;
  const pctApta = Math.round((aptosCount / totalVeiculos) * 100);
  const inaptosHoje = veiculos.filter((v) => v.status === 'Inapto').length;
  const pendentesCount = veiculos.filter((v) => v.status === 'Pendente').length;

  
  const rankingReprovados: { [key: string]: number } = {};
  historico.forEach((h) => {
    if (h.reprovados) {
      h.reprovados.forEach((item: string) => {
        rankingReprovados[item] = (rankingReprovados[item] || 0) + 1;
      });
    }
  });

  const totalReprovacoes = Object.values(rankingReprovados).reduce((a, b) => a + b, 0) || 1;
  const chartItems = Object.entries(rankingReprovados)
    .map(([nome, qtd]) => ({
      nome,
      qtd,
      pct: Math.round((qtd / totalReprovacoes) * 100),
    }))
    .sort((a, b) => b.qtd - a.qtd);

  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Painel do Gestor de Frota</h2>
        <button
          onClick={() => alert('Relatório exportado!')}
          className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Exportar PDF
        </button>
      </div>

      {/* 3 Cards de KPI Calculados */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">% Frota Apta</p>
          <p className="text-3xl font-black text-green-600 mt-1">{pctApta}%</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Inaptos Hoje</p>
          <p className="text-3xl font-black text-red-600 mt-1">{inaptosHoje}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Checklists Pendentes</p>
          <p className="text-3xl font-black text-yellow-600 mt-1">{pendentesCount}</p>
        </div>
      </div>

      
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-700 uppercase">Itens Mais Reprovados</h3>
        {chartItems.length === 0 ? (
          <p className="text-xs text-slate-400">Nenhuma reprovação registrada ainda.</p>
        ) : (
          <div className="space-y-3">
            {chartItems.map((item) => (
              <div key={item.nome} className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-700">
                  <span>{item.nome}</span>
                  <span>{item.pct}% ({item.qtd}x)</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-red-500 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tabela de Histórico */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-sm font-bold text-slate-700 uppercase">Histórico de Revisões de Hoje</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px]">
              <tr>
                <th className="p-3">Placa</th>
                <th className="p-3">Motorista</th>
                <th className="p-3">Horário</th>
                <th className="p-3">Status</th>
                <th className="p-3">Quem Reprovou</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {historico.map((h) => (
                <tr key={h.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-800">{h.placa}</td>
                  <td className="p-3">{h.motorista}</td>
                  <td className="p-3">{h.horario}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        h.status === 'Apto' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {h.status}
                    </span>
                  </td>
                  <td className="p-3 text-red-600 font-medium">
                    {h.reprovados && h.reprovados.length > 0 ? h.reprovados.join(', ') : 'Nenhum'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}