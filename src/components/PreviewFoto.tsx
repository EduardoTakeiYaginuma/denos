import { useEffect, useRef, useState } from "react";

type PreviewFotoProps = {
  foto: string;
  /** string de CSS `filter` já montada */
  estilo?: string;
  /** 0, 90, 180 ou 270 */
  giro?: number;
  /** proporção do recorte (largura / altura) antes de girar */
  proporcao?: number;
  className?: string;
  alt?: string;
};

/**
 * Mostra a foto dentro de uma moldura com proporção fixa, aplicando filtro e
 * rotação. Ao girar 90°, a moldura inverte a proporção e a imagem é medida pra
 * continuar preenchendo — sem isso sobrariam faixas vazias nas laterais.
 */
export default function PreviewFoto({
  foto,
  estilo,
  giro = 0,
  proporcao = 4 / 3,
  className = "",
  alt = "",
}: PreviewFotoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [caixa, setCaixa] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entrada]) => {
      const r = entrada.contentRect;
      setCaixa({ w: r.width, h: r.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const normalizado = ((giro % 360) + 360) % 360;
  const deitado = normalizado % 180 !== 0;
  const medida = caixa.w > 0;

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden bg-cream-soft ${className}`}
      style={{ aspectRatio: String(deitado ? 1 / proporcao : proporcao) }}
    >
      <img
        src={foto}
        alt={alt}
        draggable={false}
        className="absolute left-1/2 top-1/2 max-w-none object-cover"
        style={{
          width: medida ? (deitado ? caixa.h : caixa.w) : "100%",
          height: medida ? (deitado ? caixa.w : caixa.h) : "100%",
          transform: `translate(-50%, -50%) rotate(${normalizado}deg)`,
          filter: estilo,
        }}
      />
    </div>
  );
}
