import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Facebook, Youtube, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // Flowing section - simple fade in when entering viewport
      gsap.fromTo(content, 
        { y: 20, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const footerLinks = {
    Product: ['Events', 'Clubs', 'Drivers', 'Marketplace', 'Results'],
    Company: ['About', 'Careers', 'Press', 'Partners'],
    Support: ['Help Center', 'Contact', 'Status', 'Feedback'],
    Legal: ['Privacy', 'Terms', 'Cookies', 'Licenses'],
  };

  return (
    <footer 
      ref={sectionRef} 
      className="relative w-full bg-racing-black py-16 px-8 z-[150]"
    >
      <div ref={contentRef} className="max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          {/* Logo & Tagline */}
          <div className="max-w-sm">
            <h3 className="text-2xl font-bold text-white mb-3">RaceHub ZA</h3>
            <p className="text-racing-gray text-sm leading-relaxed">
              The digital engine of South African grassroots racing. Connecting clubs, drivers, and fans.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="race-label text-white text-xs mb-4">{category}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a 
                        href="#" 
                        className="text-racing-gray text-sm hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-racing-gray text-sm">
              © 2026 RaceHub ZA. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <a href="#" className="text-racing-gray hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-racing-gray hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-racing-gray hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-racing-gray hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
