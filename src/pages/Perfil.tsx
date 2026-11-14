import { Link, useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import Laco from "../components/Laco";
import {
  BookmarkIcon,
  ClockIcon,
  GearIcon,
  HelpIcon,
  PencilIcon,
} from "../components/icons";
import { LACOS, PERFIL } from "../lib/demo-data";
import { usePerfil } from "../lib/perfil";

export default function Perfil() {
  const navigate = useNavigate();
  const { perfil } = usePerfil();
  const lacosVisiveis = LACOS.filter((l) => perfil.lacosVisiveis.includes(l.id));

  return (
    <AppShell>
      <section className="flex items-start gap-4 pt-1">
        <Avatar
          nome={perfil.nome}
          foto={perfil.foto}
          className="h-26 w-26"
          online
        />

        <div className="min-w-0 flex-1 pt-2">
          <div className="flex items-start justify-between gap-2">
            <h2 className="truncate text-[1.5rem] font-bold lowercase text-ink">
              {perfil.nome}
            </h2>
            <Link
              to="/perfil/editar"
              aria-label="editar perfil"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 text-ink transition-transform active:scale-90"
              style={{ borderColor: perfil.borda }}
            >
              <PencilIcon className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-1 text-[0.875rem] leading-snug text-ink-soft">
            {PERFIL.bio}
          </p>
        </div>
      </section>

      <section className="mt-5 grid grid-cols-3 gap-3">
        <Estatistica valor={PERFIL.memorias} rotulo="memórias" />
        <Estatistica valor={PERFIL.nos} rotulo="nós" />
        <Estatistica valor={PERFIL.conquistas} rotulo="conquistas" />
      </section>

      <div className="mt-6 flex items-baseline justify-between">
        <h3 className="text-[1.125rem] font-semibold lowercase text-ink">
          nossos laços
        </h3>
        <button
          type="button"
          className="-mr-2 flex min-h-11 items-center px-2 text-[0.875rem] text-ink-soft"
        >
          ver mais
        </button>
      </div>

      <ul className="mt-3 grid grid-cols-4 gap-2">
        {lacosVisiveis.map((laco) => (
          <li key={laco.id} className="flex flex-col items-center gap-1.5">
            <Laco cor={laco.cor} className="h-16 w-16" />
            <span className="text-center text-[0.6875rem] leading-tight lowercase text-ink">
              {laco.nome}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex justify-start gap-1 py-5 pl-1" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-1 w-1 rounded-full bg-azul-200" />
        ))}
      </div>

      <nav className="space-y-3">
        <ItemDeMenu icone={<BookmarkIcon className="h-5 w-5" />} rotulo="memórias salvas" />
        <ItemDeMenu icone={<ClockIcon className="h-5 w-5" />} rotulo="cápsulas do tempo" />
        <ItemDeMenu icone={<HelpIcon className="h-5 w-5" />} rotulo="ajuda e comentários" />
        <ItemDeMenu icone={<GearIcon className="h-5 w-5" />} rotulo="configurações" />
      </nav>

      <div className="mt-6">
        <Button type="button" onClick={() => navigate("/login")}>
          logout
        </Button>
      </div>
    </AppShell>
  );
}

function Estatistica({ valor, rotulo }: { valor: number; rotulo: string }) {
  return (
    <div className="rounded-2xl border border-ink/70 px-2 py-3 text-center">
      <p className="text-[1.375rem] font-bold text-ink">{valor}</p>
      <p className="text-[0.8125rem] lowercase text-ink-soft">{rotulo}</p>
    </div>
  );
}

function ItemDeMenu({ icone, rotulo }: { icone: React.ReactNode; rotulo: string }) {
  return (
    <button
      type="button"
      className="flex h-12 w-full items-center gap-3 rounded-full border border-ink/70 px-4 text-left text-[0.9375rem] lowercase text-ink transition-colors active:bg-cream-soft"
    >
      <span className="text-ink-soft">{icone}</span>
      {rotulo}
    </button>
  );
}
