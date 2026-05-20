"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FAQSection() {
    const t = useTranslations('faq');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    return (
        <section className="py-24 bg-background relative z-10 border-t border-white/5" id="faq">
            <div className="site-container"><div className="max-w-3xl mx-auto">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-serif text-4xl md:text-5xl text-center text-ivory mb-16 tracking-tighter"
                >
                    {t('title')}
                </motion.h2>

                <div className="space-y-4">
                    {items.map((idx) => (
                        <FAQItem
                            key={idx}
                            isOpen={openIndex === idx}
                            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                            question={t(`items.${idx}.question`)}
                            answer={t(`items.${idx}.answer`)}
                        />
                    ))}
                </div>
            </div></div>
        </section>
    );
}

function FAQItem({ isOpen, onClick, question, answer }: { isOpen: boolean, onClick: () => void, question: string, answer: string }) {
    return (
        <div 
            className={cn(
                "border border-white/10 bg-surface/30 backdrop-blur-sm rounded-[24px] px-6 overflow-hidden transition-all duration-500",
                isOpen ? "border-primary/30 bg-primary/5" : "hover:border-white/20"
            )}
        >
            <button 
                onClick={onClick}
                className="w-full flex items-center justify-between py-6 text-left group"
            >
                <span className={cn(
                    "font-sans text-lg transition-colors duration-300",
                    isOpen ? "text-primary" : "text-ivory/90"
                )}>
                    {question}
                </span>
                <ChevronDown className={cn(
                    "w-5 h-5 text-muted-foreground transition-transform duration-500",
                    isOpen && "rotate-180 text-primary"
                )} />
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <div className="pb-6 text-muted-foreground font-light leading-relaxed text-base">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
