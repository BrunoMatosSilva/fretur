import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PortableBody from "@/components/PortableBody";
import { NewsCard } from "@/components/NewsCards";
import { SITE_NAME, SITE_URL } from "@/lib/config";
import { fmtDate } from "@/lib/format";
import { getAllPosts, getPostBySlug, getPostSlugs, sanityImage } from "@/lib/sanity";
import { waLink } from "@/lib/whatsapp";

export const revalidate = 60;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Matéria não encontrada", robots: { index: false } };

  const description = post.excerpt || `Leia a matéria "${post.title}" no site da Fretur.`;
  const url = `/noticias/${post.slug}`;
  const image = post.image ? sanityImage(post.image, 1200, 630) : "/og-fretur.jpg";

  return {
    title: post.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      section: post.category ?? undefined,
      images: [{ url: image, width: 1200, height: 630, alt: post.imageAlt || post.title }],
    },
    twitter: { card: "summary_large_image", title: post.title, description, images: [image] },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = (await getAllPosts()).filter((p) => p.slug !== post.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt || undefined,
    image: post.image ? [sanityImage(post.image, 1200, 630)] : [`${SITE_URL}/og-fretur.jpg`],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: `${SITE_URL}/noticias/${post.slug}`,
    articleSection: post.category || undefined,
    inLanguage: "pt-BR",
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo-fretur.png` },
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Notícias", item: `${SITE_URL}/noticias` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/noticias/${post.slug}` },
    ],
  };

  const shareUrl = `${SITE_URL}/noticias/${post.slug}`;

  return (
    <section className="page-main is-article">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumb]).replace(/</g, "\\u003c") }}
      />
      <div className="wrap">
        <article className="article">
          <Link className="article-back" href="/noticias">
            ← Todas as notícias
          </Link>

          <div className="news-meta">
            <time dateTime={post.publishedAt}>{fmtDate(post.publishedAt)}</time>
            {post.category ? <span>{post.category}</span> : null}
          </div>
          <h1>{post.title}</h1>
          {post.excerpt ? <p className="article-lead">{post.excerpt}</p> : null}

          {post.image ? (
            <figure className="article-cover">
              <Image
                src={post.image}
                alt={post.imageAlt || post.title}
                width={post.imageWidth || 1400}
                height={post.imageHeight || 788}
                sizes="(max-width: 820px) 100vw, 780px"
                priority
              />
            </figure>
          ) : null}

          <PortableBody blocks={post.body} />

          <div className="article-share">
            <a
              className="btn btn-primary btn-sm"
              href={`https://wa.me/?text=${encodeURIComponent(`${post.title} ${shareUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Compartilhar no WhatsApp
            </a>
          </div>

          <div className="article-cta">
            <p>Precisa de transporte executivo, transfer ou fretamento para o seu grupo?</p>
            <a
              className="btn btn-primary"
              href={waLink("Olá! Li uma matéria no site da Fretur e gostaria de solicitar um orçamento.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar orçamento
            </a>
          </div>
        </article>

        {related.length > 0 ? (
          <div className="related">
            <h2>Continue lendo</h2>
            <div className="news-list">
              {related.map((p) => (
                <NewsCard key={p._id} post={p} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
