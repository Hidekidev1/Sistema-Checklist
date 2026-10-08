'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ItemChecklist from '@/components/ItemChecklist';
import { mockVeiculos, mockHistoricoInicial } from '@/data/mockVeiculos';

interface ChecklistState {
  [key: string]: boolean;
}

const ITEMS_CONFIG = [
  {
    secao: 'Documentação',
    items: [
      { id: 'cnh', label: 'CNH Válida e Categoria Adequada' },
      { id: 'crlv', label: 'CRLV do Veículo em Dia' },
    ],
  },
  {
    secao: 'Segurança',
    items: [
      { id: 'freios', label: 'Freios' },
      { id: 'pneus', label: 'Pneus / Estepe' },
      { id: 'farois', label: 'Faróis e Lanternas' },
      { id: 'cinto', label: 'Cintos de Segurança' },
      { id: 'extintor', label: 'Extintor de Incêndio' },
    ],
  },
  {
    secao: 'Operacional',
    items: [
      { id: 'oleo', label: 'Nível de Óleo' },
      { id: 'agua', label: 'Nível de Água/Radiador' },
      { id: 'combustivel', label: 'Nível de Combustível' },
      { id: 'buzina', label: 'Buzina' },
      { id: 'limpador', label: 'Limpador de Pára-brisa' },
    ],
  },
];

export default function ChecklistPage() {
  const { id } = useParams();
  const router = useRouter();

  const [veiculo, setVeiculo] = useState<any>(null);
  const [observacoes, setObservacoes] = useState('');
  
  
  const [items, setItems] = useState<ChecklistState>({
    cnh: true, crlv: true, freios: true, pneus: true, farois: true,
    cinto: true, extintor: true, oleo: true, agua: true,
    combustivel: true, buzina: true, limpador: true,
  });

  useEffect(() => {
    const savedVeiculos = localStorage.getItem('veiculos');
    const list = savedVeiculos ? JSON.parse(savedVeiculos) : mockVeiculos;
    const v = list.find((item: any) => item.id === String(id));
    setVeiculo(v);
  }, [id]);

  const handleToggle = (itemId: string, value: boolean) => {
    setItems((prev) => ({ ...prev, [itemId]: value }));
  };

  const handleFinalizar = () => {
    if (!veiculo) return;

    
    const reprovados: string[] = [];
    ITEMS_CONFIG.forEach((sec) => {
      sec.items.forEach((i) => {
        if (!items[i.id]) {
          reprovados.push(i.label);
        }
      });
    });

    const novoStatus = reprovados.length > 0 ? 'Inapto' : 'Apto';
    const hoje = new Date().toLocaleDateString('pt-BR');
    const hora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    
    const savedVeiculos = localStorage.getItem('veiculos');
    const veiculosList = savedVeiculos ? JSON.parse(savedVeiculos) : mockVeiculos;
    const atualizados = veiculosList.map((v: any) =>
      v.id === veiculo.id ? { ...v, status: novoStatus, ultimaRevisao: hoje } : v
    );
    localStorage.setItem('veiculos', JSON.stringify(atualizados));

    
    const savedHistorico = localStorage.getItem('historicoChecklists');
    const historicoList = savedHistorico ? JSON.parse(savedHistorico) : mockHistoricoInicial;
    const novoRegistro = {
      id: Date.now().toString(),
      placa: veiculo.placa,
      motorista: veiculo.motorista,
      horario: hora,
      status: novoStatus,
      reprovados,
      observacoes,
    };
    localStorage.setItem('historicoChecklists', JSON.stringify([novoRegistro, ...historicoList]));

    alert('Checklist salvo!');
    router.push('/relatorios');
  };

  if (!veiculo) {
    return <div className="p-4 text-center text-slate-500">Carregando veículo...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-6">
      {/* Cabeçalho */}
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-slate-800">{veiculo.placa}</h2>
        <p className="text-slate-500 font-medium">{veiculo.modelo} - Motorista: {veiculo.motorista}</p>
      </div>

      
      <div className="space-y-6">
        {ITEMS_CONFIG.map((secao) => (
          <div key={secao.secao} className="space-y-3">
            <h3 className="text-sm font-bold uppercase text-slate-500 tracking-wider">{secao.secao}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {secao.items.map((item) => (
                <ItemChecklist
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  checked={items[item.id]}
                  onChange={handleToggle}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      
      <div className="space-y-4 pt-4 border-t">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Foto do Hodômetro</label>
          <input
            type="file"
            accept="image/*"
            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Observações</label>
          <textarea
            rows={3}
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            placeholder="Relate falhas ou observações extras..."
            className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      
      <button
        onClick={handleFinalizar}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors text-center"
      >
        Finalizar Revisão
      </button>
    </div>
  );
}