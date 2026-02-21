import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Calendar, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ClubProfileSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const headline = headlineRef.current;
    const bgImage = bgImageRef.current;
    const stats = statsRef.current;
    const cta = ctaRef.current;

    if (!section || !card || !headline || !bgImage || !stats || !cta) return;

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
        .fromTo(headline.children, 
          { y: '40vh', opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.03, ease: 'none' }, 
          0
        )
        .fromTo(bgImage, 
          { scale: 1.10, x: '6vw' }, 
          { scale: 1, x: 0, ease: 'none' }, 
          0
        )
        .fromTo([stats.children, cta], 
          { y: 24, opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 
          0.12
        );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(headline, 
          { y: 0, opacity: 1 }, 
          { y: '-18vh', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(bgImage, 
          { scale: 1, x: 0 }, 
          { scale: 1.06, x: '-4vw', ease: 'power2.in' }, 
          0.7
        )
        .fromTo([stats, cta], 
          { y: 0, opacity: 1 }, 
          { y: -12, opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(card, 
          { opacity: 1 }, 
          { opacity: 0.35, ease: 'power2.in' }, 
          0.8
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden z-40"
    >
      <div 
        ref={cardRef}
        className="race-card w-[min(1180px,92vw)] h-[min(840px,88vh)]"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            ref={bgImageRef}
            src="/club_atlantic_bg.jpg" 
            alt="Club paddock" 
            className="w-full h-full object-cover"
          />
          <div className="gradient-overlay-left" />
          <div className="vignette-overlay" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12 lg:p-16">
          {/* Top Pill */}
          <div>
            <span className="race-pill bg-racing-red border-racing-red">FEATURED CLUB</span>
          </div>

          {/* Center Content */}
          <div className="flex-1 flex flex-col justify-center max-w-2xl">
            <div ref={headlineRef} className="space-y-1">
              <h2 className="race-heading text-[clamp(40px,7vw,88px)] text-white">
                ATLANTIC
              </h2>
              <h2 className="race-heading text-[clamp(40px,7vw,88px)] text-white">
                KARTING
              </h2>
              <h2 className="race-heading text-[clamp(40px,7vw,88px)] text-white">
                CLUB
              </h2>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex items-end justify-between">
            <div ref={statsRef} className="flex flex-wrap gap-4">
              <span className="race-pill flex items-center gap-2">
                <Users className="w-4 h-4" />
                120+ members
              </span>
              <span className="race-pill flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Next race: 28 Feb
              </span>
            </div>

            <button 
              ref={ctaRef}
              className="race-pill-red flex items-center gap-2 hover:scale-105 transition-transform"
            >
              Visit Club Page
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
