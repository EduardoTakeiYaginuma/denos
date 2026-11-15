import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Screen from "../components/Screen";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import PreviewFoto from "../components/PreviewFoto";
import { CalendarIcon, PinIcon, UsersIcon } from "../components/icons";
import { LUGAR, PESSOAS_DO_NO } from "../lib/demo-data";
import { filtroPorId, recortePorId } from "../lib/filtros";
import { useMemorias } from "../lib/memorias";

const LIMITE = 200;
type Aberta = "pessoas" | "local" | null;

export default function CompartilharMemoria() {
  const navigate = useNavigate();
  const { rascunho, atualizarRascunho, publicarRascunho } = useMemorias();
  const [aberta, setAberta] = useState<Aberta>(null);

  if (!rascunho.foto) return <Navigate to="/nova-memoria" replace />;

  const base = filtroPorId(rascunho.filtro).css;
  const estilo =
    base === "none"
      ? `brightness(${rascunho.brilho}) contrast(${rascunho.contraste})`
      : `${base} brightness(${rascunho.brilho}) contrast(${rascunho.contraste})`;

  function alternarPessoa(nome: string) {
    const atuais = rascunho.pessoas;
    atualizarRascunho({
      pessoas: atuais.includes(nome)
        ? atuais.filter((p) => p !== nome)
        : [...atuais, nome],
    });
  }

  function publicar() {
    const id = publicarRascunho();
    navigate(`/memoria/${id}`, { replace: true });
  }

  return (
    <Screen>
      <header className="shrink-0">
        <BackButton to="/nova-memoria/editar" />
        <h1 className="-mt-9 text-center text-[1.25rem] font-bold lowercase text-ink">
          compartilhar memória
        </h1>
      </header>

      <div className="flex flex-1 flex-col gap-5 pt-5">
        <div className="flex gap-3">
          <div className="w-24 shrink-0">
            <PreviewFoto
              foto={rascunho.foto}
              estilo={estilo}
              giro={rascunho.giro}
              proporcao={recortePorId(rascunho.recorte).proporcao}
              className="rounded-xl"
              alt="prévia da memória"
            />
          </div>

          <div className="min-w-0 flex-1">
            <label
              htmlFor="legenda"
              className="mb-2 block text-[1.0625rem] font-semibold lowercase text-ink"
            >
              legenda
            </label>
            <textarea
              id="legenda"
              rows={4}
              maxLength={LIMITE}
              value={rascunho.legenda}
              onChange={(e) => atualizarRascunho({ legenda: e.target.value })}
              placeholder="conta como foi"
              className="w-full resize-none rounded-2xl border border-ink/70 bg-transparent p-3 text-base text-ink outline-none placeholder:text-ink-soft/85 focus:ring-2 focus:ring-amber/40"
            />
            <p className="mt-1 text-right text-[0.75rem] text-ink-soft">
              {rascunho.legenda.length}/{LIMITE}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Linha
            icone={<UsersIcon className="h-5 w-5" />}
            rotulo={
              aberta !== "pessoas" && rascunho.pessoas.length
                ? rascunho.pessoas.join(", ")
                : "marcar pessoas"
            }
            preenchida={aberta !== "pessoas" && rascunho.pessoas.length > 0}
            aberta={aberta === "pessoas"}
            onClick={() => setAberta(aberta === "pessoas" ? null : "pessoas")}
          />

          {aberta === "pessoas" && (
            <ul className="flex flex-wrap gap-2 px-1">
              {PESSOAS_DO_NO.map((nome) => {
                const marcada = rascunho.pessoas.includes(nome);
                return (
                  <li key={nome}>
                    <button
                      type="button"
                      aria-pressed={marcada}
                      onClick={() => alternarPessoa(nome)}
                      className={`flex h-11 items-center rounded-full border px-4 text-[0.875rem] lowercase transition-colors ${
                        marcada
                          ? "border-ink bg-amber-100 font-semibold text-ink"
                          : "border-ink/70 text-ink-soft"
                      }`}
                    >
                      {nome}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          <Linha
            icone={<PinIcon className="h-5 w-5" />}
            rotulo={
              aberta !== "local" && rascunho.local
                ? rascunho.local
                : "adicionar localização"
            }
            preenchida={aberta !== "local" && Boolean(rascunho.local)}
            aberta={aberta === "local"}
            onClick={() => setAberta(aberta === "local" ? null : "local")}
          />

          {aberta === "local" && (
            <div className="space-y-2 px-1">
              <input
                value={rascunho.local}
                onChange={(e) => atualizarRascunho({ local: e.target.value })}
                placeholder="onde foi?"
                aria-label="localização"
                className="h-12 w-full rounded-full border border-ink/70 bg-transparent px-4 text-base text-ink outline-none placeholder:text-ink-soft/85 focus:ring-2 focus:ring-amber/40"
              />
              <button
                type="button"
                onClick={() => atualizarRascunho({ local: LUGAR.nome })}
                className="flex h-11 items-center rounded-full border border-ink/70 px-4 text-[0.875rem] lowercase text-ink-soft"
              >
                usar “{LUGAR.nome}”
              </button>
            </div>
          )}

          <label className="flex min-h-13 cursor-pointer items-center gap-3 rounded-full border border-ink/70 px-4">
            <span className="text-ink-soft">
              <CalendarIcon className="h-5 w-5" />
            </span>
            <span className="flex-1 text-[0.9375rem] lowercase text-ink">
              adicionar ao calendário
            </span>
            <input
              type="checkbox"
              checked={rascunho.noCalendario}
              onChange={(e) => atualizarRascunho({ noCalendario: e.target.checked })}
              className="h-6 w-6 shrink-0 accent-[#e9ac4c]"
            />
          </label>
        </div>
      </div>

      <div className="shrink-0 pb-2 pt-4">
        <Button type="button" onClick={publicar}>
          avançar
        </Button>
      </div>
    </Screen>
  );
}

function Linha({
  icone,
  rotulo,
  preenchida,
  aberta,
  onClick,
}: {
  icone: React.ReactNode;
  rotulo: string;
  preenchida: boolean;
  aberta: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={aberta}
      className="flex h-13 w-full items-center gap-3 rounded-full border border-ink/70 px-4 text-left transition-colors active:bg-cream-soft"
    >
      <span className="shrink-0 text-ink-soft">{icone}</span>
      <span
        className={`truncate text-[0.9375rem] lowercase ${
          preenchida ? "text-ink" : "text-ink-soft/85"
        }`}
      >
        {rotulo}
      </span>
    </button>
  );
}
