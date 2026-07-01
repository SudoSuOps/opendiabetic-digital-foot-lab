# Landing page — implementation notes

Covers `OpenDiabetic Landing.dc.html` (the reworked marketing page). Shared **design tokens**, the **mark** (geometry + variants + clear-space), and the **motion philosophy/easing** live in `README.md` — this doc is the page structure, copy, and its specific motion. Same guardrails apply (calm, no fear/wound imagery, red = status dots only, never diagnoses).

## About the file
A single responsive page. It uses the streaming-template runtime (`<x-dc>`, `support.js`) — **ignore that scaffolding**; port the markup as semantic HTML and the styling as the inline styles / tokens. There is one small logic class (below). No data layer, no routing beyond in-page anchors.

## Fidelity
High-fidelity. Final layout, copy, colors, type, and motion. All colors/spacing are inline; tokens are defined once in a `:root` block. Fonts: **Figtree** (headings weight 800) + **JetBrains Mono** (receipts/eyebrows) — Google substitutes, swap when licensed.

## Global behavior
- **Sticky header** (`position:sticky; top:0`), translucent ink + `backdrop-filter: blur(14px)`. On scroll past 8px it gains a soft shadow and a faint honey-tinted bottom border (JS toggles inline style — purely cosmetic).
- **In-page nav:** anchor links with `scroll-behavior:smooth` → `#hero #loop #how #who #final #footer`.
- **Reduced motion:** a global `@media (prefers-reduced-motion: reduce)` disables all animation/transition and smooth scroll. Preserve it.

## Motion (the "cracked" layer)
All ambient, calm, GPU-friendly. Easing `cubic-bezier(0.2,0.8,0.2,1)`.
1. **Hero glow** — a large honey radial behind the hero *breathes* (opacity .55→1, scale 1→1.07, 7s ease-in-out infinite). Toggleable via the `animateGlow` prop.
2. **Hero mark** — the foot mark gently *bobs* (translateY 0→-7px, 5.5s).
3. **Status dot** — the green kicker dot *pulses* a ring (box-shadow spread, 2.6s).
4. **The Loop** — the dashed flow-ring *rotates* slowly (`od-spin`, 64s linear), and a honey **highlight travels clockwise through the six nodes** one at a time (`od-node`, 7.2s, staggered `animation-delay` 0/1.2/2.4/3.6/4.8/6.0s → border + glow pulse).
5. **Scroll-reveal (progressive enhancement, IMPORTANT):** sections fade/slide up on scroll-in via IntersectionObserver — but the reveal is **only armed after two live `requestAnimationFrame` frames confirm the rAF loop is running.** This means: **content is visible by default**; on any paused/throttled/no-JS context nothing ever gets stuck hidden. When you re-implement, keep this guarantee — never ship a reveal that hides content unless motion is confirmed live, and respect reduced-motion.
6. **Hover:** cards lift (`translateY(-5px)` + shadow + honey border), buttons lift (`translateY(-2px)` + honey shadow), pills lift + honey border.

### Logic class (all it does)
- On mount: wire the header scroll-shadow; arm the rAF-gated scroll-reveal.
- `renderVals()` returns `glowStyle` (the hero glow, animated unless `animateGlow` is false).
- Prop: `animateGlow` (boolean, default true) — the only tweak.

## Sections (top → bottom)
Full-bleed bands **alternating paper (light) and ink (dark)**. Containers max-width 840–1200px, horizontal padding 22px, vertical `clamp(64px,9vw,112px)`.

1. **Nav (ink):** foot mark + "OpenDiabetic" (800) · links The Lab / How it works / For clinicians / Contact · honey pill CTA "Start a foot check" → `#final`. Skip-link precedes it.
2. **Hero (ink + breathing glow):** bobbing foot mark → mono kicker "THE DIGITAL FOOT LAB" w/ pulsing green dot → H1 **"Helping people keep their feet."** ("feet" in honey) → subhead → CTAs "Start with a foot check" (honey) + "See how the Lab works" (ghost) → mono trust row (Private by default · It never diagnoses · Your data stays home).
3. **The Stakes (paper):** eyebrow "Why it matters" → H2 "When you can't feel it, a small thing becomes a **serious** thing." → two sourced sentences (the `[cite]` slots, now **filled**): neuropathy (— NIDDK · NIH) and ulcer→amputation (— Diabetes Care, 2023), each with its source line in mono (the receipt). Followed by a **"High risk is real math"** clinical-burden stat strip (4 white cards, each big honey-deep figure + sourced mono line): *Up to 1 in 2* nerve damage (NIDDK/NIH · Diabetes Care 2023) · *19–34%* lifetime ulcer risk (Diabetes Care 2023) · *~40%* ulcer recurrence in a year (IWGDF 2023 · NEJM 2017) · *5-year survival* comparable to many cancers (Armstrong et al. 2020). Then a **"How a small sore turns serious"** sub-block: the immune mechanism (high blood sugar slows the immune cells that heal a wound — eLife 2022 · Advances in Wound Care 2024, framed as *established mechanism*) + a 4-step escalation ladder — ulcer → infected (~half when first seen) → bone (~4× amputation odds) → gangrene (~11×), odds explicitly labeled odds ratios (IDSA/IWGDF 2023 · PLoS One 2020), closing on "foot infections are the #1 diabetes complication sending people to the hospital."
3b. **The story (ink, embedded video):** kicker "Watch · the one-minute story" → H2 "Why we built the **Lab**." → a small **autoplaying looping bumper** (the mark pulses on a 5s heartbeat with a honey-glow flare — always-visible, reduced-motion safe, the "motion hook") → the manifesto short embedded below as a framed 9:16 `<video controls playsinline>` (click-to-play) with a branded poster (`assets/opendiabetic-short-poster.png`) and honey glow. Source: `assets/opendiabetic-short.mp4`. Playback position persists via localStorage (`od-short-vid-t`).

