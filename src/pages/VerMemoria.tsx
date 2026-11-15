import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Avatar from "../components/Avatar";
import PreviewFoto from "../components/PreviewFoto";
import BackButton from "../components/BackButton";
import {
  BellIcon,
  BookmarkIcon,
  ChatIcon,
  HeartIcon,
  MoreIcon,
  PinIcon,
} from "../components/icons";
import { CIRCULO } from "../lib/demo-data";
import { useMemorias } from "../lib/memorias";

const LIMITE = 100;

export default function VerMemoria() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { post, curtir, salvar, comentar } = useMemorias();
  const [texto, setTexto] = useState("");

  const memoria = post(id);
  if (!memoria) return <Navigate to="/feed" replace />;

  function enviar() {
    if (!texto.trim()) return;
    comentar(id, texto);
    setTexto("");
  }

  return (
    <div className="min-h-dvh w-full bg-cream">
      <div className="mx-auto flex min-h-dvh w-full max-w-[26.25rem] flex-col">
        <header className="grid shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-2 px-6 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2">
          <div className="justify-self-start">
            <BackButton to="/feed" />
          </div>
          <h1 className="truncate text-center text-[1.0625rem] lowercase text-ink">
            {CIRCULO}
          </h1>
          <button
            type="button"
            aria-label="notificações"
            className="-mr-2 flex h-11 w-11 items-center justify-center justify-self-end rounded-full text-ink transition-colors active:bg-cream-soft"
          >
            <BellIcon className="h-6 w-6" />
          </button>
        </header>

        <main className="flex-1 px-6 pb-10">
          <div className="flex items-center gap-3 py-2">
            <Avatar nome={memoria.autor} className="h-11 w-11" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.9375rem] font-semibold lowercase text-ink">
                {memoria.autor}
              </p>
              <p className="text-[0.8125rem] text-ink-soft">{memoria.quando}</p>
            </div>
            <button
              type="button"
              aria-label="mais opções"
              className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors active:bg-cream-soft"
            >
              <MoreIcon className="h-5 w-5" />
            </button>
          </div>

          <PreviewFoto
            foto={memoria.foto}
            estilo={memoria.estilo}
            giro={memoria.giro}
            proporcao={memoria.proporcao}
            className="mt-1 rounded-2xl"
            alt={`memória de ${memoria.autor}`}
          />

          {(memoria.legenda || memoria.local || memoria.pessoas) && (
            <div className="mt-3 space-y-1">
              {memoria.legenda && (
                <p className="text-[0.9375rem] leading-snug text-ink">{memoria.legenda}</p>
              )}
              {memoria.local && (
                <p className="flex items-center gap-1.5 text-[0.8125rem] text-ink-soft">
                  <PinIcon className="h-4 w-4" />
                  {memoria.local}
                </p>
              )}
              {memoria.pessoas && memoria.pessoas.length > 0 && (
                <p className="text-[0.8125rem] text-ink-soft">
                  com {memoria.pessoas.join(", ")}
                </p>
              )}
            </div>
          )}

          <div className="mt-3 flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => curtir(id)}
              aria-pressed={memoria.curtidaPorMim}
              aria-label={memoria.curtidaPorMim ? "remover curtida" : "curtir"}
              className={`flex h-11 items-center gap-2 rounded-xl border px-3 text-[0.9375rem] transition-colors ${
                memoria.curtidaPorMim
                  ? "border-no-terracota text-no-terracota"
                  : "border-ink/70 text-ink"
              }`}
            >
              <HeartIcon className="h-5 w-5" cheio={memoria.curtidaPorMim} />
              {memoria.curtidas}
            </button>

            <span className="flex h-11 items-center gap-2 rounded-xl border border-ink/70 px-3 text-[0.9375rem] text-ink">
              <ChatIcon className="h-5 w-5" />
              {memoria.comentarios.length}
            </span>

            <button
              type="button"
              onClick={() => salvar(id)}
              aria-pressed={memoria.salva}
              className={`ml-auto flex h-11 items-center gap-2 rounded-full px-4 text-[0.875rem] font-semibold lowercase text-ink transition-colors ${
                memoria.salva ? "bg-amber" : "bg-amber-100"
              }`}
            >
              <BookmarkIcon className="h-5 w-5" />
              {memoria.salva ? "memória salva" : "salvar memória"}
            </button>
          </div>

          <ul className="mt-6 space-y-4">
            {memoria.comentarios.map((c) => (
              <li key={c.id} className="flex gap-3">
                <Avatar nome={c.autor} className="h-10 w-10" />
                <div className="min-w-0 flex-1">
                  <p className="flex items-baseline gap-2">
                    <span className="text-[0.9375rem] font-semibold lowercase text-ink">
                      {c.autor}
                    </span>
                    <span className="text-[0.75rem] text-ink-soft">{c.quando}</span>
                  </p>
                  <p className="text-[0.9375rem] leading-snug text-ink">{c.texto}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex gap-3">
            <Avatar nome="você" className="h-10 w-10" />
            <div className="min-w-0 flex-1">
              <textarea
                rows={2}
                maxLength={LIMITE}
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="escreva um comentário"
                aria-label="escreva um comentário"
                className="w-full resize-none rounded-2xl bg-cream-soft p-3 text-base text-ink outline-none placeholder:text-ink-soft/85 focus:ring-2 focus:ring-amber/40"
              />
              <p className="mt-1 text-right text-[0.75rem] text-ink-soft">
                {texto.length}/{LIMITE}
              </p>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-2.5">
            {["❤️", "😂"].map((emoji) => (
              <button
                key={emoji}
                type="button"
                aria-label={`adicionar ${emoji}`}
                onClick={() => setTexto((t) => (t + emoji).slice(0, LIMITE))}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber text-lg transition-transform active:scale-95"
              >
                {emoji}
              </button>
            ))}
            <button
              type="button"
              onClick={enviar}
              disabled={!texto.trim()}
              className="ml-auto flex h-11 shrink-0 items-center whitespace-nowrap rounded-full bg-amber px-4 text-[0.875rem] font-semibold lowercase text-ink transition-transform active:scale-[0.97] disabled:opacity-50"
            >
              publicar comentário
            </button>
          </div>

          <button
            type="button"
            onClick={() => navigate("/feed")}
            className="mt-8 flex h-11 w-full items-center justify-center text-[0.9375rem] text-ink-soft underline underline-offset-4"
          >
            voltar para o círculo
          </button>
        </main>
      </div>
    </div>
  );
}
