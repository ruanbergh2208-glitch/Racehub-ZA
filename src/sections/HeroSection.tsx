import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const headline = headlineRef.current;
    const subhead = subheadRef.current;
    const cta = ctaRef.current;
    const pills = pillsRef.current;
    const underline = underlineRef.current;

    if (!section || !card || !headline || !subhead || !cta || !pills || !underline) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on load
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      loadTl
        .fromTo(card, 
          { opacity: 0, scale: 0.98, y: 24 }, 
          { opacity: 1, scale: 1, y: 0, duration: 0.9 }
        )
        .fromTo(headline.children, 
          { y: 28, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 }, 
          '-=0.5'
        )
        .fromTo(underline, 
          { scaleX: 0 }, 
          { scaleX: 1, duration: 0.35, transformOrigin: 'left' }, 
          '-=0.3'
        )
        .fromTo([subhead, cta.children], 
          { y: 16, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 }, 
          '-=0.2'
        )
        .fromTo(pills.children, 
          { y: 16, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.35, stagger: 0.05 }, 
          '-=0.3'
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([card, headline, subhead, cta, pills], { opacity: 1, x: 0, y: 0, scale: 1 });
          }
        }
      });

      // EXIT phase (70% - 100%)
      scrollTl
        .fromTo(headline, 
          { x: 0, opacity: 1 }, 
          { x: '-12vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo([subhead, cta], 
          { x: 0, opacity: 1 }, 
          { x: '-8vw', opacity: 0, ease: 'power2.in' }, 
          0.72
        )
        .fromTo(pills, 
          { x: 0, opacity: 1 }, 
          { x: '8vw', opacity: 0, ease: 'power2.in' }, 
          0.72
        )
        .fromTo(card, 
          { y: 0, scale: 1, opacity: 1 }, 
          { y: '-10vh', scale: 0.98, opacity: 0.35, ease: 'power2.in' }, 
          0.75
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden z-10"
    >
      <div 
        ref={cardRef}
        className="race-card w-[min(1180px,92vw)] h-[min(840px,88vh)]"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/hero_track_bg.jpg" 
            alt="Racing track" 
            className="w-full h-full object-cover"
          />
          <div className="gradient-overlay-left" />
          <div className="vignette-overlay" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12 lg:p-16">
          {/* Top Row */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold tracking-tight text-white">RaceHub ZA</span>
              <span className="race-pill text-[10px]">BETA</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              {['Events', 'Clubs', 'Drivers', 'Marketplace', 'News'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  {item}
                </a>
              ))}
              <button className="race-pill hover:bg-white/10 transition-colors">
                Login
              </button>
            </nav>
          </div>

          {/* Center Content */}
          <div className="flex-1 flex flex-col justify-center max-w-2xl">
            <div ref={headlineRef} className="space-y-1 mb-6">
              <h1 className="race-heading text-[clamp(32px,5vw,64px)] text-white">
                THE DIGITAL ENGINE
              </h1>
              <h1 className="race-heading text-[clamp(32px,5vw,64px)] text-white">
                OF SOUTH AFRICAN
              </h1>
              <h1 className="race-heading text-[clamp(32px,5vw,64px)] text-white">
                GRASSROOTS{' '}
                <span className="relative inline-block">
                  RACING
                  <span 
                    ref={underlineRef}
                    className="absolute bottom-1 left-0 w-full h-1 bg-racing-red rounded-sm"
                  />
                </span>
              </h1>
            </div>

            <p 
              ref={subheadRef}
              className="text-lg text-white/80 max-w-lg mb-8 leading-relaxed"
            >
              RaceHub ZA connects clubs, drivers, and fans—events, results, and motorsport marketplace in one place.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <button className="race-pill-red flex items-center gap-2 hover:scale-105 transition-transform">
                Explore Events
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="race-pill flex items-center gap-2 hover:bg-white/10 transition-colors">
                List Your Club
              </button>
            </div>
          </div>

          {/* Bottom Row */}
          <div ref={pillsRef} className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              <span className="race-pill flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                Cape Town, South Africa
              </span>
              <span className="race-pill flex items-center gap-2">
                <Calendar className="w-3 h-3" />
                2026 Season
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
