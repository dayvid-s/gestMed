export const sectors = [
    { sectorName: 'administracao', label: 'Administração' },
    { sectorName: 'oncologia1', label: 'Oncologia 1' },
    { sectorName: 'oncologia2', label: 'Oncologia 2' },
    { sectorName: 'cirurgia1', label: 'Cirurgia 1' },
    { sectorName: 'cirurgia2', label: 'Cirurgia 2' },
    { sectorName: 'quimioterapia', label: 'Quimioterapia' },
    { sectorName: 'uti1', label: 'UTI 1' },
    { sectorName: 'uti2', label: 'UTI 2' },
    { sectorName: 'pa', label: 'P.A.' },
    { sectorName: 'ambulatorio', label: 'Ambulatório' },
    { sectorName: 'imagem-rx', label: 'Imagem - RX' },
    { sectorName: 'imagem-mamografia', label: 'Imagem Mamografia' },
    { sectorName: 'imagem-ultrasson', label: 'Imagem Ultrasson' },
    { sectorName: 'imagem-tomografia', label: 'Imagem Tomografia' },
    { sectorName: 'imagem-ressonancia', label: 'Imagem Ressonância' },
    { sectorName: 'imagem-endoscopia', label: 'Imagem Endoscopia' },
    { sectorName: 'imagem-colonoscopia', label: 'Imagem Colonoscopia' },
    { sectorName: 'imagem-retossigmoidoscopia', label: 'Imagem Retossigmoidoscopia' },
    { sectorName: 'nefrologia', label: 'Nefrologia' },
    { sectorName: 'exames-laboratoriais', label: 'Exames Laboratoriais' },
    { sectorName: 'exames-anatomo-patologico', label: 'Exames de Anatomopatológico' },
    { sectorName: 'centro-cirurgico', label: 'Centro Cirúrgico' },
    { sectorName: 'centro-material-esterelizado', label: 'Centro Material Esterilizado' },
    { sectorName: 'servico-nutricao-dietetica', label: 'Serviço de Nutrição e Dietética' },
    { sectorName: 'servico-higiene-limpeza', label: 'Serviço de Higiene e Limpeza' },
    { sectorName: 'servico-processamento-roupa', label: 'Serviço Processamento Roupa' },
    { sectorName: 'transportes', label: 'Transportes' },
    { sectorName: 'manutencao', label: 'Manutenção' }
];


export const sectorsInAlphabeticalOrder = [...sectors].sort((a, b) => a.label.localeCompare(b.label));
