# Handoff: OpenDiabetic — Brand Kit, Landing Page & Motion

## Overview
The complete OpenDiabetic package for **The Digital Foot Lab** (a sub-brand: *"Part of the Swarm & Bee family"*). Three deliverables, one identity (honey + paper + ink, calm and warm):
1. **Marketing landing page** — `OpenDiabetic Landing.dc.html`. Full build notes in **`LANDING_PAGE.md`**.
2. **Brand asset kit** — logo system + export-ready social/media templates for **X (Twitter)**, **YouTube**, and **Facebook**, a **profile avatar**, an **email/newsletter header**, and **square + vertical post templates**. Notes below.
3. **Motion** — **animated video pieces** (16:9 & 9:16 intro/outro stings + an animated lower-third), directly exportable. See the Motion section.

Start with `LANDING_PAGE.md` for the page, then this file for the mark, tokens, artboards, and motion (all shared).

## About the design files
- `OpenDiabetic Brand Kit.dc.html` — a **pan/zoom canvas of design references created in HTML**. Every artboard is a real, fixed-pixel element so it can be exported at its exact size. It uses a small proprietary streaming-template runtime (`<x-dc>`, `support.js`); **ignore that scaffolding** when porting.
- `assets/opendiabetic-mark.svg` — the **production foot mark** as a clean standalone SVG (`fill="currentColor"`, so it recolors via CSS `color`). This is the real deliverable — use it directly; don't trace the raster.
- `OpenDiabetic Landing.dc.html` — the marketing landing page (same brand), included as visual reference for how the system reads in context.

These are **design references**, not production code. The task is to produce real, exportable asset files (SVG/PNG/MP4) and, where relevant, reusable templates in the target toolchain (design tool, After Effects/Lottie, or a codegen pipeline) — matching these specs exactly.

## Fidelity
**High-fidelity (hifi).** Final mark, colors, type, spacing, copy, and motion. Reproduce exactly; values below are authoritative. Fonts are Google substitutes (Figtree + JetBrains Mono) — swap for licensed faces if the brand has them, keeping a warm humanist sans + a mono.

---

## The mark
A warm, simple **footprint**: one rounded sole (with a subtle medial arch) + five graduated toe dots. Single color, no gradients, no outline.
- **Geometry:** `viewBox="0 0 120 150"`, aspect ≈ **0.8 : 1** (w:h). Exact path + ellipses are in `assets/opendiabetic-mark.svg` — reproduced here:
  ```
  <path d="M42,58 C38,44 40,34 52,32 C66,30 82,36 84,54 C86,68 80,80 74,92 C69,102 71,112 68,124 C65,138 54,142 45,138 C36,134 33,124 35,112 C37,102 44,96 44,86 C44,76 46,70 42,58 Z"/>
  <ellipse cx="46" cy="22" rx="9" ry="11"/> <ellipse cx="62" cy="16" rx="7.5" ry="9.5"/>
  <ellipse cx="75" cy="19" rx="6.5" ry="8"/> <ellipse cx="86" cy="26" rx="5.5" ry="7"/>
  <ellipse cx="95" cy="35" rx="5" ry="6"/>
  ```
- **Fills by surface:** on **ink** → `--honey #F2B441`; on **paper** → `--honey-deep #D99A2B` (better contrast on light); knockout → `--paper #FBF7EF` on ink, or `--cocoa #2B2118`. The mark is always a single flat color.
- **Lockups:** (1) horizontal — mark left of "OpenDiabetic" (weight 800), tagline "The Digital Foot Lab" under the wordmark in mono, uppercase, letter-spacing ~0.22em; (2) stacked/centered — mark above wordmark + tagline; (3) inline — mark + wordmark only; (4) mark only. Mark height ≈ 1.25× the wordmark cap height in the horizontal lockup.
- **Clear space:** minimum padding on all sides = **½ the mark's height**. Nothing intrudes.
- **Minimum sizes (screen):** full lockup **120px** wide · mark alone **24px** (favicon/app) · rounded tile **44px** (tap target). Below the lockup minimum, use the mark alone.
- **App/avatar tile:** mark centered in a rounded square, `border-radius ≈ 0.23 × side` (e.g. 28px on a 120px tile, ~40px on 180px), `--ink-900` background, honey mark.

---

## Artboards (exact pixel sizes)
Grouped as they appear on the canvas. Each is a full-bleed composition; the outer element is the true export size.

### 01 · Logo system
- **Primary lockups — 1200×760 (paper):** four lockups (horizontal, stacked, inline, mark-only) on a 2×2 grid.
- **Color & mono variants — 1200×620:** wordmark lockup on ink (honey mark + light text), on honey (cocoa), on paper (honey-deep mark); mark knockouts on ink and cocoa; the rounded app/avatar tile.
- **Clear space & minimum size — 1200×520 (paper):** the ½-mark-height clear-space rule (dashed guide) + the three minimum sizes.

