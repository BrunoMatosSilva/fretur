"use client";

import { useMemo, useState } from "react";
import type { Post } from "@/lib/sanity";
import { NewsCard } from "./NewsCards";

/** Lista de notícias com filtro por categoria. O HTML completo já vem renderizado do servidor. */
export default function NewsList({ posts }: { posts: Post[] }) {
  const [cat, setCat] = useState<string | null>(null);

  const cats = useMemo(() => {
    const set: string[] = [];
    posts.forEach((p) => {
      if (p.category && !set.includes(p.category)) set.push(p.category);
    });
    return set;
  }, [posts]);

  const shown = cat ? posts.filter((p) => p.category === cat) : posts;

  return (
    <>
      {cats.length > 1 ? (
        <div className="news-filters" role="group" aria-label="Filtrar por categoria">
          {[null, ...cats].map((c) => (
            <button
              key={c ?? "todas"}
              type="button"
              className="n-chip"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
            >
              {c ?? "Todas"}
            </button>
          ))}
        </div>
      ) : null}

      <div className="news-list">
        {shown.map((p) => (
          <NewsCard key={p._id} post={p} />
        ))}
      </div>
    </>
  );
}
