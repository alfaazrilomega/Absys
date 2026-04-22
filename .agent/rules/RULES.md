---
trigger: always_on
---

# RULES — ABSYS Agritek Project (Landing Page + PHP CI4 Backend)

> **Purpose:** Dokumen ini adalah "Buku Suci" instruksi utama untuk seluruh AI Assistant (GitHub Copilot, Cursor, Claude Code, atau agen lainnya) yang beroperasi di dalam proyek ABSYS.
> **WAJIB dibaca dan dipatuhi sebelum men-generate kode apa pun.**

---

## 1. Core Stack & Architecture

| Layer               | Technology                                                         |
| :------------------ | :----------------------------------------------------------------- |
| **Frontend**        | Vanilla HTML5 + CSS3 + JavaScript (ES6+)                         |
| **Framework**       | None (progressive enhancement)                                    |
| **Backend (Future)**| PHP CodeIgniter 4 (CI4)                                           |
| **Animation**       | GSAP v3.12.2 + ScrollTrigger plugin                               |
| **Smooth Scroll**   | Lenis v1.1.9                                                      |
| **Fonts**           | Google Fonts — `DM Sans` (UI/body) + `EB Garamond` (editorial)   |
| **Icons**           | Lucide (stroked style) or inline SVG                             |
| **Styling**         | CSS Custom Properties + BEM-like naming conventions              |

---

## 2. ABSYS Design System — Master Reference 🚨

**READ `ABSYS-DESIGN-SYSTEM.md` BEFORE ANY CODE GENERATION.**

This file contains the complete specification for:
- Design tokens (colors, typography, spacing)
- Section patterns and layouts (Hero, About, Pricing, Field Trials, etc.)
- Animation conventions and GSAP initialization
- Z-index stacking order
- Responsive breakpoints
- All UI components and recipes

**Key Design Tokens:**
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

---

## 3. Global Coding Directives

### a. HTML Structure & Semantics

- **Always use semantic HTML5 elements:** `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- **Accessibility first:** Always include `alt` attributes, ARIA labels where needed, proper heading hierarchy
- **Progressive enhancement:** Build core functionality without JavaScript, then enhance with JS/CSS animations
- **No frameworks:** Do not use React, Vue, Angular, or any frontend framework. Keep it vanilla.

### b. CSS Organization

- **Use CSS Custom Properties:** Never hardcode colors, spacing, or fonts. Always use `var(--token-name)`.
- **Follow BEM-like naming:** `.block__element--modifier` for class names to ensure scoping and clarity
- **Mobile-first:** Write base styles for mobile, then use `@media (min-width: ...)` for breakpoints
- **Performance:** Use `transform` and `opacity` for animations. Never animate `width`, `height`, `top`, `margin`.

### c. JavaScript Patterns

- **Feature detection:** Check for browser support before using modern APIs
- **Module pattern:** Organize JS into modules or IIFEs to avoid global namespace pollution
- **Event delegation:** Use event delegation for dynamic content where appropriate
- **Strict mode:** Always use `'use strict';` in JavaScript files

---

## 4. Performance & Responsive Guidelines

- **Macro-Layout:** Use **CSS Grid Layout** for complex page structures and dashboards.
- **GPU Acceleration:** Only animate `transform` and `opacity` for GSAP tweens to guarantee 60 FPS.
- **Smooth Scroll:** Always initialize Lenis following the pattern in Section 18 of `ABSYS-DESIGN-SYSTEM.md`.
- **Zero-Latency Navigation (dashboard future):** When building CI4 admin dashboards, consider `Speculation Rules API` and `View Transitions API` for page navigation.
- **Images:** Use responsive images (`srcset`, `sizes`) and modern formats (WebP, AVIF). Lazy load below-the-fold images.

---

## 5. Folder Structure Mapping

```text
/
├── public/                    # Static assets (images, fonts, CSS, JS)
│   ├── assets/
│   │   ├── img/              # Image assets (optimized WebP/JPEG)
│   │   ├── icons/            # SVG icons
│   │   └── css/
│   │       └── hero-background.css  # External CSS (hero gradient)
│   ├── js/
│   │   ├── lenis-init.js     # Lenis initialization
│   │   ├── gsap-init.js      # GSAP + ScrollTrigger setup
│   │   ├── animations.js     # Page-specific GSAP tweens
│   │   └── components/       # Reusable vanilla JS components
│   └── favicon.ico
├── app/                      # (Future) PHP CI4 application
│   ├── Config/
│   ├── Controllers/
│   ├── Models/
│   ├── Views/
│   └── database/
├── templates/                # HTML templates (if using server-side rendering)
├── .agent/rules/             # AI instruction files
│   ├── ABSYS-DESIGN-SYSTEM.md
│   └── RULES.md
└── index.html                # Main landing page entry point
```

---

## 6. PHP CI4 Backend Guidelines (Future Implementation)

When transitioning to PHP CodeIgniter 4:

- **MVC Structure:** Follow CI4 conventions strictly — Controllers in `app/Controllers/`, Models in `app/Models/`, Views in `app/Views/`
- **Routing:** Define routes in `app/Config/Routes.php`. Use RESTful naming conventions.
- **Database:** Use CI4's Query Builder or ActiveRecord patterns. Avoid raw SQL in controllers.
- **Security:** Enable CSRF protection, use XSS filtering, validate all inputs with CI4's form validation.
- **Environment:** Use `.env` file for configuration (database credentials, base URL, encryption keys).
- **Template Integration:** For dynamic pages, consider using lightweight templating (native PHP with minimal logic in views, or integrate a template engine like Twig if needed).

---

## 7. Animation & Interaction Standards

### GSAP + ScrollTrigger (All animations must follow)

```javascript
// Standard GSAP timeline with ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".target-element",
    start: "top 80%",
    end: "bottom 20%",
    scrub: true,           // or false for non-scrubbed
    toggleActions: "play none none reverse"
  }
});

