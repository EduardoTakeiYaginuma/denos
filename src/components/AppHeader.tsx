import { Link } from "react-router-dom";
import { BellIcon } from "./icons";

type AppHeaderProps = {
  titulo?: string;
};

export default function AppHeader({ titulo }: AppHeaderProps) {
  return (
    <header className="grid shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-2 px-6 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3">
      <Link
        to="/feed"
        aria-label="início"
        className="-ml-1 flex h-11 items-center justify-self-start px-1"
      >
        <img
          src="/assets/logo-amarela.png"
          alt="denós"
          className="h-7 w-auto"
          draggable={false}
        />
      </Link>

      <h1 className="truncate text-center text-[1.125rem] font-bold lowercase text-ink">
        {titulo}
      </h1>

      <button
        type="button"
        aria-label="notificações"
        className="-mr-2 flex h-11 w-11 items-center justify-center justify-self-end rounded-full text-ink transition-colors active:bg-cream-soft"
      >
        <BellIcon className="h-6 w-6" />
      </button>
    </header>
  );
}
