/**
 * Testimonials Section — JavaScript Controller
 * Follows ABSYS Design System: GSAP + Lenis patterns
 *
 * Features:
 * - GSAP scroll-triggered fade-up animations
 * - Counter animation for stats numbers
 * - Intersection Observer for performance
 */

document.addEventListener('DOMContentLoaded', () => {
  const testimonialsSection = document.querySelector('.testimonials-section');

  if (!testimonialsSection) return;

  // Register GSAP ScrollTrigger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  } else {
    console.warn('GSAP or ScrollTrigger not loaded. Testimonials animations disabled.');
    return;
  }

  /**
   * 1. Fade-up animations for cards (using .js-gsap-fade-up class)
   * Pattern: opacity: 0, y: 40 → visible
   */
  const fadeUpElements = testimonialsSection.querySelectorAll('.js-gsap-fade-up');

  fadeUpElements.forEach((el, index) => {
    gsap.fromTo(el,
      {
        opacity: 0,
        y: 40
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        delay: (index % 3) * 0.1 // Stagger for visual interest
      }
    );
  });

  /**
   * 2. Counter animation for stats number
   * Animates from 0 to target value when scrolled into view
   */
  const statNumbers = testimonialsSection.querySelectorAll('.stat-number');

  statNumbers.forEach(stat => {
    const targetCount = parseInt(stat.getAttribute('data-count')) || 0;
    const duration = 2000; // 2 seconds

    ScrollTrigger.create({
      trigger: stat,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(stat, {
          innerHTML: targetCount,
          duration: duration / 1000,
          ease: 'power2.out',
          snap: { innerHTML: 1 }, // Round to integer
          onUpdate: function() {
            stat.innerHTML = Math.round(this.targets()[0].innerHTML);
          }
        });
      }
    });
  });

  /**
   * 3. Parallax effect on background pattern (subtile depth)
   */
  const bgPattern = testimonialsSection.querySelector('.testimonials-bg');

  if (bgPattern) {
    gsap.to(bgPattern, {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: testimonialsSection,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5
      }
    });
  }

  /**
   * 4. Hover interactions (enhancement beyond CSS)
   * Adds slight scale and shadow depth on card hover
   */
  const cards = testimonialsSection.querySelectorAll('.glass-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });

  /**
   * 5. Trust badges row fade-in
   */
  const badgesRow = testimonialsSection.querySelector('.trust-badges');

  if (badgesRow) {
    gsap.fromTo(badgesRow,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: testimonialsSection,
          start: 'top 60%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  /**
   * 6. Staggered badge appearance
   */
  const trustBadges = testimonialsSection.querySelectorAll('.trust-badge');

  trustBadges.forEach((badge, index) => {
    gsap.fromTo(badge,
      {
        opacity: 0,
        scale: 0.8
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: badgesRow,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        delay: index * 0.08
      }
    );
  });
});

/**
 * Cleanup function (call when removing section from DOM)
 */
function destroyTestimonialsAnimations() {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.getAll().forEach(st => st.kill());
  }
}

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { destroyTestimonialsAnimations };
}
