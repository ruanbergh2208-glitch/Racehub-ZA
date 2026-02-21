import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const leftPanel = leftPanelRef.current;
    const rightPanel = rightPanelRef.current;

    if (!section || !card || !leftPanel || !rightPanel) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(leftPanel, 
          { x: '-60vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo(rightPanel, 
          { x: '60vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(leftPanel, 
          { x: 0, opacity: 1 }, 
          { x: '-14vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(rightPanel, 
          { x: 0, opacity: 1 }, 
          { x: '14vw', opacity: 0, ease: 'power2.in' }, 
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
      className="relative w-full h-screen flex items-center justify-center overflow-hidden z-[130]"
    >
      <div 
        ref={cardRef}
        className="race-card w-[min(1180px,92vw)] h-[min(840px,88vh)] flex overflow-hidden"
      >
        {/* Left Panel - Content */}
        <div 
          ref={leftPanelRef}
          className="w-1/2 h-full bg-racing-charcoal p-8 md:p-12 flex flex-col justify-center"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-racing-red" />
              <span className="race-label text-racing-red">OUR MISSION</span>
            </div>

            <h2 className="race-heading text-[clamp(32px,4vw,56px)] text-white">
              BUILT FOR<br />
              THE PADDOCK
            </h2>

            <p className="text-racing-gray max-w-md leading-relaxed">
              RaceHub ZA is made by racers who understand the chaos of race day. We simplify events, results, and the marketplace—so you can focus on the track.
            </p>

            <p className="text-white/80 max-w-md leading-relaxed">
              From grassroots karting to club-level motorsport, we're building the digital infrastructure South African racing deserves.
            </p>

            <button className="race-pill-red flex items-center gap-2 hover:scale-105 transition-transform">
              Meet the Team
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Panel - Image */}
        <div 
          ref={rightPanelRef}
          className="flex-1 h-full relative hidden md:block"
        >
          <img 
            src="/about_team_bg.jpg" 
            alt="Team" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-racing-charcoal/50" />
        </div>
      </div>
    </section>
  );
}
