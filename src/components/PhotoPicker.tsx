import { useEffect, useRef, useState } from "react";

type PhotoPickerProps = {
  cor: string;
  onChange?: (file: File | null) => void;
};

export default function PhotoPicker({ cor, onChange }: PhotoPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // objectURL vaza se não for revogado ao trocar/desmontar
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function handleFile(file: File | null) {
    setPreview((anterior) => {
      if (anterior) URL.revokeObjectURL(anterior);
      return file ? URL.createObjectURL(file) : null;
    });
    onChange?.(file);
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        aria-label={preview ? "Trocar foto do nó" : "Adicionar foto do nó"}
        className="relative h-33 w-33 overflow-hidden rounded-full transition-transform duration-150 active:scale-[0.97]"
        style={{ backgroundColor: cor }}
      >
        {preview ? (
          <img
            src={preview}
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-white/55">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-9 w-9"
              aria-hidden="true"
            >
              <path d="M14.5 4h-5L8 6.5H4.5A1.5 1.5 0 0 0 3 8v10a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 21 18V8a1.5 1.5 0 0 0-1.5-1.5H16Z" />
              <circle cx="12" cy="12.5" r="3.5" />
            </svg>
          </span>
        )}
      </button>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="text-[0.875rem] text-amber-deep underline-offset-4 active:underline"
      >
        {preview ? "trocar foto" : "adicionar foto"}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}
