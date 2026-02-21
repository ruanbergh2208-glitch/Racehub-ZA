import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function EventSpotlightSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const headline = headlineRef.current;
    const pills = pillsRef.current;
    const cta = ctaRef.current;

    if (!section || !card || !headline || !pills || !cta) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(card, 
          { y: '100vh', opacity: 0.6, scale: 0.96 }, 
          { y: 0, opacity: 1, scale: 1, ease: 'none' }, 
          0
        )
        .fromTo(headline.children, 
          { x: '-18vw', opacity: 0 }, 
          { x: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 
          0.05
        )
        .fromTo(pills.children, 
          { y: -40, opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.01, ease: 'none' }, 
          0
        )
        .fromTo(cta, 
          { x: '12vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0.12
        );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(headline, 
          { x: 0, opacity: 1 }, 
          { x: '-10vw', opacity: 0.2, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(pills, 
          { y: 0, opacity: 1 }, 
          { y: -20, opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(cta, 
          { x: 0, opacity: 1 }, 
          { x: '8vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(card, 
          { y: 0, scale: 1, opacity: 1 }, 
          { y: '-22vh', scale: 0.98, opacity: 0.35, ease: 'power2.in' }, 
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden z-20"
    >
      <div 
        ref={cardRef}
        className="race-card w-[min(1180px,92vw)] h-[min(840px,88vh)]"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/event_wp_kart_bg.jpg" 
            alt="Kart racing" 
            className="w-full h-full object-cover"
          />
          <div className="gradient-overlay-left" />
          <div className="vignette-overlay" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12 lg:p-16">
          {/* Top Pills */}
          <div ref={pillsRef} className="flex items-center justify-between">
            <span className="race-pill bg-racing-red border-racing-red">UPCOMING EVENT</span>
            <span className="race-pill text-lg font-bold">FEB 28</span>
          </div>

          {/* Center Content */}
          <div className="flex-1 flex flex-col justify-center max-w-3xl">
            <div ref={headlineRef} className="space-y-1">
              <h2 className="race-heading text-[clamp(36px,6vw,78px)] text-white">
                WESTERN PROVINCE
              </h2>
              <h2 className="race-heading text-[clamp(36px,6vw,78px)] text-white">
                KART CHAMPIONSHIP
              </h2>
              <h2 className="race-heading text-[clamp(36px,6vw,78px)] text-white">
                ROUND 3
              </h2>
            </div>

            <div className="flex items-center gap-3 mt-8">
              <span className="race-pill flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                Killarney Raceway • Cape Town
              </span>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="flex justify-end">
            <button 
              ref={ctaRef}
              className="race-pill-red flex items-center gap-2 text-lg px-6 h-12 hover:scale-105 transition-transform"
            >
              Register to Race
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
