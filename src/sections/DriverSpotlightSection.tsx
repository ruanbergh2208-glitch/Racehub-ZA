import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function DriverSpotlightSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const headline = headlineRef.current;
    const portrait = portraitRef.current;
    const bio = bioRef.current;

    if (!section || !card || !headline || !portrait || !bio) return;

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
          { x: '-22vw', opacity: 0 }, 
          { x: 0, opacity: 1, stagger: 0.03, ease: 'none' }, 
          0
        )
        .fromTo(portrait, 
          { x: '18vw', scale: 1.08, opacity: 0 }, 
          { x: 0, scale: 1, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo(bio.children, 
          { y: 18, opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 
          0.1
        );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(headline, 
          { x: 0, opacity: 1 }, 
          { x: '-10vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(portrait, 
          { x: 0, scale: 1, opacity: 1 }, 
          { x: '-8vw', scale: 1.04, opacity: 0.3, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(bio, 
          { y: 0, opacity: 1 }, 
          { y: -10, opacity: 0, ease: 'power2.in' }, 
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
      className="relative w-full h-screen flex items-center justify-center overflow-hidden z-50"
    >
      <div 
        ref={cardRef}
        className="race-card w-[min(1180px,92vw)] h-[min(840px,88vh)]"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            ref={portraitRef}
            src="/driver_sipho_portrait.jpg" 
            alt="Driver portrait" 
            className="w-full h-full object-cover"
          />
          <div className="gradient-overlay-left" />
          <div className="vignette-overlay" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12 lg:p-16">
          {/* Top Pill */}
          <div>
            <span className="race-pill bg-racing-red border-racing-red">DRIVER SPOTLIGHT</span>
          </div>

          {/* Center Content */}
          <div className="flex-1 flex flex-col justify-center max-w-xl">
            <div ref={headlineRef} className="space-y-1 mb-6">
              <h2 className="race-heading text-[clamp(48px,8vw,96px)] text-white">
                SIPHO
              </h2>
              <h2 className="race-heading text-[clamp(48px,8vw,96px)] text-white">
                MLETHA
              </h2>
            </div>

            <div ref={bioRef}>
              <p className="text-lg text-white/80 mb-6 max-w-md leading-relaxed">
                Junior champion on the rise. Consistent, calm, and quick in wet conditions.
              </p>

              <button className="race-pill-red flex items-center gap-2 hover:scale-105 transition-transform">
                View Profile
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
