import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Download, Users, Trophy } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function EventInfoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const leftPanel = leftPanelRef.current;
    const rightPanel = rightPanelRef.current;
    const content = contentRef.current;

    if (!section || !card || !leftPanel || !rightPanel || !content) return;

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
        )
        .fromTo(content.children, 
          { y: 30, opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 
          0.1
        );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(leftPanel, 
          { x: 0, opacity: 1 }, 
          { x: '-18vw', opacity: 0.25, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(rightPanel, 
          { x: 0, opacity: 1 }, 
          { x: '18vw', opacity: 0.25, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(content, 
          { y: 0, opacity: 1 }, 
          { y: -16, opacity: 0, ease: 'power2.in' }, 
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

  const scheduleItems = [
    { icon: Clock, label: 'Practice', time: '08:00 – 10:00' },
    { icon: Trophy, label: 'Qualifying', time: '10:30 – 12:00' },
    { icon: Users, label: 'Races', time: '13:00 – 17:00' },
    { icon: null, label: 'Classes', time: 'Mini, Junior, Senior, DD2' },
  ];

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden z-30"
    >
      <div 
        ref={cardRef}
        className="race-card w-[min(1180px,92vw)] h-[min(840px,88vh)] flex overflow-hidden"
      >
        {/* Left Panel - Image */}
        <div 
          ref={leftPanelRef}
          className="relative w-1/2 h-full hidden md:block"
        >
          <img 
            src="/event_info_pit_bg.jpg" 
            alt="Pit lane" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-racing-charcoal/80" />
        </div>

        {/* Right Panel - Info */}
        <div 
          ref={rightPanelRef}
          className="flex-1 h-full bg-racing-charcoal p-8 md:p-12 flex flex-col justify-center"
        >
          <div ref={contentRef} className="space-y-6">
            <h2 className="race-heading text-[clamp(32px,4vw,56px)] text-white mb-8">
              EVENT INFO
            </h2>

            <div className="space-y-4">
              {scheduleItems.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  {item.icon && <item.icon className="w-5 h-5 text-racing-red" />}
                  {!item.icon && <div className="w-5 h-5" />}
                  <div>
                    <p className="text-xs text-racing-gray uppercase tracking-wider">{item.label}</p>
                    <p className="text-white font-medium">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="race-pill flex items-center gap-2 mt-6 hover:bg-white/10 transition-colors">
              <Download className="w-4 h-4" />
              Download Event Guide
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
