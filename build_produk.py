import re

def build_produk():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Split into Top (up to </header>) and Bottom (from <section class="contact-section")
    top_match = re.search(r'(.*?</header>)', content, re.IGNORECASE | re.DOTALL)
    bottom_match = re.search(r'(<section class="contact-section".*)', content, re.IGNORECASE | re.DOTALL)
    
    if not top_match or not bottom_match:
        print("Could not find boundaries")
        return

    top_html = top_match.group(1)
    bottom_html = bottom_match.group(1)

    # Inject some custom CSS for Produk
    custom_css = """
    <style>
        /* Scoped styles for Produk Page */
        .produk-hero-extra {
            margin-top: 15vh;
        }
        .produk-specs {
            padding: 100px 5%;
            background: var(--bg-base);
        }
    </style>
    """
    top_html = top_html.replace('</head>', custom_css + '\n</head>')

    # New sections for Produk
    new_body = """
    <!-- 1. Hero Section -->
    <section class="hero-section">
        <div class="hero-background">
            <div class="gradient-base" style="background: linear-gradient(90deg, #FFFFFF 0%, #D0A1FF 100%);"></div>
            <div class="wavy-mesh-overlay"></div>
        </div>
        <div class="hero-ui-layer hero-content-wrapper produk-hero-extra">
            <div class="discover-wrap hero-headline">
                <div class="dm-text-container">
                    <h1 class="dm-heading js-text-anim-blur" style="font-size: clamp(3rem, 6vw, 5.5rem);">Agricultural<br>Packaging,<br>Reinvented.</h1>
                    <p class="dm-subtitle js-text-anim-slide">ABSYS introduces 100% biodegradable barrier technology. No microplastics. No compromises. Designed to protect your fertilizer and naturally return to the earth.</p>
                </div>
                <div class="dm-btn-wrapper" id="antigravity-btn">
                    <div class="dm-btn-stripes"></div>
                    <a href="#features" class="dm-btn" style="background: linear-gradient(90deg, #3B67F5 0%, #111111 100%);">
                        <span class="dm-btn-text">Explore Technology</span>
                        <div class="dm-btn-icon" id="dm-arrow">
                            <svg viewBox="0 0 24 24">
                                <path d="M7 17L17 7M17 7H9M17 7V15"></path>
                            </svg>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div class="hero-image-right gsap-fade-up">
            <!-- Sample product image -->
            <img src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=600&auto=format&fit=crop" style="border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);" alt="ABSYS Product Line">
        </div>
    </section>

    <!-- 2. The Product Focus (Glassmorphism Editorial) -->
    <div class="theme-light-wrapper" id="features">
        <section class="media-editorial">
            <div class="editorial-image-window">
                <div class="editorial-bg" style="background-image: url('https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2000&auto=format&fit=crop');"></div>
                
                <div class="editorial-glass-card">
                    <span class="editorial-badge">THE ADVANTAGE</span>
                    <h2 class="editorial-text">Our proprietary biopolymer compound delivers industry-leading moisture barriers while dissolving completely within 180 days of soil exposure.</h2>
                </div>
            </div>
        </section>
    </div>

    <!-- 3. Bento Grid of Technical Features -->
    <section class="pricing-section">
        <div class="pricing-wrapper">
            <div class="pricing-section-heading">
                <h2>Technical Architecture</h2>
                <p>Designed for large-scale operations. Engineered for extreme sustainability.</p>
            </div>

            <div class="bento-grid">
                <!-- Featured Specs -->
                <div class="bento-card featured gsap-fade-up">
                    <div class="bento-featured-noise"></div>
                    <div class="bento-card-topbar">
                        <span class="bento-badge secondary sparkle">Core Benefit</span>
                    </div>
                    <div class="bento-price-area row">
                        <div>
                            <span class="bento-price-number" style="font-size: 2.8rem;">100%</span>
                            <span class="bento-price-suffix"> Biodegradable</span>
                        </div>
                    </div>
                    <ul class="bento-features">
                        <li class="bento-feature-item">
                            <div class="bento-check"><svg><path d="M2 5L4 7L8 2"></path></svg></div>
                            Zero Microplastics Left Behind
                        </li>
                        <li class="bento-feature-item">
                            <div class="bento-check"><svg><path d="M2 5L4 7L8 2"></path></svg></div>
                            TUV Austria Certified Soil Degradable
                        </li>
                        <li class="bento-feature-item">
                            <div class="bento-check"><svg><path d="M2 5L4 7L8 2"></path></svg></div>
                            Natural nutrient return to crops
                        </li>
                    </ul>
                </div>

                <!-- Secondary -->
                <div class="bento-card starter gsap-fade-up">
                    <div class="bento-card-topbar">
                        <span class="bento-badge outline">Resistance</span>
                    </div>
                    <div class="bento-price-area">
                        <span class="bento-price-number" style="font-size: 2rem;">Moisture Lock</span>
                    </div>
                    <ul class="bento-features">
                        <li class="bento-feature-item">
                            <div class="bento-check"><svg><path d="M2 5L4 7L8 2"></path></svg></div>
                            Hydrophobic Outer Layer
                        </li>
                        <li class="bento-feature-item">
                            <div class="bento-check"><svg><path d="M2 5L4 7L8 2"></path></svg></div>
                            Prevents NPK leaching
                        </li>
                    </ul>
                </div>

                <!-- Another Secondary -->
                <div class="bento-card teams gsap-fade-up">
                    <div class="bento-card-topbar">
                        <span class="bento-badge outline">Durability</span>
                    </div>
                    <div class="bento-price-area">
                        <span class="bento-price-number" style="font-size: 2.5rem;">50kg</span>
                        <span class="bento-price-suffix"> Load Cap</span>
                    </div>
                    <ul class="bento-features">
                        <li class="bento-feature-item">
                            <div class="bento-check"><svg><path d="M2 5L4 7L8 2"></path></svg></div>
                            Industrial-grade tensile strength
                        </li>
                        <li class="bento-feature-item">
                            <div class="bento-check"><svg><path d="M2 5L4 7L8 2"></path></svg></div>
                            Automated bagging compatible
                        </li>
                    </ul>
                </div>

                <!-- Broad feature -->
                <div class="bento-card enterprise gsap-fade-up">
                    <div class="bento-card-topbar">
                        <span class="bento-badge outline">Storage</span>
                    </div>
                    <div class="bento-price-area">
                        <span class="bento-price-number" style="font-size: 2rem;">12 Months</span>
                        <span class="bento-price-suffix"> Shelf Life</span>
                    </div>
                    <ul class="bento-features">
                        <li class="bento-feature-item">
                            <div class="bento-check"><svg><path d="M2 5L4 7L8 2"></path></svg></div>
                            Stable until soil contact
                        </li>
                        <li class="bento-feature-item">
                            <div class="bento-check"><svg><path d="M2 5L4 7L8 2"></path></svg></div>
                            UV Resistant coating
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- 4. Text Split Showcase (Values Style) -->
    <div id="values-combined">
        <div id="values-track">
            
            <!-- Panel 1 -->
            <div class="values-panel">
                <span class="values-panel-num">Phase 01</span>
                <div class="word-wrapper">
                    <!-- Invisible Placeholder -->
                    <span class="word-placeholder">PROTECT</span>
                    <!-- Top Half -->
                    <span class="word-top">PROTECT</span>
                    <!-- Bottom Half -->
                    <span class="word-bottom">PROTECT</span>
                    
                    <div class="values-desc">
                        <p>Our intelligent polymer chains maintain absolute structural integrity during transport, storage, and handling. Your fertilizer is secure.</p>
                    </div>
                </div>
            </div>

            <!-- Panel 2 -->
            <div class="values-panel">
                <span class="values-panel-num">Phase 02</span>
                <div class="word-wrapper">
                    <span class="word-placeholder">RELEASE</span>
                    <span class="word-top" style="color:#3B67F5;">RELEASE</span>
                    <span class="word-bottom" style="color:#3B67F5;">RELEASE</span>
                    
                    <div class="values-desc">
                        <p>Upon controlled exposure to soil microbiomes, the barrier initiates a targeted breakdown sequence, allowing roots to access nutrients without delay.</p>
                    </div>
                </div>
            </div>

            <!-- Panel 3 -->
            <div class="values-panel">
                <span class="values-panel-num">Phase 03</span>
                <div class="word-wrapper">
                    <span class="word-placeholder">RESTORE</span>
                    <span class="word-top" style="color:#4e6528;">RESTORE</span>
                    <span class="word-bottom" style="color:#4e6528;">RESTORE</span>
                    
                    <div class="values-desc">
                        <p>Within six months, the packaging vanishes completely, leaving only water, biomass, and pure carbon. The perfect ecological loop.</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
    """

    full_content = top_html + "\n" + new_body + "\n" + bottom_html

    with open('produk.html', 'w', encoding='utf-8') as f:
        f.write(full_content)
    
    print("produk.html generated successfully!")

if __name__ == "__main__":
    build_produk()
