import { Link } from "react-router-dom";
import AppShell from "../components/AppShell";
import Avatar from "../components/Avatar";
import { ChatIcon, KnotIcon, SparkleIcon, TargetIcon, UsersIcon } from "../components/icons";
import { useMemorias } from "../lib/memorias";
import { CIRCULO, PERGUNTA_DO_DIA } from "../lib/demo-data";

export default function Feed() {
  const { posts } = useMemorias();

  return (
    <AppShell titulo={CIRCULO}>
      <h2 className="pt-1 text-[1.25rem] font-bold lowercase text-ink">entre nós</h2>

      <div className="mt-3 grid grid-cols-3 gap-2.5">
        <Atalho
          icone={<TargetIcon className="h-5 w-5" />}
          titulo={"missão\nsemanal"}
          acao="ver respostas"
        />
        <Atalho
          icone={<SparkleIcon className="h-5 w-5" />}
          titulo={"memória\ndo mês"}
          acao="votar"
        />
        <Atalho
          icone={<KnotIcon className="h-5 w-5" />}
          titulo={"nossos\nlaços"}
          acao="ver mais"
          to="/perfil"
        />
      </div>

      <section className="mt-4 rounded-3xl bg-amber-200 p-4">
        <p className="flex items-center gap-2 text-[0.9375rem] font-semibold lowercase text-ink">
          <ChatIcon className="h-5 w-5" />
          pergunta do dia
        </p>

        <p className="py-3 text-[1.125rem] font-bold leading-snug lowercase text-ink">
          {PERGUNTA_DO_DIA.texto}
        </p>

        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-[0.8125rem] text-ink-soft">
            <UsersIcon className="h-4 w-4" />
            {PERGUNTA_DO_DIA.responderam} de {PERGUNTA_DO_DIA.total} responderam
          </span>
          <button
            type="button"
            className="rounded-full bg-amber px-6 py-2.5 text-[0.9375rem] font-semibold text-ink transition-transform active:scale-[0.97]"
          >
            responder
          </button>
        </div>
      </section>

      <section className="mt-6 space-y-6">
        {posts.map((post) => (
          <article key={post.id}>
            <div className="flex items-center gap-3">
              <Avatar nome={post.autor} className="h-12 w-12" />
              <div className="min-w-0">
                <p className="truncate text-[1rem] font-semibold lowercase text-ink">
                  {post.autor}
                </p>
                <p className="text-[0.875rem] text-muted">{post.quando}</p>
              </div>
            </div>
            <img
              src={post.foto}
              alt={`memória de ${post.autor}`}
              className="mt-3 aspect-[4/3] w-full rounded-2xl object-cover"
              draggable={false}
            />
          </article>
        ))}
      </section>
    </AppShell>
  );
}

type AtalhoProps = {
  icone: React.ReactNode;
  titulo: string;
  acao: string;
  to?: string;
};

function Atalho({ icone, titulo, acao, to }: AtalhoProps) {
  const conteudo = (
    <div className="flex h-full flex-col rounded-2xl bg-amber-100 p-2.5 text-left transition-transform active:scale-[0.97]">
      <div className="flex items-start gap-1.5">
        <span className="mt-0.5 shrink-0 text-ink-soft">{icone}</span>
        <span className="whitespace-pre-line text-[0.8125rem] font-bold leading-[1.15] lowercase text-ink">
          {titulo}
        </span>
      </div>
      <span className="mt-auto self-end whitespace-nowrap rounded-full bg-amber px-2 py-1 text-[0.5625rem] font-semibold lowercase text-ink">
        {acao}
      </span>
    </div>
  );

  return to ? (
    <Link to={to} className="block h-full">
      {conteudo}
    </Link>
  ) : (
    <button type="button" className="block h-full w-full">
      {conteudo}
    </button>
  );
}
