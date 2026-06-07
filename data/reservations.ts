import { addDays, subDays, setHours, setMinutes } from "date-fns";

export type ReservationStatus = "confirmada" | "pendente" | "cancelada" | "concluida";

export type Reservation = {
  id: string;
  serviceId: string;
  serviceName: string;
  date: Date;
  hour: string;
  participants: number;
  price: number;
  status: ReservationStatus;
  guest: {
    name: string;
    email: string;
    phone: string;
    country: string;
    flag: string;
  };
  notes?: string;
  channel: "direto" | "whatsapp" | "email" | "telefone";
  createdAt: Date;
};

const now = new Date();

export const reservations: Reservation[] = [
  // Today
  { id: "R001", serviceId: "passeio-praia", serviceName: "Passeio à Praia", date: setHours(now, 10), hour: "10:00", participants: 4, price: 300, status: "confirmada", guest: { name: "Sophie Martin", email: "sophie@example.fr", phone: "+33 6 12 34 56 78", country: "França", flag: "🇫🇷" }, channel: "direto", createdAt: subDays(now, 3) },
  { id: "R002", serviceId: "aula-equitacao", serviceName: "Aula de Equitação", date: setHours(now, 14), hour: "14:00", participants: 2, price: 80, status: "confirmada", guest: { name: "Mariana Santos", email: "mariana@example.pt", phone: "+351 912 345 678", country: "Portugal", flag: "🇵🇹" }, channel: "whatsapp", createdAt: subDays(now, 1) },
  { id: "R003", serviceId: "passeio-degustacao", serviceName: "Passeio + Degustação", date: setHours(now, 16), hour: "16:00", participants: 2, price: 190, status: "pendente", guest: { name: "Lars Hoffmann", email: "lars@example.de", phone: "+49 176 12345678", country: "Alemanha", flag: "🇩🇪" }, channel: "email", createdAt: subDays(now, 0) },

  // Tomorrow
  { id: "R004", serviceId: "almoco-chef", serviceName: "Almoço com Chef", date: setHours(addDays(now, 1), 13), hour: "13:00", participants: 4, price: 480, status: "confirmada", guest: { name: "James & Claire", email: "james@example.co.uk", phone: "+44 7911 123456", country: "Reino Unido", flag: "🇬🇧" }, notes: "Lua de mel. Intolerância ao glúten (um dos convidados).", channel: "direto", createdAt: subDays(now, 5) },
  { id: "R005", serviceId: "passeio-praia", serviceName: "Passeio à Praia", date: setHours(addDays(now, 1), 10), hour: "10:00", participants: 6, price: 450, status: "confirmada", guest: { name: "Valentina Costa", email: "valentina@example.it", phone: "+39 334 1234567", country: "Itália", flag: "🇮🇹" }, channel: "direto", createdAt: subDays(now, 2) },

  // Next few days
  { id: "R006", serviceId: "picnic-quinta", serviceName: "Picnic na Quinta", date: setHours(addDays(now, 2), 12), hour: "12:00", participants: 3, price: 150, status: "confirmada", guest: { name: "Ana Paula Ramos", email: "anapaula@example.br", phone: "+55 11 91234-5678", country: "Brasil", flag: "🇧🇷" }, channel: "whatsapp", createdAt: subDays(now, 4) },
  { id: "R007", serviceId: "passeio-serra", serviceName: "Passeio pela Serra", date: setHours(addDays(now, 2), 9), hour: "09:00", participants: 5, price: 350, status: "pendente", guest: { name: "Pierre Dupont", email: "pierre@example.fr", phone: "+33 7 98765432", country: "França", flag: "🇫🇷" }, channel: "direto", createdAt: subDays(now, 1) },
  { id: "R008", serviceId: "degustacao-vinhos", serviceName: "Degustação de Vinhos", date: setHours(addDays(now, 3), 17), hour: "17:00", participants: 8, price: 200, status: "confirmada", guest: { name: "Grupo Empresa XYZ", email: "eventos@xyz.pt", phone: "+351 21 345 6789", country: "Portugal", flag: "🇵🇹" }, notes: "Grupo corporativo. Pedir fatura.", channel: "email", createdAt: subDays(now, 7) },
  { id: "R009", serviceId: "passeio-praia", serviceName: "Passeio à Praia", date: setHours(addDays(now, 4), 10), hour: "10:00", participants: 2, price: 150, status: "confirmada", guest: { name: "Emma Wilson", email: "emma@example.co.uk", phone: "+44 7700 900123", country: "Reino Unido", flag: "🇬🇧" }, channel: "direto", createdAt: subDays(now, 2) },
  { id: "R010", serviceId: "aula-equitacao", serviceName: "Aula de Equitação", date: setHours(addDays(now, 5), 15), hour: "15:00", participants: 1, price: 40, status: "confirmada", guest: { name: "João Ferreira", email: "joao@example.pt", phone: "+351 963 456 789", country: "Portugal", flag: "🇵🇹" }, channel: "telefone", createdAt: subDays(now, 3) },

  // This week - more
  { id: "R011", serviceId: "passeio-degustacao", serviceName: "Passeio + Degustação", date: setHours(addDays(now, 6), 10), hour: "10:00", participants: 4, price: 380, status: "confirmada", guest: { name: "Carlos García", email: "carlos@example.es", phone: "+34 612 345 678", country: "Espanha", flag: "🇪🇸" }, channel: "direto", createdAt: subDays(now, 6) },
  { id: "R012", serviceId: "almoco-chef", serviceName: "Almoço com Chef", date: setHours(addDays(now, 7), 13), hour: "13:00", participants: 6, price: 720, status: "pendente", guest: { name: "Ingrid Larsen", email: "ingrid@example.no", phone: "+47 912 34 567", country: "Noruega", flag: "🇳🇴" }, notes: "Celebração de aniversário. Possível bolo de surpresa.", channel: "email", createdAt: subDays(now, 2) },

  // Past (concluded)
  { id: "R013", serviceId: "passeio-praia", serviceName: "Passeio à Praia", date: setHours(subDays(now, 1), 10), hour: "10:00", participants: 3, price: 225, status: "concluida", guest: { name: "Hana Müller", email: "hana@example.de", phone: "+49 151 23456789", country: "Alemanha", flag: "🇩🇪" }, channel: "direto", createdAt: subDays(now, 8) },
  { id: "R014", serviceId: "aula-equitacao", serviceName: "Aula de Equitação", date: setHours(subDays(now, 2), 14), hour: "14:00", participants: 2, price: 80, status: "concluida", guest: { name: "Família Cardoso", email: "cardoso@example.pt", phone: "+351 934 567 890", country: "Portugal", flag: "🇵🇹" }, channel: "whatsapp", createdAt: subDays(now, 9) },
  { id: "R015", serviceId: "passeio-serra", serviceName: "Passeio pela Serra", date: setHours(subDays(now, 3), 9), hour: "09:00", participants: 4, price: 280, status: "concluida", guest: { name: "Tom & Sarah Baker", email: "baker@example.com", phone: "+1 555 234 5678", country: "EUA", flag: "🇺🇸" }, channel: "direto", createdAt: subDays(now, 10) },
  { id: "R016", serviceId: "picnic-quinta", serviceName: "Picnic na Quinta", date: setHours(subDays(now, 4), 12), hour: "12:00", participants: 2, price: 100, status: "concluida", guest: { name: "Marie Laurent", email: "marie@example.fr", phone: "+33 6 87654321", country: "França", flag: "🇫🇷" }, channel: "direto", createdAt: subDays(now, 11) },
  { id: "R017", serviceId: "degustacao-vinhos", serviceName: "Degustação de Vinhos", date: setHours(subDays(now, 5), 17), hour: "17:00", participants: 6, price: 150, status: "concluida", guest: { name: "Roberto Esposito", email: "roberto@example.it", phone: "+39 333 1234567", country: "Itália", flag: "🇮🇹" }, channel: "email", createdAt: subDays(now, 14) },
  { id: "R018", serviceId: "almoco-chef", serviceName: "Almoço com Chef", date: setHours(subDays(now, 6), 13), hour: "13:00", participants: 3, price: 360, status: "concluida", guest: { name: "Nadia Pereira", email: "nadia@example.br", phone: "+55 21 91234-5678", country: "Brasil", flag: "🇧🇷" }, channel: "direto", createdAt: subDays(now, 15) },
  { id: "R019", serviceId: "passeio-praia", serviceName: "Passeio à Praia", date: setHours(subDays(now, 7), 10), hour: "10:00", participants: 8, price: 600, status: "concluida", guest: { name: "Grupo Turismo ABC", email: "tours@abc.com", phone: "+44 20 7946 0958", country: "Reino Unido", flag: "🇬🇧" }, channel: "email", createdAt: subDays(now, 18) },

  // Cancelled
  { id: "R020", serviceId: "almoco-chef", serviceName: "Almoço com Chef", date: setHours(subDays(now, 2), 13), hour: "13:00", participants: 4, price: 480, status: "cancelada", guest: { name: "Werner Koch", email: "werner@example.de", phone: "+49 160 12345678", country: "Alemanha", flag: "🇩🇪" }, notes: "Cancelado pelo cliente — mudança de planos.", channel: "direto", createdAt: subDays(now, 12) },
  { id: "R021", serviceId: "passeio-praia", serviceName: "Passeio à Praia", date: setHours(subDays(now, 8), 10), hour: "10:00", participants: 2, price: 150, status: "cancelada", guest: { name: "Lena Svensson", email: "lena@example.se", phone: "+46 70 123 4567", country: "Suécia", flag: "🇸🇪" }, channel: "direto", createdAt: subDays(now, 20) },
];

