import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-main is-article">
      <div className="wrap">
        <div className="article" style={{ textAlign: "center", padding: "40px 0" }}>
          <span className="eyebrow">Erro 404</span>
          <h1>Página não encontrada</h1>
          <p className="article-lead">O endereço que você acessou não existe ou foi removido.</p>
          <Link className="btn btn-primary" href="/">
            Voltar ao início
          </Link>
        </div>
      </div>
    </section>
  );
}
