# Testimonials Section Component

## Overview

A fully-featured Testimonials section for the ABSYS landing page, following the ABSYS Design System specifications.

**Features:**
- ✅ Bento-style grid layout (8-column system)
- ✅ Glass card design with backdrop blur
- ✅ GSAP scroll-triggered fade-up animations
- ✅ Number counter animation for statistics
- ✅ Parallax background pattern
- ✅ Responsive design (desktop → tablet → mobile)
- ✅ Accessible semantic HTML
- ✅ Performance-optimized (GPU-accelerated transforms only)

---

## Files

```
public/
├── components/
│   ├── testimonials-section.html   # HTML template
│   └── README.md                   # This file
├── assets/
│   ├── css/
│   │   └── components/
│   │       └── testimonials.css   # Styles
│   └── js/
│       └── components/
│           └── testimonials.js    # Animations
└── assets/
    └── img/
        └── testimonials/          # Place avatar images here
        └── badges/                # Place trust badges here
```

---

## Integration Instructions

### Step 1: Add CSS

In your HTML `<head>` or main CSS file (after `hero-background.css`):

```html
<link rel="stylesheet" href="/assets/css/components/testimonials.css">
```

### Step 2: Add JavaScript

Before closing `</body>`, after GSAP/ScrollTrigger/Lenis initialization:

```html
<script src="/js/components/testimonials.js"></script>
```

**Order matters:** Ensure GSAP and ScrollTrigger are loaded BEFORE this script.

### Step 3: Insert HTML

Place the section where you want it in your page (following the Section order from design system):

```html
<!-- Include the HTML from testimonials-section.html -->
<section class="testimonials-section" id="testimonials">
  <!-- ... paste entire content ... -->
</section>
```

**Location:** After `careers-section` and before `contact-section` (or wherever appropriate in your page structure).

---

## Customization

### 1. **Colors**
All colors use CSS custom properties. Override in your main CSS if needed:

```css
.testimonials-section {
  --accent-secondary: #3B67F5; /* Brand blue */
  --bg-base: #fcfcfc;           /* Background */
  --text-primary: #111111;     /* Text */
}
```

### 2. **Grid Layout**
The Bento grid uses 8 columns. Modify in `.testimonials-grid`:

```css
.testimonial-card { grid-column: span 2; }        /* Default: 2 cols */
.testimonial-featured { grid-column: span 4; }   /* Featured: 4 cols */
```

Adjust spans to change card sizes (1–8).

### 3. **Animation Timing**
Edit in `/js/components/testimonials.js`:

```javascript
duration: 0.8,              // Animation duration in seconds
delay: (index % 3) * 0.1,   // Stagger delay between cards
counterDuration: 2000,      // Stats counter animation in ms
```

### 4. **Content**
- Replace avatar images in `/public/assets/img/testimonials/`
- Replace badge logos in `/public/assets/img/badges/`
- Update testimonial quotes, names, roles, and stats in the HTML file
- Ensure all images are WebP format for performance

---

## Design System Compliance

This component follows **ABSYS-DESIGN-SYSTEM.md**:

| Spec | Implementation |
|------|----------------|
| **Fonts** | DM Sans (UI), EB Garamond (stats) |
| **Colors** | `--bg-base`, `--text-primary`, `--accent-secondary` |
| **Glass Card** | `rgba(255,255,255,0.75)` + `backdrop-filter: blur(24px) saturate(1.8)` |
| **Border Radius** | `20px` (cards), `50px` (badges) |
| **Animations** | GSAP tweens using `transform`, `opacity` only |
| **Z-index** | `10` (same as other sections) |
| **Spacing** | `clamp(4rem, 10vh, 10rem)` vertical padding |
| **Responsive** | Breakpoints at 1024px, 768px, 480px |

---

## Accessibility Checklist

- ✅ Semantic `<section>` with `id="testimonials"`
- ✅ `<article>` for each testimonial card
- ✅ `<blockquote>` for quote content
- ✅ `alt` attributes on all images
- ✅ ARIA labels where needed (add if missing)
- ✅ Sufficient color contrast (will verify in final design)
- ✅ Keyboard navigation works (no JS traps)

---

## Performance Notes

1. **Images:** Use WebP format with JPEG fallback. Optimize with Squoosh or similar.
2. **Lazy Loading:** Avatars use `loading="lazy"`. Add `loading="lazy"` to badge images if needed.
3. **GSAP ScrollTrigger:** Uses `once: true` for counter animation to avoid re-triggers.
4. **GPU Acceleration:** All GSAP animations use `transform` and `opacity` only.
5. **CSS Filters:** `backdrop-filter` may cause repaints on low-end devices—test on target hardware.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Animations not firing | Check GSAP/ScrollTrigger are loaded before `testimonials.js` |
| Images not showing | Verify paths: `/assets/img/testimonials/avatar-1.webp` |
| Grid breaks on mobile | Ensure responsive CSS is loaded (no media query overrides) |
| Counter shows `NaN` | Check `data-count` attribute has valid numeric value |
| Font mismatch | Load DM Sans & EB Garamond in `<head>` |

---

## Future Enhancements (PHP CI4 Integration)

When building the CI4 backend:

1. **Dynamic Testimonials:** Fetch from database via API endpoint:
   ```javascript
   fetch('/api/testimonials')
     .then(res => res.json())
     .then(data => renderTestimonials(data));
   ```

2. **Admin Panel:** Create CI4 controller `TestimonialsController` with CRUD operations.

3. **Image Uploads:** Store uploads in `public/assets/img/testimonials/` via CI4's file upload library.

4. **Internationalization:** Store translations in database, render via PHP view templates.

---

## License & Credits

Part of the ABSYS Agritek website. Designed following the ABSYS Design System v1.0.

GSAP: © GreenSock
Lenis: © lenis.style
Fonts: Google Fonts (DM Sans, EB Garamond)
