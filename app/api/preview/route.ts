import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function mockHtml(pid: string) {
  // Simple, self-contained mock page (no external URLs)
  return `<!doctype html>
<html lang="en">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Spider Fang — Mock Preview (${pid})</title>
<style>
  :root { color-scheme: light dark; }
  body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; margin: 0; }
  header { padding: 28px 20px; border-bottom: 1px solid rgba(0,0,0,.08); }
  .wrap { max-width: 960px; margin: 0 auto; padding: 24px 20px; }
  h1 { font-size: 28px; margin: 0 0 4px; }
  .sub { color: #6b7280; margin: 0; }
  .grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); margin-top: 24px; }
  .card { border: 1px solid rgba(0,0,0,.08); border-radius: 14px; padding: 16px; background: rgba(255,255,255,.7); }
  .cta { display: inline-block; padding: 10px 14px; border-radius: 999px; background: black; color: white; text-decoration: none; }
</style>
<header><div class="wrap">
  <strong>Spider Fang</strong>
</div></header>
<main class="wrap">
  <h1>Your instant demo is live (mock)</h1>
  <p class="sub">This is a local mock preview used for development. No upstream URLs are called.</p>

  <div class="grid">
    <div class="card">
      <h3>Home</h3>
      <p>Cinematic hero, a clear promise, and a bold CTA that gets visitors moving.</p>
    </div>
    <div class="card">
      <h3>Services</h3>
      <p>Modern builds, fast turnarounds, transparent pricing tiers tailored for UK SMEs.</p>
    </div>
    <div class="card">
      <h3>CTA</h3>
      <p>Choose a plan: Launch £199, Upgrade £395, Go Full Stack £795, or Ask for AI/Web3/XR.</p>
    </div>
    <div class="card">
      <h3>Contact</h3>
      <p>Quick form with GDPR-friendly consent and response-time promise.</p>
    </div>
  </div>

  <p style="margin-top:24px"><a class="cta" href="#">This is a mock — buttons are inert</a></p>
</main>
</html>`;
}

/** Rewrite upstream HTML so assets load via our proxy and no origins leak. */
function rewriteHtml(html: string, upstreamOrigin: string) {
  let out = html;

  // 1) Relative asset paths (/_next, /static, /assets, /images) -> our proxy
  const relPattern = /(src|href)=["'](\/(?:_next|static|assets|images)\/[^"']+)["']/gi;
  out = out.replace(relPattern, (_m, attr, path) => {
    const prox = `/api/preview/asset?path=${encodeURIComponent(path)}&base=${encodeURIComponent(
      upstreamOrigin
    )}`;
    return `${attr}="${prox}"`;
  });

  // 2) Absolute same-origin URLs -> proxy
  const absSameOrigin = new RegExp(
    `(src|href)=["']${escapeRegExp(upstreamOrigin)}(\\/[^"']+)["']`,
    "gi"
  );
  out = out.replace(absSameOrigin, (_m, attr, path) => {
    const prox = `/api/preview/asset?path=${encodeURIComponent(path)}&base=${encodeURIComponent(
      upstreamOrigin
    )}`;
    return `${attr}="${prox}"`;
  });

  // 3) Remove hints that may prefetch/prerender external origins
  out = out.replace(/<link[^>]+rel=["'](?:preload|prefetch|prerender)["'][^>]*>/gi, "");

  // 4) Remove <base> tags that force absolute loads
  out = out.replace(/<base[^>]*>/gi, "");

  return out;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pid = searchParams.get("pid");
  if (!pid) {
    return new Response(JSON.stringify({ ok: false, error: "Missing pid" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const row = await prisma.demoRequest.findFirst({
    where: { pid },
    select: { previewUrl: true },
  });

  const previewUrl = row?.previewUrl;
  if (!previewUrl) {
    return new Response("Preview unavailable. Please generate again.", { status: 404 });
  }

  // Handle mock previews locally (V0_MOCK=1)
  if (previewUrl.startsWith("mock:")) {
    const headers = new Headers({
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer",
      "Content-Security-Policy": [
        "default-src 'self';",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval';",
        "style-src 'self' 'unsafe-inline';",
        "img-src 'self' data: blob:;",
        "font-src 'self' data:;",
        "connect-src 'self';",
        "frame-ancestors 'self';",
        "object-src 'none';",
      ].join(" "),
    });
    return new Response(mockHtml(pid), { status: 200, headers });
  }

  // Real upstream: fetch and rewrite
  try {
    const upstream = await fetch(previewUrl, {
      cache: "no-store",
      redirect: "follow",
      headers: { "User-Agent": "SpiderFang/preview-proxy" },
    });

    if (!upstream.ok) {
      return new Response("Upstream preview unavailable", { status: 502 });
    }

    const upstreamOrigin = new URL(previewUrl).origin;
    const ct = upstream.headers.get("content-type") || "text/html; charset=utf-8";
    const rawHtml = await upstream.text();
    const html = rewriteHtml(rawHtml, upstreamOrigin);

    const headers = new Headers({
      "Content-Type": ct,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer",
      "Content-Security-Policy": [
        "default-src 'self';",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval';",
        "style-src 'self' 'unsafe-inline';",
        "img-src 'self' data: blob:;",
        "font-src 'self' data:;",
        "connect-src 'self';",
        "frame-ancestors 'self';",
        "object-src 'none';",
      ].join(" "),
    });

    return new Response(html, { status: 200, headers });
  } catch {
    return new Response("Failed to fetch upstream preview", { status: 502 });
  }
}
