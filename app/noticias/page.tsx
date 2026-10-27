import type { Metadata } from "next";
import NewsList from "@/components/NewsList";
import { getAllPosts } from "@/lib/sanity";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Notícias",
  description: "Novidades, dicas de viagem, coberturas e comunicados da Fretur Fretamento e Turismo.",
  alternates: { canonical: "/noticias" },
  openGraph: {
    title: "Notícias | Fretur",
    description: "Novidades, dicas de viagem, coberturas e comunicados da Fretur Fretamento e Turismo.",
    url: "/noticias",
  },
};

export default async function NoticiasPage() {
  const posts = await getAllPosts();

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <span className="eyebrow is-yellow">Últimas notícias</span>
          <h1>Notícias da Fretur</h1>
          <p>Novidades, dicas de viagem, coberturas e comunicados da Fretur.</p>
        </div>
      </section>

      <section className="page-main">
        <div className="wrap">
          {posts.length > 0 ? (
            <NewsList posts={posts} />
          ) : (
            <p className="news-empty">Ainda não há notícias publicadas. Volte em breve!</p>
          )}
        </div>
      </section>
    </>
  );
}
