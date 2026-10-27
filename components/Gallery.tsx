"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Icon from "./Icon";
import type { GalleryItem } from "@/lib/home-data";

type Filter = "all" | "ext" | "int";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "Todas" },
  { key: "ext", label: "Por fora" },
  { key: "int", label: "Por dentro" },
];

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState(false);
  const [cur, setCur] = useState(0);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  const visible = items.filter((it) => filter === "all" || it.cat === filter);
  const total = visible.length;

  const openAt = (src: string) => {
    lastFocus.current = document.activeElement as HTMLElement;
    const idx = visible.findIndex((v) => v.src === src);
    setCur(Math.max(0, idx));
    setOpen(true);
  };

  const close = useCallback(() => {
    setOpen(false);
    lastFocus.current?.focus?.();
  }, []);

  const go = useCallback(
    (delta: number) => {
      if (!total) return;
      setCur((c) => (c + delta + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "Tab") {
        const f = [closeRef.current, prevRef.current, nextRef.current].filter(Boolean) as HTMLElement[];
        const i = f.indexOf(document.activeElement as HTMLElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close, go]);

  const current = visible[cur];

  return (
    <>
      <div className="g-filters" role="group" aria-label="Filtrar fotos">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className="g-chip"
            type="button"
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="g-grid">
        {items.map((it) => {
          const dim = filter !== "all" && it.cat !== filter;
          return (
            <button
              key={it.src}
              className={`g-item ${it.cls}`.trim()}
              data-dim={dim ? "true" : undefined}
              type="button"
              tabIndex={dim ? -1 : 0}
              aria-hidden={dim || undefined}
              style={it.pos ? ({ "--pos": it.pos } as CSSProperties) : undefined}
              onClick={() => openAt(it.src)}
            >
              <Image src={it.src} alt={it.alt} fill sizes="(max-width: 640px) 50vw, (max-width: 980px) 33vw, 300px" />
              <span className="g-tag">{it.cat === "ext" ? "Por fora" : "Por dentro"}</span>
              <span className="g-cap">
                <span>{it.cap}</span>
                <Icon name="i-zoom" />
              </span>
            </button>
          );
        })}
      </div>

      <div
        className={open ? "lb open" : "lb"}
        role="dialog"
        aria-modal="true"
        aria-label="Galeria de fotos da frota"
        aria-hidden={!open}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        }}
      >
        <span className="lb-count" aria-live="polite">
          {open && current ? `${cur + 1} / ${total}` : ""}
        </span>
        <button ref={closeRef} className="lb-close" type="button" aria-label="Fechar" onClick={close}>
          <Icon name="i-x" />
        </button>
        <button ref={prevRef} className="lb-prev" type="button" aria-label="Foto anterior" onClick={() => go(-1)}>
          <Icon name="i-prev" />
        </button>
        <figure>
          {open && current ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={current.src} className="in" src={current.src} alt={current.alt} />
          ) : null}
          <figcaption>{open && current ? current.title : ""}</figcaption>
        </figure>
        <button ref={nextRef} className="lb-next" type="button" aria-label="Próxima foto" onClick={() => go(1)}>
          <Icon name="i-chev" />
        </button>
      </div>
    </>
  );
}
