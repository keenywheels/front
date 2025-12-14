import { RegisterDialog } from '@features/vkid-auth';
import { LandingNavbar } from '@widgets/layouts/landing-navbar';

import { FeaturesSection } from './features.ui';
import { FooterSection } from './footer.ui';
import { HeroSection } from './hero.ui';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <FooterSection />
      </main>
      <RegisterDialog />
    </div>
  );
};
