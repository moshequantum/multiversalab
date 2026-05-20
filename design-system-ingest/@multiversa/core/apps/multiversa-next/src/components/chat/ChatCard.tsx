"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Zap, Target } from "lucide-react";
import { cn } from "@/lib/utils";

export type CardType = 'service' | 'bio' | 'action';

interface ChatCardProps {
  type: CardType;
  title: string;
  description: string;
  price?: string;
  cta?: string;
  icon?: 'sparkles' | 'zap' | 'target';
}

export function ChatCard({ type, title, description, price, cta, icon }: ChatCardProps) {
  const Icon = icon === 'zap' ? Zap : icon === 'target' ? Target : Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className={cn(
        "w-full p-4 rounded-2xl border liquid-glass-subtle transition-all hover:scale-[1.02]",
        type === 'service' ? "border-primary/30 bg-primary/5" : "border-white/10 bg-white/5"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h4 className="font-serif text-lg text-ivory tracking-tight">{title}</h4>
          <p className="text-xs text-white/60 leading-relaxed mt-1">{description}</p>
          
          {price && (
            <div className="mt-3 font-mono text-sm text-primary">
              {price}
            </div>
          )}

          {cta && (
            <button className="mt-4 w-full h-10 rounded-lg bg-primary text-black font-semibold text-xs flex items-center justify-center gap-2 hover:brightness-110 transition-all">
              {cta}
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
