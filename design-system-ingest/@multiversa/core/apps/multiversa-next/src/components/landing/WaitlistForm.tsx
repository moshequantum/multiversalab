"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, ListFilter, Users, Zap, Building2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { insforge } from "@/lib/insforge";
import { getMachineId } from "@/lib/identity";

interface WaitlistFormProps {
    onSuccess?: () => void;
}

export function WaitlistForm({ onSuccess }: WaitlistFormProps) {
    const t = useTranslations("pipeline");
    const [email, setEmail] = useState("");
    const [persona, setPersona] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !persona) return;

        setIsLoading(true);
        setError(null);

        try {
            const { error: dbError } = await insforge.database
                .from('leads')
                .insert({
                    email,
                    persona,
                    machine_id: getMachineId(),
                    source: 'landing_waitlist',
                    created_at: new Date().toISOString()
                });

            if (dbError) throw dbError;

            setIsSubmitted(true);
            onSuccess?.();
            
            // Clean up form
            setEmail("");
            setPersona(null);
        } catch (err: any) {
            console.error('Waitlist submission error:', err);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const personas = [
        { id: "founder", label: t('personas.founder'), icon: <Zap className="w-4 h-4" /> },
        { id: "agency", label: t('personas.agency'), icon: <Users className="w-4 h-4" /> },
        { id: "corp", label: t('personas.corp'), icon: <Building2 className="w-4 h-4" /> }
    ];

    return (
        <div className="w-full max-w-xl mx-auto p-10 relative overflow-hidden">
            <AnimatePresence mode="wait">
                {!isSubmitted ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative z-10"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/20 shadow-[0_0_20px_rgba(189,235,52,0.1)]">
                                <ListFilter className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-serif text-ivory leading-tight">{t('waitlist_title')}</h3>
                                <p className="text-sm text-muted-foreground font-light tracking-wide">{t('waitlist_subtitle')}</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {personas.map((p) => (
                                    <button
                                        key={p.id}
                                        type="button"
                                        onClick={() => setPersona(p.id)}
                                        className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-500 ${
                                            persona === p.id 
                                            ? 'bg-primary/20 border-primary shadow-[0_0_30px_rgba(189,235,52,0.15)] scale-[1.02]' 
                                            : 'bg-white/5 border-white/5 hover:border-white/10 grayscale hover:grayscale-0'
                                        }`}
                                    >
                                        <div className={`mb-3 transition-transform duration-500 ${persona === p.id ? 'text-primary scale-110' : 'text-muted-foreground'}`}>
                                            {p.icon}
                                        </div>
                                        <span className={`text-[10px] uppercase tracking-[0.2em] font-bold text-center leading-tight ${persona === p.id ? 'text-primary' : 'text-muted-foreground'}`}>
                                            {p.label}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <div className="relative group">
                                <input
                                    type="email"
                                    required
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-6 font-light text-ivory placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50 transition-all font-mono text-sm shadow-inner"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !persona}
                                    className="absolute right-2 top-2 h-12 px-8 rounded-xl bg-primary text-black font-bold text-xs uppercase tracking-widest hover:bg-primary/90 transition-all disabled:opacity-50 disabled:grayscale shadow-lg active:scale-95"
                                >
                                    {isLoading ? '...' : <Send className="w-5 h-5" />}
                                </button>
                            </div>
                            
                            {error && (
                                <p className="text-destructive text-xs font-mono tracking-wider animate-pulse">{error}</p>
                            )}
                        </form>
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="text-center py-12"
                    >
                        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center border border-primary/20 mx-auto mb-8 shadow-[0_0_40px_rgba(189,235,52,0.2)]">
                            <CheckCircle2 className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="text-3xl font-serif text-ivory mb-3 italic tracking-tight">{t('success_title')}</h3>
                        <p className="text-muted-foreground font-light text-base max-w-xs mx-auto">{t('success_subtitle')}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
