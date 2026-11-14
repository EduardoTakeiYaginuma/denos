export type CorDoNo = {
  id: string;
  nome: string;
  hex: string;
};

export const CORES_DO_NO: CorDoNo[] = [
  { id: "amarelo", nome: "amarelo", hex: "#e9ac4c" },
  { id: "verde", nome: "verde", hex: "#7a9440" },
  { id: "azul", nome: "azul", hex: "#3b6ca8" },
  { id: "terracota", nome: "terracota", hex: "#c8481e" },
  { id: "rosa", nome: "rosa", hex: "#f0c4df" },
];

export const COR_PADRAO = CORES_DO_NO[0];

export function corPorId(id: string | undefined): CorDoNo {
  return CORES_DO_NO.find((c) => c.id === id) ?? COR_PADRAO;
}

export const VINCULOS = [
  { value: "amigos", label: "amigos" },
  { value: "trabalho", label: "trabalho" },
  { value: "familia", label: "família" },
] as const;

export const PRIVACIDADES = [
  { value: "publico", label: "público" },
  { value: "privado", label: "privado" },
] as const;
