export type Service = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  duration: string;
  price: number;
  priceHigh?: number;
  priceNote?: string;
  perPerson?: boolean;
  image: string;
  imageAlt: string;
  maxParticipants: number;
  minParticipants?: number;
  includes: string[];
  category: "passeio" | "aula" | "experiencia" | "gastronomia";
  badge?: string;
  popular?: boolean;
};

export const services: Service[] = [
  {
    id: "passeio-praia",
    name: "Passeio à Praia",
    tagline: "Cavalga até ao mar",
    description:
      "Percorre as dunas douradas de Melides a cavalo e chega à orla do Oceano Atlântico. Uma experiência única com vistas deslumbrantes da costa alentejana.",
    duration: "1h45",
    price: 60,
    priceHigh: 75,
    priceNote: "60€ (out–mai) · 75€ (jun–set)",
    image:
      "https://images.unsplash.com/photo-1687777962667-54e6f44eeb3b?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Cavaleiro a galope na praia ao pôr do sol",
    maxParticipants: 8,
    includes: ["Guia certificado", "Equipamento de segurança", "Seguro incluído"],
    category: "passeio",
    badge: "Mais popular",
    popular: true,
  },
  {
    id: "passeio-serra",
    name: "Passeio pela Serra",
    tagline: "Entre montado e silêncio",
    description:
      "Descobre os segredos da Serra de Grândola a cavalo — trilhos de montado, sobreiros centenários e vistas panorâmicas sobre o Alentejo Litoral.",
    duration: "1h45",
    price: 60,
    priceHigh: 70,
    priceNote: "60€ (out–mai) · 70€ (jun–set)",
    image:
      "https://images.unsplash.com/photo-1634549666012-6156d6a7fbc1?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Cavaleiro em trilho de campo alentejano",
    maxParticipants: 6,
    includes: ["Guia certificado", "Equipamento de segurança", "Seguro incluído"],
    category: "passeio",
  },
  {
    id: "passeio-degustacao",
    name: "Passeio + Degustação",
    tagline: "Natureza e terroir",
    description:
      "O melhor dos dois mundos: um passeio a cavalo pelo território e, no regresso à Quinta, uma degustação comentada dos melhores vinhos do Alentejo.",
    duration: "2h30",
    price: 80,
    priceHigh: 95,
    priceNote: "80€ (out–mai) · 95€ (jun–set)",
    image:
      "https://images.unsplash.com/photo-1693318836072-776a9392b842?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Vinhas em socalcos no Alentejo Litoral, Portugal",
    maxParticipants: 8,
    includes: [
      "Guia certificado",
      "Equipamento de segurança",
      "Seguro incluído",
      "Degustação de 3 vinhos regionais",
      "Petiscos alentejanos",
    ],
    category: "experiencia",
    badge: "Experiência completa",
    popular: true,
  },
  {
    id: "aula-equitacao",
    name: "Aula de Equitação",
    tagline: "Aprende com os melhores",
    description:
      "Inicia-te na arte da equitação com os nossos instrutores certificados. Sessões individuais ou em pequeno grupo, adaptadas ao teu nível.",
    duration: "45 min",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1776758107856-bfabf799fd8c?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Amazona em atire clássica a cavalo junto a estábulo rústico",
    maxParticipants: 4,
    includes: [
      "Instrutor certificado (FEI)",
      "Capacete e colete fornecidos",
      "Seguro incluído",
    ],
    category: "aula",
  },
  {
    id: "degustacao-vinhos",
    name: "Degustação de Vinhos",
    tagline: "O terroir do Alentejo",
    description:
      "Uma viagem sensorial pelos sabores do Alentejo Litoral. Vinhos de produtor local acompanhados de queijos, enchidos e azeitonas da Quinta.",
    duration: "1h",
    price: 25,
    image:
      "https://images.unsplash.com/photo-1753079051122-48a75b3c55b5?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Mesa de degustação com copos de vinho e materiais de prova",
    maxParticipants: 12,
    includes: [
      "Sommelier",
      "4 vinhos regionais",
      "Petiscos da quinta",
    ],
    category: "experiencia",
  },
  {
    id: "picnic-quinta",
    name: "Picnic na Quinta",
    tagline: "Ao ritmo do Alentejo",
    description:
      "Desfruta de um picnic gourmet nos jardins históricos da Quinta do Almargem. Cesto artesanal com produtos locais, manta e mesa já preparados à tua chegada.",
    duration: "Ao seu ritmo",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1760915170446-9c5b0b67b6e2?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Cesto de picnic gourmet com vinho rosé e copos na natureza",
    maxParticipants: 8,
    minParticipants: 2,
    includes: [
      "Cesto gourmet artesanal",
      "Mesa, cadeiras e manta",
      "2 garrafas de vinho regional",
      "Fruta e sobremesa da época",
    ],
    category: "experiencia",
  },
  {
    id: "almoco-chef",
    name: "Almoço com Chef Privado",
    tagline: "Alta gastronomia no campo",
    description:
      "Uma experiência gastronómica única: um chef privado prepara, na sua presença, um menu de degustação com ingredientes da Quinta e do mercado local.",
    duration: "2h – 3h",
    price: 120,
    perPerson: true,
    image:
      "https://images.unsplash.com/photo-1750943082452-c714763f73b2?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Prato de alta gastronomia apresentado pelo chef com iluminação elegante",
    maxParticipants: 10,
    minParticipants: 2,
    includes: [
      "Chef privado",
      "Menu degustação 5 momentos",
      "Maridagem de vinhos alentejanos",
      "Serviço de mesa completo",
    ],
    category: "gastronomia",
    badge: "Premium",
  },
];

export const categoryLabels: Record<Service["category"], string> = {
  passeio: "Passeio a Cavalo",
  aula: "Aula",
  experiencia: "Experiência",
  gastronomia: "Gastronomia",
};
