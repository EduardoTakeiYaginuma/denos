import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Screen from "../components/Screen";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import TextField from "../components/TextField";
import Select from "../components/Select";
import PhotoPicker from "../components/PhotoPicker";
import ColorPicker from "../components/ColorPicker";
import { COR_PADRAO, PRIVACIDADES, VINCULOS, corPorId } from "../lib/no";
import { CAMPO_OBRIGATORIO } from "../lib/config";

type Errors = {
  nome?: string;
  vinculo?: string;
  privacidade?: string;
};

export default function CriarNo() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [vinculo, setVinculo] = useState("");
  const [corId, setCorId] = useState(COR_PADRAO.id);
  const [privacidade, setPrivacidade] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const cor = corPorId(corId);

  function limpar(campo: keyof Errors) {
    setErrors((atual) => (atual[campo] ? { ...atual, [campo]: undefined } : atual));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const next: Errors = {};
    if (CAMPO_OBRIGATORIO && !nome.trim()) next.nome = "dê um nome ao seu nó";
    if (CAMPO_OBRIGATORIO && !vinculo)
      next.vinculo = "escolha o que une esse nó";
    if (CAMPO_OBRIGATORIO && !privacidade)
      next.privacidade = "escolha a privacidade do nó";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    // TODO: trocar pela chamada real de criação do nó
    await new Promise((resolve) => setTimeout(resolve, 700));
    setLoading(false);
    navigate("/no-criado", {
      state: { nome: nome.trim() || undefined, corId, vinculo, privacidade },
    });
  }

  return (
    <Screen>
      <header className="shrink-0">
        <BackButton to="/cadastro" />
        <h1 className="-mt-9 text-center text-[1.5rem] font-bold lowercase text-ink">
          criar nó
        </h1>
        <div className="pt-7">
          <PhotoPicker cor={cor.hex} />
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-1 flex-col justify-between gap-9 pt-8"
      >
        <div className="space-y-5">
          <TextField
            label="nome do nó"
            name="nome-do-no"
            placeholder="nome do círculo"
            autoCapitalize="sentences"
            maxLength={40}
            value={nome}
            error={errors.nome}
            onChange={(e) => {
              setNome(e.target.value);
              limpar("nome");
            }}
          />

          <Select
            label="o que nos une?"
            name="vinculo"
            placeholder="selecione uma opção (amigos/trabalho/família)"
            options={VINCULOS}
            value={vinculo}
            error={errors.vinculo}
            onChange={(e) => {
              setVinculo(e.target.value);
              limpar("vinculo");
            }}
          />

          <div>
            <p className="mb-3 text-[1.0625rem] font-semibold lowercase text-ink">
              escolha a cor do nó
            </p>
            <ColorPicker value={corId} onChange={setCorId} />
          </div>

          <Select
            label="privacidade"
            name="privacidade"
            placeholder="selecione uma opção (público, privado)"
            options={PRIVACIDADES}
            value={privacidade}
            error={errors.privacidade}
            onChange={(e) => {
              setPrivacidade(e.target.value);
              limpar("privacidade");
            }}
          />
        </div>

        <Button type="submit" loading={loading} className="mb-2">
          continuar
        </Button>
      </form>
    </Screen>
  );
}
