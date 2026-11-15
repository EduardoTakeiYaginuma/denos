import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Screen from "../components/Screen";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import PreviewFoto from "../components/PreviewFoto";
import { FILTROS, RECORTES, filtroPorId, recortePorId } from "../lib/filtros";
import { useMemorias } from "../lib/memorias";

type Ferramenta = "cortar" | "ajustar" | "filtro" | null;

export default function EditarMemoria() {
  const navigate = useNavigate();
  const { rascunho, atualizarRascunho } = useMemorias();
  const [aberta, setAberta] = useState<Ferramenta>("filtro");

  // entrar direto nesta rota sem passar pela escolha da foto
  if (!rascunho.foto) return <Navigate to="/nova-memoria" replace />;

  const base = filtroPorId(rascunho.filtro).css;
  const ajustes = `brightness(${rascunho.brilho}) contrast(${rascunho.contraste})`;
  const estilo = base === "none" ? ajustes : `${base} ${ajustes}`;
  const proporcao = recortePorId(rascunho.recorte).proporcao;

  return (
    <Screen>
      <header className="shrink-0">
        <BackButton to="/nova-memoria" />
        <h1 className="-mt-9 text-center text-[1.25rem] font-bold lowercase text-ink">
          editar memória
        </h1>
      </header>

      <div className="flex flex-1 flex-col gap-4 pt-5">
        <PreviewFoto
          foto={rascunho.foto}
          estilo={estilo}
          giro={rascunho.giro}
          proporcao={proporcao}
          className="rounded-2xl"
          alt="prévia da memória"
        />

        {aberta === "filtro" && (
          <div className="-mx-6 overflow-x-auto px-6">
            <ul className="flex gap-2.5">
              {FILTROS.map((f) => (
                <li key={f.id}>
                  <button
                    type="button"
                    onClick={() => atualizarRascunho({ filtro: f.id })}
                    aria-pressed={f.id === rascunho.filtro}
                    className="flex w-18 flex-col items-center gap-1.5"
                  >
                    <span
                      className={`block h-18 w-18 overflow-hidden rounded-xl transition-transform active:scale-95 ${
                        f.id === rascunho.filtro
                          ? "ring-2 ring-ink ring-offset-2 ring-offset-cream"
                          : ""
                      }`}
                    >
                      <img
                        src={rascunho.foto}
                        alt=""
                        className="h-full w-full object-cover"
                        style={{ filter: f.css }}
                        draggable={false}
                      />
                    </span>
                    <span className="text-[0.6875rem] lowercase text-ink-soft">
                      {f.nome}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {aberta === "cortar" && (
          <div className="flex gap-2.5">
            {RECORTES.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => atualizarRascunho({ recorte: r.id })}
                aria-pressed={r.id === rascunho.recorte}
                className={`h-11 flex-1 rounded-xl border text-[0.8125rem] lowercase transition-colors ${
                  r.id === rascunho.recorte
                    ? "border-ink bg-amber-100 font-semibold text-ink"
                    : "border-ink/70 text-ink-soft"
                }`}
              >
                {r.nome}
              </button>
            ))}
          </div>
        )}

        {aberta === "ajustar" && (
          <div className="space-y-3">
            <Controle
              rotulo="brilho"
              valor={rascunho.brilho}
              onChange={(v) => atualizarRascunho({ brilho: v })}
            />
            <Controle
              rotulo="contraste"
              valor={rascunho.contraste}
              onChange={(v) => atualizarRascunho({ contraste: v })}
            />
          </div>
        )}

        <div className="grid grid-cols-4 gap-2.5">
          <Ferramentaem
            rotulo="cortar"
            ativa={aberta === "cortar"}
            onClick={() => setAberta(aberta === "cortar" ? null : "cortar")}
          />
          <Ferramentaem
            rotulo="ajustar"
            ativa={aberta === "ajustar"}
            onClick={() => setAberta(aberta === "ajustar" ? null : "ajustar")}
          />
          <Ferramentaem
            rotulo="filtro"
            ativa={aberta === "filtro"}
            onClick={() => setAberta(aberta === "filtro" ? null : "filtro")}
          />
          <Ferramentaem
            rotulo="girar"
            ativa={false}
            onClick={() => atualizarRascunho({ giro: (rascunho.giro + 90) % 360 })}
          />
        </div>
      </div>

      <div className="shrink-0 pb-2 pt-4">
        <Button type="button" onClick={() => navigate("/nova-memoria/compartilhar")}>
          avançar
        </Button>
      </div>
    </Screen>
  );
}

function Ferramentaem({
  rotulo,
  ativa,
  onClick,
}: {
  rotulo: string;
  ativa: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={ativa}
      className={`flex h-16 items-end justify-center rounded-xl border pb-2.5 text-[0.8125rem] lowercase transition-colors ${
        ativa ? "border-ink bg-amber-100 font-semibold text-ink" : "border-ink/70 text-ink"
      }`}
    >
      {rotulo}
    </button>
  );
}

function Controle({
  rotulo,
  valor,
  onChange,
}: {
  rotulo: string;
  valor: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex items-center gap-3">
      <span className="w-20 shrink-0 text-[0.8125rem] lowercase text-ink">{rotulo}</span>
      <input
        type="range"
        min={0.6}
        max={1.4}
        step={0.02}
        value={valor}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-11 flex-1 accent-[#e9ac4c]"
      />
    </label>
  );
}
