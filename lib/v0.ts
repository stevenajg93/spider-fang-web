// lib/v0.ts — use createClient from v0-sdk
type GeneratePayload = {
  prompt: string;
  name?: string;
  email?: string;
  company?: string;
};

export type V0GenerateResult = {
  previewUrl?: string;
  raw?: unknown;
};

const V0_MOCK = process.env.V0_MOCK === "1";

export async function createV0Preview(payload: GeneratePayload): Promise<V0GenerateResult> {
  if (V0_MOCK || !process.env.V0_API_KEY) {
    return { previewUrl: `mock:${Date.now().toString(36)}` };
  }

  const { createClient } = await import("v0-sdk");
  const v0 = createClient({ apiKey: process.env.V0_API_KEY! });

  const chat: any = await v0.chats.create({
    message: payload.prompt,
    metadata: {
      name: payload.name,
      email: payload.email,
      company: payload.company,
      source: "spider-fang/instant-demo",
    },
  });

  const demo: string | undefined =
    chat?.demo || chat?.links?.demo || chat?.previewUrl || chat?.preview_url;

  if (!demo) return { previewUrl: undefined, raw: chat };
  return { previewUrl: String(demo), raw: chat };
}
