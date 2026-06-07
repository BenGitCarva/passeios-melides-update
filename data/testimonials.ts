export type Testimonial = {
  id: number;
  name: string;
  location: string;
  flag: string;
  rating: number;
  text: string;
  service: string;
  date: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sophie M.",
    location: "Paris, França",
    flag: "🇫🇷",
    rating: 5,
    text: "Une expérience absolument magique. Le passeio à la plage au coucher du soleil restera dans mes souvenirs pour toujours. Les chevaux sont magnifiques et le guide parle plusieurs langues!",
    service: "Passeio à Praia",
    date: "Agosto 2025",
    avatar: "SM",
  },
  {
    id: 2,
    name: "James & Claire",
    location: "Londres, Reino Unido",
    flag: "🇬🇧",
    rating: 5,
    text: "We did the Passeio + Degustação as part of our honeymoon stay in Comporta. Absolutely perfect. The horses were calm and friendly, the wine tasting afterwards was superb. Book this!",
    service: "Passeio + Degustação",
    date: "Julho 2025",
    avatar: "JC",
  },
  {
    id: 3,
    name: "Mariana S.",
    location: "Lisboa, Portugal",
    flag: "🇵🇹",
    rating: 5,
    text: "Trouxe a minha filha de 8 anos para a primeira aula de equitação. O instrutor foi incrível — paciente, profissional e muito simpático. Já marcámos a próxima aula!",
    service: "Aula de Equitação",
    date: "Junho 2025",
    avatar: "MS",
  },
  {
    id: 4,
    name: "Lars H.",
    location: "Berlim, Alemanha",
    flag: "🇩🇪",
    rating: 5,
    text: "Der Ausritt durch die Serra war unglaublich schön. Die Landschaft ist atemberaubend und Luís ist ein hervorragender Guide. Das Picknick danach war auch wunderbar!",
    service: "Passeio pela Serra",
    date: "Maio 2025",
    avatar: "LH",
  },
  {
    id: 5,
    name: "Ana Paula R.",
    location: "São Paulo, Brasil",
    flag: "🇧🇷",
    rating: 5,
    text: "O almoço com chef privado foi o ponto alto da nossa viagem a Portugal. Ingredientes fresquíssimos, apresentação impecável e uma vista linda para a quinta. Inesquecível!",
    service: "Almoço com Chef Privado",
    date: "Março 2026",
    avatar: "AP",
  },
  {
    id: 6,
    name: "Valentina C.",
    location: "Milão, Itália",
    flag: "🇮🇹",
    rating: 5,
    text: "Esperienza fantastica! La quinta è bellissima e i cavalli meravigliosi. Abbiamo fatto la degustazione di vini dopo il percorso — vini eccezionali del territorio. Torneremo!",
    service: "Passeio + Degustação",
    date: "Maio 2026",
    avatar: "VC",
  },
];
