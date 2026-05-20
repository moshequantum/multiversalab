"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { CalendarDays, ListFilter } from "lucide-react";
import { useTrialStatus } from "@/hooks/useTrialStatus";
import { ConversionModal } from "./ConversionModal";

export function PipelineBar() {
    const t = useTranslations("pipeline");
    const [isVisible, setIsVisible] = useState(false);
    const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    const trial = useTrialStatus();

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Show after passing testimonials section (~70%) until near footer
        const show = latest > 0.68 && latest < 0.98;
        if (show !== isVisible) setIsVisible(show);
    });

    return (
        <>
            <motion.div
                initial={{ y: 120, opacity: 0 }}
                animate={isVisible ? { y: 0, opacity: 1 } : { y: 120, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="fixed bottom-0 left-0 right-0 z-[90] px-4 pb-6 pointer-events-none"
            >
                <div className="max-w-4xl mx-auto pointer-events-auto">
                    <div className="flex flex-col sm:flex-row items-center gap-4 px-8 py-5 rounded-[2rem] border border-white/10 bg-black/80 backdrop-blur-3xl shadow-[0_-20px_60px_rgba(0,0,0,0.6)] group">
                        {/* Trial Status Badge */}
                        <div className="hidden md:flex items-center gap-3 pr-6 border-r border-white/10 transition-colors duration-500 group-hover:border-primary/20">
                            <div className={`w-2.5 h-2.5 rounded-full shadow-[0_0_15px_rgba(189,235,52,0.4)] transition-all duration-500 ${trial.isExpired ? 'bg-red-500 shadow-red-500/40' : 'bg-primary animate-pulse'}`} />
                            <div className="flex flex-col">
                                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-primary whitespace-nowrap opacity-80">
                                    {trial.isExpired ? t('trial_expired') : t('trial_status', { days: trial.daysRemaining })}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-1 items-center gap-3 w-full sm:w-auto">
                            {/* Pipeline A: Waitlist */}
                            <button 
                                onClick={() => setIsWaitlistOpen(true)}
                                className="flex-1 h-14 px-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/30 transition-all duration-500 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-ivory font-bold w-full sm:w-auto active:scale-95"
                            >
                                <ListFilter className="w-4 h-4 text-primary" />
                                {t("waitlist_cta")}
                            </button>

                            {/* Pipeline B: Cal.com */}
                            <a 
                                href="https://cal.com/multiversa-group/30min" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex-1 sm:w-auto"
                            >
                                <button className="w-full h-14 px-8 rounded-2xl bg-primary text-black hover:bg-primary/90 transition-all duration-500 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] font-bold shadow-[0_0_30px_rgba(189,235,52,0.25)] active:scale-95 hover:shadow-[0_0_40px_rgba(189,235,52,0.4)]">
                                    <CalendarDays className="w-4 h-4" />
                                    {t("booking_cta")}
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>

            <ConversionModal 
                isOpen={isWaitlistOpen} 
                onClose={() => setIsWaitlistOpen(false)} 
            />
        </>
    );
}
