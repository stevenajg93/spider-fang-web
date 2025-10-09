import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PACKAGES } from "@/lib/packages";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
  try {
    const { slug, lead } = await req.json();

    if (!slug || !(slug in PACKAGES)) {
      return NextResponse.json({ ok: false, error: "Unknown package." }, { status: 400 });
    }

    // Require lead on server too (defense-in-depth)
    if (!lead || !lead?.name || !lead?.email) {
      return NextResponse.json(
        { ok: false, error: "Missing lead details. Please submit the form first." },
        { status: 400 }
      );
    }

    const pkg = PACKAGES[slug as keyof typeof PACKAGES];

    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ||
      `${req.nextUrl.protocol}//${req.nextUrl.host}`;

    if (!pkg.paid || pkg.depositGBP <= 0) {
      const url = `${origin}/thank-you?pkg=${encodeURIComponent(pkg.title)}`;
      return NextResponse.json({ ok: true, url });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            unit_amount: pkg.depositGBP * 100,
            product_data: {
              name: `${pkg.title} — 50% deposit`,
              description: "Deposit to reserve your project slot.",
            },
          },
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      customer_email: lead.email, // prefill
      success_url: `${origin}/thank-you?pkg=${encodeURIComponent(
        pkg.title
      )}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/purchase/${slug}?canceled=1`,
      metadata: {
        pkg_slug: String(slug),
        pkg_title: pkg.title,
        deposit_gbp: String(pkg.depositGBP),
        lead_name: lead.name || "",
        lead_email: lead.email || "",
        lead_website: lead.website || "",
        lead_vision: lead.vision || "",
      },
    });

    return NextResponse.json({ ok: true, url: session.url });
  } catch (err: any) {
    console.error("checkout error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
