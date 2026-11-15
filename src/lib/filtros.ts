export type Filtro = { id: string; nome: string; css: string };

export const FILTROS: Filtro[] = [
  { id: "original", nome: "original", css: "none" },
  { id: "f1", nome: "filtro 1", css: "grayscale(1) contrast(1.12)" },
  { id: "f2", nome: "filtro 2", css: "sepia(0.45) hue-rotate(-18deg) saturate(1.25)" },
  { id: "f3", nome: "filtro 3", css: "saturate(1.5) contrast(1.15) brightness(1.05)" },
  { id: "f4", nome: "filtro 4", css: "saturate(0.65) contrast(0.92) brightness(0.95) sepia(0.18)" },
];

export function filtroPorId(id: string): Filtro {
  return FILTROS.find((f) => f.id === id) ?? FILTROS[0];
}

export type Recorte = { id: string; nome: string; proporcao: number };

export const RECORTES: Recorte[] = [
  { id: "original", nome: "original", proporcao: 4 / 3 },
  { id: "quadrado", nome: "1:1", proporcao: 1 },
  { id: "retrato", nome: "4:5", proporcao: 4 / 5 },
];

export function recortePorId(id: string): Recorte {
  return RECORTES.find((r) => r.id === id) ?? RECORTES[0];
}
