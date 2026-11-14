import { CORES_DO_NO } from "../lib/no";

type ColorPickerProps = {
  value: string;
  onChange: (id: string) => void;
};

export default function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div
      role="radiogroup"
      aria-label="escolha a cor do nó"
      className="flex items-center gap-4"
    >
      {CORES_DO_NO.map((cor) => {
        const selecionada = cor.id === value;
        return (
          <button
            key={cor.id}
            type="button"
            role="radio"
            aria-checked={selecionada}
            aria-label={cor.nome}
            onClick={() => onChange(cor.id)}
            className={`h-11 w-11 rounded-full transition-transform duration-150 active:scale-90 ${
              selecionada
                ? "ring-2 ring-ink ring-offset-3 ring-offset-cream"
                : ""
            }`}
            style={{ backgroundColor: cor.hex }}
          />
        );
      })}
    </div>
  );
}
