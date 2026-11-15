import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { POSTS_INICIAIS } from "./demo-data";
import { filtroPorId, recortePorId } from "./filtros";

export type Comentario = {
  id: string;
  autor: string;
  quando: string;
  texto: string;
};

export type Post = {
  id: string;
  autor: string;
  quando: string;
  foto: string;
  legenda?: string;
  local?: string;
  pessoas?: string[];
  /** CSS filter aplicado na edição */
  estilo?: string;
  giro?: number;
  proporcao?: number;
  curtidas: number;
  curtidaPorMim: boolean;
  salva: boolean;
  comentarios: Comentario[];
  /** veio da câmera nesta sessão: o objectURL precisa ser revogado ao sair */
  temporaria?: boolean;
};

/** Rascunho da memória sendo publicada, vivo entre as três etapas do fluxo. */
export type Rascunho = {
  foto: string;
  temporaria: boolean;
  filtro: string;
  recorte: string;
  giro: number;
  brilho: number;
  contraste: number;
  legenda: string;
  pessoas: string[];
  local: string;
  noCalendario: boolean;
};

export const RASCUNHO_VAZIO: Rascunho = {
  foto: "",
  temporaria: false,
  filtro: "original",
  recorte: "original",
  giro: 0,
  brilho: 1,
  contraste: 1,
  legenda: "",
  pessoas: [],
  local: "",
  noCalendario: false,
};

type Ctx = {
  posts: Post[];
  post: (id: string) => Post | undefined;
  curtir: (id: string) => void;
  salvar: (id: string) => void;
  comentar: (id: string, texto: string) => void;

  rascunho: Rascunho;
  iniciarRascunho: (foto: string, temporaria: boolean) => void;
  atualizarRascunho: (campos: Partial<Rascunho>) => void;
  publicarRascunho: () => string;
  registrarUrl: (url: string) => void;
};

const MemoriasContext = createContext<Ctx | null>(null);

export function MemoriasProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(POSTS_INICIAIS);
  const [rascunho, setRascunho] = useState<Rascunho>(RASCUNHO_VAZIO);
  const urlsRef = useRef<string[]>([]);

  // objectURL vive enquanto o app estiver aberto; revoga tudo ao desmontar
  useEffect(() => {
    const urls = urlsRef.current;
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, []);

  const registrarUrl = useCallback((url: string) => {
    urlsRef.current.push(url);
  }, []);

  const post = useCallback(
    (id: string) => posts.find((p) => p.id === id),
    [posts]
  );

  const mexerNoPost = useCallback(
    (id: string, fn: (p: Post) => Post) =>
      setPosts((atuais) => atuais.map((p) => (p.id === id ? fn(p) : p))),
    []
  );

  const curtir = useCallback(
    (id: string) =>
      mexerNoPost(id, (p) => ({
        ...p,
        curtidaPorMim: !p.curtidaPorMim,
        curtidas: p.curtidas + (p.curtidaPorMim ? -1 : 1),
      })),
    [mexerNoPost]
  );

  const salvar = useCallback(
    (id: string) => mexerNoPost(id, (p) => ({ ...p, salva: !p.salva })),
    [mexerNoPost]
  );

  const comentar = useCallback(
    (id: string, texto: string) => {
      const limpo = texto.trim();
      if (!limpo) return;
      mexerNoPost(id, (p) => ({
        ...p,
        comentarios: [
          ...p.comentarios,
          { id: `c-${Date.now()}`, autor: "você", quando: "agora", texto: limpo },
        ],
      }));
    },
    [mexerNoPost]
  );

  const iniciarRascunho = useCallback((foto: string, temporaria: boolean) => {
    setRascunho({ ...RASCUNHO_VAZIO, foto, temporaria });
  }, []);

  const atualizarRascunho = useCallback((campos: Partial<Rascunho>) => {
    setRascunho((atual) => ({ ...atual, ...campos }));
  }, []);

  const publicarRascunho = useCallback(() => {
    const id = `m-${Date.now()}`;
    const r = rascunho;
    const base = filtroPorId(r.filtro).css;
    const ajustes = `brightness(${r.brilho}) contrast(${r.contraste})`;
    setPosts((atuais) => [
      {
        id,
        autor: "você",
        quando: "agora",
        foto: r.foto,
        legenda: r.legenda.trim() || undefined,
        local: r.local.trim() || undefined,
        pessoas: r.pessoas.length ? r.pessoas : undefined,
        estilo: base === "none" ? ajustes : `${base} ${ajustes}`,
        giro: r.giro,
        proporcao: recortePorId(r.recorte).proporcao,
        curtidas: 0,
        curtidaPorMim: false,
        salva: false,
        comentarios: [],
        temporaria: r.temporaria,
      },
      ...atuais,
    ]);
    return id;
  }, [rascunho]);

  const valor = useMemo(
    () => ({
      posts,
      post,
      curtir,
      salvar,
      comentar,
      rascunho,
      iniciarRascunho,
      atualizarRascunho,
      publicarRascunho,
      registrarUrl,
    }),
    [posts, post, curtir, salvar, comentar, rascunho, iniciarRascunho, atualizarRascunho, publicarRascunho, registrarUrl]
  );

  return <MemoriasContext.Provider value={valor}>{children}</MemoriasContext.Provider>;
}

export function useMemorias() {
  const ctx = useContext(MemoriasContext);
  if (!ctx) throw new Error("useMemorias precisa estar dentro de <MemoriasProvider>");
  return ctx;
}
