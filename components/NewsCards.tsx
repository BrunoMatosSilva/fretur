import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/sanity";
import { fmtDate } from "@/lib/format";

function Meta({ post }: { post: Post }) {
  return (
    <div className="news-meta">
      <time dateTime={post.publishedAt}>{fmtDate(post.publishedAt)}</time>
      {post.category ? <span>{post.category}</span> : null}
    </div>
  );
}

function Media({ post, sizes, priority }: { post: Post; sizes: string; priority?: boolean }) {
  return (
    <div className={post.image ? "news-media" : "news-media no-img"}>
      {post.image ? (
        <Image src={post.image} alt={post.imageAlt || post.title} fill sizes={sizes} priority={priority} />
      ) : null}
    </div>
  );
}

export function FeatureCard({ post }: { post: Post }) {
  return (
    <Link className="news-feature" href={`/noticias/${post.slug}`}>
      <Media post={post} sizes="(max-width: 980px) 100vw, 800px" priority />
      <div className="news-body">
        <Meta post={post} />
        <h3>{post.title}</h3>
        {post.excerpt ? <p className="news-excerpt">{post.excerpt}</p> : null}
        <span className="news-more">
          Ler matéria completa <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

export function NewsCard({ post }: { post: Post }) {
  return (
    <Link className="news-card" href={`/noticias/${post.slug}`}>
      <Media post={post} sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 400px" />
      <div className="news-body">
        <Meta post={post} />
        <h3>{post.title}</h3>
        {post.excerpt ? <p className="news-excerpt">{post.excerpt}</p> : null}
        <span className="news-more">
          Ler matéria completa <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

export function AsideList({ posts }: { posts: Post[] }) {
  return (
    <ul>
      {posts.map((p) => (
        <li key={p._id}>
          <Link href={`/noticias/${p.slug}`}>
            <Meta post={p} />
            <strong>{p.title}</strong>
          </Link>
        </li>
      ))}
    </ul>
  );
}
