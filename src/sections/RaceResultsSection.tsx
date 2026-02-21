import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function RaceResultsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const leftPanel = leftPanelRef.current;
    const rightPanel = rightPanelRef.current;
    const list = listRef.current;

    if (!section || !card || !leftPanel || !rightPanel || !list) return;

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
          { x: '-70vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo(rightPanel, 
          { x: '70vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo(list.children, 
          { y: 20, opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 
          0.1
        );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(leftPanel, 
          { x: 0, opacity: 1 }, 
          { x: '-18vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(rightPanel, 
          { x: 0, opacity: 1 }, 
          { x: '18vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(list.children, 
          { y: 0, opacity: 1 }, 
          { y: -10, opacity: 0, stagger: 0.01, ease: 'power2.in' }, 
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

  const results = [
    { pos: 1, name: 'Sipho Mletha', team: 'Velocity Racing' },
    { pos: 2, name: 'Aiden Paulse', team: 'Atlantic Karting' },
    { pos: 3, name: 'Thando Nkosi', team: 'Cape Speed' },
  ];

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden z-[60]"
    >
      <div 
        ref={cardRef}
        className="race-card w-[min(1180px,92vw)] h-[min(840px,88vh)] flex overflow-hidden"
      >
        {/* Left Panel - Results List */}
        <div 
          ref={leftPanelRef}
          className="relative w-1/2 h-full hidden md:block"
        >
          <img 
            src="/results_track_bg.jpg" 
            alt="Track" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-racing-charcoal/90" />
          
          {/* Results Overlay */}
          <div className="absolute inset-0 flex flex-col justify-center p-8">
            <div ref={listRef} className="space-y-3">
              {results.map((result, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-racing-charcoal/90 border border-white/10 backdrop-blur-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-racing-red flex items-center justify-center font-bold text-white">
                    {result.pos}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{result.name}</p>
                    <p className="text-sm text-racing-gray">{result.team}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Title */}
        <div 
          ref={rightPanelRef}
          className="flex-1 h-full bg-racing-charcoal p-8 md:p-12 flex flex-col justify-center"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-racing-red" />
              <span className="race-label text-racing-red">RESULTS</span>
            </div>

            <h2 className="race-heading text-[clamp(36px,5vw,64px)] text-white">
              WP KART<br />
              CHAMPIONSHIP<br />
              ROUND 2
            </h2>

            <p className="text-racing-gray max-w-sm">
              Top finishers from the latest round of the Western Province Kart Championship.
            </p>

            <button className="race-pill-red flex items-center gap-2 hover:scale-105 transition-transform">
              Full Results
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
