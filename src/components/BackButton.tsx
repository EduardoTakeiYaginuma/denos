import { useNavigate } from "react-router-dom";

type BackButtonProps = {
  to?: string;
};

export default function BackButton({ to }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      aria-label="Voltar"
      onClick={() => (to ? navigate(to) : navigate(-1))}
      className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors active:bg-cream-soft"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M9 7 4 11.5 9 16" />
        <path d="M4 11.5h11a4.5 4.5 0 0 1 0 9h-1" />
      </svg>
    </button>
  );
}
