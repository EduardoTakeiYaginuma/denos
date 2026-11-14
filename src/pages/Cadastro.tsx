import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Screen from "../components/Screen";
import Logo from "../components/Logo";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import TextField, { PasswordField } from "../components/TextField";
import { CAMPO_OBRIGATORIO } from "../lib/config";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Campos = {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
};

const VAZIO: Campos = {
  nome: "",
  sobrenome: "",
  email: "",
  senha: "",
  confirmarSenha: "",
};

export default function Cadastro() {
  const navigate = useNavigate();
  const [campos, setCampos] = useState<Campos>(VAZIO);
  const [errors, setErrors] = useState<Partial<Campos>>({});
  const [loading, setLoading] = useState(false);

  function set<K extends keyof Campos>(campo: K, valor: string) {
    setCampos((atual) => ({ ...atual, [campo]: valor }));
    setErrors((atual) => (atual[campo] ? { ...atual, [campo]: undefined } : atual));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // No modo demo, campo vazio passa; o que foi digitado continua sendo checado.
    const next: Partial<Campos> = {};

    if (!campos.nome.trim() && CAMPO_OBRIGATORIO)
      next.nome = "informe seu nome";

    if (!campos.sobrenome.trim() && CAMPO_OBRIGATORIO)
      next.sobrenome = "informe seu sobrenome";

    if (!campos.email.trim()) {
      if (CAMPO_OBRIGATORIO) next.email = "informe seu e-mail";
    } else if (!EMAIL_RE.test(campos.email.trim())) {
      next.email = "endereço de e-mail inválido";
    }

    if (!campos.senha) {
      if (CAMPO_OBRIGATORIO) next.senha = "crie uma senha";
    } else if (campos.senha.length < 6) {
      next.senha = "a senha precisa de ao menos 6 caracteres";
    }

    if (campos.senha && campos.confirmarSenha !== campos.senha)
      next.confirmarSenha = "as senhas não coincidem";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    // TODO: trocar pela chamada real de criação de conta
    await new Promise((resolve) => setTimeout(resolve, 700));
    setLoading(false);
    navigate("/criar-no");
  }

  return (
    <Screen>
      <header className="shrink-0">
        <BackButton to="/login" />
        <div className="flex justify-center pt-1">
          <Logo className="max-w-[12rem]" />
        </div>
        <h1 className="pt-[5vh] text-center text-[1.5rem] font-bold lowercase text-ink">
          cadastro
        </h1>
      </header>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-1 flex-col justify-between gap-10 pt-7"
      >
        <div className="space-y-3.5">
          <TextField
            name="given-name"
            placeholder="nome"
            aria-label="nome"
            autoComplete="given-name"
            autoCapitalize="words"
            value={campos.nome}
            error={errors.nome}
            onChange={(e) => set("nome", e.target.value)}
          />
          <TextField
            name="family-name"
            placeholder="sobrenome"
            aria-label="sobrenome"
            autoComplete="family-name"
            autoCapitalize="words"
            value={campos.sobrenome}
            error={errors.sobrenome}
            onChange={(e) => set("sobrenome", e.target.value)}
          />
          <TextField
            name="email"
            type="email"
            placeholder="e-mail"
            aria-label="e-mail"
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect="off"
            inputMode="email"
            value={campos.email}
            error={errors.email}
            onChange={(e) => set("email", e.target.value)}
          />
          <PasswordField
            name="new-password"
            placeholder="senha"
            aria-label="senha"
            autoComplete="new-password"
            value={campos.senha}
            error={errors.senha}
            onChange={(e) => set("senha", e.target.value)}
          />
          <PasswordField
            name="confirm-password"
            placeholder="confirmar senha"
            aria-label="confirmar senha"
            autoComplete="new-password"
            value={campos.confirmarSenha}
            error={errors.confirmarSenha}
            onChange={(e) => set("confirmarSenha", e.target.value)}
          />
        </div>

        <div className="space-y-4 pb-2">
          <Button type="submit" loading={loading}>
            continuar
          </Button>
          <p className="text-center text-[0.9375rem] text-muted">
            Já tem conta?{" "}
            <Link
              to="/login"
              className="inline-block py-3 font-semibold text-ink-soft underline-offset-4 active:underline"
            >
              Entrar
            </Link>
          </p>
        </div>
      </form>
    </Screen>
  );
}
