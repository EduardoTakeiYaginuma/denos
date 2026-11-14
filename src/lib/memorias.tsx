import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { POSTS_INICIAIS } from "./demo-data";

export type Post = {
  id: string;
  autor: string;
  quando: string;
  foto: string;
  /** true = veio da câmera nesta sessão, precisa de revokeObjectURL ao sair */
  temporaria?: boolean;
};

type Ctx = {
  posts: Post[];
  adicionarFoto: (file: File) => void;
};

const MemoriasContext = createContext<Ctx | null>(null);

export function MemoriasProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(POSTS_INICIAIS);
  const urlsRef = useRef<string[]>([]);

  // os objectURL criados aqui vivem enquanto o app estiver aberto
  useEffect(() => {
    const urls = urlsRef.current;
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, []);

  const adicionarFoto = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    urlsRef.current.push(url);
    setPosts((atuais) => [
      {
        id: `nova-${Date.now()}`,
        autor: "você",
        quando: "agora",
        foto: url,
        temporaria: true,
      },
      ...atuais,
    ]);
  }, []);

  const valor = useMemo(() => ({ posts, adicionarFoto }), [posts, adicionarFoto]);

  return <MemoriasContext.Provider value={valor}>{children}</MemoriasContext.Provider>;
}

export function useMemorias() {
  const ctx = useContext(MemoriasContext);
  if (!ctx) throw new Error("useMemorias precisa estar dentro de <MemoriasProvider>");
  return ctx;
}
