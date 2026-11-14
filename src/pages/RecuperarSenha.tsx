import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Screen from "../components/Screen";
import Logo from "../components/Logo";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import TextField from "../components/TextField";
import { CAMPO_OBRIGATORIO } from "../lib/config";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RecuperarSenha() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const valor = email.trim();
    if (!valor && CAMPO_OBRIGATORIO) {
      setError("informe seu endereço de e-mail");
      return;
    }
    if (valor && !EMAIL_RE.test(valor)) {
      setError("endereço de e-mail inválido");
      return;
    }
    setError(undefined);

    setLoading(true);
    // TODO: trocar pela chamada real de recuperação de senha
    await new Promise((resolve) => setTimeout(resolve, 700));
    setLoading(false);
    navigate("/recuperar-senha/enviado", { state: { email: valor } });
  }

  return (
    <Screen>
      <header className="shrink-0">
        <BackButton to="/login" />
        <div className="flex justify-center pt-1 pb-[6vh]">
          <Logo className="max-w-[13.5rem]" />
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-1 flex-col justify-between gap-10"
      >
        <div className="flex flex-1 flex-col justify-center gap-6 pb-6">
          <div className="space-y-4 text-center">
            <h1 className="text-[1.5rem] font-bold lowercase text-ink">
              recuperar a senha
            </h1>
            <p className="mx-auto max-w-[19rem] text-[0.9375rem] leading-relaxed text-ink-soft">
              para recuperar a senha, informe o endereço de e-mail cadastrado
              que enviaremos um link para alteração da senha
            </p>
          </div>

          <TextField
            name="email"
            type="email"
            placeholder="seu endereço de e-mail"
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect="off"
            inputMode="email"
            value={email}
            error={error}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(undefined);
            }}
          />
        </div>

        <Button type="submit" loading={loading} className="mb-2">
          enviar link
        </Button>
      </form>
    </Screen>
  );
}
