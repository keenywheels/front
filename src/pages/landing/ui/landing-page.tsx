import { FooterSection } from '@pages/landing/ui/footer.tsx';
import { PageLayout } from '@shared/ui/page-layout.tsx';

import { FeaturesSection } from './features.tsx';
import { HeroSection } from './hero';
import { Navbar } from './navbar';

export const LandingPage = () => {
  return (
    <PageLayout className="min-h-screen bg-background">
      <Navbar />

      <main>
        <HeroSection />
        <FeaturesSection />
        <FooterSection />
      </main>
    </PageLayout>
  );
};
