// Cloudflare Pages Function — POST /api/foot-check
// Emails a foot-check / early-access lead to build@opendiabetic.com via Resend,
// and sends the person a warm branded confirmation. PHI-free contact intake.
// Requires env var RESEND_API_KEY. opendiabetic.com must be a verified Resend domain.

const JSON_HEADERS = { "Content-Type": "application/json" };
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const FROM = "OpenDiabetic Foot Lab <noreply@opendiabetic.com>";
const LEADS_TO = "build@opendiabetic.com";

function esc(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

// Branded, email-client-safe shell (tables + inline styles + system fonts).
function shell(preheader, inner) {
  return (
'<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>' +
'<body style="margin:0;padding:0;background:#0B0F14;">' +
'<div style="display:none;max-height:0;overflow:hidden;opacity:0;">' + esc(preheader) + '</div>' +
'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0B0F14;padding:28px 14px;">' +
'<tr><td align="center">' +
'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#FBF7EF;border-radius:16px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Helvetica,Arial,sans-serif;">' +
// header (ink + honey)
'<tr><td style="background:#0B0F14;padding:22px 30px;">' +
'<span style="font-size:22px;vertical-align:middle;">🦶</span> ' +
'<span style="color:#E8EEF5;font-weight:800;font-size:19px;letter-spacing:-0.02em;vertical-align:middle;">OpenDiabetic</span>' +
'<div style="color:#F2B441;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;margin-top:5px;font-weight:600;">The Digital Foot Lab</div>' +
'</td></tr>' +
// body
'<tr><td style="padding:30px 30px 8px;color:#2B2118;">' + inner + '</td></tr>' +
// footer
'<tr><td style="padding:22px 30px 26px;border-top:1px solid #EADFCB;color:#6E7C8A;font-size:12px;line-height:1.6;">' +
'<span style="font-size:13px;">🐝</span> Part of the <span style="color:#D99A2B;font-weight:600;">Swarm &amp; Bee</span> family &nbsp;·&nbsp; ' +
'<a href="mailto:build@opendiabetic.com" style="color:#6E7C8A;">build@opendiabetic.com</a> · Jupiter, FL<br>' +
'Educational monitoring — not a medical device. It never diagnoses.' +
'</td></tr>' +
'</table></td></tr></table></body></html>'
  );
}

async function sendEmail(key, payload) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function onRequestPost({ request, env }) {
  try {
    const key = env.RESEND_API_KEY;
    if (!key) return new Response(JSON.stringify({ ok: false, error: "not_configured" }), { status: 500, headers: JSON_HEADERS });

    const body = await request.json().catch(() => ({}));
    const email = String(body.email || "").trim();
    const name = String(body.name || "").trim().slice(0, 120);
    const note = String(body.message || "").trim().slice(0, 2000);
    if (!EMAIL_RE.test(email) || email.length > 254)
      return new Response(JSON.stringify({ ok: false, error: "invalid_email" }), { status: 400, headers: JSON_HEADERS });

    const when = new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC";

    // 1) Notification to the team (critical)
    const notifyInner =
      '<h1 style="margin:0 0 8px;font-size:21px;font-weight:800;letter-spacing:-0.01em;color:#2B2118;">New foot-check request 🦶</h1>' +
      '<p style="margin:0 0 20px;font-size:15px;color:#4A3D30;">Someone asked to start a foot check on opendiabetic.com.</p>' +
      '<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;background:#fff;border:1px solid #EADFCB;border-radius:10px;">' +
      '<tr><td style="padding:16px 18px;font-size:15px;color:#2B2118;">' +
      '<div style="margin-bottom:10px;"><span style="color:#9a8570;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;">Email</span><br>' +
      '<a href="mailto:' + esc(email) + '" style="color:#D99A2B;font-weight:700;font-size:16px;">' + esc(email) + '</a></div>' +
      (name ? '<div style="margin-bottom:10px;"><span style="color:#9a8570;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;">Name</span><br>' + esc(name) + '</div>' : "") +
      (note ? '<div style="margin-bottom:10px;"><span style="color:#9a8570;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;">Note</span><br>' + esc(note) + '</div>' : "") +
      '<div><span style="color:#9a8570;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;">When</span><br>' + esc(when) + '</div>' +
      '</td></tr></table>' +
      '<p style="margin:18px 0 0;font-size:13px;color:#6E7C8A;">Reply to this email to reach them directly.</p>';

    const notify = await sendEmail(key, {
      from: FROM,
      to: [LEADS_TO],
      reply_to: email,
      subject: "🦶 New foot check request — " + email,
      html: shell("New foot-check request from " + email, notifyInner),
      text: "New foot-check request\n\nEmail: " + email + "\nName: " + (name || "-") + "\nNote: " + (note || "-") + "\nWhen: " + when,
    });
    if (!notify.ok) {
      const detail = await notify.text().catch(() => "");
      return new Response(JSON.stringify({ ok: false, error: "send_failed", detail: detail.slice(0, 400) }), { status: 502, headers: JSON_HEADERS });
    }

    // 2) Warm confirmation to the person (best-effort — never fail the request on this)
    try {
      const confirmInner =
        '<h1 style="margin:0 0 12px;font-size:22px;font-weight:800;letter-spacing:-0.01em;color:#2B2118;">You’re on the list. 🦶</h1>' +
        '<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#4A3D30;">Thank you for reaching out. We’re building <strong>OpenDiabetic — the Digital Foot Lab</strong> to help people with diabetes catch foot trouble while it’s still small: daily monitoring, a clinician in the loop, and made-to-fit care. We’ll be in touch soon.</p>' +
        '<p style="margin:0 0 4px;font-size:16px;line-height:1.6;color:#4A3D30;">Until then, one thing that changes everything: <strong>look at your feet every day.</strong> A minute a day is the simplest way to keep them.</p>' +
        '<p style="margin:22px 0 0;font-size:16px;color:#2B2118;font-weight:700;">Keep your feet. 🦶</p>' +
        '<p style="margin:6px 0 0;font-size:14px;color:#6E7C8A;">— The OpenDiabetic team</p>';
      await sendEmail(key, {
        from: FROM,
        to: [email],
        subject: "You’re on the list — OpenDiabetic 🦶",
        html: shell("We got your request. Keep your feet.", confirmInner),
        text: "You're on the list.\n\nThank you for reaching out to OpenDiabetic — the Digital Foot Lab. We'll be in touch soon.\n\nUntil then: look at your feet every day. A minute a day is the simplest way to keep them.\n\nKeep your feet.\n— The OpenDiabetic team",
      });
    } catch (e) {}

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: JSON_HEADERS });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: "server_error" }), { status: 500, headers: JSON_HEADERS });
  }
}