### 02 · Profiles & headers
- **Avatar master — 800×800, circle-safe:** honey mark centered on ink with a honey radial glow; a dashed circle shows the crop-safe area. Downscale to **X 400×400**, **YouTube 800×800**, **Facebook 720×720** — same art.
- **X / Twitter header — 1500×500:** left-aligned lockup + H "Helping people keep their **feet**." + tagline; honey glow bleeding from the right. (Note X overlays the avatar bottom-left and clips edges on mobile — keep text centered-left, clear of the lower-left ~400px.)
- **Facebook page cover — 1640×624 (displays 820×312):** paper background, headline left, mark in a honey-less ink circle at right.
- **YouTube channel art — 2560×1440:** centered lockup + tagline strapline. **All text/logo stays inside the center TV-safe area 1546×423** (dashed guide on the board). Outer area is safe to bleed (crops per device).

### 03 · Content templates
- **YouTube thumbnail — 1280×720 (ink):** mono kicker "Foot check · 60 sec", huge headline "Can't feel your feet?", supporting line, large honey mark bottom-right + glow. Keep text out of the bottom-right ~10% (duration stamp).
- **Square post — 1080×1080 (paper):** brand lockup top-left; centered tip "Look between your **toes** today." + body; footer status-dot line "A minute a day. Never a diagnosis."
- **Vertical post / story — 1080×1920 (ink):** lockup top; The-Loop teaser "The photo you take **Monday**…"; honey CTA pill bottom. Keep key content within the central 1080×1420 (platform UI overlaps top/bottom ~250px).
- **Email / newsletter header — 1200×400 (ink, displays ~600 @2x):** tile + wordmark + tagline, left-aligned; export as PNG for email clients (no live fonts/SVG in email).

### 04 · Motion (see Interactions)
- **Intro sting — 1920×1080 (16:9)** · **Intro/outro sting — 1080×1920 (9:16)** · **Animated lower-third** on a 1920×1080 sample frame.

### 05 · Brand core
- **Color & type spec — 1200×720 (paper):** the full palette with hex + the two typefaces with weights.

---

## Interactions & behavior (motion specs)
All motion is **calm** — no bounce, no spring. Easing `cubic-bezier(0.2, 0.8, 0.2, 1)` (ease-out) for entrances; linear/ease-in-out for glow. Reproduce in AE/Lottie or CSS. In the HTML they loop for preview; **screen-record or re-key in a video tool to export**.

**Intro/outro sting (both ratios), ~5s loop:**
1. **Glow** (honey radial behind): continuous breathe — opacity `.45→.9→.45`, scale `1→1.08→1`, 5s ease-in-out.
2. **Mark:** 0→12% scale `.55→1` + fade in; hold; 90–100% fade out + scale to `1.06`.
3. **Wordmark** ("OpenDiabetic" / "Keep your feet."): 10→24% rise `+20px→0` + fade in (starts after the mark); hold; out at 90%.
4. **Tagline** (mono): 26→42% fade in; hold; out at 90%.
   Sequence order: glow (always) → mark → wordmark → tagline. Same timing at 16:9 and 9:16.

**Animated lower-third, ~6s loop (overlay for real footage):**
- Accent **bar** (12px honey): `scaleX 0→1` from bottom origin, 3–14%.
- **Panel** (glass: `rgba(11,15,20,0.86)` + blur, `--line` border, radius `0 14px 14px 0`) with honey tile + mark, title "Daily Foot Check" (800), mono sub "Step 1 of 6 · see it every day": slide in from left `-44px→0` + fade (0–9%); hold; slide out + fade (93–100%).
- A **persistent corner bug** (mark + "OpenDiabetic", top-right) stays on screen the whole time — no animation.
- Placement: bottom-left, ~90px inset. Panel content is the fill-in-per-video slot.

**Reduced motion:** everything must respect `prefers-reduced-motion: reduce` — show the final resting frame, no animation. (The HTML already does.)

## Motion — playable & exportable (`motion/`)
The three motion pieces are built on a real timeline engine (`motion/animations.jsx`) and are **directly exportable to video** — no rebuild required. Open any of the three `.dc.html` files in the browser: you get play/pause, a scrubber (drag, ←/→, space, 0-reset), and an **Export** button. Export via the app's **Share → Export → Video** (or the player's download icon) to produce the actual file.

| File | Size | Duration | Notes |
|---|---|---|---|
| `OpenDiabetic Sting 16x9.dc.html` | 1920×1080 | 5s | Intro/outro sting — mark reveal → wordmark → tagline, honey glow breathing. Loops. |
| `OpenDiabetic Sting 9x16.dc.html` | 1080×1920 | 5s | Vertical sting — same beats, headline "Keep your feet." for Reels/TikTok/Shorts. |
| `OpenDiabetic Lower Third.dc.html` | 1920×1080 | 6s | Animated lower-third overlay. **Stage background is transparent** — the on-screen "sample video frame" is preview-only context and is NOT part of the export, so the exported clip is a clean overlay. |
| `OpenDiabetic Short.dc.html` | 1080×1920 | 52s | Manifesto short (9:16): mission → the reactive-past turn → "every day" → what it is → daily how-to → brand close. Calm, typographic; the reactive list is deliberately muted (no fear imagery / no red). Export MP4 (H.264) for Shorts/Reels/TikTok. |

