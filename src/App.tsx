import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroSection from './sections/HeroSection';
import EventSpotlightSection from './sections/EventSpotlightSection';
import EventInfoSection from './sections/EventInfoSection';
import ClubProfileSection from './sections/ClubProfileSection';
import DriverSpotlightSection from './sections/DriverSpotlightSection';
import RaceResultsSection from './sections/RaceResultsSection';
import StandingsSection from './sections/StandingsSection';
import MarketplaceSection from './sections/MarketplaceSection';
import CommunitySection from './sections/CommunitySection';
import MembershipSection from './sections/MembershipSection';
import NewsSection from './sections/NewsSection';
import TestimonialsSection from './sections/TestimonialsSection';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';
import FooterSection from './sections/FooterSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timeout = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with small buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        }
      });
    }, 500);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <main className="relative bg-racing-black min-h-screen">
      {/* Noise Overlay */}
      <div className="noise-overlay" />
      
      {/* Sections with z-index stacking */}
      <HeroSection />
      <EventSpotlightSection />
      <EventInfoSection />
      <ClubProfileSection />
      <DriverSpotlightSection />
      <RaceResultsSection />
      <StandingsSection />
      <MarketplaceSection />
      <CommunitySection />
      <MembershipSection />
      <NewsSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}

export default App;
