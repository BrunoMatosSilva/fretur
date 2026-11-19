"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import type { FleetItem, GalleryGroup } from "@/lib/home-data";
import { waLink } from "@/lib/whatsapp";
import Icon from "./Icon";
import Gallery from "./Gallery";

export default function Fleet({ items, groups }: { items: FleetItem[]; groups: GalleryGroup[] }) {
  const [selectedGroup, setSelectedGroup] = useState<GalleryGroup | null>(null);

  const openGallery = (groupId: string) => {
    const group = groups.find((item) => item.id === groupId);
    if (!group) throw new Error(`Nenhuma galeria encontrada para o grupo "${groupId}".`);
    setSelectedGroup(group);
  };

  return (
    <>
      <div className="fleet-grid">
        {items.map((v, i) => (
          <article
            className="fleet-card lift"
            key={v.title}
            data-reveal="up"
            style={{ "--reveal-delay": `${((i % 3) * 0.12).toFixed(2)}s` } as CSSProperties}
          >
            <button
              className="fleet-visual fleet-visual-trigger"
              type="button"
              aria-label={`Ver fotos de ${v.title}`}
              onClick={() => openGallery(v.galleryGroupId)}
            >
              <span className="fleet-badge">{v.seats} lugares</span>
              <Image
                src={v.src}
                alt={v.alt}
                fill
                loading="eager"
                sizes="(max-width: 660px) 100vw, (max-width: 1040px) 50vw, 400px"
                style={{ objectPosition: v.pos }}
              />
            </button>
            <div className="fleet-copy">
              <div className="fleet-title">
                <button
                  className="fleet-title-trigger"
                  type="button"
                  onClick={() => openGallery(v.galleryGroupId)}
                  aria-label={`Ver fotos de ${v.title}`}
                >
                  <h3>{v.title}</h3>
                  <Icon name="i-chev" />
                </button>
              </div>
              <strong>{v.sub}</strong>
              <p>{v.text}</p>
              <ul className="fleet-features">
                {v.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a className="btn btn-primary btn-sm" href={waLink(v.msg)} target="_blank" rel="noopener noreferrer">
                Solicitar orçamento
              </a>
            </div>
          </article>
        ))}
      </div>

      <p className="fleet-note" data-reveal="up" style={{ "--reveal-delay": "0s" } as CSSProperties}>
        <strong>Precisa de um ônibus maior?</strong> Também atendemos grupos grandes com ônibus convencionais ou
        executivos, por meio de empresas parceiras. Peça um orçamento pelo WhatsApp.
      </p>

      {selectedGroup ? <Gallery group={selectedGroup} onClose={() => setSelectedGroup(null)} /> : null}
    </>
  );
}
