export function instantDemoEmail(params: { name?: string; previewUrl: string }) {
  const { name, previewUrl } = params
  const subject = "Your Spider Fang instant demo is ready"
  const greeting = name ? `Hi ${name},` : "Hi,"

  const html = `
  <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
    <h2 style="margin:0 0 12px;">${greeting}</h2>
    <p>Your instant website demo is ready. Open it here:</p>
    <p><a href="${previewUrl}" target="_blank" rel="noopener noreferrer">${previewUrl}</a></p>
    <hr style="border:none;border-top:1px solid #eee;margin:16px 0;">
    <p>Want it production-ready? Reply to this email or click <strong>Tune my demo</strong> on the confirmation page.</p>
    <p style="color:#888;font-size:12px;margin-top:24px;">Sent by Spider Fang</p>
  </div>
  `.trim()

  const text = [
    greeting,
    "",
    "Your instant website demo is ready. Open it here:",
    previewUrl,
    "",
    "Want it production-ready? Reply to this email or click “Tune my demo” on the confirmation page.",
    "",
    "Sent by Spider Fang",
  ].join("\n")

  return { subject, html, text }
}
