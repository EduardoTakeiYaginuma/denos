import type { ReactNode } from "react";
import AppHeader from "./AppHeader";
import TabBar from "./TabBar";

type AppShellProps = {
  titulo?: string;
  children: ReactNode;
};

/** Casca das telas internas: header fixo no topo, conteúdo rolável, tab bar flutuante. */
export default function AppShell({ titulo, children }: AppShellProps) {
  return (
    <div className="min-h-dvh w-full bg-cream">
      <div className="mx-auto flex min-h-dvh w-full max-w-[26.25rem] flex-col">
        <AppHeader titulo={titulo} />
        {/* pb deixa espaço pra tab bar flutuante não cobrir o fim do conteúdo */}
        <main className="flex-1 px-6 pb-28">{children}</main>
      </div>
      <TabBar />
    </div>
  );
}
