import { useState } from "react";
import AppShell from "../components/AppShell";
import Avatar from "../components/Avatar";
import {
  CIRCULO,
  COMPROMISSOS,
  DEMO_HOJE,
  DIAS_COM_GENTE,
  DIAS_DA_SEMANA,
  ENCONTRO_SUGERIDO,
  MESES,
  gradeDoMes,
} from "../lib/demo-data";

export default function Calendario() {
  const [confirmados, setConfirmados] = useState<number[]>([]);
  const [marcado, setMarcado] = useState(false);

  const semanas = gradeDoMes(DEMO_HOJE);
  const hoje = DEMO_HOJE.getDate();
  const mes = `${MESES[DEMO_HOJE.getMonth()]} ${DEMO_HOJE.getFullYear()}`;

  return (
    <AppShell titulo={CIRCULO}>
      <section className="mt-1 rounded-[2rem] bg-branco px-4 py-6 shadow-sm shadow-ink/5">
        <h2 className="text-center text-[1.25rem] font-bold text-ink underline underline-offset-[6px] decoration-ink/70">
          {mes}
        </h2>

        <div className="mt-5 grid grid-cols-7 gap-y-1 text-center">
          {DIAS_DA_SEMANA.map((d) => (
            <span key={d} className="text-[0.8125rem] text-ink-soft">
              {d}
            </span>
          ))}

          {semanas.flat().map((dia, i) => (
            <Dia
              key={i}
              dia={dia}
              hoje={dia === hoje}
              sugerido={dia === ENCONTRO_SUGERIDO.dia}
              pessoas={DIAS_COM_GENTE.find((d) => d.dia === dia)?.pessoas}
            />
          ))}
        </div>
      </section>

      <h2 className="mt-6 text-[1.125rem] font-semibold lowercase text-ink">
        próximos compromissos
      </h2>

      <ul className="mt-3 space-y-3">
        {COMPROMISSOS.map((c) => {
          const confirmado = confirmados.includes(c.dia);
          return (
            <li
              key={c.dia}
              className={`flex items-center gap-3 rounded-2xl px-3 py-3 ${
                c.destaque ? "bg-amber-200" : "bg-cream-soft"
              }`}
            >
              <NumeroDoDia valor={c.dia} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.9375rem] font-semibold lowercase text-ink">
                  {c.titulo}
                </p>
                <p className="truncate text-[0.75rem] text-ink-soft">{c.quando}</p>
              </div>
              <button
                type="button"
                disabled={confirmado}
                onClick={() => setConfirmados((a) => [...a, c.dia])}
                className={`shrink-0 rounded-full px-3.5 py-2 text-[0.8125rem] font-semibold lowercase text-ink transition-transform active:scale-[0.97] disabled:opacity-60 ${
                  c.destaque ? "bg-amber" : "border border-ink bg-transparent"
                }`}
              >
                {confirmado ? "confirmado" : "confirmar"}
              </button>
            </li>
          );
        })}
      </ul>

      <h2 className="mt-6 text-[1.125rem] font-semibold lowercase text-ink">
        marcar encontro
      </h2>

      <div className="mt-3 flex items-center gap-3 rounded-2xl bg-rosa-100 px-3 py-3">
        <NumeroDoDia valor={ENCONTRO_SUGERIDO.dia} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.9375rem] font-semibold lowercase text-ink">
            {ENCONTRO_SUGERIDO.titulo}
          </p>
          <p className="truncate text-[0.75rem] text-ink-soft">
            {ENCONTRO_SUGERIDO.descricao}
          </p>
        </div>
        <button
          type="button"
          disabled={marcado}
          onClick={() => setMarcado(true)}
          className="shrink-0 rounded-full bg-rosa-200 px-3.5 py-2 text-[0.8125rem] font-semibold lowercase text-ink transition-transform active:scale-[0.97] disabled:opacity-60"
        >
          {marcado ? "marcado" : "marcar"}
        </button>
      </div>
    </AppShell>
  );
}

function NumeroDoDia({ valor }: { valor: number }) {
  return (
    <span className="flex shrink-0 items-center gap-2.5 pl-1">
      <span className="text-[1.125rem] font-semibold text-ink">{valor}</span>
      <span className="h-9 w-px bg-ink/25" />
    </span>
  );
}

function Dia({
  dia,
  hoje,
  sugerido,
  pessoas,
}: {
  dia: number | null;
  hoje: boolean;
  sugerido: boolean;
  pessoas?: string[];
}) {
  if (dia === null) return <span className="h-14" />;

  return (
    <span className="relative flex h-14 flex-col items-center">
      {hoje && (
        <span
          className="absolute top-0 h-1.5 w-1.5 rounded-full bg-no-terracota"
          aria-hidden="true"
        />
      )}

      <span
        className={`mt-2 flex h-7 w-7 items-center justify-center rounded-full text-[0.9375rem] ${
          sugerido ? "bg-rosa-200 font-semibold text-ink" : "text-ink"
        }`}
      >
        {dia}
      </span>

      {pessoas && (
        <span className="-mt-1.5 flex">
          {pessoas.slice(0, 3).map((nome, i) => (
            <Avatar
              key={nome}
              nome={nome}
              anel
              className={`h-[1.15rem] w-[1.15rem] ${i > 0 ? "-ml-2" : ""}`}
            />
          ))}
        </span>
      )}
    </span>
  );
}
