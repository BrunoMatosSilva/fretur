/* Conteúdo da página inicial (textos e imagens) */

export type IconName =
  | "i-shield" | "i-armchair" | "i-pin" | "i-clock" | "i-building" | "i-palm" | "i-calendar"
  | "i-plane" | "i-users" | "i-sliders";

export const HERO_META = ["Guarulhos, São Paulo e todo o Brasil", "Atendimento corporativo e turístico", "Contato rápido pelo WhatsApp"];

export const HERO_CHIPS = [
  "Congonhas, Guarulhos e Viracopos",
  "Feiras, congressos e eventos corporativos",
  "Porto de Santos e embarques de cruzeiro",
  "Viagens estaduais, interestaduais e excursões",
  "Fretamento diário: Guarulhos → Zona Sul e Alphaville",
];

export const FEATURES: { icon: IconName; lines: [string, string] }[] = [
  { icon: "i-shield", lines: ["Segurança", "em primeiro lugar"] },
  { icon: "i-armchair", lines: ["Conforto em", "todas as viagens"] },
  { icon: "i-pin", lines: ["Base em Guarulhos,", "viagens por todo o Brasil"] },
  { icon: "i-clock", lines: ["Experiência", "e pontualidade"] },
];

export const TICKER = [
  "Grupos corporativos",
  "Excursões e viagens",
  "Feiras e congressos",
  "Contrato mensal",
  "Ônibus, micro-ônibus e vans executivas",
  "Fretamento diário",
  "Viagens interestaduais",
  "Turismo receptivo",
  "Transfer para aeroportos",
];

export const SERVICES: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "i-building",
    title: "Fretamento corporativo",
    text: "Transporte para equipes, clientes e convidados em feiras, congressos, visitas técnicas, eventos empresariais e contratos recorrentes.",
  },
  {
    icon: "i-palm",
    title: "Turismo e passeios",
    text: "Roteiros para city tour, turismo receptivo, compras, cultura e lazer com flexibilidade para grupos, famílias e visitantes em São Paulo e em qualquer cidade do Brasil.",
  },
  {
    icon: "i-calendar",
    title: "Eventos sociais",
    text: "Atendimento para casamentos, formaturas, shows, festas e celebrações com transporte coordenado para convidados e equipes.",
  },
  {
    icon: "i-plane",
    title: "Transfer e receptivo",
    text: "Recepção e traslado em aeroportos, hotéis, centros de convenções e pontos estratégicos da cidade com atendimento pontual e organizado.",
  },
  {
    icon: "i-users",
    title: "Viagens estaduais e interestaduais",
    text: "Excursões, viagens em família e grupos de amigos para São Paulo, Rio de Janeiro, Minas Gerais, Paraná e qualquer lugar do Brasil, com logística prática e econômica.",
  },
  {
    icon: "i-clock",
    title: "Fretamento diário",
    text: "Transporte diário de Guarulhos para a Zona Sul de São Paulo (Pinheiros, Vila Olímpia, Cidade Jardim, Cidade Monções e Brooklin) e para Alphaville.",
  },
];

export type FleetItem = {
  title: string;
  seats: number;
  sub: string;
  text: string;
  features: string[];
  src: string;
  alt: string;
  pos: string;
  msg: string;
};

export const FLEET: FleetItem[] = [
  {
    title: "Micro-ônibus executivo 2024",
    seats: 34,
    sub: "Grupos médios · Conforto · Agilidade",
    text: "Indicado para grupos, traslados corporativos, passeios e excursões, com estrutura para viagens curtas e longas.",
    features: [
      "Wi-Fi",
      "Geladeira com copinhos de água para consumo durante a viagem",
      "DVD e monitores",
      "Microfone",
      "Veículo cadastrado em todos os órgãos de fiscalização do Brasil",
    ],
    src: "/images/micro-grafite-1409-rua.jpg",
    alt: "Micro-ônibus executivo 2024 grafite e amarelo da Fretur, com 34 lugares",
    pos: "62% center",
    msg: "Olá! Gostaria de solicitar orçamento para o micro-ônibus executivo (34 lugares) da Fretur.",
  },
  {
    title: "Van executiva 2024",
    seats: 20,
    sub: "Grupos · Bagagens · Viagens longas",
    text: "Van para 20 pessoas, com entretenimento a bordo e o conforto que o seu grupo precisa na estrada.",
    features: [
      "Ar-condicionado",
      "Bancos reclináveis",
      "Wi-Fi",
      "TV de 20 polegadas com Netflix e Amazon Prime",
      "Bluetooth",
      "Porta automática",
      "Porta-pacotes",
      "Seguro de passageiros",
      "Cadastro em todos os órgãos, para a sua viagem não ter problema com fiscalização",
    ],
    src: "/images/sprinter-grafite-1807.jpg",
    alt: "Van executiva 2024 grafite com faixas amarelas da Fretur, com 20 lugares",
    pos: "center",
    msg: "Olá! Gostaria de solicitar orçamento para a van executiva 2024 (20 lugares) da Fretur.",
  },
  {
    title: "Van super executiva 2025",
    seats: 18,
    sub: "Mais espaço · Mais conforto",
    text: "Van super executiva para 18 pessoas, ideal para traslados e viagens com mais conforto e estrutura.",
    features: [
      "Bluetooth",
      "Ar-condicionado",
      "Bancos reclináveis",
      "Porta automática",
      "Porta-pacotes",
      "Seguro de passageiros",
      "Cadastro em todos os órgãos fiscalizadores das estradas brasileiras",
    ],
    src: "/images/sprinter-prata-1709.jpg",
    alt: "Van super executiva 2025 clara com faixas amarelas da Fretur, com 18 lugares",
    pos: "center",
    msg: "Olá! Gostaria de solicitar orçamento para a van super executiva 2025 (18 lugares) da Fretur.",
  },
];

