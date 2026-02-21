import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function StandingsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const leftPanel = leftPanelRef.current;
    const rightPanel = rightPanelRef.current;
    const table = tableRef.current;

    if (!section || !card || !leftPanel || !rightPanel || !table) return;

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
        .fromTo(table.rows, 
          { y: 18, opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 
          0.12
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

  const standings = [
    { pos: 1, driver: 'Sipho Mletha', points: 245 },
    { pos: 2, driver: 'Aiden Paulse', points: 232 },
    { pos: 3, driver: 'Thando Nkosi', points: 218 },
    { pos: 4, driver: 'Jordan Peters', points: 201 },
    { pos: 5, driver: 'Liam Johnson', points: 189 },
  ];

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden z-[70]"
    >
      <div 
        ref={cardRef}
        className="race-card w-[min(1180px,92vw)] h-[min(840px,88vh)] flex overflow-hidden"
      >
        {/* Left Panel - Title */}
        <div 
          ref={leftPanelRef}
          className="w-1/2 h-full bg-racing-charcoal p-8 md:p-12 flex flex-col justify-center"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-racing-red" />
              <span className="race-label text-racing-red">STANDINGS</span>
            </div>

            <h2 className="race-heading text-[clamp(32px,4.5vw,56px)] text-white">
              CHAMPIONSHIP<br />
              STANDINGS
            </h2>

            <p className="text-racing-gray">
              2025 Western Province Kart Championship
            </p>

            <button className="race-pill-red flex items-center gap-2 hover:scale-105 transition-transform">
              View Full Table
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Panel - Table */}
        <div 
          ref={rightPanelRef}
          className="flex-1 h-full bg-racing-black p-8 md:p-12 flex flex-col justify-center"
        >
          <table ref={tableRef} className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 text-racing-gray race-label">POS</th>
                <th className="text-left py-3 text-racing-gray race-label">DRIVER</th>
                <th className="text-right py-3 text-racing-gray race-label">PTS</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((row, index) => (
                <tr key={index} className="border-b border-white/5">
                  <td className="py-4">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      row.pos === 1 ? 'bg-yellow-500 text-black' :
                      row.pos === 2 ? 'bg-gray-400 text-black' :
                      row.pos === 3 ? 'bg-amber-700 text-white' :
                      'bg-white/10 text-white'
                    }`}>
                      {row.pos}
                    </span>
                  </td>
                  <td className="py-4 text-white font-medium">{row.driver}</td>
                  <td className="py-4 text-right text-racing-red font-bold">{row.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
