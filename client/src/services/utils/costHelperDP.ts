export const costs = [
    { sectorName: 'pProprio', label: 'Pessoal Próprio', costAmount: 0 },
    { sectorName: 'encargosSociais', label: 'Encargos Sociais', costAmount: 0 },
    { sectorName: 'provisao13', label: 'Provisao 13º', costAmount: 0 },
    { sectorName: 'provisaoFerias', label: 'Provisao de Ferias', costAmount: 0 },
    { sectorName: 'impostosProvisao13', label: 'Impostos S. Provisao 13º', costAmount: 0 },
    { sectorName: 'impostoProvisaoFerias', label: 'Imposto S. Prov. Ferias', costAmount: 0 }
];

export const costsInAlphabeticalOrder = [...costs].sort((a, b) => a.label.localeCompare(b.label));
