"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

export function StepsSection() {
    const t = useTranslations("steps_section");

    return (
        <section id="steps" className="py-32 relative overflow-hidden border-t border-white/5">
            <div className="site-container relative z-10">
                {/* Header */}
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-6"
                    >
                        <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                        <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                            {t("tag")}
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-serif text-4xl md:text-5xl text-white mb-4 tracking-tighter"
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
                        className="text-muted-foreground font-light text-lg"
                    >
                        {t("subtitle")}
                    </motion.p>
                </div>

                {/* Steps */}
                <div className="space-y-0">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.6 }}
                            className="flex items-start gap-6 group"
                        >
                            {/* Left — number + connector */}
                            <div className="flex flex-col items-center flex-shrink-0">
                                <div className="w-12 h-12 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-300">
                                    <span className="font-mono text-xs text-primary font-bold">
                                        {t(`steps.${i}.number`)}
                                    </span>
                                </div>
                                {i < 2 && (
                                    <div className="w-px h-16 bg-gradient-to-b from-white/10 to-transparent mt-2" />
                                )}
                            </div>

                            {/* Right — content */}
                            <div className={`pb-12 ${i < 2 ? "" : ""}`}>
                                <h3 className="font-serif text-xl text-white mb-2 tracking-tight">
                                    {t(`steps.${i}.title`)}
                                </h3>
                                <p className="text-muted-foreground font-light text-sm leading-relaxed max-w-lg">
                                    {t(`steps.${i}.description`)}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-4"
                >
                    <a
                        href="https://cal.com/multiversa/estrategia"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 h-14 px-8 rounded-full bg-primary text-black font-mono text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(189,235,52,0.25)] group"
                    >
                        {t("cta")}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
