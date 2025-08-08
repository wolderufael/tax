import { NextResponse } from "next/server";

async function tryTinyUrl(longUrl: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const text = await res.text();
    if (text.startsWith("http")) return text.trim();
  } catch {}
  return null;
}

async function tryIsGd(longUrl: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://is.gd/create.php?format=simple&url=${encodeURIComponent(
        longUrl
      )}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const text = await res.text();
    if (text.startsWith("http")) return text.trim();
  } catch {}
  return null;
}

export async function POST(request: Request) {
  try {
    const { url } = (await request.json()) as { url?: string };
    if (!url)
      return NextResponse.json({ error: "Missing url" }, { status: 400 });

    const tiny = await tryTinyUrl(url);
    if (tiny) return NextResponse.json({ shortUrl: tiny });

    const isgd = await tryIsGd(url);
    if (isgd) return NextResponse.json({ shortUrl: isgd });

    return NextResponse.json({ shortUrl: url });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
