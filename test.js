        document.addEventListener("DOMContentLoaded", () => {

            // 1. Initialize Lenis Smooth Scroll
            const lenis = new Lenis({
                autoRaf: true,     // Automatically updates via requestAnimationFrame
                smoothWheel: true, // Master switch
            });

            // GSAP/Lenis Sync (Ensures ScrollTrigger fires accurately during smooth scroll)
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0, 0);

            // 2. UX Preloader Logic & Hero Background Initialization
            const preloader = document.getElementById("spline-preloader");

            // Freeze scrolling while the preloader is active!
            // Essential for Nfinite Paper vibes.
            document.body.style.overflow = "hidden";
            lenis.stop();

            // Reusable function to fire animations once hero background is ready
            const initExperience = () => {
                // Fade away preloader
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';

                // Unfreeze scroll
                document.body.style.overflow = '';
                lenis.start();

                setTimeout(() => {
                    // Fire GSAP Intro Tweens for new hero background
                    gsap.from(".hero-headline h1", {
                        y: 40, opacity: 0, duration: 1.2, delay: 0.3, ease: "power3.out"
                    });

                    gsap.from(".site-header", {
                        y: -30, opacity: 0, duration: 1, delay: 0.5, ease: "power3.out"
                    });

                    gsap.from(".hero-subcontent > *", {
                        y: 30, opacity: 0, duration: 1, delay: 0.6, stagger: 0.15, ease: "power3.out"
                    });

                    // Cinematic Reveal for Tech & Pricing
                    gsap.utils.toArray([".gallery-section", ".pricing-section"]).forEach(sec => {
                        gsap.from(sec, {
                            y: 40,
                            opacity: 0,
                            duration: 1.2,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: sec,
                                start: "top 80%"
                            }
                        });
                    });

                }, 100);
            };

            // 4. Masonry Portfolio Animation (Oroya Style)
            gsap.utils.toArray('.gallery-item').forEach((item, i) => {
                gsap.to(item, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: (i % 3) * 0.15, // Stagger based on column position approx
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%"
                    }
                });
            });

            // 5. Pricing Table Toggle Logic (Bento Grid)
            const btnMonthly = document.getElementById('btn-monthly');
            const btnYearly = document.getElementById('btn-yearly');
            const intervalTexts = document.querySelectorAll('.interval-text');
            const pStarter = document.getElementById('price-starter');
            const pPro = document.getElementById('price-pro');
            const pTeams = document.getElementById('price-teams');
            const pAll = document.getElementById('price-all');

            let isYearly = false;

            // Raw numbers â€” Starters stay at $0 / free
            const prices = {
                monthly: { starter: 0, pro: 19, teams: 49, all: 99 },
                yearly: { starter: 0, pro: 182, teams: 470, all: 950 }
            };

            // Easing function for smooth number counting (EaseOutQuart)
            const animateValue = (element, start, end, duration) => {
                // Starter is always $0 â€” skip animation
                if (start === 0 && end === 0) {
                    element.textContent = 'Free';
                    return;
                }
                let startTimestamp = null;
                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    const easeProgress = 1 - Math.pow(1 - progress, 4);
                    const currentVal = Math.floor(easeProgress * (end - start) + start);
                    element.textContent = '$' + currentVal;
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    } else {
                        element.textContent = '$' + end;
                    }
                };
                window.requestAnimationFrame(step);
            };

            const updatePrices = () => {
                const source = isYearly ? prices.monthly : prices.yearly;
                const target = isYearly ? prices.yearly : prices.monthly;

                animateValue(pStarter, source.starter, target.starter, 500);
                animateValue(pPro, source.pro, target.pro, 500);
                animateValue(pTeams, source.teams, target.teams, 500);
                animateValue(pAll, source.all, target.all, 500);

                intervalTexts.forEach(txt => {
                    txt.textContent = isYearly ? '/year' : '/month';
                });
            };

            // Set initial state
            pStarter.textContent = 'Free';

            btnMonthly.addEventListener('click', () => {
                if (!isYearly) return;
                isYearly = false;
                btnMonthly.classList.add('active');
                btnYearly.classList.remove('active');
                updatePrices();
            });

            btnYearly.addEventListener('click', () => {
                if (isYearly) return;
                isYearly = true;
                btnYearly.classList.add('active');
                btnMonthly.classList.remove('active');
                updatePrices();
            });

            // 6. Media Parallax Section
            gsap.to(".parallax-bg", {
                yPercent: 30, // Moves down slightly as user scrolls down
                ease: "none",
                scrollTrigger: {
                    trigger: ".media-parallax",
                    start: "top bottom", // when top of section hits bottom of viewport
                    end: "bottom top",
                    scrub: true
                }
            });

            gsap.to(".parallax-text", {
                y: 0,
                opacity: 1,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".media-parallax",
                    start: "top 60%", // triggers when section is 60% down the screen
                }
            });

            // 6. Editorial Blockquote Opacity Scrub
            const quoteLines = gsap.utils.toArray(".quote-line");
            quoteLines.forEach((line) => {
                gsap.to(line, {
                    opacity: 1,
                    scrollTrigger: {
                        trigger: line,
                        start: "top 75%",
                        end: "top 45%",
                        scrub: true
                    }
                });
            });

            // 7. Custom GSAP Accordion (FAQ)
            const faqItems = document.querySelectorAll('.faq-item');

            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                const answer = item.querySelector('.faq-answer');

                // Track state
                let isOpen = false;

                // Initialize highly optimized GSAP tween that we can reverse
                const tween = gsap.to(answer, {
                    height: "auto",
                    opacity: 1,
                    duration: 0.5,
                    ease: "power3.inOut",
                    paused: true
                });

                question.addEventListener('click', () => {
                    if (!isOpen) {
                        // Close all others first (optional, comment out for independent opening)
                        faqItems.forEach(otherItem => {
                            if (otherItem !== item && otherItem.classList.contains('is-active')) {
                                otherItem.classList.remove('is-active');
                                otherItem.tween.reverse();
                                otherItem.isOpen = false;
                            }
                        });

                        item.classList.add('is-active');
                        tween.play();
                        isOpen = true;
                    } else {
                        item.classList.remove('is-active');
                        tween.reverse();
                        isOpen = false;
                    }
                });

                // Store state on element for sibling access
                item.tween = tween;
                item.isOpen = isOpen;
            });

            // 8. Fallback (Failsafe for preloader timeout)
            setTimeout(() => {
                if (preloader.style.opacity !== '0') {
                    console.warn("Preloader timed out. Running experience fallback.");
                    initExperience();
                }
            }, 8000);

            // 9. Navbar Scroll State â€” OROYA Style
            const siteHeader = document.getElementById('site-header');
            const SCROLL_THRESHOLD = 60;
            lenis.on('scroll', ({ scroll }) => {
                siteHeader.classList.toggle('is-scrolled', scroll > SCROLL_THRESHOLD);
            });

            // 10. Values â€” Combined Split Text + Horizontal Scroll
            // 10. Values â€” Per-Panel Split Text + Horizontal Slide
            //
            // ONE pinned section. GSAP timeline drives everything:
            //   For each panel i:
            //     1. The panel's word tears apart: word-top flies up, word-bottom flies down.
            //     2. The description sitting at the mid-line fades in through the gap.
            //     3. (If not last panel) track slides left 100vw to reveal next panel.
            //
            // No NILAI. Each word IS the split text.

            const vTrack = document.getElementById('values-track');
            const vPanels = gsap.utils.toArray('#values-track .values-panel');

            if (vTrack && vPanels.length) {

                // Reset all panels to starting state
                vPanels.forEach(p => {
                    gsap.set(p.querySelector('.word-top'), { yPercent: 0 });
                    gsap.set(p.querySelector('.word-bottom'), { yPercent: 0 });
                    gsap.set(p.querySelector('.values-desc'), { opacity: 0 });
                });
                gsap.set(vTrack, { x: 0 });

                // Build one master timeline
                // Duration units: 1 = one "split" phase, 0.5 = one "slide" phase
                const tl = gsap.timeline({ paused: true });

                vPanels.forEach((panel, i) => {
                    const wTop = panel.querySelector('.word-top');
                    const wBot = panel.querySelector('.word-bottom');
                    const desc = panel.querySelector('.values-desc');

                    // Tear word apart + fade description in simultaneously
                    tl.to(wTop, { yPercent: -100, ease: 'power1.inOut', duration: 1 }, '>');

                    // â•”â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•—
                    // â•‘  OPACITY WORD-BOTTOM â€” HANYA AKTIF DI PANEL TERAKHIR         â•‘
                    // â•‘  (INTEGRITAS). Panel 1â€“3 tetap opacity penuh (1).             â•‘
                    // â•‘  Nilai fade saat ini: 0.15 â€” ubah angka ini jika perlu.      â•‘
                    // â•‘  â†’ Lebih TERANG (lebih terlihat) : naikkan mendekati 1.0     â•‘
                    // â•‘  â†’ Lebih GELAP  (hampir hilang)  : turunkan mendekati 0.0    â•‘
                    // â•šâ•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
                    tl.to(wBot, { yPercent: 100, opacity: i === vPanels.length - 1 ? 0.15 : 1, ease: 'power1.inOut', duration: 1 }, '<');

                    tl.to(desc, { opacity: 1, ease: 'power1.inOut', duration: 0.7 }, '<0.15');

                    // Slide track left to next panel (skipped on last panel)
                    if (i < vPanels.length - 1) {
                        tl.to({}, { duration: 0.2 });   // brief hold
                        tl.to(vTrack, {
                            x: () => -(window.innerWidth * (i + 1)),
                            ease: 'power2.inOut',
                            duration: 0.5
                        });
                    }
                });

                // One ScrollTrigger: pin section, scrub timeline progress
                // Scroll distance = timeline duration Ã— innerHeight
                ScrollTrigger.create({
                    trigger: '#values-combined',
                    start: 'top top',
                    end: () => '+=' + (window.innerHeight * tl.totalDuration()),
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => tl.progress(self.progress)
                });
            }

            // 11. Navbar Dynamic Theme Swap (Light Mode over certain sections)
            // MUST be initialized after any child pins (like #values-combined section 10)
            // so GSAP calculates its total unpinned height correctly first.
            const lightWrapper = document.querySelector('.theme-light-wrapper');
            if (lightWrapper && siteHeader) {
                ScrollTrigger.create({
                    trigger: lightWrapper,
                    start: "top top+=" + siteHeader.offsetHeight,
                    end: "bottom top",
                    toggleClass: { targets: siteHeader, className: "theme-light" }
                });
            }

            // Apply light theme from careers section to the very bottom
            // Note: We use the BOTTOM of .field-section because .careers-section has a negative margin (-20vh),
            // pushing its DOM top under the field section. By triggering at the visual bottom of field-section,
            // the transition happens exactly when the curved mask passes under the navbar.
            const fieldSection = document.querySelector('.field-section');
            if (fieldSection && siteHeader) {
                ScrollTrigger.create({
                    trigger: fieldSection,
                    start: "bottom top+=" + siteHeader.offsetHeight,
                    endTrigger: ".contact-section",
                    end: "bottom top",
                    toggleClass: { targets: siteHeader, className: "theme-light" }
                });
            }

            // â”€â”€ Field Trials: Scroll-triggered fade-ups â”€â”€
            ScrollTrigger.create({
                trigger: '.field-section',
                start: 'top 80%',
                once: true,
                onEnter: () => {
                    gsap.from('#ft-headline', { y: 28, opacity: 0, duration: 1.0, ease: 'power3.out' });
                    gsap.from('#ft-subcopy', { y: 18, opacity: 0, duration: 0.85, delay: 0.18, ease: 'power3.out' });
                    gsap.from('#ft-usa-card', { y: 22, opacity: 0, duration: 0.8, delay: 0.35, ease: 'power3.out' });
                    gsap.from('#ft-card-1', { x: 26, opacity: 0, duration: 0.85, delay: 0.25, ease: 'power3.out' });
                    gsap.from('#ft-card-2', { x: -22, opacity: 0, duration: 0.85, delay: 0.4, ease: 'power3.out' });
                    gsap.from('#ft-bottom-cta', { y: 24, opacity: 0, duration: 0.9, delay: 0.5, ease: 'power3.out' });
                }
            });

            // â”€â”€ Field Trials: Subtle parallax on right image (moves UP on scroll) â”€â”€
            gsap.to('#ft-parallax-img', {
                yPercent: -12,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.ft-right-panel',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.6
                }
            });

            // â”€â”€ 12. Careers Section: Asymmetric Parallax (GCV Extreme Tuck Pattern) â”€â”€
            gsap.utils.toArray('.career-parallax-down').forEach(col => {
                gsap.to(col, {
                    yPercent: 45,     // Pushed down dynamically 
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.careers-section',
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1,
                        invalidateOnRefresh: true
                    }
                });
            });

            gsap.utils.toArray('.career-parallax-up').forEach(col => {
                gsap.to(col, {
                    yPercent: -45,    // Pushed up dynamically, riding the higher anchor
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.careers-section',
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1,
                        invalidateOnRefresh: true
                    }
                });
            });

            // Careers entrance reveal
            gsap.from('.careers-section', {
                opacity: 0,
                duration: 1.0,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.careers-section',
                    start: 'top+=35vh 90%',   // Clear the 20vh + 15vh offset for visibility
                    invalidateOnRefresh: true
                }
            });

        });

