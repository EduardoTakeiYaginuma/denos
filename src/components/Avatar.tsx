type AvatarProps = {
  nome: string;
  foto?: string;
  cor?: string;
  className?: string;
  online?: boolean;
  /** anel claro em volta, pra avatar sobre foto/mapa ou em pilha */
  anel?: boolean;
};

const PALETA = ["#e9ac4c", "#7a9440", "#3b6ca8", "#c8481e", "#b8749f", "#4f7d6e"];

/** Cor estável por nome (FNV-1a), pra mesma pessoa não trocar de cor entre telas. */
function corDoNome(nome: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < nome.length; i++) {
    h ^= nome.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return PALETA[h % PALETA.length];
}

export default function Avatar({
  nome,
  foto,
  cor,
  className = "h-11 w-11",
  online = false,
  anel = false,
}: AvatarProps) {
  const inicial = nome.trim().charAt(0).toLocaleUpperCase("pt-BR") || "?";
  const fundo = cor ?? corDoNome(nome);

  return (
    <span className={`relative inline-block shrink-0 rounded-full ${anel ? "ring-2 ring-branco" : ""} ${className}`}>
      <span
        className="flex h-full w-full items-center justify-center overflow-hidden rounded-full"
        style={{ backgroundColor: fundo }}
      >
        {foto ? (
          <img src={foto} alt="" className="h-full w-full object-cover" draggable={false} />
        ) : (
          // SVG em vez de texto: a inicial escala junto com a caixa,
          // sem depender do font-size herdado
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            <text
              x="50"
              y="50"
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="46"
              fontWeight="600"
              fill="rgba(255,255,255,0.92)"
              fontFamily="Poppins, sans-serif"
            >
              {inicial}
            </text>
          </svg>
        )}
      </span>

      {online && (
        <span className="absolute bottom-[6%] right-[6%] block h-[22%] w-[22%] rounded-full border-2 border-cream bg-no-verde" />
      )}
    </span>
  );
}
