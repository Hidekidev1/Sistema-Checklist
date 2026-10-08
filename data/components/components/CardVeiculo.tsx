'use client';
import * as React from 'react';

export interface Veiculo {
  id: string;
  placa: string;
  modelo: string;
  motorista: string;
  status: 'Apto' | 'Inapto' | 'Pendente';
  ultimaRevisao: string;
}

export default function CardVeiculo({ veiculo }: { veiculo: Veiculo }) {
  const badgeColor = {
    Apto: 'bg-green-100 text-green-800 border-green-400',
    Inapto: 'bg-red-100 text-red-800 border-red-400',
    Pendente: 'bg-yellow-100 text-yellow-800 border-yellow-400',
  }[veiculo.status];

  return React.createElement(
    'div',
    { className: 'bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between' },
    React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'flex justify-between items-start mb-2' },
        React.createElement(
          'div',
          null,
          React.createElement('h2', { className: 'text-lg font-bold text-slate-800' }, veiculo.placa),
          React.createElement('p', { className: 'text-xs text-slate-500' }, veiculo.modelo),
        ),
        React.createElement(
          'span',
          { className: `px-2 py-0.5 text-xs font-semibold rounded-full border ${badgeColor}` },
          veiculo.status,
        ),
      ),
      React.createElement(
        'div',
        { className: 'text-xs text-slate-600 space-y-1 mb-4' },
        React.createElement(
          'p',
          null,
          React.createElement('strong', { className: 'text-slate-700' }, 'Motorista:'),
          ' ',
          veiculo.motorista,
        ),
        React.createElement(
          'p',
          null,
          React.createElement('strong', { className: 'text-slate-700' }, 'Última Revisão:'),
          ' ',
          veiculo.ultimaRevisao,
        ),
      ),
    ),
    React.createElement(
      'a',
      {
        href: `/checklist/${veiculo.id}`,
        className:
          'w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 text-sm font-semibold rounded-lg transition-colors block',
      },
      'Iniciar Checklist',
    ),
  );
}