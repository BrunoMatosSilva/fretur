import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import Gallery from "@/components/Gallery";
import Ticker from "@/components/Ticker";
import { AsideList, FeatureCard, NewsCard } from "@/components/NewsCards";
import {
  ABOUT_ITEMS,
  BENEFITS,
  FEATURES,
  FLEET,
  GALLERY,
  HERO_CHIPS,
  HERO_META,
  PORT_CHECKS,
  SERVICES,
  TICKER,
  WHY,
} from "@/lib/home-data";
import { getLatestPosts } from "@/lib/sanity";
import { rv } from "@/lib/reveal";
import { waLink } from "@/lib/whatsapp";

export const revalidate = 60;

const MSG_ORCAMENTO = "Olá! Vim pelo site da Fretur e gostaria de solicitar um orçamento.";

export default async function HomePage() {
  const posts = await getLatestPosts(9);

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="hero" id="inicio">
        <div className="parallax-bg" data-parallax="0.8" aria-hidden="true">
          <Image
            src="/images/hero-onibus-fretur.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="wrap">
          <div className="hero-copy">
            <span className="eyebrow is-yellow">Pontualidade, segurança e conforto</span>
            <h1>Transporte executivo e turismo com padrão profissional</h1>
            <p className="lead">
              A Fretur atende traslados corporativos, transfer para aeroportos, fretamento de ônibus, viagens em grupo,
              turismo receptivo e eventos sociais em São Paulo com atendimento ágil e direto pelo WhatsApp.
            </p>
            <div className="hero-cta">
              <a className="btn btn-primary" href={waLink(MSG_ORCAMENTO)} target="_blank" rel="noopener noreferrer">
                Solicitar orçamento
                <Icon name="i-chev" />
              </a>
              <Link className="btn btn-outline" href="/#servicos">
                Ver serviços
                <Icon name="i-chev" />
              </Link>
            </div>
            <div className="hero-meta">
              {HERO_META.map((t) => (
                <span key={t}>
                  <span className="dot" />
                  {t}
                </span>
              ))}
            </div>
            <div className="hero-routes">
              <span className="hero-routes-label">Rotas e demandas mais solicitadas</span>
              <ul className="hero-chips">
                {HERO_CHIPS.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Diferenciais ===== */}
      <div className="features" aria-label="Diferenciais da Fretur">
        <div className="wrap features-grid">
          {FEATURES.map((f, i) => (
            <div className="feature" key={f.icon} {...rv("up", i, 0.1)}>
              <span className="feature-ic">
                <Icon name={f.icon} />
              </span>
              <p>
                {f.lines[0]}
                <br />
                {f.lines[1]}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Ticker items={TICKER} />

      {/* ===== Serviços ===== */}
      <section id="servicos">
        <div className="wrap">
          <div className="section-head">
            <div {...rv("up", 0, 0.12)}>
              <span className="eyebrow">Nossos serviços</span>
              <h2>Soluções de transporte para turismo, empresas e eventos</h2>
            </div>
            <p {...rv("up", 1, 0.12)}>
              A estrutura da Fretur foi pensada para atender desde o passageiro individual até grupos maiores, sempre
              com foco em organização, conforto e pontualidade.
            </p>
          </div>

          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <article className="card lift" key={s.title} {...rv("up", i, 0.1, 3)}>
                <span className="icon">
                  <Icon name={s.icon} />
                </span>
                <div>
                  <span className="dash" />
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Frota ===== */}
      <section className="bg-soft" id="frota">
        <div className="wrap">
          <div className="section-head">
            <div {...rv("up", 0, 0.12)}>
              <span className="eyebrow">Nossa frota</span>
              <h2>Veículos preparados para diferentes perfis de atendimento</h2>
            </div>
            <p {...rv("up", 1, 0.12)}>
              A Fretur opera com veículos pensados para viagens executivas, grupos e serviços de receptivo, mantendo
              padrão de conforto, climatização e segurança.
            </p>
          </div>

          <div className="fleet-grid">
            {FLEET.map((v, i) => (
              <article className="fleet-card lift" key={v.title} {...rv("up", i, 0.12, 3)}>
                <div className="fleet-visual">
                  <Image
                    src={v.src}
                    alt={v.alt}
                    fill
                    sizes="(max-width: 660px) 100vw, (max-width: 1040px) 50vw, 400px"
                    style={{ objectPosition: v.pos }}
                  />
                </div>
                <div className="fleet-copy">
                  <div className="fleet-title">
                    <h3>{v.title}</h3>
                    <Icon name="i-chev" />
                  </div>
                  <strong>{v.sub}</strong>
                  <p>{v.text}</p>
                  <a className="btn btn-primary btn-sm" href={waLink(v.msg)} target="_blank" rel="noopener noreferrer">
                    Solicitar orçamento
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Galeria ===== */}
      <section className="gallery on-dark" id="galeria">
        <div className="wrap">
          <div className="section-head">
            <div {...rv("up", 0, 0.12)}>
              <span className="eyebrow is-yellow">Galeria da frota</span>
              <h2>Por dentro e por fora</h2>
            </div>
            <p {...rv("up", 1, 0.12)}>Conheça de perto os veículos que levam o seu grupo. Toque em uma foto para ampliar.</p>
          </div>
          <Gallery items={GALLERY} />
        </div>
      </section>

      {/* ===== Turismo & lazer ===== */}
      <section id="turismo">
        <div className="wrap tour-grid">
          <figure className="photo" {...rv("left", 0, 0.1)}>
            <Image
              data-parallax-img=""
              src="/images/micro-grafite-1409-parque.jpg"
              alt="Micro-ônibus executivo da Fretur estacionado em meio à natureza, pronto para um passeio"
              width={1600}
              height={900}
              sizes="(max-width: 900px) 100vw, 660px"
            />
          </figure>
          <div className="tour-copy" {...rv("right", 1, 0.1)}>
            <span className="eyebrow">Turismo &amp; lazer</span>
            <h2 className="h2">City tour e passeios com frota premium</h2>
            <p>
              Roteiros sob medida para turismo cultural, gastronômico ou de compras, com motoristas que conhecem as
              melhores rotas e a flexibilidade que o seu grupo precisa.
            </p>
            <a
              className="btn btn-primary"
              href={waLink("Olá! Gostaria de planejar um city tour ou passeio com a Fretur.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Planejar meu passeio
              <Icon name="i-chev" />
            </a>
          </div>
        </div>
      </section>

      {/* ===== Porto de Santos ===== */}
      <section className="bg-soft" id="porto">
        <div className="wrap port-grid">
          <div className="port-copy" {...rv("left", 0, 0.1)}>
            <span className="eyebrow">Destaque operacional</span>
            <h2 className="h2">Especialista em transfer para o Porto de Santos</h2>
            <p>
              A Fretur atende a rota São Paulo ↔ Santos com atenção especial a embarques de cruzeiros, horários
              portuários e deslocamentos programados para evitar atrasos e imprevistos.
            </p>
            <a
              className="btn btn-primary"
              href={waLink("Olá! Gostaria de solicitar um transfer com a Fretur para o Porto de Santos.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar sobre transfer
              <Icon name="i-chev" />
            </a>
          </div>
          <div className="port-card" {...rv("right", 1, 0.1)}>
            <figure className="photo">
              <Image
                data-parallax-img=""
                src="/images/porto-santos.jpeg"
                alt="Micro-ônibus executivo grafite e amarelo da Fretur, prefixo 1409, estacionado em rua de Guarulhos"
                width={1599}
                height={899}
                sizes="(max-width: 900px) 100vw, 560px"
                style={{ objectPosition: "62% center" }}
              />
            </figure>
            <ul className="check-list">
              {PORT_CHECKS.map((t) => (
                <li key={t}>
                  <Icon name="i-check" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== Por que a Fretur ===== */}
      <section className="why" id="diferenciais">
        <div className="parallax-bg" data-parallax="0.9" aria-hidden="true">
          <Image src="/images/micro-grafite-1409-rua.jpg" alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="wrap">
          <div className="why-head" {...rv("up", 0, 0.1)}>
            <span className="eyebrow is-yellow">Por que a Fretur</span>
            <h2 className="h2">O que nos diferencia da concorrência</h2>
          </div>
          <div className="why-grid">
            {WHY.map((w, i) => (
              <article className="why-card lift" key={w.n} {...rv("zoom", i, 0.14)}>
                <span className="why-num">{w.n}</span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Vantagens ===== */}
      <section id="vantagens">
        <div className="wrap">
          <div className="section-head">
            <div {...rv("up", 0, 0.12)}>
              <span className="eyebrow">Vantagens do fretamento</span>
              <h2>Mais controle, economia e organização para cada trajeto</h2>
            </div>
            <p {...rv("up", 1, 0.12)}>
              Para empresas, eventos e viagens em grupo, o fretamento reduz ruídos operacionais e melhora a experiência
              de todos os passageiros.
            </p>
          </div>

          <div className="benefit-layout">
            <figure className="benefit-photo" {...rv("left", 0, 0.1)}>
              <Image
                data-parallax-img=""
                src="/images/interior-couro-costura-vermelha.jpg"
                alt="Interior do veículo com poltronas de couro e costura vermelha, cortinas e iluminação no teto"
                fill
                sizes="(max-width: 980px) 100vw, 560px"
                style={{ objectFit: "cover" }}
              />
              <figcaption>Conforto, climatização e espaço para todo o grupo viajar bem.</figcaption>
            </figure>
            <div className="benefit-grid" {...rv("right", 1, 0.1)}>
              {BENEFITS.map((b) => (
                <article className="benefit lift" key={b.title}>
                  <span className="dash" />
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Quem somos ===== */}
      <section className="bg-soft" id="quem-somos">
        <div className="wrap about-grid">
          <div className="about-copy" {...rv("left", 0, 0.1)}>
            <span className="eyebrow">Quem somos</span>
            <h2 className="h2">Excelência em cada detalhe do deslocamento</h2>
            <p className="intro">
              A Fretur atua com foco em mobilidade executiva, turismo e fretamento, entendendo que transportar pessoas
              exige organização, responsabilidade e atenção à experiência do passageiro.
            </p>
            <p>
              Nosso objetivo é simplificar deslocamentos para empresas, grupos, famílias e turistas em São Paulo,
              oferecendo um atendimento que combina pontualidade, segurança e conforto.
            </p>
            <p>
              Do transfer executivo ao transporte para eventos sociais, viagens e receptivo, cada operação é conduzida
              com planejamento, agilidade e cuidado com o tempo de quem contrata.
            </p>
          </div>

          <div className="about-stack" {...rv("right", 1, 0.1)}>
            <figure className="photo">
              <Image
                data-parallax-img=""
                src="/images/micro-prata-2211.jpg"
                alt="Micro-ônibus executivo prata da Fretur com o selo 20 anos transportando o povo guarulhense"
                width={1280}
                height={960}
                sizes="(max-width: 900px) 100vw, 560px"
              />
              <span className="photo-badge">
                <Icon name="i-star" className="ic-fill" />
                20 anos transportando o povo guarulhense
              </span>
            </figure>
            {ABOUT_ITEMS.map((a) => (
              <article className="about-item lift" key={a.title}>
                <strong>{a.title}</strong>
                <p>{a.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Notícias (Sanity) ===== */}
      {posts.length > 0 ? (
        <section id="noticias" className="news-section">
          <div className="wrap">
            <div className="section-head">
              <div {...rv("up", 0, 0.12)}>
                <span className="eyebrow">Últimas notícias</span>
                <h2>As publicações mais recentes da Fretur</h2>
              </div>
              <p {...rv("up", 1, 0.12)}>Novidades, dicas de viagem, coberturas e comunicados da Fretur.</p>
            </div>

            <div className="news-layout">
              <div className="news-main">
                <FeatureCard post={posts[0]} />
                {posts.length > 1 ? (
                  <div className="news-grid">
                    {posts.slice(1, 5).map((p) => (
                      <NewsCard key={p._id} post={p} />
                    ))}
                  </div>
                ) : null}
              </div>
              <aside className="news-aside" aria-labelledby="newsAsideTitle">
                <h3 id="newsAsideTitle">Mais recentes</h3>
                <AsideList posts={posts.slice(0, 5)} />
              </aside>
            </div>

            <div className="news-foot">
              <Link className="btn btn-primary" href="/noticias">
                Ver todas as notícias
                <Icon name="i-chev" />
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {/* ===== Chamada final ===== */}
      <section className="cta" id="contato">
        <div className="parallax-bg" data-parallax="0.9" aria-hidden="true">
          <Image src="/images/hero-onibus-fretur.jpg" alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="wrap cta-row">
          <div className="cta-copy" {...rv("left", 0, 0.1)}>
            <span className="eyebrow is-yellow">Fale agora com a equipe</span>
            <h2>Solicite seu orçamento direto pelo WhatsApp</h2>
            <p>
              Se você precisa de transporte executivo, transfer, turismo receptivo, fretamento corporativo ou viagem em
              grupo, a Fretur pode te atender com rapidez e praticidade.
            </p>
          </div>
          <a
            className="btn btn-primary btn-lg"
            href={waLink(MSG_ORCAMENTO)}
            target="_blank"
            rel="noopener noreferrer"
            {...rv("right", 1, 0.1)}
          >
            <Icon name="i-wa" style={{ width: 22, height: 22 }} />
            Chamar no WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
