export interface UnitData {
  id: string;
  name: string;
  cnpj?: string;
  phone: string;
  whatsapp: string;
  whatsappMessage: string;
  instagramUrl: string;
  facebookUrl: string;
  croCl?: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  clinicalDirector: {
    name: string;
    cro: string;
    role: string;
  };
  treatments: Array<{
    id: string;
    title: string;
    description: string;
    iconName: string;
    imageUrl?: string;
  }>;
  images: {
    facade: string;
  };
  dentists: Array<{
    name: string;
    specialty: string;
    cro: string;
    photoUrl: string;
  }>;
  testimonials: Array<{
    name: string;
    rating: number;
    text: string;
    treatment: string;
  }>;
}

export const UNITS_DATA: Record<string, UnitData> = {
  jd_sao_luiz: {
    id: 'jd_sao_luiz',
    name: 'Jardim São Luís',
    phone: '(11) 3851-3292',
    whatsapp: '5511967640728',
    whatsappMessage: 'Olá! Gostaria de agendar uma consulta de avaliação na OdontoCompany Jardim São Luís.',
    instagramUrl: 'https://www.instagram.com/odontocompanyjdsaoluissp/',
    facebookUrl: 'https://web.facebook.com/profile.php?id=61573231600613&locale=pt_BR',
    address: {
      street: 'Av. Maria Coelho Aguiar',
      number: '756',
      neighborhood: 'Jardim São Luís',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '05805-000'
    },
    clinicalDirector: {
      name: 'Dra. Hyanna Rocha de Lima',
      cro: 'CRO-SP 19111',
      role: 'Responsável Técnica / Direção Clínica'
    },
    treatments: [
      {
        id: '1',
        title: 'Implantes Dentários',
        description: 'Recupere sua autoestima e a capacidade mastigatória com procedimentos modernos, seguros e parcelamento facilitado.',
        iconName: 'Tooth',
        imageUrl: '/images/treatments/implantes.webp'
      },
      {
        id: '2',
        title: 'Ortodontia (Aparelhos)',
        description: 'Alinhamento dentário com aparelhos fixos metálicos, estéticos e os modernos alinhadores transparentes.',
        iconName: 'Sparkles',
        imageUrl: '/images/treatments/aparelhos.webp'
      },
      {
        id: '3',
        title: 'Lentes de Contato Dental',
        description: 'Harmonia, brilho e alinhamento impecável com facetas e lentes de porcelana de alta durabilidade.',
        iconName: 'Diamond',
        imageUrl: '/images/treatments/lentes.webp'
      },
      {
        id: '4',
        title: 'Clareamento Dental',
        description: 'Dentes mais brancos e radiantes com técnicas a laser em consultório ou moldeira caseira supervisionada.',
        iconName: 'Sun',
        imageUrl: '/images/treatments/clareamento.webp'
      },
      {
        id: '5',
        title: 'Próteses Dentárias',
        description: 'Soluções fixas e removíveis com materiais de alto padrão para restabelecer seu sorriso e conforto.',
        iconName: 'Crown',
        imageUrl: '/images/treatments/proteses.webp'
      },
      {
        id: '6',
        title: 'Clínico Geral & Limpeza',
        description: 'Prevenção, profilaxia, restaurações e diagnóstico completo para a manutenção da sua saúde bucal.',
        iconName: 'Stethoscope',
        imageUrl: '/images/treatments/limpeza.webp'
      }
    ],
    images: {
      facade: '/images/fachada.webp'
    },
    dentists: [
      {
        name: 'Dra. Hyanna Rocha de Lima',
        specialty: 'Responsável Técnica & Cirurgiã-Dentista',
        cro: 'CRO-SP 19111',
        photoUrl: '/images/dentistas/dra-hyanna.webp'
      }
    ],
    testimonials: [
      {
        name: 'Carlos Alberto M.',
        rating: 5,
        text: 'Excelente atendimento na OdontoCompany Jardim São Luís! A clínica é muito bonita, os profissionais super atenciosos e o tratamento de implante foi super tranquilo.',
        treatment: 'Implante Dentário'
      },
      {
        name: 'Mariana Silveira',
        rating: 5,
        text: 'Coloquei meu aparelho na OdontoCompany Jardim São Luís e já vejo muita diferença no meu sorriso. Facilidade no pagamento e equipe maravilhosa!',
        treatment: 'Ortodontia'
      },
      {
        name: 'Luciana Ramos',
        rating: 5,
        text: 'Fiz clareamento e limpeza preventiva na unidade. Atendimento pontual, ambiente muito limpo e profissionais que passam muita segurança. Recomendo a todos de São Paulo e região.',
        treatment: 'Clareamento Dental'
      }
    ]
  }
};

export const getUnitFromUrl = (): UnitData => {
  return UNITS_DATA.jd_sao_luiz;
};
