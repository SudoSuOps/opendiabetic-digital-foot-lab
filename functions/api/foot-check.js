// Cloudflare Pages Function — POST /api/foot-check
// Emails an early-access / foot-check lead to build@opendiabetic.com via Resend.
// PHI-free: contact intake only. Requires env var RESEND_API_KEY.

const JSON_HEADERS = { "Content-Type": "application/json" };
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function onRequestPost({ request, env }) {
  try {
    const key = env.RESEND_API_KEY;
    if (!key) {
      return new Response(JSON.stringify({ ok: false, error: "not_configured" }), { status: 500, headers: JSON_HEADERS });
    }

    const body = await request.json().catch(() => ({}));
    const email = String(body.email || "").trim();
    const name = String(body.name || "").trim().slice(0, 120);
    const note = String(body.message || "").trim().slice(0, 2000);

    if (!EMAIL_RE.test(email) || email.length > 254) {
      return new Response(JSON.stringify({ ok: false, error: "invalid_email" }), { status: 400, headers: JSON_HEADERS });
    }

    const text =
      "New OpenDiabetic foot-check request\n\n" +
      "Email: " + email + "\n" +
      "Name:  " + (name || "-") + "\n" +
      "Note:  " + (note || "-") + "\n\n" +
      "— sent from opendiabetic.com";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "OpenDiabetic Foot Lab <noreply@opendiabetic.com>",
        to: ["build@opendiabetic.com"],
        reply_to: email,
        subject: "Foot check request — " + email,
        text: text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return new Response(JSON.stringify({ ok: false, error: "send_failed", detail: detail.slice(0, 400) }), { status: 502, headers: JSON_HEADERS });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: JSON_HEADERS });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: "server_error" }), { status: 500, headers: JSON_HEADERS });
  }
}
