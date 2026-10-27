import Image from "next/image";
import type { ReactNode } from "react";
import type { PortableBlock } from "@/lib/sanity";

function safeHref(h?: string): string | null {
  return h && /^(https?:|mailto:|tel:|\/|#)/i.test(h) ? h : null;
}

function renderSpans(block: PortableBlock): ReactNode[] {
  const defs = new Map((block.markDefs ?? []).map((d) => [d._key, d]));
  return (block.children ?? []).map((ch, i) => {
    let node: ReactNode = ch.text ?? "";
    for (const m of ch.marks ?? []) {
      if (m === "strong") node = <strong key={`${i}-${m}`}>{node}</strong>;
      else if (m === "em") node = <em key={`${i}-${m}`}>{node}</em>;
      else if (m === "underline") node = <u key={`${i}-${m}`}>{node}</u>;
      else {
        const def = defs.get(m);
        const href = def?._type === "link" ? safeHref(def.href) : null;
        if (href) {
          const external = /^https?:/i.test(href);
          node = (
            <a
              key={`${i}-${m}`}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {node}
            </a>
          );
        }
      }
    }
    return <span key={i}>{node}</span>;
  });
}

/** Renderiza o conteúdo (Portable Text) das matérias no servidor, sem dependências extras. */
export default function PortableBody({ blocks }: { blocks?: PortableBlock[] | null }) {
  const out: ReactNode[] = [];
  let list: { type: "ul" | "ol"; items: ReactNode[] } | null = null;

  const flush = () => {
    if (!list) return;
    const Tag = list.type;
    out.push(<Tag key={`list-${out.length}`}>{list.items}</Tag>);
    list = null;
  };

  (blocks ?? []).forEach((b, idx) => {
    const key = b._key ?? String(idx);

    if (b._type === "block") {
      if (b.listItem) {
        const type = b.listItem === "number" ? "ol" : "ul";
        if (!list || list.type !== type) {
          flush();
          list = { type, items: [] };
        }
        list.items.push(<li key={key}>{renderSpans(b)}</li>);
        return;
      }
      flush();
      const children = renderSpans(b);
      switch (b.style) {
        case "h2":
          out.push(<h2 key={key}>{children}</h2>);
          break;
        case "h3":
          out.push(<h3 key={key}>{children}</h3>);
          break;
        case "h4":
          out.push(<h4 key={key}>{children}</h4>);
          break;
        case "blockquote":
          out.push(<blockquote key={key}>{children}</blockquote>);
          break;
        default:
          out.push(<p key={key}>{children}</p>);
      }
    } else if (b._type === "image" && b.url) {
      flush();
      out.push(
        <figure key={key}>
          <Image
            src={b.url}
            alt={b.alt || ""}
            width={b.width || 1200}
            height={b.height || 800}
            sizes="(max-width: 820px) 100vw, 780px"
          />
          {b.caption ? <figcaption>{b.caption}</figcaption> : null}
        </figure>,
      );
    }
  });
  flush();

  return <div className="article-body">{out}</div>;
}
