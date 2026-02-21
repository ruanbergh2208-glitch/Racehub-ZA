import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CommunitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const mosaicRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const mosaic = mosaicRef.current;
    const content = contentRef.current;

    if (!section || !card || !mosaic || !content) return;

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
        .fromTo(mosaic.children, 
          { y: '60vh', scale: 0.9, opacity: 0 }, 
          { y: 0, scale: 1, opacity: 1, stagger: 0.02, ease: 'none' }, 
          0
        )
        .fromTo(content, 
          { x: '60vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(mosaic, 
          { y: 0, opacity: 1 }, 
          { y: '-12vh', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(content, 
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

  const images = [
    '/community_01.jpg',
    '/community_02.jpg',
    '/community_03.jpg',
    '/community_04.jpg',
  ];

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden z-[90]"
    >
      <div 
        ref={cardRef}
        className="race-card w-[min(1180px,92vw)] h-[min(840px,88vh)] flex overflow-hidden"
      >
        {/* Left Panel - Mosaic */}
        <div 
          ref={mosaicRef}
          className="w-1/2 h-full hidden md:grid grid-cols-2 grid-rows-2 gap-2 p-2"
        >
          {images.map((src, index) => (
            <div 
              key={index}
              className="relative overflow-hidden rounded-xl"
            >
              <img 
                src={src} 
                alt={`Community ${index + 1}`} 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* Right Panel - Content */}
        <div 
          ref={contentRef}
          className="flex-1 h-full bg-racing-charcoal p-8 md:p-12 flex flex-col justify-center"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Camera className="w-8 h-8 text-racing-red" />
              <span className="race-label text-racing-red">COMMUNITY</span>
            </div>

            <h2 className="race-heading text-[clamp(36px,5vw,64px)] text-white">
              SHARE<br />
              THE RIDE
            </h2>

            <p className="text-racing-gray max-w-md leading-relaxed">
              Tag #RaceHubZA to be featured. Clubs, drivers, crews—show the world what you're building.
            </p>

            <button className="race-pill-red flex items-center gap-2 hover:scale-105 transition-transform">
              Submit Media
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
