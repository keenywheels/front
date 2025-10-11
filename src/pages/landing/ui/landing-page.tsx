import { LandingNavbar } from '@widgets/landing-navbar';

import { FeaturesSection } from './features';
import { FooterSection } from './footer';
import { HeroSection } from './hero';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
      </main>
      <FooterSection />
    </div>
  );
};