**Formats:** the Export dialog offers the format — pick **MP4 (H.264)** for the stings, and for the lower-third choose a format that **preserves alpha** (WebM/VP9 with alpha, or convert to ProRes 4444 / with an alpha channel) so it composites over footage. GIF is available too for the stings if you need a lightweight loop. If your export path can't hold alpha, key the lower-third against the (solid-color) sample frame instead.
- **Editing the timelines:** each scene lives in a sibling `.jsx` (`StingWide.jsx`, `StingVert.jsx`, `LowerThird.jsx`) — copy, colors, sizes, and keyframe times are plain values there (`interpolate([t…],[v…], Easing.…)`). The motion spec below documents the exact beats.
- **Porting to another tool** (After Effects / Lottie): rebuild the timelines from the spec below; they're deliberately simple (fade/scale/slide, ease-out).

## State management
None — static compositions + timeline-driven animation. No data, no app logic.

---

## Design tokens
```css
--honey:      #F2B441;  /* primary accent; mark on ink; heading spans; CTAs; bars */
--honey-deep: #D99A2B;  /* mark & accents on paper (contrast); CTA hover; gradient end */
--paper:      #FBF7EF;  /* light background; knockout mark on ink */
--cocoa:      #2B2118;  /* text on paper; dark buttons; alt knockout bg */
--ink-900:    #0B0F14;  /* dark background */
--ink-l1:     #0e141b;  /* dark layer 1 */
--ink-l2:     #121922;  /* dark layer 2 (tiles, cards, pills) */
--ink-50:     #E8EEF5;  /* text on ink */
--line:       #1F2A36;  /* borders / hairlines on dark */
--green:      #2FB67A;  /* status dot — good / confirmed */
--blue:       #3D9BE9;  /* status dot — informational */
--red:        #E2524F;  /* status dot ONLY — never for fear / alarm imagery */
```
Honey glow (behind marks on ink): `radial-gradient(circle at 50% 50%, rgba(242,180,65,0.30–0.34), transparent ~62%)`.
Supporting text tints used: `#B7C2CE` / `#8DA0AE` (on ink), `#4A3D30` / `#9a8570` (on paper).

**Typography**
- **Figtree** — warm humanist sans; headings weight **800**, tracking −0.02 to −0.03em. Weights loaded: 400/500/600/700/800/900.
- **JetBrains Mono** — receipts, data, eyebrows, kickers, labels (often uppercase, letter-spacing 0.14–0.26em). Weights 400/500/600.

**Radii:** artboard preview cards 16px · app/email tiles 26–28px · CTA pills/buttons 14px · lower-third panel `0 14px 14px 0`.

## Assets
- `assets/opendiabetic-mark.svg` — the foot mark (currentColor). Recolor via CSS `color`, or set `fill`. This is the single source of truth for the mark across every asset.
- **Fonts:** Figtree + JetBrains Mono via Google Fonts (substitutes — swap when licensed).
- No raster images or icon libraries; the mark is the only graphic. Emoji are **not** used anywhere in this kit (the 🦶/🐝 emoji from earlier drafts are replaced by the real mark; 🐝 "Swarm & Bee family" remains a text line only).
- **Export note:** static frames → PNG/SVG per artboard at its labeled size. Motion pieces → open the files in `motion/` and export directly (Share → Export → Video); see the Motion section for per-file format guidance (MP4 for stings, alpha WebM/ProRes for the lower-third).

## Files
- `LANDING_PAGE.md` — full implementation notes for the marketing landing page.
- `OpenDiabetic Landing.dc.html` — the reworked marketing landing page (real mark + motion). Primary deliverable.
- `OpenDiabetic Brand Kit.dc.html` — all 15 static artboards (design reference).
- `assets/opendiabetic-mark.svg` — production mark (the single source of truth, used across all three deliverables).
- `motion/` — the four exportable video pieces (two stings, a lower-third, and the 52s manifesto short) + `animations.jsx` (timeline engine), the scene `.jsx` files, and `support.js`. Open the `.dc.html` files to play/export.
- `support.js` — runtime for the root `.dc.html` references (keep alongside them).
- `README.md` — this file (mark, tokens, artboards, motion, guardrails).

## Guardrails (apply to every asset — do not break)
Calm & warm · privacy-first · **no fear or wound imagery** · **no panic-red** (red = status dots only) · **never claims to cure, diagnose, or replace a doctor** ("Never a diagnosis" / "It never diagnoses" is the standing line) · footer/credit line: *🐝 Part of the Swarm & Bee family*.
