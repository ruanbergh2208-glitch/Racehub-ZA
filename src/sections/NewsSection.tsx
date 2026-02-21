import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Newspaper, ArrowRight, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function NewsSection() {
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
          { x: '-70vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo(rightPanel, 
          { x: '70vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
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
        .fromTo(card, 
          { opacity: 1 }, 
          { opacity: 0.35, ease: 'power2.in' }, 
          0.8
        );

    }, section);

    return () => ctx.revert();
  }, []);

  const newsItems = [
    { title: 'New safety rules for 2025', date: 'Feb 15', category: 'Regulations' },
    { title: 'Killarney track day dates announced', date: 'Feb 12', category: 'Events' },
    { title: 'Sponsor spotlight: RPM Lubricants', date: 'Feb 10', category: 'Sponsors' },
  ];

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden z-[110]"
    >
      <div 
        ref={cardRef}
        className="race-card w-[min(1180px,92vw)] h-[min(840px,88vh)] flex overflow-hidden"
      >
        {/* Left Panel - News List */}
        <div 
          ref={leftPanelRef}
          className="w-1/2 h-full bg-racing-black p-8 md:p-12 flex flex-col justify-center"
        >
          <div className="space-y-4">
            {newsItems.map((item, index) => (
              <div 
                key={index}
                className="p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="race-label text-racing-red text-[10px]">{item.category}</span>
                  <span className="text-racing-gray text-xs">{item.date}</span>
                </div>
                <h3 className="text-white font-semibold group-hover:text-racing-red transition-colors flex items-center justify-between">
                  {item.title}
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Title */}
        <div 
          ref={rightPanelRef}
          className="flex-1 h-full bg-racing-charcoal p-8 md:p-12 flex flex-col justify-center"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Newspaper className="w-8 h-8 text-racing-red" />
              <span className="race-label text-racing-red">LATEST</span>
            </div>

            <h2 className="race-heading text-[clamp(36px,5vw,64px)] text-white">
              NEWS &< br/>
              UPDATES
            </h2>

            <p className="text-racing-gray max-w-sm">
              Stay informed with the latest from the South African grassroots racing scene.
            </p>

            <button className="race-pill-red flex items-center gap-2 hover:scale-105 transition-transform">
              Read All News
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
