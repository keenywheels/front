import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

import { toast } from 'sonner';

import { RegisterDialog } from '@features/vkid-auth';
import { LandingNavbar } from '@widgets/layouts/landing-navbar';

import { FeaturesSection } from './features.ui';
import { FooterSection } from './footer.ui';
import { HeroSection } from './hero.ui';

export const LandingPage = () => {
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    if (params.get('redirect_reason') === 'auth') {
      toast.warning(
        'Вы не можете выполнить это действие. Авторизуйтесь и попробуйте снова',
      );
      params.delete('redirect_reason');
      setParams(params, { replace: true });
    }
  }, [params, setParams]);

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