tl.to(".element", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
```

### Lenis Smooth Scroll Initialization (MANDATORY)

```javascript
document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis({ autoRaf: true, smoothWheel: true });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0, 0);

  document.body.style.overflow = "hidden";
  lenis.stop();

  const initExperience = () => {
    document.body.style.overflow = '';
    lenis.start();
    // Hero intro animations here
  };

  setTimeout(initExperience, 2000); // After preloader
});
```

### Animation Classes Reference

| Class | Effect |
|-------|--------|
| `.js-text-anim-blur` | Per-character blur-in (h1 headlines) |
| `.js-text-anim-slide` | Per-word slide-up (subtitles) |
| `.gsap-fade-up` | Standard `opacity:0, y:40` → reveal on scroll |
| `.career-parallax-down` | Scroll-driven `yPercent: 45` |
| `.career-parallax-up` | Scroll-driven `yPercent: -45` |

---

## 8. Component Patterns (Vanilla JS)

### Preloader Pattern

```html
<!-- Preloader must be first element in <body> -->
<div id="spline-preloader">
  <div class="intro-asset-placeholder">
    <!-- Loading asset or logo -->
  </div>
  <div class="loading-text">LOADING</div>
</div>
```

```css
#spline-preloader {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100vh;
  background-color: var(--bg-base);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: opacity 1.2s cubic-bezier(0.85, 0, 0.15, 1), visibility 1.2s;
}
```

### Glass Card Pattern

```css
.glass-card {
  background: rgba(255,255,255,0.75);
  backdrop-filter: blur(24px) saturate(1.8);
  border: 1px solid rgba(255,255,255,0.6);
  border-radius: 20px;
}
```

---

## 9. Responsive Breakpoints (Mobile-First)

| Breakpoint | Key Changes |
|------------|-------------|
| `max-width: 1024px` | Hero: stacks vertically. Gallery: single column. Bento: 2-col. |
| `max-width: 768px` | Editorial card: reduced margin/padding. FAQ: stack. Field: 1-col grid. |
| `max-width: 640px` | Careers: center card hidden. Sides take 50% each. |
| `max-width: 600px` | Bento: single column. |
| `max-width: 480px` | Hero image: `80%` width, slight opacity reduction. |

---

## 10. Prohibited Technologies & Patterns ⚠️

**STRICTLY FORBIDDEN:**
- ❌ React, Vue, Angular, Svelte — Vanilla only for frontend
- ❌ Tailwind CSS, Bootstrap — Use custom CSS with design tokens
- ❌ Framer Motion — Use GSAP only
- ❌ WebGL, 3D Canvas libraries — No Three.js, no Spline (placeholder only for preloader)
- ❌ jQuery — Modern vanilla JS is sufficient
- ❌ Build tools (Webpack, Vite, Turbopack) — Keep it simple, no bundling needed
- ❌ TypeScript — Use plain JavaScript with JSDoc if needed

**Why?** The ABSYS site is a high-performance, progressive vanilla website. These constraints ensure minimal overhead, maximum speed, and clean, auditable code.

---

## 11. File Naming Conventions

- HTML files: `kebab-case.html` (e.g., `index.html`, `field-trials.html`)
- CSS files: `kebab-case.css` (e.g., `hero-background.css`, `component-styles.css`)
- JavaScript files: `kebab-case.js` (e.g., `lenis-init.js`, `gsap-init.js`)
- Image assets: `kebab-case.webp` or `.jpg` (e.g., `hero-ai-things.webp`)
- PHP Classes: `PascalCase.php` (CI4 standard: `HomeController.php`, `UserModel.php`)

---

## 12. Quality Checklist (Before Commit)

- [ ] All design tokens used from `:root` CSS variables — no hardcoded colors
- [ ] Font families match design system (DM Sans, EB Garamond)
- [ ] Animations use `transform` and `opacity` only
- [ ] Lenis initialized correctly per Section 18 of design system
- [ ] GSAP ScrollTrigger has proper `trigger`, `start`, `end` values
- [ ] Preloader exists with `id="spline-preloader"` (even if placeholder)
- [ ] Responsive breakpoints tested at 1024px, 768px, 640px, 480px
- [ ] All images optimized (WebP + fallback JPEG)
- [ ] Semantic HTML validated (W3C validator)
- [ ] Accessibility: alt text, ARIA labels, heading order, color contrast ≥ 4.5:1
- [ ] No console errors in browser
- [ ] Performance: Lighthouse score > 90

---

## 13. Integration with PHP CI4 (Future)

When integrating CI4 backend:

1. **Keep frontend separate:** Store `public/` assets directly in CI4's `public/` folder
2. **Views:** Use CI4's view system for dynamic content, but maintain static structure for landing pages
3. **API endpoints:** Build RESTful APIs in `app/Controllers/Api/` for form submissions
4. **Security:** Enable CI4's CSRF protection, use `esc()` for output escaping
5. **Config:** Store design tokens in environment variables if dynamic theming is needed

---

## 14. Common Pitfalls & Solutions

| Problem | Solution |
|---------|----------|
| GSAP animations conflict with Lenis | Always call `lenis.on('scroll', ScrollTrigger.update)` |
| Preloader never hides | Ensure `setTimeout` or animation callback calls `lenis.start()` and removes/hides preloader |
| Z-index stacking issues | Reference Section 21 in `ABSYS-DESIGN-SYSTEM.md` for correct layer order |
| Fonts not loading | Check Google Fonts link in `<head>`, use proper `font-display: swap` |
| Glassmorphism looks muddy | Use `rgba(255,255,255,0.75)` with `backdrop-filter: blur(24px) saturate(1.8)` exactly |

---

**END OF RULES**

Remember: When in doubt, read `ABSYS-DESIGN-SYSTEM.md` first. It contains the complete, up-to-date specification for all design decisions, animations, and component patterns.
