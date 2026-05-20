"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Sparkles, Users, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const PixelBlast = dynamic(() => import("./PixelBlast"), {
    ssr: false,
    loading: () => (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0F] via-[#0d0d14] to-[#0A0A0F]" />
    ),
});
import { ConversionModal } from "./ConversionModal";

export function HeroSection() {
    const t = useTranslations('hero');
    const [isWizardOpen, setIsWizardOpen] = useState(false);

    return (
        <section
            aria-labelledby="hero-title"
            className="relative overflow-hidden min-h-[90vh] flex items-center pb-24 md:pb-32"
        >
            {/* ... Background components ... */}
            <div className="absolute inset-0 z-0">
                <PixelBlast patternDensity={0.65} speed={0.4} />
            </div>
            
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/75 via-black/40 to-transparent pointer-events-none"></div>
            <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent pointer-events-none"></div>

            <div className="site-container relative z-10">
                <div className="max-w-5xl relative">
                    {/* ... Badge and Title ... */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass border-primary/20 mb-8"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">{t('status')}</span>
                    </motion.div>
    
                    <motion.h1 
                        id="hero-title"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="font-serif text-6xl md:text-8xl text-ivory tracking-tighter mb-8 leading-[0.85] font-normal text-left drop-shadow-2xl"
                    >
                        {t('headline')}<br />
                        <span className="italic font-light opacity-60 text-primary">{t('headline_suffix')}</span>
                    </motion.h1>
    
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="max-w-2xl text-muted-foreground text-lg md:text-xl font-light mb-8 leading-relaxed text-left"
                    >
                        {t('subtitle')}
                    </motion.p>

                    <motion.ul
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl space-y-3 mb-12 text-left"
                    >
                        {[0, 1, 2].map((i) => (
                            <li key={i} className="flex items-start gap-3 text-sm md:text-base text-white/70 font-light">
                                <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
                                {t(`bullets.${i}`)}
                            </li>
                        ))}
                    </motion.ul>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col sm:flex-row gap-4 justify-start items-center sm:items-start"
                    >
                        <button 
                            onClick={() => setIsWizardOpen(true)}
                            className="h-16 px-8 text-lg rounded-full bg-primary text-black hover:bg-primary/90 transition-all hover:scale-105 group border-none shadow-[0_0_30px_rgba(189,235,52,0.3)] flex items-center justify-center font-bold w-full sm:w-auto"
                            aria-label={t('cta_primary')}
                        >
                            {t('cta_primary')}
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button 
                            className="h-16 px-8 text-lg rounded-full liquid-glass border-white/10 hover:bg-white/5 text-ivory flex items-center gap-3 bg-transparent border backdrop-blur-md w-full sm:w-auto justify-center"
                            aria-label={t('cta_secondary')}
                        >
                            <Terminal className="w-5 h-5 text-primary" />
                            {t('cta_secondary')}
                        </button>
                    </motion.div>
                </div>

                {/* ... Badges ... */}
            </div>

            <ConversionModal 
                isOpen={isWizardOpen} 
                onClose={() => setIsWizardOpen(false)} 
            />
        </section>
    );
}
