import { Link, useLocation } from "react-router-dom";
import Screen from "../components/Screen";
import Logo from "../components/Logo";
import BackButton from "../components/BackButton";
import Button from "../components/Button";

type LocationState = { email?: string } | null;

export default function LinkEnviado() {
  const { state } = useLocation();
  const email = (state as LocationState)?.email;

  return (
    <Screen>
      <header className="shrink-0">
        <BackButton to="/recuperar-senha" />
        <div className="flex justify-center pt-1 pb-[6vh]">
          <Logo className="max-w-[13.5rem]" />
        </div>
      </header>

      <main className="flex flex-1 flex-col justify-center gap-4 pb-10 text-center">
        <h1 className="mx-auto max-w-[17rem] text-[1.5rem] font-bold leading-snug lowercase text-ink">
          enviamos um link para redefinir sua senha
        </h1>
        <p className="mx-auto max-w-[19rem] text-[0.9375rem] leading-relaxed text-ink-soft">
          verifique sua caixa de entrada{email ? ` em ${email}` : ""} e siga as
          instruções do e-mail
        </p>
      </main>

      <Link to="/login" className="mb-2 block">
        <Button type="button" tabIndex={-1}>
          voltar para o login
        </Button>
      </Link>
    </Screen>
  );
}
