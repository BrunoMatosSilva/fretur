"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import Icon from "./Icon";
import type { GalleryGroup } from "@/lib/home-data";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Galeria em carrossel: abas por veículo, setas, miniaturas, deslize no celular e ampliação em tela cheia. */
export default function Gallery({ groups }: { groups: GalleryGroup[] }) {
  const [g, setG] = useState(0);
  const [index, setIndex] = useState(0);
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const indexRef = useRef(0);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  const group = groups[g];
  const slides = group.slides;
  const total = slides.length;
  indexRef.current = index;

  const goTo = useCallback((i: number, smooth = true) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: smooth && !prefersReducedMotion() ? "smooth" : "auto" });
  }, []);

  /* Atualiza o número da foto conforme o carrossel é arrastado ou rolado */
  const onScroll = () => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = trackRef.current;
      if (!el || !el.clientWidth) return;
      const i = Math.round(el.scrollLeft / el.clientWidth);
      setIndex(Math.min(Math.max(i, 0), total - 1));
    });
  };

  const step = (d: number) => {
    const n = index + d;
    if (n < 0) goTo(total - 1, false);
    else if (n >= total) goTo(0, false);
    else goTo(n);
  };

  const chooseGroup = (i: number) => {
    if (i === g) return;
    setG(i);
    setIndex(0);
  };

  const onStageKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (lbOpen) return; // com a foto ampliada aberta, as setas são da ampliação
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    }
  };

  /* Mantém a miniatura da foto atual visível na faixa */
  useEffect(() => {
    const strip = thumbsRef.current;
    const t = strip?.children[index] as HTMLElement | undefined;
    if (strip && t) {
      strip.scrollTo({
        left: t.offsetLeft - (strip.clientWidth - t.clientWidth) / 2,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    }
  }, [index, g]);

  /* Realinha a foto atual sempre que a largura do carrossel muda (girar o celular, barra de rolagem etc.) */
  useEffect(() => {
    const el = trackRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    let width = el.clientWidth;
    const ro = new ResizeObserver(() => {
      if (el.clientWidth !== width) {
        width = el.clientWidth;
        goTo(indexRef.current, false);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [g, goTo]);

  /* ---------- Ampliação em tela cheia ---------- */
  const openLb = (i: number) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setLbIndex(i);
    setLbOpen(true);
  };

  const closeLb = useCallback(() => {
    setLbOpen(false);
    // devolve o foco primeiro e só depois alinha o carrossel (o foco pode mexer na rolagem)
    lastFocus.current?.focus?.({ preventScroll: true });
    goTo(lbIndex, false);
  }, [goTo, lbIndex]);

  const lbGo = useCallback(
    (d: number) => {
      setLbIndex((c) => (c + d + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (!lbOpen) return;
    document.body.style.overflow = "hidden";
    const focusTimer = requestAnimationFrame(() => closeRef.current?.focus());
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") closeLb();
      else if (e.key === "ArrowLeft") {
        e.preventDefault(); // evita que o navegador role o carrossel de trás
        lbGo(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        lbGo(1);
      } else if (e.key === "Tab") {
        const f = [closeRef.current, prevRef.current, nextRef.current].filter(Boolean) as HTMLElement[];
        const i = f.indexOf(document.activeElement as HTMLElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(focusTimer);
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [lbOpen, closeLb, lbGo]);

  const lbSlide = slides[lbIndex];

  return (
    <div className="gc">
      <div className="g-filters" role="group" aria-label="Escolher o veículo">
        {groups.map((gr, i) => (
          <button
            key={gr.id}
            className="g-chip"
            type="button"
            aria-pressed={g === i}
            onClick={() => chooseGroup(i)}
          >
            {gr.label}
            <span className="g-count">{gr.slides.length}</span>
          </button>
        ))}
      </div>

      {/* key = recria o carrossel ao trocar de veículo, sempre começando na primeira foto */}
      <div key={group.id}>
        <div
          className="gc-stage"
          role="region"
          aria-roledescription="carrossel"
          aria-label={`Fotos: ${group.label}`}
          tabIndex={0}
          onKeyDown={onStageKey}
        >
          <div className="gc-track" ref={trackRef} onScroll={onScroll}>
            {slides.map((s, i) => (
              <div
                className="gc-slide"
                key={s.src}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} de ${total}`}
              >
                <button type="button" className="gc-open" aria-label={`Ampliar: ${s.cap}`} onClick={() => openLb(i)}>
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 1100px"
                    style={{ objectFit: "contain" }}
                  />
                </button>
                <span className="gc-cap">
                  <span>{s.cap}</span>
                  <Icon name="i-zoom" />
                </span>
              </div>
            ))}
          </div>

          <span className="gc-count" aria-live="polite">
            {index + 1} / {total}
          </span>

          {total > 1 ? (
            <>
              <button className="gc-nav gc-prev" type="button" aria-label="Foto anterior" onClick={() => step(-1)}>
                <Icon name="i-prev" />
              </button>
              <button className="gc-nav gc-next" type="button" aria-label="Próxima foto" onClick={() => step(1)}>
                <Icon name="i-chev" />
              </button>
            </>
          ) : null}
        </div>

        {total > 1 ? (
          <div className="gc-thumbs" ref={thumbsRef}>
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                className="gc-thumb"
                aria-label={`Ir para a foto ${i + 1}: ${s.cap}`}
                aria-current={index === i}
                onClick={() => goTo(i)}
              >
                <Image src={s.src} alt="" fill sizes="110px" style={{ objectFit: "cover" }} />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div
        className={lbOpen ? "lb open" : "lb"}
        role="dialog"
        aria-modal="true"
        aria-label={`Fotos ampliadas: ${group.label}`}
        aria-hidden={!lbOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeLb();
        }}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 50) lbGo(dx < 0 ? 1 : -1);
        }}
      >
        <span className="lb-count" aria-live="polite">
          {lbOpen && lbSlide ? `${lbIndex + 1} / ${total}` : ""}
        </span>
        <button ref={closeRef} className="lb-close" type="button" aria-label="Fechar" onClick={closeLb}>
          <Icon name="i-x" />
        </button>
        {total > 1 ? (
          <button ref={prevRef} className="lb-prev" type="button" aria-label="Foto anterior" onClick={() => lbGo(-1)}>
            <Icon name="i-prev" />
          </button>
        ) : null}
        <figure>
          {lbOpen && lbSlide ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={lbSlide.src} className="in" src={lbSlide.src} alt={lbSlide.alt} />
          ) : null}
          <figcaption>{lbOpen && lbSlide ? lbSlide.cap : ""}</figcaption>
        </figure>
        {total > 1 ? (
          <button ref={nextRef} className="lb-next" type="button" aria-label="Próxima foto" onClick={() => lbGo(1)}>
            <Icon name="i-chev" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
