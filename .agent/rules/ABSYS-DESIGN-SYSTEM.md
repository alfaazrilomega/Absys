# ABSYS Design System — Complete Skill Reference
> **Purpose:** Master reference for any AI or developer building new pages, components, or features for the ABSYS Agritek website.
> **Source:** Extracted from `d:\ABSYS\index.html` (3901 lines) + `hero-background.css` (128 lines).
> **READ THIS FIRST** before touching any `.html` file in this project.

---

## 1. Tech Stack & Libraries

| Layer          | Technology / Source                                                   |
|---------------|-----------------------------------------------------------------------|
| **Language**   | Vanilla HTML5 + Vanilla CSS (inline `<style>`) + Vanilla JS (inline `<script>`) |
| **Fonts**      | Google Fonts — `DM Sans` (UI/body) + `EB Garamond` (editorial serif)  |
| **Smooth Scroll** | [Lenis v1.1.9](https://unpkg.com/lenis@1.1.9/dist/lenis.min.js) via `<script>` CDN |
| **Animation**  | [GSAP v3.12.2](https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js) + `ScrollTrigger` plugin |
| **External CSS** | `public/assets/css/hero-background.css` (hero gradient + wavy mesh) |
| **No frameworks** | No React, No Tailwind, No Webpack — pure progressive vanilla site |

---

## 2. Global Design Tokens (CSS Custom Properties)

These variables are set in `:root` and MUST be used instead of hardcoded values:

```css
:root {
    --bg-base: #fcfcfc;          /* Page background — off-white */
    --text-primary: #111111;     /* Main dark text */
    --accent-secondary: #3B67F5; /* Brand blue — CTAs, checks, badges */

    /* Field Trials Section */
    --ft-beige: #f4f4f0;
    --ft-olive: #35481e;
    --ft-olive-mid: #4e6528;
    --ft-card-bg: #f4f4f0;
    --ft-text-sm: #4d6130;
}
```

**Section Background Colors:**
| Section | Color |
|---|---|
| Hero | Gradient `#FFFFFF` → `#B892FF` (via `hero-background.css`) |
| About / Pricing / Quote | `#fcfcfc` (--bg-base) |
| Values | `#f4f4f0` / `#eeede9` alternating panels |
| Field Trials left | `#f4f4f0` (--ft-beige) |
| Careers | `#eeede9` |
| Contact / Footer | `#eeede9` |

---

## 3. Typography System

### Font Families
```css
/* Base body (all pages) */
font-family: 'Helvetica Neue', 'Inter', sans-serif; /* <body> fallback */

/* UI text (nav, buttons, footer, contact) */
font-family: 'DM Sans', sans-serif;

/* Editorial / Serif (headlines in Field Trials, Careers, Footer CTA) */
font-family: 'EB Garamond', Georgia, serif;

/* Monospace (price numbers, subtitle alternative) */
font-family: 'Courier New', monospace;
```

### Type Scale
| Role | Size | Weight | Tracking | Font |
|---|---|---|---|---|
| Hero H1 | `clamp(2.5rem, 6vw, 6rem)` | 500 | `-0.02em` | EB Garamond |
| Hero H2 sub | `clamp(1.5rem, 3vw, 3rem)` | 400 | default | DM Sans |
| Section heading | `clamp(2rem, 4vw, 3.5rem)` | 700 | `-0.03em` | DM Sans |
| Editorial serif | `clamp(36px, 4.2vw, 58px)` | 500 | `-0.01em` | EB Garamond |
| Body text | `0.95rem–1.1rem` | 400–500 | `0.05em` | DM Sans |
| Nav labels | `0.75rem` | 500 | `0.12em` (uppercase) | DM Sans |
| Badge / pill | `0.72rem–0.8rem` | 600–700 | `0.06em–0.15em` | DM Sans |
| Price number | `3.8rem` | 700 | `-0.03em` | Courier New |

---

## 4. Navbar — OROYA Dual-Header Trick

The site uses **two** stacked `<header>` elements for the blend-mode navigation effect:

```html
<!-- Header 1: Left links + Logo (visible) -->
<header class="site-header theme-light" id="site-header">
  <nav class="nav-group left">...</nav>
  <div class="logo">...</div>
  <nav class="nav-group right" style="opacity:0; pointer-events:none;">...</nav> <!-- Layout spacer only -->
</header>

<!-- Header 2: Right links only with mix-blend-mode:difference (invisible background) -->
<header class="site-header site-header-blend theme-light" id="site-header-blend" aria-hidden="true">
  <nav class="nav-group left" style="opacity:0; visibility:hidden;">...</nav>
  <div class="logo" style="opacity:0; visibility:hidden;">...</div>
  <nav class="nav-group right" style="pointer-events:auto;">...</nav>
</header>
```

**Navbar Scroll States:**
- `theme-light` = transparent BG, black text, black underlines
- `.is-scrolled` = `background: linear-gradient(180deg, rgba(0,0,0,0.54) 0% …)` + `backdrop-filter: blur(18px)`, white text
- JS triggers at `SCROLL_THRESHOLD = 60px`

**Navbar Grid Layout:**
```css
.site-header {
    display: grid;
    grid-template-columns: 1fr auto 1fr; /* left | center-logo | right */
}
```

---

## 5. Hero Section

### Structure
```html
<section class="hero-section">
    <!-- Layer 1: Pure CSS gradient + wavy mesh background (z-index:1) -->
    <div class="hero-background">
        <div class="gradient-base"></div>     <!-- white→lavender gradient -->
        <div class="wavy-mesh-overlay"></div> <!-- SVG wavy lines pattern -->
    </div>

    <!-- Layer 2: Right-side product image (z-index:2, absolute bottom-right) -->
    <div class="hero-image-right gsap-fade-up">
        <img src="public/assets/img/hero-AI-things-Photoroom.png">
    </div>

    <!-- Layer 3: UI text content (z-index:10) -->
    <div class="hero-ui-layer hero-content-wrapper">
        <div class="discover-wrap hero-headline">
            <div class="dm-text-container">
                <h1 class="dm-heading js-text-anim-blur">Headline</h1>
                <p class="dm-subtitle js-text-anim-slide">Subtitle text</p>
            </div>
            <div class="dm-btn-wrapper" id="antigravity-btn">
                <div class="dm-btn-stripes"></div>
                <a href="#" class="dm-btn">...</a>
            </div>
        </div>
    </div>

    <!-- Layer 4 (::after pseudo): Bottom gradient fade (z-index:5) -->
</section>
```

### Hero Background CSS (from `hero-background.css`)
```css
/* Gradient: White left → Purple-Lavender right */
.gradient-base {
    background: linear-gradient(90deg, #FFFFFF 0%, #B892FF 100%);
}

/* Bottom fade mask (::after on .hero-section) */
/* Blends purple atmospheric tint → white of next section */
background: linear-gradient(to bottom,
    rgba(255,255,255,0) 0%,
    rgba(208,161,255,0.15) 30%,
    rgba(255,255,255,0.8) 75%,
    #ffffff 100%);
```

### Hero Text Animations (JS)
- `.js-text-anim-blur` → characters split + blur-in (`filter: blur(12px)→0px`, stagger 0.03s)
- `.js-text-anim-slide` → words split + slide-up (`y:20→0`, stagger 0.05s)
- `#antigravity-btn` → floating animation (`gsap.to y:"-8px"`, yoyo, repeat:-1)

---

## 6. About Projects Section (Nivaro Style)

**Layout:** Flex, sticky left (65%) + scrolling right cards (30%)

```css
.about-projects-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 1400px;
}
.about-projects-left {
    flex: 0 0 65%;
    position: sticky;
    top: 120px;
}
.about-projects-right {
    flex: 0 0 30%;
    display: flex;
    flex-direction: column;
    gap: 24px;
}
```

**Cards:** Square image + title/tag below. Hover: `scale(1.05)` on image. Corner radius `8px`.

---

## 7. Pricing Section — Bento Grid

**Grid:** `8-column`, 2 rows. Cards span different column widths:
- `featured` → span 5 (blue tint: `#f4f6ff`)
- `starter` → span 3
- `teams` → span 4
- `enterprise` → span 4

**Toggle JS:** Monthly/Yearly number counter with `requestAnimationFrame` + EaseOutQuart easing.

**Accent color for checks/buttons:** `var(--accent-secondary)` = `#3B67F5`

---

## 8. Theme Light Wrapper Pattern

A `<div class="theme-light-wrapper">` wraps sections that need forced light styling:

```css
.theme-light-wrapper {
    background-color: transparent;
    color: #111111;
    z-index: 20;
}
/* Enforces dark text on all children */
.theme-light-wrapper h1, h2, h3, p, span { color: #111111; }
```

Sections inside: `media-editorial`, `quote-section`, `faq-section`, `#values-combined`, `field-section`.

---

## 9. Media Editorial Section (Glass Card + Parallax)

```html
<section class="media-editorial">
    <div class="editorial-image-window">
        <div class="editorial-bg"></div>         <!-- bg-image, parallax via GSAP -->
        <div class="editorial-glass-card">        <!-- glassmorphism overlay -->
            <span class="editorial-badge">Badge text</span>
            <h2 class="editorial-text">Headline</h2>
        </div>
    </div>
</section>
```

**Glass Card:**
```css
.editorial-glass-card {
    background: rgba(255,255,255,0.75);
    backdrop-filter: blur(24px) saturate(1.8);
    border: 1px solid rgba(255,255,255,0.6);
    border-radius: 20px;
    padding: 48px;
    box-shadow: 0 30px 60px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.03);
    /* Positioned: breaks outside image window bottom-left */
    margin: 0 0 -40px -40px;
}
```

**Image Parallax:** `gsap.to(".editorial-bg", { yPercent: 30, scrub: true })` — scrubbed by scroll.

---

## 10. Quote Section — Opacity Scrub

```html
<section class="quote-section">
    <blockquote>
        <span class="quote-line">Line one text</span>
        <span class="quote-line">Line two text</span>
    </blockquote>
</section>
```

Each `.quote-line` starts at `opacity: 0.2` and scrubs to `opacity: 1` as it enters viewport.

```css
.quote-section blockquote {
    font-size: 4.5vw;
    font-weight: 400;
    line-height: 1.2;
    letter-spacing: -0.02em;
}
```

---

## 11. FAQ — Sticky Left + GSAP Accordion Right

**Layout:** `display: flex; justify-content: space-between`
- Left sticky panel: `45% width`, `position: sticky; top: 100px`
- Right accordion: `50% width`

**Accordion Logic (JS):**
```js
const tween = gsap.to(answer, { height: "auto", opacity: 1, duration:0.5, ease:"power3.inOut", paused: true });
question.addEventListener('click', () => { tween.play() or tween.reverse() });
```

FAQ item border: `1px solid #cccccc`. Active icon rotates 45°.

---

## 12. Values Section — Split Word + Horizontal Scroll (GSAP Pinnned)

**Concept:** One `100vh` section pinned. 4 panels in a horizontal `flex` track. Scroll scrubs a GSAP timeline.

**Per-panel animation:**
1. `word-top` flies to `yPercent: -100` (clips top half away)
2. `word-bottom` flies to `yPercent: 100` (clips bottom half away)
3. `.values-desc` fades in through the gap between halves
4. Track slides left `100vw` to next panel

```css
.word-wrapper { font-size: clamp(4rem, 15vw, 15rem); font-weight: 900; text-transform: uppercase; }
.word-top { clip-path: inset(0 0 50% 0); }
.word-bottom { clip-path: inset(50% 0 0 0); }
.values-desc { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
```

---

## 13. Field Trials Section — Plateau Overlap

**Visual trick:** `margin-top: -80px` slides Field Trials UP over the Values section. Border-radius on left/right panels creates the "plateau curve" shoulders.

```css
.field-section {
    display: grid;
    grid-template-columns: 50% 50%;
    margin-top: -80px;
    z-index: 20; /* Above Careers z-index:5 */
}
.ft-left-panel {
    background: var(--ft-beige);
    border-top-left-radius: clamp(40px, 6vw, 100px);
    border-bottom-left-radius: clamp(40px, 6vw, 100px);
}
.ft-right-panel {
    border-top-right-radius: clamp(40px, 6vw, 100px);
    border-bottom-right-radius: clamp(40px, 6vw, 100px);
}
```

**Typography:** `ft-headline` uses `EB Garamond` at `clamp(36px, 4.2vw, 58px)` in `--ft-olive` color.
**Right image:** Has parallax `gsap.to yPercent: -12, scrub: 1.6`.

---

## 14. Careers Section — GCV Extreme Tuck Pattern

**Asymmetric 5-column masonry** of photos with opposing parallax directions.

```css
.careers-section {
    margin-top: -20vh;     /* Tucks UNDER the Field Trials section */
    z-index: 5;
    background-color: #eeede9;
}
```

**Photo columns:**
- `.career-parallax-down` → `gsap.to yPercent: 45` (drifts DOWN on scroll)
- `.career-parallax-up` → `gsap.to yPercent: -45` (drifts UP on scroll)

**Center card:** Fixed center, `min-height: 72vh`, `background: #f5f4f0`, `border-radius: 20px`.

---

## 15. Contact Section + Footer

### Contact Layout
```css
.contact-section {
    margin-top: -15vh;     /* Inverted plateau mask */
    border-top-left-radius: clamp(60px, 6vw, 100px);
    border-top-right-radius: clamp(60px, 6vw, 100px);
    background-color: #eeede9;
    z-index: 30;
}
.contact-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(40px, 6vw, 80px);
}
```

**Left:** Body editorial paragraph in DM Sans  
**Right:** Heading + CTA Button (pill shape, `background: #111111`, hover to dark olive `#2d4a1e`)

### Footer Grid
```css
.ft-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr 1.2fr;
    gap: clamp(2rem, 5vw, 5rem);
}
```

**Columns:** (1) Logo + contact info + CTA | (2) Quick links list | (3) Newsletter email form + social links

---

## 16. Interaction Patterns

### Hover Conventions
| Element | Hover Effect |
|---|---|
| Gallery images | `scale(1.1→1.0)`, `grayscale(80%→0%)` |
| Gallery caption | `max-height: 0→150px`, `translateY(-20→0)` |
| Career card images | `scale(1.06)`, `brightness(0.88→1)`, `saturate(0.9→1.1)` |
| Pricing cards | `translateY(-2px)`, border darkens |
| Nav links | Underline `scaleX(0→1)`, origin switches right→left |
| CTA buttons | bg-color fill or borderless → filled |

### Animation Classes (GSAP)
| Class | Effect |
|---|---|
| `.js-text-anim-blur` | Per-character blur-in (h1 headlines) |
| `.js-text-anim-slide` | Per-word slide-up (subtitles) |
| `.gsap-fade-up` | Standard `opacity:0, y:40` → reveal on scroll |
| `.career-parallax-down` | Scroll-driven `yPercent: 45` |
| `.career-parallax-up` | Scroll-driven `yPercent: -45` |

---

## 17. Spacing & Component Conventions

### Border Radius Vocabulary
```css
/* Card/Bento */
border-radius: 16px; /* bento-card */
border-radius: 20px; /* careers-center-card, editorial-glass-card, bento-card container */
/* Pill Buttons */
border-radius: 50px;
/* Gradient CTA Button */
border-radius: 99px; /* dm-btn */
/* Plateau Section Curves */
border-radius: clamp(40px, 6vw, 100px); /* Field Trials panels */
border-radius: clamp(60px, 6vw, 100px); /* Contact section top */
```

### Button Patterns
1. **Pill outline** → `border: 1px solid var(--text-primary); border-radius: 50px; padding: 1rem 2.5rem;`
2. **Pill filled dark** → `background: #111111; color: #eeede9; border-radius: 50px;`
3. **Gradient pill (Hero CTA)** → `background: linear-gradient(90deg, #9b27b0 0%, #3f51b5 100%); border-radius: 99px;`
4. **Ghost outline** → `background: transparent; border: 1.5px solid rgba(10,10,10,0.25); border-radius: 50px;`

### Standard Section Padding
```css
padding: clamp(4rem, 10vh, 10rem) clamp(1rem, 5vw, 5rem);
```

---

## 18. Lenis + GSAP Initialization Pattern

Every page MUST follow this exact initialization order:

```js
document.addEventListener("DOMContentLoaded", () => {
    // 1. Init Lenis
    const lenis = new Lenis({ autoRaf: true, smoothWheel: true });

    // 2. Sync GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0, 0);

    // 3. Freeze scroll during preloader
    document.body.style.overflow = "hidden";
    lenis.stop();

    // 4. initExperience() — called after preloader exit
    const initExperience = () => {
        // Fade preloader out (opacity 0 + blur), then display: none
        // Unfreeze: document.body.style.overflow = ''; lenis.start();
        // Fire hero GSAP intro tweens here
    };

    // 5. Scroll event for navbar state
    lenis.on('scroll', ({ scroll }) => {
        siteHeader.classList.toggle('is-scrolled', scroll > 60);
    });
});
```

---

## 19. Logo Assets

| Asset | Path | Usage |
|---|---|---|
| Icon SVG | `public/assets/img/Asset 2.svg` | All states — SVG scales perfectly |
| Dark wordmark | `public/assets/img/Asset 3@2x.webp` | `logo-default` (on dark/hero) |
| Light wordmark | `public/assets/img/Asset 1@2x.webp` | `logo-light-theme` (on white sections) |

Logo height: icon `24px`, wordmark `16px`. Gap between them: `0.75rem`.

---

## 20. Responsive Breakpoints

| Breakpoint | Key Changes |
|---|---|
| `max-width: 1024px` | Hero: stacks vertically. Gallery: single column. Bento: 2-col. |
| `max-width: 768px` | Editorial card: reduced margin/padding. FAQ: stack. Field: 1-col grid. |
| `max-width: 640px` | Careers: center card hidden. Sides take 50% each. |
| `max-width: 600px` | Bento: single column. |
| `max-width: 480px` | Hero image: `80%` width, slight opacity reduction. |

---

## 21. Z-Index Layers (Page Stacking)

| Layer | z-index | Element |
|---|---|---|
| Base content | 1 | `.gsap-spline-wrapper`, hero background |
| Hero product image | 2 | `.hero-image-right` |
| Hero gradient mask | 5 | `.hero-section::after` |
| Hero UI text | 10 | `.hero-ui-layer` |
| Gallery, Pricing, About | 10 | Sections |
| Light theme wrapper | 20 | `.theme-light-wrapper` |
| Field Trials | 20 | `.field-section` |
| Careers | 5 | `.careers-section` |
| Contact / Footer mask | 30 | `.contact-section` |
| Blend navbar | 101 | `#site-header-blend` |
| Main navbar | 100 | `#site-header` |
| Preloader | 9999 | `#spline-preloader` |

---

## 22. Rules When Adding New Pages/Sections

1. **Always import both Google Fonts** (DM Sans + EB Garamond) via `<link>` in `<head>`.
2. **Always load Lenis CSS + JS** and initialize with the standard pattern (Section 18).
3. **Always load GSAP + ScrollTrigger** from CDN before your `<script>`.
4. **Never hardcode color values.** Use `var(--bg-base)`, `var(--text-primary)`, `var(--accent-secondary)`.
5. **Use `clamp()` for responsive font sizes** — see scale in Section 3.
6. **Plateau transitions** between sections use `margin-top: negative` + `border-radius: clamp()`.
7. **Glass cards** use: `background: rgba(255,255,255,0.75); backdrop-filter: blur(24px) saturate(1.8); border: 1px solid rgba(255,255,255,0.6)`.
8. **Preloader** must be the first element in `<body>` with `id="spline-preloader"`.
9. **Never animate `width`, `height`, `top`, or `margin`.** Only `transform` and `opacity` for GSAP tweens.
10. **New sections should establish their own `z-index`** in the stacking order (Section 21).

---

## 23. Sections Inventory (Hero → Footer)

| # | Section | HTML Tag | Key Class | Background |
|---|---|---|---|---|
| 0 | Preloader | `div` | `#spline-preloader` | `var(--bg-base)` |
| 1 | Navbar (dual) | `header × 2` | `.site-header` | Transparent → dark |
| 2 | **Hero** | `section` | `.hero-section` | White → Lavender gradient |
| 3 | About Projects | `section` | `.about-projects-section` | `var(--bg-base)` |
| 4 | Pricing (Bento) | `section` | `.pricing-section` | `#fcfcfc` |
| 5 | Media Editorial | `section` | `.media-editorial` | `#fcfcfc` + image |
| 6 | Quote | `section` | `.quote-section` | `#fcfcfc` |
| 7 | FAQ | `section` | `.faq-section` | `#fcfcfc` |
| 8 | Values (Pinned) | `section` | `#values-combined` | `#f4f4f0` |
| 9 | Field Trials | `section` | `.field-section` | `#f4f4f0`/image |
| 10 | Careers | `section` | `.careers-section` | `#eeede9` |
| 11 | Contact | `section` | `.contact-section` | `#eeede9` |
| 12 | Footer | inside contact | `.ft-wrap` | `#fcfcfc` |
