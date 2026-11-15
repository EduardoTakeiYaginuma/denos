import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Screen from "../components/Screen";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import PreviewFoto from "../components/PreviewFoto";
import { GALERIA_RECENTE } from "../lib/demo-data";
import { useMemorias } from "../lib/memorias";

export default function NovaMemoria() {
  const navigate = useNavigate();
  const { iniciarRascunho, registrarUrl } = useMemorias();
  const inputRef = useRef<HTMLInputElement>(null);

  const [foto, setFoto] = useState<string>(GALERIA_RECENTE[0]);
  const [doAparelho, setDoAparelho] = useState<string[]>([]);

  function escolherArquivo(file: File | null) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    registrarUrl(url);
    setDoAparelho((atuais) => [url, ...atuais]);
    setFoto(url);
  }

  function avancar() {
    iniciarRascunho(foto, doAparelho.includes(foto));
    navigate("/nova-memoria/editar");
  }

  const galeria = [...doAparelho, ...GALERIA_RECENTE];

  return (
    <Screen>
      <header className="shrink-0">
        <BackButton to="/feed" />
        <h1 className="-mt-9 text-center text-[1.25rem] font-bold lowercase text-ink">
          nova memória
        </h1>
      </header>

      <div className="flex flex-1 flex-col gap-5 pt-5">
        <PreviewFoto
          foto={foto}
          proporcao={3 / 4}
          className="rounded-2xl"
          alt="foto selecionada"
        />

        <div className="-mx-6 overflow-x-auto px-6">
          <ul className="flex gap-2.5">
            <li>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                aria-label="escolher do aparelho"
                className="flex h-22 w-22 items-center justify-center rounded-xl border border-ink/70 text-2xl text-ink transition-transform active:scale-95"
              >
                +
              </button>
            </li>

            {galeria.map((src) => (
              <li key={src}>
                <button
                  type="button"
                  onClick={() => setFoto(src)}
                  aria-label="usar esta foto"
                  aria-pressed={src === foto}
                  className={`block h-22 w-22 overflow-hidden rounded-xl transition-transform active:scale-95 ${
                    src === foto ? "ring-2 ring-ink ring-offset-2 ring-offset-cream" : ""
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" draggable={false} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            escolherArquivo(e.target.files?.[0] ?? null);
            e.target.value = "";
          }}
        />
      </div>

      <div className="shrink-0 pb-2 pt-4">
        <Button type="button" onClick={avancar}>
          avançar
        </Button>
      </div>
    </Screen>
  );
}
