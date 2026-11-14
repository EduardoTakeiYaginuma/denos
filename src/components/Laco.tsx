// Pétala do laço: flor de 7 lóbulos, gerada uma vez e fixada aqui.
const PATH =
  "M50.00 0.00C56.22 0.00 62.14 8.12 68.66 11.26C75.17 14.40 85.21 13.96 89.09 18.83C92.97 23.69 90.31 33.38 91.92 40.43C93.53 47.48 100.13 55.06 98.75 61.13C97.36 67.19 88.13 71.16 83.62 76.81C79.11 82.46 77.30 92.35 71.69 95.05C66.09 97.75 57.23 93.00 50.00 93.00C42.77 93.00 33.91 97.75 28.31 95.05C22.70 92.35 20.89 82.46 16.38 76.81C11.87 71.16 2.64 67.19 1.25 61.13C-0.13 55.06 6.47 47.48 8.08 40.43C9.69 33.38 7.03 23.69 10.91 18.83C14.79 13.96 24.83 14.40 31.34 11.26C37.86 8.12 43.78 -0.00 50.00 0.00Z";

type LacoProps = {
  cor: string;
  className?: string;
  opaco?: boolean;
};

export default function Laco({ cor, className = "h-16 w-16", opaco = true }: LacoProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path d={PATH} fill={cor} opacity={opaco ? 1 : 0.35} />
    </svg>
  );
}
