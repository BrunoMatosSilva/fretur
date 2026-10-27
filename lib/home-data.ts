/* Conteúdo da página inicial (textos e imagens) */

export type IconName =
  | "i-shield" | "i-armchair" | "i-pin" | "i-clock" | "i-building" | "i-palm" | "i-calendar"
  | "i-plane" | "i-users" | "i-sliders";

export const HERO_META = ["São Paulo e região", "Atendimento corporativo e turístico", "Contato rápido pelo WhatsApp"];

export const HERO_CHIPS = [
  "Congonhas, Guarulhos e Viracopos",
  "Feiras, congressos e eventos corporativos",
  "Porto de Santos e embarques de cruzeiro",
  "Passeios, excursões e viagens em grupo",
];

export const FEATURES: { icon: IconName; lines: [string, string] }[] = [
  { icon: "i-shield", lines: ["Segurança", "em primeiro lugar"] },
  { icon: "i-armchair", lines: ["Conforto em", "todas as viagens"] },
  { icon: "i-pin", lines: ["Atendimento em", "Guarulhos e região"] },
  { icon: "i-clock", lines: ["Experiência", "e pontualidade"] },
];

export const TICKER = [
  "Grupos corporativos",
  "Excursões e viagens",
  "Feiras e congressos",
  "Contrato mensal",
  "Fretamento de ônibus",
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
    text: "Roteiros para city tour, turismo receptivo, compras, cultura e lazer com flexibilidade para grupos, famílias e visitantes em São Paulo.",
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
    title: "Viagens em grupo",
    text: "Fretamento para excursões, viagens em família, grupos de amigos e saídas planejadas com logística mais prática e econômica.",
  },
  {
    icon: "i-sliders",
    title: "Atendimento sob medida",
    text: "Cada operação é ajustada à sua demanda, com roteiros, horários e tipo de veículo definidos de acordo com o seu grupo e objetivo.",
  },
];

export const FLEET = [
  {
    title: "Ônibus executivo",
    sub: "Grupos · Ar-condicionado · Conforto total",
    text: "Ideal para grupos corporativos, eventos, turismo receptivo e viagens em equipe com mais comodidade.",
    src: "/images/micro-grafite-1409-rua.jpg",
    alt: "Ônibus executivo grafite e amarelo da Fretur estacionado em rua de Guarulhos",
    pos: "62% center",
    msg: "Olá! Gostaria de solicitar orçamento para ônibus executivo da Fretur.",
  },
  {
    title: "Micro-ônibus",
    sub: "Grupos médios · Poltronas confortáveis · Agilidade",
    text: "Indicado para grupos menores, traslados corporativos, passeios e excursões que pedem mais agilidade no trânsito, sem abrir mão do conforto.",
    src: "/images/micro-prata-2211.jpg",
    alt: "Micro-ônibus prata e amarelo da Fretur",
    pos: "center",
    msg: "Olá! Gostaria de solicitar orçamento para micro-ônibus da Fretur.",
  },
  {
    title: "Van executiva",
    sub: "Grupos · Bagagens · Viagens e transfers longos",
    text: "Opção indicada para operações com malas, recepção em aeroportos, deslocamentos para porto e viagens com mais estrutura.",
    src: "/images/sprinter-grafite-1807.jpg",
    alt: "Van executiva grafite com faixas amarelas da Fretur",
    pos: "center",
    msg: "Olá! Gostaria de solicitar orçamento para van executiva da Fretur.",
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
  { n: "01", title: "Atendimento premium", text: "Cordialidade e discrição em cada interação, com foco no público mais exigente de São Paulo." },
  { n: "02", title: "Veículos seguros", text: "Veículos revisados e monitorados para uma viagem tranquila do embarque ao desembarque." },
  { n: "03", title: "Conhecimento local", text: "Especialistas em São Paulo, com agilidade mesmo nos horários de pico." },
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