// ── Analytics helpers ─────────────────────────────────────────────────────────

export const weeklyRevenue = [
  { week: "Sem 1", receita: 1240, reservas: 8 },
  { week: "Sem 2", receita: 980,  reservas: 6 },
  { week: "Sem 3", receita: 1560, reservas: 10 },
  { week: "Sem 4", receita: 2100, reservas: 13 },
  { week: "Sem 5", receita: 1780, reservas: 11 },
  { week: "Sem 6", receita: 2340, reservas: 14 },
  { week: "Sem 7", receita: 1920, reservas: 12 },
  { week: "Sem 8", receita: 2580, reservas: 16 },
];

export const byService = [
  { name: "Passeio à Praia",        reservas: 7, receita: 1875 },
  { name: "Passeio + Degustação",   reservas: 3, receita:  570 },
  { name: "Almoço com Chef",        reservas: 4, receita: 2040 },
  { name: "Passeio pela Serra",     reservas: 3, receita:  630 },
  { name: "Aula de Equitação",      reservas: 3, receita:  200 },
  { name: "Picnic na Quinta",       reservas: 2, receita:  250 },
  { name: "Degustação de Vinhos",   reservas: 2, receita:  350 },
];

export const byCountry = [
  { country: "França",       value: 5, fill: "#C17A56" },
  { country: "Reino Unido",  value: 4, fill: "#D4956F" },
  { country: "Portugal",     value: 4, fill: "#7A8C6E" },
  { country: "Alemanha",     value: 3, fill: "#C9A96E" },
  { country: "Itália",       value: 2, fill: "#D4B896" },
  { country: "Brasil",       value: 2, fill: "#9BAF8A" },
  { country: "Outros",       value: 2, fill: "#B89A74" },
];

export const occupancyByDay = [
  { day: "Seg", pct: 55 },
  { day: "Ter", pct: 48 },
  { day: "Qua", pct: 72 },
  { day: "Qui", pct: 65 },
  { day: "Sex", pct: 88 },
  { day: "Sáb", pct: 95 },
  { day: "Dom", pct: 91 },
];
