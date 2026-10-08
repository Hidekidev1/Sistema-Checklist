export const mockVeiculos = [
  { id: '1', placa: 'ABC-1234', modelo: 'Volvo FH 540', motorista: 'Carlos Silva', status: 'Apto', ultimaRevisao: '07/10/2026' },
  { id: '2', placa: 'XYZ-5678', modelo: 'Scania R450', motorista: 'João Souza', status: 'Pendente', ultimaRevisao: '06/10/2026' },
  { id: '3', placa: 'DEF-9012', modelo: 'Mercedes Actros', motorista: 'Ana Pereira', status: 'Inapto', ultimaRevisao: '05/10/2026' },
  { id: '4', placa: 'GHI-3456', modelo: 'VW Constellation', motorista: 'Roberto Lima', status: 'Apto', ultimaRevisao: '07/10/2026' },
  { id: '5', placa: 'JKL-7890', modelo: 'Iveco Stralis', motorista: 'Fernanda Costa', status: 'Pendente', ultimaRevisao: '06/10/2026' },
  { id: '6', placa: 'MNO-2345', modelo: 'DAF XF 105', motorista: 'Lucas Alves', status: 'Apto', ultimaRevisao: '07/10/2026' },
  { id: '7', placa: 'PQR-6789', modelo: 'Volvo VM 330', motorista: 'Mariana Rocha', status: 'Pendente', ultimaRevisao: '04/10/2026' },
  { id: '8', placa: 'STU-0123', modelo: 'Scania G420', motorista: 'Paulo Santos', status: 'Apto', ultimaRevisao: '07/10/2026' },
  { id: '9', placa: 'VWX-4567', modelo: 'MB Atego 2426', motorista: 'Ricardo Mendes', status: 'Inapto', ultimaRevisao: '03/10/2026' },
  { id: '10', placa: 'YZA-8901', modelo: 'Ford Cargo 2429', motorista: 'Gabriel Oliveira', status: 'Pendente', ultimaRevisao: '02/10/2026' }
];

export const mockHistoricoInicial = [
  { id: 'h1', placa: 'DEF-9012', motorista: 'Ana Pereira', horario: '08:30', status: 'Inapto', reprovados: ['Pneus', 'Freios'] },
  { id: 'h2', placa: 'VWX-4567', motorista: 'Ricardo Mendes', horario: '09:15', status: 'Inapto', reprovados: ['Faróis', 'Nível de Óleo'] },
  { id: 'h3', placa: 'ABC-1234', motorista: 'Carlos Silva', horario: '07:45', status: 'Apto', reprovados: [] },
  { id: 'h4', placa: 'GHI-3456', motorista: 'Roberto Lima', horario: '08:00', status: 'Apto', reprovados: [] },
  { id: 'h5', placa: 'MNO-2345', motorista: 'Lucas Alves', horario: '08:10', status: 'Apto', reprovados: [] }
];