import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { LACOS, PERFIL } from "./demo-data";

export type DadosDoPerfil = {
  nome: string;
  foto?: string;
  /** cor da borda do ícone (hex) */
  borda: string;
  /** ids dos laços que aparecem no perfil */
  lacosVisiveis: string[];
};

type Ctx = {
  perfil: DadosDoPerfil;
  salvar: (dados: DadosDoPerfil) => void;
};

const PerfilContext = createContext<Ctx | null>(null);

const INICIAL: DadosDoPerfil = {
  nome: PERFIL.nome,
  borda: "#e9ac4c",
  lacosVisiveis: LACOS.map((l) => l.id),
};

export function PerfilProvider({ children }: { children: ReactNode }) {
  const [perfil, setPerfil] = useState<DadosDoPerfil>(INICIAL);
  const valor = useMemo(() => ({ perfil, salvar: setPerfil }), [perfil]);
  return <PerfilContext.Provider value={valor}>{children}</PerfilContext.Provider>;
}

export function usePerfil() {
  const ctx = useContext(PerfilContext);
  if (!ctx) throw new Error("usePerfil precisa estar dentro de <PerfilProvider>");
  return ctx;
}
