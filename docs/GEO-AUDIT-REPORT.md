# GEO / SEO Audit — opendiabetic.com

*The Digital Foot Lab · audited 2026-07-01 · GEO-first (optimized for AI search: ChatGPT, Claude, Perplexity, Gemini, Google AI Overviews).*

## Composite GEO Score: **65 → 74 / 100** (after this pass)

| Dimension | Weight | Before | After | Notes |
|---|---|---|---|---|
| AI Citability & Visibility | 25% | 80 | **90** | Sourced facts + clean headings were already strong; added FAQ schema, sourced llms.txt, explicit AI-bot allows |
| Brand Authority (off-page) | 20% | 30 | 30 | New site — no external mentions yet. **This is the ceiling; earned over time (see below).** |
| Content Quality & E-E-A-T | 20% | 65 | **70** | Every claim sourced = strong expertise signal; MedicalWebPage added. Founder story + clinician review still missing |
| Technical Foundations | 15% | 92 | **94** | Static, fast, Cloudflare, canonical, sitemap, robots, mobile, SSL, semantic HTML |
| Structured Data | 10% | 55 | **90** | Was Organization-only → now @graph: Organization + WebSite + MedicalWebPage + FAQPage |
| Platform Optimization | 10% | 70 | **82** | FAQ answers, og:image, named AI crawlers |

## What's genuinely strong (keep it)
- **Every clinical claim carries a source** (NIDDK, Diabetes Care, IWGDF, eLife, IDSA, PLoS, J Vasc Surg). This is the single biggest GEO asset — AI engines cite sourced, verifiable stats far more than unsourced copy.
- Clean H1→H2→H3 structure = easy passage extraction for AI answers.
- Fast static site on Cloudflare, valid canonical, sitemap, `llms.txt`, `robots.txt` welcoming crawlers.
- Honest "never diagnoses" framing — correct E-E-A-T posture for YMYL/medical content.

## ✅ Fixed in this pass (shipped)
1. **Structured data upgraded** — `@graph` with Organization + WebSite + **MedicalWebPage** (about "Diabetic foot ulcer", Patient audience) + **FAQPage** (5 Q&As with sourced answers → eligible for AI Overviews & rich results).
2. **Social/AI card image** — added `og:image` + `twitter:image` + `og:url` (the summary_large_image card now renders).
3. **robots.txt** — explicitly names 12 AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, OAI-SearchBot, Applebot-Extended, etc.) as allowed.
4. **llms.txt** — now carries the **sourced key facts + a provenance note** (AI models reading it ingest citable, attributed stats directly).

## ⚠️ Recommended next (needs your sign-off — content/design/off-page)
- **P1 · Founder E-E-A-T section** — the biggest content lever. A short, honest "why we built this" (Donovan lived it: Type-1 autoimmune, lost toes; his father built the best footcare for people who needed it). Add a `Person`/`founder` to the Organization schema. Lived experience is exactly the expertise signal AI + Google weight for medical content.
- **P1 · Dedicated OG image** — a proper 1200×630 honey/ink card (mark + "Helping people keep their feet"). Currently reusing the 9:16 video poster as interim (wrong aspect → crops). Claude Design can produce the right one.
- **P2 · Visible FAQ section** — mirror the FAQ schema in visible page content (best practice; strengthens the rich-result eligibility and gives AI clean Q&A passages).
- **P2 · Hyperlink the citations** — link each on-page stat to its primary source (from `docs/FACTS.md`). Verifiable outbound citations boost E-E-A-T and citability.
- **P3 · Brand Authority (the score ceiling, off-page, time-based)** — this is 20% of the score and sits at 30 because the site is new. Earned, not coded: mentions on Reddit/YouTube/LinkedIn, a Wikipedia/entity presence, press, and being referenced by other diabetic-foot resources. AI engines correlate brand *mentions* ~3× stronger than backlinks. This grows with the [[pollinate]] outreach book and real usage.

## Bottom line
The page is **already highly citable** because it's sourced and honest — the rarest thing on the AI-search web. The code-level ceiling is ~74; the remaining points are the founder story (content) and brand mentions (off-page, over time), not technical gaps. Ship the founder section and a real OG image and this clears 80.
