export const costs = [
    { sectorName: 'pProprio', label: 'P.Próprio' },
    { sectorName: 'encargosSociais', label: 'Encargos Sociais' },
    { sectorName: 'provisao13', label: 'Provisao 13º' },
    { sectorName: 'provisaoFerias', label: 'Provisao de Ferias' },
    { sectorName: 'impostosProvisao13', label: 'Impostos S. Provisao 13º' },
    { sectorName: 'impostoProvisaoFerias', label: 'Imposto S. Prov. Ferias' },
    { sectorName: 'stpj', label: 'STPJ' },
    { sectorName: 'stpf', label: 'STPF' },
    { sectorName: 'servicoMedPj', label: 'Servico Med. PJ' },
    { sectorName: 'matMed', label: 'Mat/Med' },
    { sectorName: 'despDir', label: 'Desp.Dir' },
    { sectorName: 'impostos', label: 'Impostos' },
    { sectorName: 'despesaFinanceira', label: 'Despesa Financeira' },
    { sectorName: 'agua', label: 'Agua' },
    { sectorName: 'energiaEletrica', label: 'Energia Eletrica' },
    { sectorName: 'telefone', label: 'Telefone' },
    { sectorName: 'glp', label: 'GLP' },
    { sectorName: 'gasolina', label: 'Gasolina' },
    { sectorName: 'gasesMedicinais', label: 'Gases Medicinais' },
    { sectorName: 'servicoMedPf', label: 'Serviço Med. P.F.' }
];


export const costsInAlphabeticalOrder = [...costs].sort((a, b) => a.label.localeCompare(b.label));
