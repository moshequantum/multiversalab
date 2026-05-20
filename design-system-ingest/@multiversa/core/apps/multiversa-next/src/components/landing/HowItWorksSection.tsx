"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Globe, Zap, Link2, Terminal } from "lucide-react";
import { SpotlightCard } from "../ui/SpotlightCard";
import { ConversionModal } from "./ConversionModal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        id: "nano",
        icon: Globe,
        accent: "text-gray-400",
        iconBg: "bg-white/5 border-white/10",
        spotlight: "rgba(255, 255, 255, 0.05)",
        highlight: false,
        hasJtbd: false,
    },
    {
        id: "spark",
        icon: Zap,
        accent: "text-primary",
        iconBg: "bg-primary/10 border-primary/20",
        spotlight: "rgba(189, 235, 52, 0.1)",
        highlight: true,
        hasJtbd: true,
    },
    {
        id: "pulse",
        icon: Link2,
        accent: "text-teal-400",
        iconBg: "bg-teal-500/10 border-teal-500/20",
        spotlight: "rgba(78, 205, 196, 0.1)",
        highlight: false,
        hasJtbd: true,
    },
    {
        id: "cortex",
        icon: Terminal,
        accent: "text-violet-400",
        iconBg: "bg-violet-500/10 border-violet-500/20",
        spotlight: "rgba(168, 148, 255, 0.1)",
        highlight: false,
        hasJtbd: true,
    },
];

