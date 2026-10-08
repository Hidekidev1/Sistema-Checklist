'use client';

import React from 'react';

interface ItemChecklistProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (id: string, value: boolean) => void;
}

export default function ItemChecklist({ id, label, checked, onChange }: ItemChecklistProps) {
  return React.createElement(
    'label',
    {
      className:
        'flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors',
    },
    React.createElement('input', {
      type: 'checkbox',
      checked,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(id, e.target.checked),
      className: 'w-5 h-5 text-blue-600 rounded focus:ring-blue-500 accent-blue-600',
    }),
    React.createElement('span', { className: 'text-sm font-medium text-slate-700' }, label),
  );
}