export type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  cap: string;
  cat: "ext" | "int";
  cls: string;
  pos?: string;
};

export const GALLERY: GalleryItem[] = [
  { src: "/images/micro-prata-2211.jpg", alt: "Micro-ônibus executivo prata com faixas amarelas e a marca Fretur", title: "Micro-ônibus executivo prata", cap: "Micro-ônibus executivo prata", cat: "ext", cls: "g-big" },
  { src: "/images/interior-led-azul.jpg", alt: "Interior com poltronas de couro preto e iluminação em LED azul no teto", title: "Poltronas em couro com iluminação em LED", cap: "Poltronas em couro com iluminação em LED", cat: "int", cls: "g-tall" },
  { src: "/images/sprinter-grafite-1807.jpg", alt: "Van executiva grafite com faixas amarelas e a marca Fretur", title: "Van executiva grafite", cap: "Van executiva grafite", cat: "ext", cls: "" },
  { src: "/images/interior-tv.jpg", alt: "Interior com TV instalada no teto e apoios de cabeça nas cores da marca", title: "TV a bordo para a viagem render", cap: "TV a bordo para a viagem render", cat: "int", cls: "" },
  { src: "/images/interior-poltronas-marrom.jpg", alt: "Corredor central com fileiras de poltronas marrons e apoio de braço", title: "Poltronas amplas com apoio de braço", cap: "Poltronas amplas com apoio de braço", cat: "int", cls: "g-tall" },
  { src: "/images/micro-grafite-1409-parque.jpg", alt: "Micro-ônibus executivo grafite com a marca Fretur estacionado em área verde", title: "Micro-ônibus executivo na estrada de terra", cap: "Micro-ônibus executivo em passeio", cat: "ext", cls: "g-wide", pos: "center 40%" },
  { src: "/images/sprinter-traseira-1709.jpg", alt: "Traseira da van prata com a marca Fretur e a rota Guarulhos x Zona Sul", title: "Traseira: Guarulhos x Zona Sul", cap: "Traseira: Guarulhos x Zona Sul", cat: "ext", cls: "g-tall" },
  { src: "/images/sprinter-prata-1709.jpg", alt: "Van executiva prata com faixas amarelas ao entardecer", title: "Van executiva prata ao entardecer", cap: "Van executiva prata ao entardecer", cat: "ext", cls: "g-wide", pos: "center 45%" },
  { src: "/images/interior-couro-costura-vermelha.jpg", alt: "Poltronas de couro preto com costura vermelha e cortinas", title: "Couro com costura vermelha", cap: "Couro com costura vermelha", cat: "int", cls: "" },
  { src: "/images/interior-apoios-vermelhos.jpg", alt: "Interior com apoios de cabeça vermelhos e amarelos e iluminação no teto", title: "Apoios de cabeça nas cores da marca", cap: "Apoios de cabeça nas cores da marca", cat: "int", cls: "" },
  { src: "/images/micro-grafite-1409-rua.jpg", alt: "Micro-ônibus executivo grafite com a marca Fretur em rua da cidade", title: "Micro-ônibus executivo em operação", cap: "Micro-ônibus executivo em operação", cat: "ext", cls: "", pos: "62% center" },
  { src: "/images/bagageiro.jpg", alt: "Bagageiro amplo com piso forrado e iluminação", title: "Bagageiro espaçoso para as malas", cap: "Bagageiro espaçoso para as malas", cat: "int", cls: "" },
];

export const PORT_CHECKS = [
  "Monitoramento de horários e janelas de embarque",
  "Saídas para grupos, famílias e passageiros individuais",
  "Atendimento com foco em pontualidade e conforto",
  "Suporte para bagagens e logística de deslocamento",
];

export const WHY = [
  { n: "01", title: "Atendimento premium", text: "Cordialidade e discrição em cada interação, com foco no público mais exigente." },
  { n: "02", title: "Veículos seguros", text: "Veículos revisados e monitorados para uma viagem tranquila do embarque ao desembarque." },
  { n: "03", title: "Conhecimento local", text: "Conhecemos as rotas de São Paulo e das principais estradas do Brasil, com agilidade mesmo nos horários de pico." },
];

export const BENEFITS = [
  { title: "Custo por pessoa reduzido", text: "Ao concentrar o grupo em um único transporte, o deslocamento fica mais eficiente do que soluções individuais." },
  { title: "Todos chegam juntos", text: "Evita atrasos, desencontros e problemas de logística em reuniões, eventos, embarques e passeios programados." },
  { title: "Conforto e segurança", text: "Veículos climatizados, revisados e preparados para oferecer uma experiência mais tranquila do início ao fim." },
  { title: "Atendimento profissional", text: "Planejamento prévio, definição de rota e suporte mais assertivo para operações corporativas ou turísticas." },
];

export const ABOUT_ITEMS = [
  { title: "Pontualidade de verdade", text: "Monitoramento de rotas e horários para reduzir riscos de atraso em aeroportos, eventos, reuniões e embarques." },
  { title: "Atendimento profissional", text: "Operação pensada para transmitir organização e confiança, especialmente em demandas corporativas e receptivas." },
  { title: "Operação versátil", text: "Capacidade de atender serviços recorrentes, demandas pontuais, viagens e grupos com roteiros personalizados." },
];
