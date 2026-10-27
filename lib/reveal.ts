import type { CSSProperties } from "react";

/**
 * Atributos da animação de entrada ao rolar (tratada em components/Effects.tsx).
 * Uso: <div {...rv("up", i, 0.1, 3)}>
 */
export function rv(type: "up" | "left" | "right" | "zoom", index = 0, step = 0.1, mod?: number) {
  const k = mod ? index % mod : index;
  return {
    "data-reveal": type,
    style: { "--reveal-delay": `${(k * step).toFixed(2)}s` } as CSSProperties,
  };
}
