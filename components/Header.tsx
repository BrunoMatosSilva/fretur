"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { waLink } from "@/lib/whatsapp";

const LINKS = [
  { href: "/#servicos", label: "Serviços", section: "servicos" },
  { href: "/#frota", label: "Frota", section: "frota" },
  { href: "/#vantagens", label: "Vantagens", section: "vantagens" },
  { href: "/#quem-somos", label: "Quem somos", section: "quem-somos" },
  { href: "/noticias", label: "Notícias", section: "" },
  { href: "/#contato", label: "Contato", section: "contato" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onHome = pathname === "/";
    let ticking = false;

    const frame = () => {
      ticking = false;
      const y = window.scrollY;
      setScrolled(y > 24);

      if (barRef.current) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
        barRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
      }

      if (onHome) {
        let current = "";
        for (const l of LINKS) {
          if (!l.section) continue;
          const el = document.getElementById(l.section);
          if (!el) continue;
          const r = el.getBoundingClientRect();
          if (r.top <= 140 && r.bottom > 140) current = l.section;
        }
        setActiveSection(current);
      } else {
        setActiveSection("");
      }
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
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (l: (typeof LINKS)[number]) =>
    l.section ? pathname === "/" && activeSection === l.section : pathname.startsWith("/noticias");

  const msg = "Olá! Vim pelo site da Fretur e gostaria de solicitar um orçamento.";

  return (
    <header className={scrolled ? "scrolled" : undefined}>
      <div className="wrap nav">
        <Link className="brand" href="/" aria-label="Fretur Fretamento e Turismo, ir para o início">
          <Image src="/images/logo-fretur.png" alt="Fretur Fretamento e Turismo" width={560} height={346} priority />
        </Link>

        <nav className="nav-links" aria-label="Navegação principal">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={isActive(l) ? "active" : undefined}
              aria-current={l.section === "" && isActive(l) ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <a className="btn btn-primary btn-sm" href={waLink(msg)} target="_blank" rel="noopener noreferrer">
          Solicitar orçamento
          <Icon name="i-chev" />
        </a>

        <button
          className="burger"
          type="button"
          aria-expanded={open}
          aria-controls="mobileNav"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name="i-menu" className="i-open" />
          <Icon name="i-x" className="i-close" />
        </button>
      </div>

      <nav className={open ? "mobile-nav open" : "mobile-nav"} id="mobileNav" aria-label="Navegação móvel">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className={isActive(l) ? "active" : undefined} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
        <a className="btn btn-primary" href={waLink(msg)} target="_blank" rel="noopener noreferrer">
          Solicitar orçamento
        </a>
      </nav>

      <div className="scroll-progress" ref={barRef} aria-hidden="true" />
    </header>
  );
}
