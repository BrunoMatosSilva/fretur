# Fretur — site em Next.js + Sanity

Site da Fretur Fretamento e Turismo. As páginas são geradas no servidor (SSR/ISR), então o Google e outros buscadores recebem o HTML completo de cada página e de cada notícia.

- `/` página inicial (com a seção "Últimas notícias")
- `/noticias` lista com filtro por categoria
- `/noticias/[slug]` matéria completa
- `/sitemap.xml` e `/robots.txt` gerados automaticamente
- `/api/revalidate` webhook para atualizar o site assim que uma notícia é publicada

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Variáveis de ambiente

| Variável | Valor |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` 
| `NEXT_PUBLIC_SANITY_DATASET` 
| `SANITY_POST_TYPE` | nome do tipo de notícia no Studio (padrão `post`) |
| `NEXT_PUBLIC_SITE_URL` | 
| `SANITY_REVALIDATE_SECRET` 

## Publicar na Vercel

1. Em vercel.com, **Add New → Project** e importe `BrunoMatosSilva/fretur`.
2. Cadastre as variáveis da tabela acima em **Settings → Environment Variables**.
3. Clique em **Deploy** e depois aponte o domínio `fretur.com.br` em **Settings → Domains**.

## Atualização imediata das notícias (opcional)

Sem configurar nada, o site se atualiza sozinho em até 60 segundos depois de publicar no Studio. Para atualizar na hora:

1. Em sanity.io/manage → projeto → **API → Webhooks → Create webhook**.
2. URL: `https://fretur.com.br/api/revalidate?secret=SANITY_REVALIDATE_SECRET` (use o mesmo segredo da Vercel).
3. Método `POST`, gatilhos **Create, Update, Delete**, filtro `_type == "post"`.

## Campos esperados no Sanity

O site lê, para cada notícia: título (`title`), endereço (`slug`), data (`publishedAt`), categoria (`category`, texto ou referência com `title`), capa (`mainImage`), resumo (`excerpt`) e conteúdo (`body`, texto rico).
O arquivo `sanity-schema/post.ts` é um schema pronto com esses campos.

Se o seu Studio usa outros nomes, ajuste apenas `CARD_FIELDS` e `BODY_FIELDS` em `lib/sanity.ts`. Já são aceitos nomes alternativos (`coverImage`, `image`, `summary`, `description`, `content`).
Só aparecem no site notícias **publicadas** (Publish) e com data de publicação igual ou anterior a agora.

## SEO já incluído

- Título, descrição, canonical e Open Graph/Twitter por página e por matéria
- Dados estruturados (`TravelAgency`, `NewsArticle` e `BreadcrumbList`)
- `sitemap.xml` com todas as matérias e `robots.txt`
- Imagens otimizadas (AVIF/WebP) e fontes locais
- Redirecionamento de `/index.html` para `/`

Depois de publicar, cadastre `https://fretur.com.br/sitemap.xml` no Google Search Console.

## Onde editar

- Textos e fotos da página inicial: `lib/home-data.ts` e `app/page.tsx`
- Estilos: `app/globals.css`
- Telefone/WhatsApp e domínio: `lib/config.ts`
