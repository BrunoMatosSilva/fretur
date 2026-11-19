"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import type { GalleryGroup } from "@/lib/home-data";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function Gallery({ group, onClose }: { group: GalleryGroup; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const raf = useRef(0);
  const indexRef = useRef(0);
  const lastFocus = useRef<HTMLElement | null>(null);

  const slides = group.slides;
  const total = slides.length;
  indexRef.current = index;

  const goTo = useCallback((i: number, smooth = true) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: smooth && !prefersReducedMotion() ? "smooth" : "auto" });
  }, []);

  const step = useCallback(
    (direction: number) => {
      const next = (indexRef.current + direction + total) % total;
      indexRef.current = next;
      setIndex(next);
      goTo(next);
    },
    [goTo, total],
  );

  const onScroll = () => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = trackRef.current;
      if (!el || !el.clientWidth) return;
      const next = Math.min(Math.max(Math.round(el.scrollLeft / el.clientWidth), 0), total - 1);
      indexRef.current = next;
      setIndex(next);
    });
  };

  useEffect(() => {
    lastFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      } else if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button:not(:disabled)");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf.current);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      lastFocus.current?.focus({ preventScroll: true });
    };
  }, [onClose, step]);

  useEffect(() => {
    const strip = thumbsRef.current;
    const thumb = strip?.children[index] as HTMLElement | undefined;
    if (strip && thumb) {
      strip.scrollTo({
        left: thumb.offsetLeft - (strip.clientWidth - thumb.clientWidth) / 2,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    }
  }, [index]);

  useEffect(() => {
    const element = trackRef.current;
    if (!element || typeof ResizeObserver === "undefined") return;
    let width = element.clientWidth;
    const observer = new ResizeObserver(() => {
      if (element.clientWidth !== width) {
        width = element.clientWidth;
        goTo(indexRef.current, false);
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [goTo]);

  return (
    <div
      className="fleet-gallery"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="fleet-gallery-dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="fleetGalleryTitle"
      >
        <div className="fleet-gallery-head">
          <div>
            <span className="eyebrow is-yellow">Fotos do veículo</span>
            <h2 id="fleetGalleryTitle">{group.label}</h2>
          </div>
          <button ref={closeRef} className="fleet-gallery-close" type="button" aria-label="Fechar" onClick={onClose}>
            <Icon name="i-x" />
          </button>
        </div>

        <div
          className="gc-stage"
          role="region"
          aria-roledescription="carrossel"
          aria-label={`Fotos: ${group.label}`}
          tabIndex={0}
        >
          <div className="gc-track" ref={trackRef} onScroll={onScroll}>
            {slides.map((slide, i) => (
              <div
                className="gc-slide"
                key={slide.src}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} de ${total}`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 1100px"
                  style={{ objectFit: "contain" }}
                />
                <span className="gc-cap">{slide.cap}</span>
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
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                className="gc-thumb"
                aria-label={`Ir para a foto ${i + 1}: ${slide.cap}`}
                aria-current={index === i}
                onClick={() => goTo(i)}
              >
                <Image src={slide.src} alt="" fill sizes="110px" style={{ objectFit: "cover" }} />
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
