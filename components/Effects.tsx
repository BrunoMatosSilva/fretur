"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type Layer = { el: HTMLElement; parent: HTMLElement; strength: number; vis: boolean };

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

/**
 * Animações da página: entrada dos blocos ao rolar ([data-reveal]) e
 * efeito de profundidade (parallax) em fundos e fotos. Não renderiza nada.
 */
export default function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    const observers: IntersectionObserver[] = [];

    /* ---- Entrada ao rolar ---- */
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible", "is-done"));
    } else {
      const io = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const el = e.target as HTMLElement;
            el.classList.add("is-visible");
            timers.push(window.setTimeout(() => el.classList.add("is-done"), 1400));
            obs.unobserve(el);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
      );
      items.forEach((el) => io.observe(el));
      observers.push(io);
    }

    /* ---- Parallax ---- */
    if (reduce) return () => timers.forEach((t) => window.clearTimeout(t));

    const bgs: Layer[] = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]")).map((el) => ({
      el,
      parent: el.parentElement as HTMLElement,
      strength: parseFloat(el.getAttribute("data-parallax") || "") || 0.8,
      vis: true,
    }));
    const imgs: Layer[] = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax-img]")).map((el) => ({
      el,
      parent: el.parentElement as HTMLElement,
      strength: 1,
      vis: true,
    }));

    const byParent = new Map<Element, Layer>();
    if ("IntersectionObserver" in window) {
      const pio = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            const layer = byParent.get(e.target);
            if (layer) layer.vis = e.isIntersecting;
          });
        },
        { rootMargin: "20% 0px 20% 0px" },
      );
      [...bgs, ...imgs].forEach((l) => {
        byParent.set(l.parent, l);
        pio.observe(l.parent);
      });
      observers.push(pio);
    }

    let ticking = false;
    const frame = () => {
      ticking = false;
      const vh = window.innerHeight;
      bgs.forEach((l) => {
        if (!l.vis) return;
        const r = l.parent.getBoundingClientRect();
        const prog = clamp((r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2), -1, 1);
        l.el.style.transform = `translate3d(0,${(-prog * r.height * 0.15 * l.strength).toFixed(1)}px,0)`;
      });
      imgs.forEach((l) => {
        if (!l.vis) return;
        const r = l.parent.getBoundingClientRect();
        const prog = clamp((r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2), -1, 1);
        l.el.style.setProperty("--py", `${(-prog * 16).toFixed(1)}px`);
      });
    };
    const request = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(frame);
      }
    };
    frame();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, [pathname]);

  return null;
}
