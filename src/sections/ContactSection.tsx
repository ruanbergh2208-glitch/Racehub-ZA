import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Send, Instagram, Facebook, Youtube } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
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

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden z-[140]"
    >
      <div 
        ref={cardRef}
        className="race-card w-[min(1180px,92vw)] h-[min(840px,88vh)] flex overflow-hidden"
      >
        {/* Left Panel - Form */}
        <div 
          ref={leftPanelRef}
          className="w-1/2 h-full bg-racing-charcoal p-8 md:p-12 flex flex-col justify-center"
        >
          <div className="space-y-6 max-w-md">
            <h3 className="text-white font-bold text-xl mb-4">Send us a message</h3>
            
            <div className="space-y-4">
              <div>
                <label className="race-label text-racing-gray text-[10px] mb-2 block">NAME</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-racing-red transition-colors"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="race-label text-racing-gray text-[10px] mb-2 block">EMAIL</label>
                <input 
                  type="email" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-racing-red transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="race-label text-racing-gray text-[10px] mb-2 block">MESSAGE</label>
                <textarea 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-racing-red transition-colors resize-none"
                  rows={4}
                  placeholder="How can we help?"
                />
              </div>
            </div>

            <button className="race-pill-red flex items-center gap-2 w-full justify-center hover:scale-105 transition-transform">
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </div>
        </div>

        {/* Right Panel - Contact Info */}
        <div 
          ref={rightPanelRef}
          className="flex-1 h-full bg-racing-black p-8 md:p-12 flex flex-col justify-center"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Mail className="w-8 h-8 text-racing-red" />
              <span className="race-label text-racing-red">CONTACT</span>
            </div>

            <h2 className="race-heading text-[clamp(32px,4vw,56px)] text-white">
              GET IN<br />
              TOUCH
            </h2>

            <p className="text-racing-gray max-w-sm">
              Have questions? We're here to help clubs, drivers, and fans make the most of RaceHub ZA.
            </p>

            <div className="pt-4">
              <p className="text-racing-gray text-sm mb-2">Email us at</p>
              <a 
                href="mailto:support@racehubza.co.za" 
                className="text-white text-lg hover:text-racing-red transition-colors"
              >
                support@racehubza.co.za
              </a>
            </div>

            <div className="pt-4">
              <p className="text-racing-gray text-sm mb-3">Follow us</p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-racing-red hover:border-racing-red transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-racing-red hover:border-racing-red transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-racing-red hover:border-racing-red transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
