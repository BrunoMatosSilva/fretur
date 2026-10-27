/**
 * Acesso ao Sanity (API HTTP + GROQ), sem dependências extras.
 *
 * Se o seu Studio usar nomes de campos diferentes, ajuste só as constantes
 * CARD_FIELDS e BODY_FIELDS abaixo (e SANITY_POST_TYPE no .env).
 */
import { SANITY } from "./config";

export type Post = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  category?: string | null;
  excerpt?: string | null;
  image?: string | null;
  imageAlt?: string | null;
};

export type PortableSpan = { _type?: string; text?: string; marks?: string[] };

export type PortableBlock = {
  _type: string;
  _key?: string;
  style?: string;
  listItem?: string;
  children?: PortableSpan[];
  markDefs?: { _key: string; _type: string; href?: string }[];
  // blocos de imagem
  url?: string | null;
  alt?: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
};

export type PostFull = Post & {
  body?: PortableBlock[] | null;
  imageWidth?: number | null;
  imageHeight?: number | null;
};

/* ---------- Campos (mapeamento do schema) ---------- */
const CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  "publishedAt": coalesce(publishedAt, _createdAt),
  "updatedAt": _updatedAt,
  "category": coalesce(category->title, category),
  "excerpt": coalesce(excerpt, summary, description),
  "image": coalesce(mainImage.asset->url, coverImage.asset->url, image.asset->url),
  "imageAlt": coalesce(mainImage.alt, coverImage.alt, image.alt)
`;

const BODY_FIELDS = `
  "imageWidth": coalesce(mainImage.asset->metadata.dimensions.width, coverImage.asset->metadata.dimensions.width, image.asset->metadata.dimensions.width),
  "imageHeight": coalesce(mainImage.asset->metadata.dimensions.height, coverImage.asset->metadata.dimensions.height, image.asset->metadata.dimensions.height),
  "body": coalesce(body, content)[]{
    ...,
    _type == "image" => {
      "url": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    }
  }
`;

const VISIBLE = `_type == $type && defined(slug.current) && coalesce(publishedAt, _createdAt) <= now()`;

/* ---------- Fetch ---------- */
async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  const { projectId, dataset, apiVersion } = SANITY;
  const all = { type: SANITY.postType, ...params };
  let qs = `query=${encodeURIComponent(query)}&perspective=published`;
  for (const [k, v] of Object.entries(all)) {
    qs += `&${encodeURIComponent("$" + k)}=${encodeURIComponent(JSON.stringify(v))}`;
  }
  const url = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?${qs}`;

  try {
    const res = await fetch(url, { next: { revalidate: 60, tags: ["sanity"] } });
    if (!res.ok) throw new Error(`Sanity respondeu HTTP ${res.status}`);
    const json = (await res.json()) as { result: T };
    return json.result;
  } catch (err) {
    console.error("[sanity] falha ao buscar conteúdo:", err);
    return null;
  }
}

/* ---------- Consultas ---------- */
export async function getLatestPosts(limit = 9): Promise<Post[]> {
  const rows = await sanityFetch<Post[]>(
    `*[${VISIBLE}] | order(coalesce(publishedAt, _createdAt) desc)[0...${Math.max(1, limit)}]{${CARD_FIELDS}}`,
  );
  return rows ?? [];
}

export async function getAllPosts(): Promise<Post[]> {
  return getLatestPosts(100);
}

export async function getPostBySlug(slug: string): Promise<PostFull | null> {
  return sanityFetch<PostFull | null>(
    `*[${VISIBLE} && slug.current == $slug][0]{${CARD_FIELDS}, ${BODY_FIELDS}}`,
    { slug },
  );
}

export async function getPostSlugs(): Promise<{ slug: string; updatedAt?: string }[]> {
  const rows = await sanityFetch<{ slug: string; updatedAt?: string }[]>(
    `*[${VISIBLE}]{"slug": slug.current, "updatedAt": _updatedAt}`,
  );
  return rows ?? [];
}

/** URL de imagem do Sanity redimensionada (para Open Graph etc.) */
export function sanityImage(url: string, width: number, height?: number): string {
  const h = height ? `&h=${height}&fit=crop` : "";
  return `${url}?w=${width}${h}&auto=format`;
}
