import {setRequestLocale} from 'next-intl/server';
import {Header} from '@/components/layout/Header';
import {HeroSection} from '@/components/landing/HeroSection';
import {WhatIsMultiversaSection} from '@/components/landing/WhatIsMultiversaSection';
import {TriadSection} from '@/components/landing/TriadSection';
import {IndustriesSection} from '@/components/landing/IndustriesSection';
import {HowItWorksSection} from '@/components/landing/HowItWorksSection';
import {StepsSection} from '@/components/landing/StepsSection';
import {SocialProofSection} from '@/components/landing/SocialProofSection';
import {FAQSection} from '@/components/landing/FAQSection';
import {Footer} from '@/components/landing/Footer';
import {PipelineBar} from '@/components/landing/PipelineBar';

export default async function Home({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-col min-h-screen bg-[#0A0A0F]">
      <Header />

      <div className="relative z-10 flex flex-col pt-24">
        <HeroSection />

        <div className="space-y-0">
          <WhatIsMultiversaSection />
          <TriadSection />
          <IndustriesSection />
          <HowItWorksSection />
          <StepsSection />
          <SocialProofSection />
          <FAQSection />
        </div>

        <Footer />
      </div>

      <PipelineBar />
    </main>
  );
}
