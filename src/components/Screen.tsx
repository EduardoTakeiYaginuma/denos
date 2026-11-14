import type { ReactNode } from "react";

type ScreenProps = {
  children: ReactNode;
};

/**
 * Casca de tela: ocupa a altura real do viewport no mobile (dvh), respeita as
 * safe areas do iOS e trava a largura num cartão central no desktop.
 */
export default function Screen({ children }: ScreenProps) {
  return (
    <div className="min-h-dvh w-full bg-cream">
      <div className="mx-auto flex min-h-dvh w-full max-w-[26.25rem] flex-col px-6 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))]">
        {children}
      </div>
    </div>
  );
}
