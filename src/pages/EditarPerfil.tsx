import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Screen from "../components/Screen";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import TextField from "../components/TextField";
import Avatar from "../components/Avatar";
import Laco from "../components/Laco";
import { BORDAS_DO_ICONE, LACOS } from "../lib/demo-data";
import { usePerfil } from "../lib/perfil";

export default function EditarPerfil() {
  const navigate = useNavigate();
  const { perfil, salvar } = usePerfil();

  const [nome, setNome] = useState(perfil.nome);
  const [borda, setBorda] = useState(perfil.borda);
  const [visiveis, setVisiveis] = useState<string[]>(perfil.lacosVisiveis);
  const [foto, setFoto] = useState<string | undefined>(perfil.foto);
  const inputRef = useRef<HTMLInputElement>(null);
  const criadaAqui = useRef<string | null>(null);

  // só revoga a URL se ela não tiver sido salva no perfil
  useEffect(() => {
    return () => {
      const url = criadaAqui.current;
      if (url && url !== perfil.foto) URL.revokeObjectURL(url);
    };
  }, [perfil.foto]);

  function trocarFoto(file: File | null) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (criadaAqui.current && criadaAqui.current !== perfil.foto) {
      URL.revokeObjectURL(criadaAqui.current);
    }
    criadaAqui.current = url;
    setFoto(url);
  }

  function alternarLaco(id: string) {
    setVisiveis((atuais) =>
      atuais.includes(id) ? atuais.filter((x) => x !== id) : [...atuais, id]
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: enviar pro backend
    salvar({ nome: nome.trim() || perfil.nome, foto, borda, lacosVisiveis: visiveis });
    navigate("/perfil");
  }

  return (
    <Screen>
      <header className="shrink-0">
        <BackButton to="/perfil" />
        <h1 className="-mt-9 text-center text-[1.5rem] font-bold lowercase text-ink">
          editar perfil
        </h1>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-6 pt-6">
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            aria-label="trocar foto"
            className="rounded-full transition-transform active:scale-[0.97]"
          >
            <Avatar nome={nome || "?"} foto={foto} className="h-36 w-36" />
          </button>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-[0.9375rem] text-amber-deep"
          >
            trocar foto
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              trocarFoto(e.target.files?.[0] ?? null);
              e.target.value = "";
            }}
          />
        </div>

        <TextField
          label="nome"
          name="nome"
          placeholder="seu nome"
          maxLength={30}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <div>
          <p className="mb-2 text-[1.0625rem] font-semibold lowercase text-ink">
            borda do ícone
          </p>
          <div
            role="radiogroup"
            aria-label="borda do ícone"
            className="flex items-center justify-around rounded-3xl border border-amber px-4 py-5"
          >
            {BORDAS_DO_ICONE.map((opcao) => (
              <button
                key={opcao.id}
                type="button"
                role="radio"
                aria-checked={borda === opcao.cor}
                aria-label={opcao.id}
                onClick={() => setBorda(opcao.cor)}
                className={`h-17 w-17 rounded-full border-2 transition-transform active:scale-95 ${
                  borda === opcao.cor ? "ring-2 ring-ink ring-offset-4 ring-offset-cream" : ""
                }`}
                style={{ borderColor: opcao.cor }}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[1.0625rem] font-semibold lowercase text-ink">
            conquistas no perfil
          </p>
          <div className="grid grid-cols-4 gap-2 rounded-3xl border border-amber px-3 py-4">
            {LACOS.map((laco) => {
              const ativo = visiveis.includes(laco.id);
              return (
                <button
                  key={laco.id}
                  type="button"
                  aria-pressed={ativo}
                  onClick={() => alternarLaco(laco.id)}
                  className="flex flex-col items-center gap-1.5 transition-transform active:scale-95"
                >
                  <Laco cor={laco.cor} className="h-14 w-14" opaco={ativo} />
                  <span
                    className={`text-center text-[0.6875rem] leading-tight lowercase ${
                      ativo ? "text-ink" : "text-muted"
                    }`}
                  >
                    {laco.nome}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-auto pb-2 pt-2">
          <Button type="submit">salvar</Button>
        </div>
      </form>
    </Screen>
  );
}
