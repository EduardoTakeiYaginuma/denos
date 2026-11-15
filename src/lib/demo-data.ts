import type { Post } from "./memorias";

/**
 * Conteúdo de demonstração. Tudo que aparece nas telas internas vem daqui —
 * é o arquivo pra mexer antes da feira (trocar nomes, fotos, datas).
 */

export const CIRCULO = "finilovers";

export const POSTS_INICIAIS: Post[] = [
  {
    id: "p1",
    autor: "isa",
    quando: "há 2 horas",
    foto: "/assets/demo/memoria-trilha.svg",
    legenda: "subiu todo mundo e ninguém desistiu",
    local: "pedra grande",
    pessoas: ["thais", "du"],
    curtidas: 48,
    curtidaPorMim: false,
    salva: false,
    comentarios: [
      { id: "c1", autor: "lis", quando: "há 1 hora", texto: "KKKKKKKKK" },
      { id: "c2", autor: "gabi", quando: "há 40 min", texto: "que fofos!" },
    ],
  },
  {
    id: "p2",
    autor: "thais",
    quando: "há 5 dias",
    foto: "/assets/demo/memoria-show.svg",
    legenda: "joão rock, até a última música",
    local: "ribeirão preto",
    curtidas: 31,
    curtidaPorMim: true,
    salva: true,
    comentarios: [
      { id: "c3", autor: "pedro", quando: "há 4 dias", texto: "o melhor dia do ano" },
    ],
  },
];

/** Fotos recentes do "rolo da câmera" fake, pra escolher na nova publicação. */
export const GALERIA_RECENTE = [
  "/assets/demo/memoria-amigos.svg",
  "/assets/demo/memoria-passaro.svg",
  "/assets/demo/memoria-palco.svg",
  "/assets/demo/memoria-trilha.svg",
  "/assets/demo/memoria-show.svg",
];

/** Quem dá pra marcar numa memória. */
export const PESSOAS_DO_NO = ["isa", "thais", "gabi", "lis", "du", "pedro"];

export const PERGUNTA_DO_DIA = {
  texto: "quem do grupo ganharia de um urso?",
  responderam: 2,
  total: 3,
};

export const LUGAR = {
  nome: "vermelho lanches",
  categoria: "lanchonete",
  situacao: "ponto salvo",
};

export const PESSOAS_PERTO = [
  { nome: "lis", distancia: "há 300m", situacao: "livre agora" },
  { nome: "laura", distancia: "há 21,7km", situacao: "quer conhecer" },
];

/**
 * "Hoje" da demo. Fixado em 14/09/2026 pra bater com os compromissos abaixo.
 * Trocar por `new Date()` se preferir que o calendário mostre o mês corrente —
 * aí os dias dos eventos também precisam ser atualizados.
 */
export const DEMO_HOJE = new Date(2026, 8, 14);

/** Dias do mês com memórias registradas (vira cluster de avatares no grid). */
export const DIAS_COM_GENTE: { dia: number; pessoas: string[] }[] = [
  { dia: 5, pessoas: ["isa", "thais", "gabi"] },
  { dia: 14, pessoas: ["du", "lis", "pedro"] },
  { dia: 19, pessoas: ["gabi", "isa"] },
  { dia: 23, pessoas: ["pedro", "thais"] },
];

export const COMPROMISSOS = [
  { dia: 14, titulo: "dia de parque das fini", quando: "hoje, 14h", destaque: true },
  { dia: 19, titulo: "karaokê com gabi", quando: "sáb, 19h", destaque: false },
  { dia: 23, titulo: "almoço com pedro", quando: "qua, 12h", destaque: false },
];

export const ENCONTRO_SUGERIDO = {
  dia: 26,
  titulo: "aperte o nó com du",
  descricao: "você e du estão livres dia 26",
};

export const PERFIL = {
  nome: "fulana",
  bio: "colecionando memórias dentro e fora da internet",
  memorias: 127,
  nos: 5,
  conquistas: 13,
};

export const LACOS = [
  { id: "registradora", nome: "registradora", cor: "#e9ac4c" },
  { id: "topa-tudo", nome: "topa tudo", cor: "#7a9440" },
  { id: "planejadora", nome: "planejadora", cor: "#3b6ca8" },
  { id: "companheira", nome: "companheira", cor: "#f0c4df" },
];

export const BORDAS_DO_ICONE = [
  { id: "terracota", cor: "#c8481e" },
  { id: "rosa", cor: "#f0c4df" },
  { id: "verde", cor: "#7a9440" },
];

export const DIAS_DA_SEMANA = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];

export const MESES = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

/** Matriz de semanas do mês da data dada; null = célula vazia. */
export function gradeDoMes(referencia: Date): (number | null)[][] {
  const ano = referencia.getFullYear();
  const mes = referencia.getMonth();
  const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
  const totalDias = new Date(ano, mes + 1, 0).getDate();

  const celulas: (number | null)[] = Array(primeiroDiaSemana).fill(null);
  for (let d = 1; d <= totalDias; d++) celulas.push(d);
  while (celulas.length % 7 !== 0) celulas.push(null);

  const semanas: (number | null)[][] = [];
  for (let i = 0; i < celulas.length; i += 7) semanas.push(celulas.slice(i, i + 7));
  return semanas;
}
