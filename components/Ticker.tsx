import type { CSSProperties } from "react";

/* Faixa em movimento: o conteúdo é repetido em CSS puro (sem JavaScript), então funciona no servidor. */
export default function Ticker({ items }: { items: string[] }) {
  const set = (hidden: boolean, key: string) => (
    <div className="ticker-set" aria-hidden={hidden || undefined} key={key}>
      {items.map((t) => (
        <span key={t}>{t}</span>
      ))}
    </div>
  );
  return (
    <div className="ticker" aria-label="Tipos de atendimento da Fretur">
      <div className="ticker-move" style={{ "--marquee-dur": "40s" } as CSSProperties}>
        {set(false, "a")}
        {set(true, "b")}
        {set(true, "c")}
        {set(true, "d")}
      </div>
    </div>
  );
}
