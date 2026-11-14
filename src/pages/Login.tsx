import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Screen from "../components/Screen";
import Logo from "../components/Logo";
import Button, { GoogleIcon } from "../components/Button";
import TextField, { PasswordField } from "../components/TextField";
import { CAMPO_OBRIGATORIO } from "../lib/config";

type Errors = {
  usuario?: string;
  senha?: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  function limpar(campo: keyof Errors) {
    setErrors((atual) => (atual[campo] ? { ...atual, [campo]: undefined } : atual));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const next: Errors = {};
    if (CAMPO_OBRIGATORIO && !usuario.trim())
      next.usuario = "informe seu nome de usuário";
    if (CAMPO_OBRIGATORIO && !senha) next.senha = "informe sua senha";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    // TODO: trocar pela chamada real de autenticação
    await new Promise((resolve) => setTimeout(resolve, 700));
    setLoading(false);
    navigate("/feed");
  }

  return (
    <Screen>
      <header className="flex shrink-0 justify-center pt-[8vh] pb-[6vh]">
        <Logo />
      </header>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-1 flex-col justify-between gap-8"
      >
        <div className="space-y-5">
          <TextField
            label="login"
            name="username"
            placeholder="seu nome de usuário"
            autoComplete="username"
            autoCapitalize="none"
            autoCorrect="off"
            inputMode="text"
            value={usuario}
            error={errors.usuario}
            onChange={(e) => {
              setUsuario(e.target.value);
              limpar("usuario");
            }}
          />

          <div>
            <PasswordField
              label="senha"
              name="password"
              placeholder="sua senha"
              autoComplete="current-password"
              value={senha}
              error={errors.senha}
              onChange={(e) => {
                setSenha(e.target.value);
                limpar("senha");
              }}
            />
            <div className="mt-2 flex justify-end">
              <Link
                to="/recuperar-senha"
                className="-mr-2 flex min-h-11 items-center px-2 text-[0.9375rem] text-ink-soft underline underline-offset-4 decoration-ink-soft/50"
              >
                esqueci a senha
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-4 pb-2">
          <Button type="submit" loading={loading}>
            login
          </Button>

          <Button
            type="button"
            variant="outline"
            leading={<GoogleIcon />}
            onClick={() => {
              // TODO: integrar com o OAuth do Google
            }}
          >
            login com Google
          </Button>

          <p className="pt-2 text-center text-[0.9375rem] text-muted">
            Ainda não tem conta?{" "}
            <Link
              to="/cadastro"
              className="inline-block py-3 font-semibold text-ink-soft underline-offset-4 active:underline"
            >
              Cadastre
            </Link>
          </p>
        </div>
      </form>
    </Screen>
  );
}
