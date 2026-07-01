# 🦶 OpenDiabetic — The Digital Foot Lab

**Helping people keep their feet.**

A static, dependency-free landing page for OpenDiabetic — the digital foot lab dedicated to
preventing diabetic foot complications through daily monitoring, personalized offloading,
rapid manufacturing, and clinician-guided care.

## What's here
- `index.html` — the landing page. Single file, no build step, no runtime dependencies.
  Fonts (Figtree + JetBrains Mono) load from Google Fonts; everything else is inline.
- `robots.txt`, `sitemap.xml`, `llms.txt` — SEO/GEO (AI crawlers welcome).

## Deploy
Static hosting — point Cloudflare Pages (or any static host) at the repo root, no build command,
output directory `/`. Or open `index.html` directly.

## Before publishing
- Replace the two `[cite]` markers in "Why it matters" with real, sourced statistics.
- Confirm the canonical domain (currently `opendiabetic.com`) in `index.html`, `sitemap.xml`, `robots.txt`.
- Wire "Start a foot check" to the real intake flow (currently a mailto to build@opendiabetic.com).
- `Figtree` is a Google-Fonts substitute for the intended humanist sans — swap when a face is licensed.

## Brand
One design, one house. Foot mark 🦶 is OpenDiabetic's product logo; 🐝 is the Swarm & Bee family
signature. Palette: honey `#F2B441` / paper `#FBF7EF` / cocoa `#2B2118` / ink `#0B0F14`.
It never diagnoses — it helps you and your care team. Every step, receipted.

🐝 Part of the Swarm & Bee family.
