import type { ReactNode } from "react";

type MapaIlustradoProps = {
  children?: ReactNode;
};

/**
 * Mapa estilizado desenhado em SVG — nada de tiles externos, então funciona
 * offline (importante pra demo na feira). Trocar por um mapa real (Leaflet +
 * OSM, Mapbox) quando o app tiver backend e conexão garantida.
 */
export default function MapaIlustrado({ children }: MapaIlustradoProps) {
  return (
    <div className="relative aspect-[4/3.4] w-full overflow-hidden rounded-2xl">
      <svg viewBox="0 0 400 340" className="h-full w-full" aria-hidden="true">
        <rect width="400" height="340" fill="#e9e6df" />

        {/* parques */}
        <path d="M0 236 L74 212 L118 262 L96 340 L0 340Z" fill="#cfe0c0" />
        <path d="M300 18 L400 4 L400 86 L326 78Z" fill="#cfe0c0" />
        <circle cx="206" cy="150" r="20" fill="#cfe0c0" />

        {/* água */}
        <path
          d="M-10 300 C60 282 96 316 150 340 L-10 340Z"
          fill="#bcd4e8"
        />
        <path d="M184 136 L214 128 L222 152 L192 162Z" fill="#bcd4e8" />

        {/* avenidas */}
        <g stroke="#fdfcf9" fill="none" strokeLinecap="round">
          <path d="M-10 118 L410 84" strokeWidth="13" />
          <path d="M-10 258 L410 232" strokeWidth="11" />
          <path d="M96 -10 L126 350" strokeWidth="12" />
          <path d="M292 -10 L268 350" strokeWidth="11" />
          <path d="M-10 350 L410 -10" strokeWidth="9" />
        </g>

        {/* ruas menores */}
        <g stroke="#fdfcf9" fill="none" strokeWidth="5" strokeLinecap="round">
          <path d="M-10 48 L410 20" />
          <path d="M-10 182 L410 154" />
          <path d="M-10 316 L410 292" />
          <path d="M34 -10 L52 350" />
          <path d="M180 -10 L200 350" />
          <path d="M350 -10 L336 350" />
          <path d="M40 210 Q140 186 200 240 T380 268" />
          <path d="M60 92 Q150 130 230 96 T390 130" />
        </g>

        {/* rotatória */}
        <circle cx="200" cy="172" r="21" fill="none" stroke="#fdfcf9" strokeWidth="8" />
        <circle cx="200" cy="172" r="12" fill="#e9e6df" />

        {/* quadras */}
        <g fill="#dedad1">
          <rect x="140" y="30" width="30" height="22" rx="3" />
          <rect x="214" y="200" width="34" height="24" rx="3" />
          <rect x="300" y="186" width="26" height="30" rx="3" />
          <rect x="58" y="128" width="24" height="26" rx="3" />
        </g>
      </svg>

      <span className="absolute bottom-1.5 right-2 rounded bg-branco px-1.5 py-0.5 text-[0.5625rem] text-ink">
        mapa ilustrado · demo
      </span>

      {children}
    </div>
  );
}
