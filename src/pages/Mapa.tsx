import { useState } from "react";
import AppShell from "../components/AppShell";
import Avatar from "../components/Avatar";
import MapaIlustrado from "../components/MapaIlustrado";
import { PinIcon, SparkleIcon, UsersIcon } from "../components/icons";
import { LUGAR, PESSOAS_PERTO } from "../lib/demo-data";

export default function Mapa() {
  const [convidados, setConvidados] = useState<string[]>([]);

  return (
    <AppShell>
      <MapaIlustrado>
        <MarcadorNoMapa nome="isa" left="38%" top="42%" />
        <MarcadorNoMapa nome="du" left="70%" top="22%" />
      </MapaIlustrado>

      <h2 className="mt-4 text-[1.375rem] font-semibold lowercase text-ink">
        {LUGAR.nome}
      </h2>
      <p className="mt-1 flex items-center gap-1.5 text-[0.8125rem] text-ink-soft">
        <PinIcon className="h-4 w-4" />
        {LUGAR.categoria} • {LUGAR.situacao}
      </p>

      <section className="mt-4 rounded-2xl bg-amber-200 px-4 py-3.5">
        <p className="flex items-center gap-2 text-[1.0625rem] font-semibold lowercase text-ink">
          <UsersIcon className="h-5 w-5" />
          vamos juntos?
        </p>
        <p className="mt-1 text-[0.9375rem] text-ink-soft">
          tem gente que toparia muito esse rolê!
        </p>
      </section>

      <ul className="mt-4 space-y-3">
        {PESSOAS_PERTO.map((pessoa) => {
          const convidado = convidados.includes(pessoa.nome);
          return (
            <li key={pessoa.nome} className="flex items-center gap-3">
              <Avatar nome={pessoa.nome} className="h-13 w-13" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[1.0625rem] font-semibold lowercase text-ink">
                  {pessoa.nome}
                </p>
                <p className="truncate text-[0.75rem] text-ink-soft">
                  {pessoa.distancia} • {pessoa.situacao}
                </p>
              </div>
              <button
                type="button"
                disabled={convidado}
                onClick={() => setConvidados((atuais) => [...atuais, pessoa.nome])}
                className="shrink-0 rounded-full bg-amber px-4 py-2 text-[0.875rem] font-semibold lowercase text-ink transition-transform active:scale-[0.97] disabled:bg-amber-100 disabled:text-ink-soft"
              >
                {convidado ? "convidado" : "convidar"}
              </button>
            </li>
          );
        })}
      </ul>

      <section className="mt-4 rounded-2xl bg-azul-200 px-4 py-3.5">
        <p className="flex items-center gap-2 text-[1.0625rem] font-semibold lowercase text-ink">
          <SparkleIcon className="h-5 w-5" />
          não sabe onde ir?
        </p>
        <p className="mt-1 text-[0.9375rem] text-ink">teste nosso match!</p>
      </section>
    </AppShell>
  );
}

function MarcadorNoMapa({
  nome,
  left,
  top,
}: {
  nome: string;
  left: string;
  top: string;
}) {
  return (
    <span
      className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center"
      style={{ left, top }}
    >
      <Avatar nome={nome} anel
        className="h-10 w-10" />
      <PinIcon className="-mt-1 h-7 w-7 text-ink drop-shadow" />
    </span>
  );
}