4. **The Loop (ink) — centerpiece:** the six-node cycle (see Motion #4). Nodes (clockwise from top): 📷 Daily Foot Monitoring · 🤖 AI-Assisted Review · 👨‍⚕️ Clinician in the Loop · 👣 Personalized Offloading · 🖨️ Made-to-Fit Inserts, On Demand · 📈 Continuous Foot Health. Center: foot mark + caption "The photo you take Monday shapes the insert you wear Friday shapes the photo you take next Monday." (The emoji here are functional step iconography; swap for a line-icon set if preferred, keeping the warm tone.)
4b. **The Evidence — prevention (ink, `#0e141b`):** a **\"Every figure adversarially fact-checked\"** chip (green pulsing dot) → H2 \"Catching it early **works**. The evidence says so.\" → 3 glass stat cards (big honey figure + text + sourced mono line with a green dot): *~50%* roughly half as many new ulcers with home temperature checks across five trials, RR 0.51 (Meta-analysis 2022 · IWGDF 2023) · *94%* of studies fewer amputations with multidisciplinary teams (J Vasc Surg 2020) · *Offloading* is the cornerstone of healing (IWGDF 2023). Closes with a mono cost line: ~⅓ of the ~$237B U.S. diabetes spend is tied to foot complications (Armstrong 2020 est. · ADA 2017). Placed right after the Loop to prove the mechanism works. All figures verified — keep each source line attached (it's the receipt); temperature stat framed as "roughly half," certainty moderate-to-low. Below the stats, a **"Do it yourself · Foot temperature check"** panel: the **4°F / 2.2°C** side-to-side asymmetry rule (check matching spots on both feet daily with an IR thermometer), an "if the hotspot repeats" action list (take the pressure off · look closely · take a photo · contact your care team), the escalation cues (redness, swelling, drainage, odor, pain, open area), and a "guide, not a diagnosis" line.

5. **How it works (paper):** H2 "Three places it lives." → 3 cards (green dot + mono step label): At home · In your hands · With your care team.
6. **Trust (ink):** H2 "A change caught early is a **foot kept**. Every step, receipted." → support line with the key phrase in **JetBrains Mono** → four pills (Private by default · Your data stays home · A real clinician confirms · It never diagnoses — last one blue dot).
7. **Who it's for (paper):** intro lead "**Type 1 or Type 2** — if you live with diabetes, your feet carry the risk." (inclusive framing — never Type-2-only or "older person"; first card reads "Type 1 or Type 2, newly diagnosed or decades in…"; a second lead line notes Type 1 is autoimmune, Type 2 is insulin resistance, both damage feet, and after an ulcer Type 1 is **not spared** — Diabetes Care 2022) → 3 cards: People living with diabetes · Caregivers · The clinic.
8. **Final CTA (honey band):** foot mark → H2 "Keep your feet. / Start today." → subline → dark button "Start a foot check" → `mailto:build@opendiabetic.com`.
9. **Footer (ink):** mark + wordmark; blurb ("We never diagnose or replace your doctor."); `🐝 Part of the Swarm & Bee family` (text only). Contact col (X @opendiabetics, build@opendiabetic.com, 561.532.7120, Jupiter FL, GitHub SudoSuOps) + Ecosystem col. Bottom bar: "© 2026 OpenDiabetic. Educational monitoring — not a medical device. It never diagnoses."

## SEO / head (reproduce in target app)
`<title>` "OpenDiabetic — helping people keep their feet" (≤60) · meta description (≤155) · Open Graph · Twitter card (`twitter:site @opendiabetics`) · **Organization JSON-LD** with the identity block (email build@opendiabetic.com, tel +1-561-532-7120, Jupiter/FL/US) and `sameAs` to x.com/opendiabetics, github.com/SudoSuOps, swarmandbee.com.

## Accessibility
Semantic landmarks (`header/nav`, `main`, `section[aria-labelledby]`, `footer`), single H1, skip-link, `:focus` visible, emoji `role="img"`/`aria-label`, decorative SVG `aria-hidden`, high contrast on both surfaces, tap targets ≥44px, reduced-motion honored.
