import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Screen from "../components/Screen";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import { corPorId } from "../lib/no";

type LocationState = { nome?: string; corId?: string } | null;

export default function NoCriado() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { nome, corId } = (state as LocationState) ?? {};
  const cor = corPorId(corId);
  const [copiado, setCopiado] = useState(false);

  // TODO: usar o link de convite devolvido pelo backend
  const linkConvite = `${window.location.origin}/convite/${slug(nome ?? "no")}`;

  async function compartilhar() {
    const texto = nome
      ? `entra no nó "${nome}" comigo no denós`
      : "entra no meu nó no denós";

    if (navigator.share) {
      try {
        await navigator.share({ title: "denós", text: texto, url: linkConvite });
        return;
      } catch {
        // usuário cancelou a folha de compartilhamento: cai pro copiar
      }
    }

    try {
      await navigator.clipboard.writeText(linkConvite);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2200);
    } catch {
      window.prompt("copie o link do convite:", linkConvite);
    }
  }

  return (
    <Screen>
      <header className="shrink-0">
        <BackButton to="/criar-no" />
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-8 pb-4 text-center">
        <h1 className="text-[1.5rem] font-bold lowercase text-ink">
          nó apertado
        </h1>

        <div
          className="h-60 w-60 rounded-full"
          style={{ backgroundColor: cor.hex }}
          aria-hidden="true"
        />

        <p className="mx-auto max-w-[20rem] text-[0.9375rem] leading-relaxed text-ink-soft">
          {nome ? `o nó "${nome}" já foi amarrado` : "seu nó já foi amarrado"}.
          convide a galera e comecem a compartilhar memórias juntos!
        </p>
      </main>

      <div className="shrink-0 space-y-4 pb-2">
        <Button
          type="button"
          variant="ghost"
          onClick={() => navigate("/feed")}
        >
          ir para o círculo
        </Button>

        <Button type="button" onClick={compartilhar}>
          {copiado ? "link copiado!" : "compartilhar link"}
        </Button>
      </div>
    </Screen>
  );
}

function slug(valor: string) {
  return (
    valor
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "no"
  );
}
