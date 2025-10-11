import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

// Example usage: /api/preview/asset?_next=/static/chunks/xyz.js
export async function GET(req: NextRequest) {
  const upstreamPath = req.nextUrl.searchParams.get("_next") || req.nextUrl.searchParams.get("path");
  const base = req.nextUrl.searchParams.get("base"); // optional absolute base if provided
  if (!upstreamPath) return new Response("Missing asset path", { status: 400 });

  const upstreamUrl = base ? `${base}${upstreamPath}` : upstreamPath;

  try {
    const r = await fetch(upstreamUrl, {
      headers: { "User-Agent": "SpiderFang/preview-asset-proxy" },
      cache: "no-store",
      redirect: "follow",
    });
    if (!r.ok) return new Response("Upstream asset unavailable", { status: 502 });

    const ct = r.headers.get("content-type") ?? "application/octet-stream";
    const headers = new Headers({ "Content-Type": ct });
    const cc = r.headers.get("cache-control");
    if (cc) headers.set("Cache-Control", cc);

    return new Response(r.body, { status: 200, headers });
  } catch {
    return new Response("Failed to fetch upstream asset", { status: 502 });
  }
}