export function HowItWorksSection() {
    const t = useTranslations("pricing");
    const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
    const cardsRef = useRef<HTMLDivElement>(null);
    const benchmarkRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Cards: stagger in from right with custom bezier
            const cards = cardsRef.current?.querySelectorAll<HTMLElement>(".tier-card");
            if (cards && cards.length) {
                gsap.fromTo(
                    cards,
                    { x: 80, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        stagger: 0.1,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: "top 82%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            // Benchmark: header + rows stagger
            if (benchmarkRef.current) {
                gsap.fromTo(
                    benchmarkRef.current.querySelectorAll<HTMLElement>("thead tr, tbody tr"),
                    { opacity: 0, y: 16 },
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.07,
                        duration: 0.55,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: benchmarkRef.current,
                            start: "top 80%",
                        },
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <section id="pricing" className="py-32 relative overflow-hidden">
            <div className="site-container relative z-10">
                {/* Section header */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-6"
                    >
                        <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                            {t("tag")}
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-serif text-4xl md:text-6xl text-white mb-6 tracking-tighter"
                    >
                        {t("title")} <br />
                        <span className="text-primary italic font-light">
                            {t("title_suffix")}
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-muted-foreground text-lg max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        {t("subtitle")}
                    </motion.p>
                </div>
            </div>

            {/* Tier Cards — horizontal scroll */}
            <div className="relative">
                <div className="overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <div
                        ref={cardsRef}
                        className="flex gap-6 px-4 sm:px-8 lg:px-[max(2rem,calc((100vw-1420px)/2+5rem))] min-w-max"
                    >
                        {/* Connecting line visible on wide screens */}
                        <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-white/10 via-primary/30 via-50% to-violet-400/30 pointer-events-none" />

                        {steps.map((step) => (
                            <div
                                key={step.id}
                                className={`tier-card shrink-0 w-[300px] md:w-[340px] relative ${step.highlight ? "pt-6" : ""}`}
                            >
                                {/* Recommended badge — outside SpotlightCard to avoid clip */}
                                {step.highlight && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 bg-primary text-black text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-[0_4px_20px_rgba(189,235,52,0.4)] whitespace-nowrap">
                                        {t("recommended")}
                                    </div>
                                )}

                                <SpotlightCard
                                    className={`h-full ${
                                        step.highlight
                                            ? "border-primary/50 bg-primary/[0.03] shadow-[0_0_60px_rgba(189,235,52,0.08)] ring-1 ring-primary/20 pt-10 px-8 pb-8"
                                            : "p-8 border-white/5"
                                    }`}
                                    spotlightColor={step.spotlight}
                                >
                                    {/* Step icon + label */}
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${step.iconBg}`}>
                                            <step.icon className={`w-6 h-6 ${step.accent}`} />
                                        </div>
                                        <div className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                                            {t(`steps.${step.id}.step_label`)}
                                        </div>
                                    </div>

                                    <h3 className="font-serif text-2xl text-white mb-2 tracking-tight">
                                        {t(`steps.${step.id}.name`)}
                                    </h3>
                                    <p className={`font-mono text-xs uppercase tracking-widest mb-1 ${step.highlight ? "text-primary" : "text-primary/60"}`}>
                                        {t(`steps.${step.id}.price`)}
                                    </p>

                                    {/* Scarcity / price after (Spark only) */}
                                    {step.id === "spark" && (
                                        <div className="mb-4 space-y-2">
                                            <span className="text-[10px] text-primary/80 font-bold uppercase tracking-widest flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                                {t("steps.spark.scarcity")}
                                            </span>
                                            <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                                                {t("steps.spark.price_after")}
                                            </span>
                                        </div>
                                    )}

                                    {/* JTBD quote */}
                                    {step.hasJtbd && (
                                        <div className="mb-4 pl-3 border-l-2 border-white/10">
                                            <p className="text-xs text-white/40 italic font-light leading-relaxed">
                                                &ldquo;{t(`steps.${step.id}.jtbd`)}&rdquo;
                                            </p>
                                        </div>
                                    )}

                                    <p className="text-muted-foreground font-light text-sm leading-relaxed mb-6">
                                        {t(`steps.${step.id}.description`)}
                                    </p>

                                    {/* Features */}
                                    <ul className="space-y-3 mb-8">
                                        {[0, 1, 2].map((i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm text-white/60 font-light">
                                                <div className="flex-shrink-0 w-1 h-1 rounded-full bg-primary" />
                                                {t(`steps.${step.id}.features.${i}`)}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <button
                                        onClick={() => setIsWaitlistOpen(true)}
                                        className={`w-full py-3 rounded-2xl font-mono text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 active:scale-95 ${
                                            step.highlight
                                                ? "bg-primary text-black hover:bg-white hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] shadow-[0_0_30px_rgba(189,235,52,0.3)]"
                                                : "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20"
                                        }`}
                                    >
                                        {t(`steps.${step.id}.cta`)}
                                    </button>
                                </SpotlightCard>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="site-container relative z-10">
                {/* Speed callout */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-10 text-center"
                >
                    <span className="font-mono text-xs uppercase tracking-widest text-primary/60">
                        {t("speed_callout")}
                    </span>
                </motion.div>

                {/* Benchmark Comparison Table */}
                <div className="mt-24" ref={benchmarkRef}>
                    <div className="text-center mb-12">
                        <h3 className="font-serif text-3xl text-white mb-4 tracking-tight">
                            {t('comparison.title')}
                        </h3>
                        <div className="h-0.5 w-24 bg-primary/30 mx-auto rounded-full" />
                    </div>

                    <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/5">
                                        <th className="p-6 text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 bg-white/[0.02]">{t('comparison.headers.feature')}</th>
                                        <th className="p-6 text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 text-center">{t('comparison.headers.nano')}</th>
                                        <th className="p-6 text-[10px] font-mono uppercase tracking-[0.2em] text-primary text-center bg-primary/5">{t('comparison.headers.spark')}</th>
                                        <th className="p-6 text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 text-center">{t('comparison.headers.pulse')}</th>
                                        <th className="p-6 text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 text-center">{t('comparison.headers.cortex')}</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[11px] font-light">
                                    {['dna', 'orchestration', 'memory', 'cto', 'support', 'delivery'].map((feature) => (
                                        <tr key={feature} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors group">
                                            <td className="p-6 text-gray-400 font-medium bg-white/[0.01]">
                                                {t(`comparison.features.${feature}`)}
                                            </td>
                                            <td className="p-6 text-gray-500 text-center">{t(`comparison.values.nano.${feature}`)}</td>
                                            <td className="p-6 text-white text-center font-bold bg-primary/[0.02] group-hover:bg-primary/[0.03]">{t(`comparison.values.spark.${feature}`)}</td>
                                            <td className="p-6 text-gray-400 text-center">{t(`comparison.values.pulse.${feature}`)}</td>
                                            <td className="p-6 text-gray-400 text-center">{t(`comparison.values.cortex.${feature}`)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <ConversionModal
                isOpen={isWaitlistOpen}
                onClose={() => setIsWaitlistOpen(false)}
            />
        </section>
    );
}
