"use client";

import { motion } from "framer-motion";
import { Building2, Stethoscope, Brain, Home, Briefcase, ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";

const industries = [
    { key: "clinics", icon: Stethoscope, tone: "text-emerald-400" },
    { key: "realestate", icon: Home, tone: "text-blue-400" },
    { key: "wellness", icon: Brain, tone: "text-violet-400" },
    { key: "agencies", icon: Building2, tone: "text-primary" },
    { key: "professionals", icon: Briefcase, tone: "text-amber-400" },
    { key: "commerce", icon: ShoppingBag, tone: "text-rose-400" },
];

export function IndustriesSection() {
    const t = useTranslations('industries');

    return (
        <section className="relative py-20 bg-[#0A0A0F] overflow-hidden">
            <div className="site-container relative z-10">
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-serif text-3xl md:text-4xl text-white mb-4"
                    >
                        {t('title')} <span className="text-primary italic font-serif">{t('title_suffix')}</span>
                    </motion.h2>
                    <p className="font-sans text-gray-500 text-base max-w-xl mx-auto font-light">
                        {t('subtitle')}
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-3"
                >
                    {industries.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.key}
                                className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300"
                            >
                                <Icon className={`w-4 h-4 ${item.tone}`} />
                                <span className="text-sm text-white/80 font-light">
                                    {t(`cards.${item.key}.title`)}
                                </span>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
