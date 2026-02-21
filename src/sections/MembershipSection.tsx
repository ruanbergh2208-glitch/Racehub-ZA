import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Crown, Check, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function MembershipSection() {
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
        .fromTo(rightPanel.children, 
          { x: '60vw', opacity: 0 }, 
          { x: 0, opacity: 1, stagger: 0.03, ease: 'none' }, 
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
          { x: '18vw', opacity: 0, ease: 'power2.in' }, 
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

  const tiers = [
    { name: 'Fan', price: 'Free', features: ['View events', 'Browse results', 'News access'] },
    { name: 'Driver', price: 'R49/mo', features: ['Driver profile', 'Race entries', 'Sponsor display', 'Pro badge'] },
    { name: 'Club', price: 'R199/mo', features: ['Club page', 'Event management', 'Member roster', 'Analytics'] },
  ];

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden z-[100]"
    >
      <div 
        ref={cardRef}
        className="race-card w-[min(1180px,92vw)] h-[min(840px,88vh)] flex overflow-hidden"
      >
        {/* Left Panel - Title */}
        <div 
          ref={leftPanelRef}
          className="w-2/5 h-full bg-racing-charcoal p-8 md:p-12 flex flex-col justify-center"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Crown className="w-8 h-8 text-racing-red" />
              <span className="race-label text-racing-red">MEMBERSHIP</span>
            </div>

            <h2 className="race-heading text-[clamp(32px,4vw,56px)] text-white">
              UNLOCK<br />
              MORE
            </h2>

            <p className="text-racing-gray max-w-sm">
              Unlock listings, results, and club tools. Choose the plan that fits your racing journey.
            </p>

            <button className="race-pill-red flex items-center gap-2 hover:scale-105 transition-transform">
              Compare Plans
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Panel - Tiers */}
        <div 
          ref={rightPanelRef}
          className="flex-1 h-full bg-racing-black p-8 md:p-12 flex flex-col justify-center"
        >
          <div className="space-y-4">
            {tiers.map((tier, index) => (
              <div 
                key={index}
                className={`p-5 rounded-xl border transition-all hover:scale-[1.02] ${
                  index === 1 
                    ? 'bg-racing-red/10 border-racing-red' 
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-bold text-lg">{tier.name}</h3>
                  <span className={`text-xl font-bold ${index === 1 ? 'text-racing-red' : 'text-white'}`}>
                    {tier.price}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tier.features.map((feature, fIndex) => (
                    <span key={fIndex} className="flex items-center gap-1 text-sm text-racing-gray">
                      <Check className="w-3 h-3 text-racing-red" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
