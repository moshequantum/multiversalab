"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

const testimonials = [
    {
        id: "andrea",
        image: "/testimonials/andrea.webp",
        accentColor: "border-rose-500/30",
        glowColor: "shadow-[0_0_30px_rgba(255,107,157,0.08)]",
        starColor: "text-rose-400",
    },
    {
        id: "mario",
        image: "/testimonials/mario.png",
        accentColor: "border-teal-500/30",
        glowColor: "shadow-[0_0_30px_rgba(78,205,196,0.08)]",
        starColor: "text-teal-400",
    },
    {
        id: "mauro",
        image: "/testimonials/mauro.png",
        accentColor: "border-primary/30",
        glowColor: "shadow-[0_0_30px_rgba(189,235,52,0.08)]",
        starColor: "text-primary",
    },
    {
        id: "rafael",
        image: "/testimonials/rafael.png",
        accentColor: "border-violet-500/30",
        glowColor: "shadow-[0_0_30px_rgba(168,148,255,0.08)]",
        starColor: "text-violet-400",
    },
    {
        id: "nicolas",
        image: "/testimonials/nicolas.png",
        accentColor: "border-teal-500/30",
        glowColor: "shadow-[0_0_30px_rgba(78,205,196,0.08)]",
        starColor: "text-teal-400",
    },
];

// Duplicate for infinite marquee
const row1 = [...testimonials, ...testimonials, ...testimonials];
const row2 = [...testimonials.slice().reverse(), ...testimonials.slice().reverse(), ...testimonials.slice().reverse()];

function useMarqueeRow(baseSpeed: number) {
    const controls = useAnimationControls();
    const [paused, setPaused] = useState(false);

    const pause = () => {
        setPaused(true);
        controls.stop();
    };
    const resume = () => {
        setPaused(false);
        controls.start({
            x: ["0%", "-50%"],
            transition: { duration: baseSpeed, repeat: Infinity, ease: "linear" },
        });
    };

    return { controls, paused, pause, resume };
}

export function SocialProofSection() {
    const t = useTranslations("social_proof");

    // Row 1: moves left (x: 0 → -50%)
    const row1Controls = useAnimationControls();
    const [row1Paused, setRow1Paused] = useState(false);

    // Row 2: moves right (x: -50% → 0)
    const row2Controls = useAnimationControls();
    const [row2Paused, setRow2Paused] = useState(false);

    // Active card index for the spotlight controller
    const [activeIdx, setActiveIdx] = useState(0);

    const prev = () => setActiveIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
    const next = () => setActiveIdx((i) => (i + 1) % testimonials.length);

    return (
        <section id="social-proof" className="py-32 relative overflow-hidden bg-background">
            {/* Background elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="site-container relative z-10">
                {/* Section Header */}
                <div className="max-w-3xl mb-24">
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
            </div>

            {/* Testimonials Carousel Container */}
            <div className="flex flex-col gap-16 select-none relative">
                {/* Row 1: To the LEFT */}
                <div
                    className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
                    onMouseEnter={() => setRow1Paused(true)}
                    onMouseLeave={() => setRow1Paused(false)}
                >
                    <motion.div
                        initial={{ x: 0 }}
                        animate={row1Paused ? {} : { x: "-50%" }}
                        transition={{
                            repeat: Infinity,
                            duration: 70,
                            ease: "linear",
                        }}
                        className="flex gap-12 whitespace-nowrap pl-12"
                    >
                        {row1.map((testimonial, idx) => (
                            <TestimonialCard
                                key={`${testimonial.id}-1-${idx}`}
                                testimonial={testimonial}
                                t={t}
                                isActive={testimonial.id === testimonials[activeIdx].id}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* Row 2: To the RIGHT */}
                <div
                    className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
                    onMouseEnter={() => setRow2Paused(true)}
                    onMouseLeave={() => setRow2Paused(false)}
                >
                    <motion.div
                        initial={{ x: "-50%" }}
                        animate={row2Paused ? {} : { x: 0 }}
                        transition={{
                            repeat: Infinity,
                            duration: 80,
                            ease: "linear",
                        }}
                        className="flex gap-12 whitespace-nowrap pl-12"
                    >
                        {row2.map((testimonial, idx) => (
                            <TestimonialCard
                                key={`${testimonial.id}-2-${idx}`}
                                testimonial={testimonial}
                                t={t}
                                isActive={testimonial.id === testimonials[activeIdx].id}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* Decorative background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] pointer-events-none -z-10" />
            </div>

            <div className="site-container">
                {/* Controls */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 flex items-center justify-center gap-4"
                >
                    <button
                        onClick={prev}
                        className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-primary/30 transition-all active:scale-90"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* Dot indicators */}
                    <div className="flex items-center gap-2">
                        {testimonials.map((item, i) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveIdx(i)}
                                className={`transition-all duration-300 rounded-full ${
                                    i === activeIdx
                                        ? "w-6 h-2 bg-primary"
                                        : "w-2 h-2 bg-white/20 hover:bg-white/40"
                                }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={next}
                        className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-primary/30 transition-all active:scale-90"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </motion.div>

                {/* Active testimonial spotlight */}
                <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-8 max-w-xl mx-auto text-center"
                >
                    <p className="text-ivory/60 text-sm font-light italic">
                        &ldquo;{t(`items.${testimonials[activeIdx].id}.quote`)}&rdquo;
                    </p>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-primary/60">
                        — {t(`items.${testimonials[activeIdx].id}.name`)} · {t(`items.${testimonials[activeIdx].id}.role`)}
                    </p>
                </motion.div>

                {/* Trust Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md">
                        <div className="flex -space-x-2">
                            {testimonials.slice(0, 3).map((item) => (
                                <div
                                    key={item.id}
                                    className="w-7 h-7 rounded-full border-2 border-background overflow-hidden relative"
                                >
                                    <Image
                                        src={item.image}
                                        alt=""
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-ivory/50">
                            {t("trust_bar")}
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function TestimonialCard({ testimonial, t, isActive }: { testimonial: typeof testimonials[0], t: any, isActive?: boolean }) {
    return (
        <div className={`w-[400px] shrink-0 relative p-8 rounded-3xl border backdrop-blur-xl transition-all duration-500 whitespace-normal ${testimonial.accentColor} ${testimonial.glowColor} ${
            isActive
                ? "bg-white/[0.06] scale-[1.02]"
                : "bg-white/[0.02] hover:bg-white/[0.04]"
        } group`}>
            {/* Quote icon */}
            <Quote className="w-8 h-8 text-white/10 mb-6 group-hover:text-white/20 transition-colors" />

            {/* Testimonial text */}
            <p className="text-ivory/80 font-light text-sm leading-relaxed mb-8 italic">
                &ldquo;{t(`items.${testimonial.id}.quote`)}&rdquo;
            </p>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${testimonial.starColor} fill-current`} />
                ))}
            </div>

            {/* Author */}
            <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0">
                    <Image
                        src={testimonial.image}
                        alt={t(`items.${testimonial.id}.name`)}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="min-w-0">
                    <p className="text-white font-medium text-sm truncate">
                        {t(`items.${testimonial.id}.name`)}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 truncate">
                        {t(`items.${testimonial.id}.role`)}
                    </p>
                </div>
            </div>

            {/* Project badge */}
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="font-mono text-[9px] uppercase tracking-widest text-primary/50">
                    {t(`items.${testimonial.id}.project`)}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-primary/20 animate-pulse" />
            </div>
        </div>
    );
}
