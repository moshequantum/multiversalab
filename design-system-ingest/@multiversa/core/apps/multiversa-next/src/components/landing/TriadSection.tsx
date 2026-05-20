"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const agents = [
    {
        id: "astursadeth",
        symbol: "◎",
        colorClass: "text-violet-400",
        bgClass: "bg-violet-500/10 border-violet-500/20",
        glowClass: "shadow-[0_0_40px_rgba(168,148,255,0.15)]",
        dotColor: "bg-violet-400",
    },
    {
        id: "aureon",
        symbol: "⬡",
        colorClass: "text-teal-400",
        bgClass: "bg-teal-500/10 border-teal-500/20",
        glowClass: "shadow-[0_0_40px_rgba(78,205,196,0.15)]",
        dotColor: "bg-teal-400",
    },
    {
        id: "runa",
        symbol: "✦",
        colorClass: "text-rose-400",
        bgClass: "bg-rose-500/10 border-rose-500/20",
        glowClass: "shadow-[0_0_40px_rgba(255,107,157,0.15)]",
        dotColor: "bg-rose-400",
    },
];

export function TriadSection() {
    const t = useTranslations("triad");

    return (
        <section id="triad" className="py-32 relative overflow-hidden">
            <div className="site-container relative z-10">
                <div className="max-w-3xl mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
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
                        className="font-serif text-5xl md:text-7xl text-white tracking-tighter mb-8 leading-[0.9]"
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
                        className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed"
                    >
                        {t("subtitle")}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {agents.map((agent, idx) => (
                        <motion.div
                            key={agent.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15, duration: 0.8 }}
                            className={`relative p-8 rounded-3xl border backdrop-blur-xl ${agent.bgClass} ${agent.glowClass} group hover:scale-[1.02] transition-all duration-500`}
                        >
                            {/* Symbol */}
                            <div className={`text-5xl mb-6 ${agent.colorClass} opacity-80 group-hover:opacity-100 transition-opacity`}>
                                {agent.symbol}
                            </div>

                            {/* Name */}
                            <h3 className="font-serif text-3xl text-white mb-2 tracking-tight">
                                {t(`agents.${agent.id}.name`)}
                            </h3>

                            {/* Role */}
                            <p className="font-mono text-[10px] uppercase tracking-widest text-primary/60 mb-6">
                                {t(`agents.${agent.id}.role`)}
                            </p>

                            {/* Description */}
                            <p className="text-muted-foreground font-light leading-relaxed text-sm mb-8">
                                {t(`agents.${agent.id}.description`)}
                            </p>

                            {/* Status indicator */}
                            <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${agent.dotColor} animate-pulse`}></span>
                                <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                                    {t(`agents.${agent.id}.status`)}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Sub-agents strip */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <p className="text-xs text-white/30 font-light max-w-2xl mx-auto">
                        {t("subagents")}
                    </p>
                </motion.div>

                {/* Core Principle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-8 text-center"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/20 bg-primary/5">
                        <span className="font-serif text-sm text-ivory/80 italic">
                            {t("principle")}
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
