import { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CalendarIcon, CameraIcon, HomeIcon, MapIcon } from "./icons";
import { useMemorias } from "../lib/memorias";

const itemBase =
  "flex h-12 flex-1 items-center justify-center rounded-full transition-colors";

export default function TabBar() {
  const navigate = useNavigate();
  const { adicionarFoto } = useMemorias();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFoto(file: File | null) {
    if (!file) return;
    adicionarFoto(file);
    navigate("/feed");
  }

  return (
    <nav
      aria-label="navegação principal"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-20 w-[min(22rem,calc(100%-3rem))] -translate-x-1/2"
    >
      <div className="flex items-center gap-1 rounded-full bg-ink px-3 py-1.5 shadow-lg shadow-ink/20">
        <Aba to="/feed" rotulo="início">
          <HomeIcon className="h-6 w-6" />
        </Aba>
        <Aba to="/mapa" rotulo="mapa">
          <MapIcon className="h-6 w-6" />
        </Aba>

        <button
          type="button"
          aria-label="registrar memória"
          onClick={() => inputRef.current?.click()}
          className={`${itemBase} text-cream/70 active:bg-white/10`}
        >
          <CameraIcon className="h-6 w-6" />
        </button>

        <Aba to="/calendario" rotulo="calendário">
          <CalendarIcon className="h-6 w-6" />
        </Aba>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          handleFoto(e.target.files?.[0] ?? null);
          e.target.value = "";
        }}
      />
    </nav>
  );
}

function Aba({
  to,
  rotulo,
  children,
}: {
  to: string;
  rotulo: string;
  children: React.ReactNode;
}) {
  return (
    <NavLink
      to={to}
      aria-label={rotulo}
      className={({ isActive }) =>
        `${itemBase} ${isActive ? "bg-white/15 text-cream" : "text-cream/70 active:bg-white/10"}`
      }
    >
      {children}
    </NavLink>
  );
}
