import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Webhook do Sanity: atualiza o site na hora quando uma notícia é publicada.
 * Configure em sanity.io/manage > API > Webhooks:
 *   URL:    https://SEU-SITE/api/revalidate?secret=SANITY_REVALIDATE_SECRET
 *   Método: POST    Gatilho: Create, Update, Delete
 * Sem o webhook o site se atualiza sozinho em até 60 segundos.
 */
export async function POST(req: NextRequest) {
  const expected = process.env.SANITY_REVALIDATE_SECRET;
  const given = req.nextUrl.searchParams.get("secret") ?? req.headers.get("x-revalidate-secret");

  if (!expected || given !== expected) {
    return NextResponse.json({ ok: false, message: "Não autorizado" }, { status: 401 });
  }

  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true, revalidatedAt: new Date().toISOString() });
}
