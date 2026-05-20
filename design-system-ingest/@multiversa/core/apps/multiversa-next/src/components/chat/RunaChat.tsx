"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Terminal } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

import { getMachineId } from "@/lib/identity";
import { ChatCard, CardType } from "./ChatCard";
import { insforge } from "@/lib/insforge";

export function RunaChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{
    role: 'ai' | 'user' | 'system', 
    text: string, 
    persona?: 'runa' | 'aureon',
    card?: {
      type: CardType;
      title: string;
      description: string;
      price?: string;
      cta?: string;
      icon?: 'sparkles' | 'zap' | 'target';
    }
  }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('chatbot');

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const syncSession = async (machineId: string) => {
    try {
      const { data, error } = await insforge.database
        .from('chat_sessions')
        .upsert({ machine_id: machineId, last_seen: new Date().toISOString() }, { onConflict: 'machine_id' });
      
      if (error) console.error("[InsForge Sync Error]", error);
      else console.log("[InsForge Sync Success]", data);
    } catch (e) {
      console.error("[InsForge Critical Sync Error]", e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      const machineId = getMachineId();
      syncSession(machineId);
      
      if (messages.length === 0) {
        setIsTyping(true);
        setTimeout(() => {
            setMessages([{ role: 'ai', persona: 'runa', text: t('init_msg') }]);
            setIsTyping(false);
        }, 800);
      }
    }
  }, [isOpen, messages.length, t]);

  const queryKB = async (query: string) => {
    // Simple text-based RAG for now (using LIKE)
    const { data, error } = await insforge.database
      .from('kb_multiversa')
      .select('content, entity, metadata')
      .ilike('content', `%${query}%`)
      .limit(1);

    if (error || !data || data.length === 0) return null;
    return data[0];
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    const userMsg = inputValue.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputValue("");
    setIsTyping(true);

    const lowerMsg = userMsg.toLowerCase();

    // Try to get info from InsForge KB
    const kbInfo = await queryKB(userMsg.split(' ')[0]); // Simple keyword search

    // Lore & Logic
    const techKeywords = ["api", "ghl", "automatización", "automation", "base de datos", "database", "integración", "integration", "codigo", "code", "backend", "go", "python"];
    const isTechnical = techKeywords.some(key => lowerMsg.includes(key));
    const wantsServices = lowerMsg.includes("servicios") || lowerMsg.includes("precio") || lowerMsg.includes("plan") || lowerMsg.includes("costo") || lowerMsg.includes("cuánto");

    setTimeout(() => {
        if (isTechnical) {
            // Runa introduces Moisés (Auréon)
            setMessages(prev => [...prev, { role: 'ai', persona: 'runa', text: t('invoke_aureon') }]);
            
            setTimeout(() => {
                // System message showing Moisés joining
                setMessages(prev => [...prev, { role: 'system', text: t('aureon_entry') }]);
                
                setTimeout(() => {
                    // Moisés (Auréon) provides technical insight
                    setMessages(prev => [...prev, { 
                      role: 'ai', 
                      persona: 'aureon', 
                      text: kbInfo ? kbInfo.content : t('aureon_response'),
                      card: {
                        type: 'service',
                        title: t('services.pulse.title'),
                        description: t('services.pulse.description'),
                        price: t('services.pulse.price'),
                        cta: t('services.pulse.cta'),
                        icon: 'zap'
                      }
                    }]);
                    
                    setTimeout(() => {
                        // Runa returns to close/guide
                        setMessages(prev => [...prev, { role: 'ai', persona: 'runa', text: t('runa_return') }]);
                        setIsTyping(false);
                    }, 2000);
                }, 1500);
            }, 1000);
        } else if (wantsServices) {
            setMessages(prev => [...prev, { 
                role: 'ai', 
                persona: 'runa',
                text: t('runa_services_intro'),
                card: {
                  type: 'service',
                  title: t('services.spark.title'),
                  description: t('services.spark.description'),
                  price: t('services.spark.price'),
                  cta: t('services.spark.cta'),
                  icon: 'sparkles'
                }
            }]);
            setIsTyping(false);
        } else {
            setMessages(prev => [...prev, { 
                role: 'ai', 
                persona: 'runa',
                text: kbInfo ? `${t('runa_standard')} ${kbInfo.content}` : t('runa_standard') 
            }]);
            setIsTyping(false);
        }
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-8 right-8 z-[100] w-16 h-16 rounded-full bg-primary text-black flex items-center justify-center shadow-[0_0_30px_rgba(189,235,52,0.4)] transition-all",
          isOpen && "scale-0 opacity-0 pointer-events-none"
        )}
      >
        <MessageSquare className="w-8 h-8" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-black animate-pulse" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 20 }}
            className="fixed bottom-8 right-8 z-[110] w-[400px] h-[600px] max-h-[80vh] liquid-glass border border-white/10 rounded-3xl flex flex-col overflow-hidden shadow-2xl backdrop-blur-3xl"
          >
            {/* Header: The Trinity Banner */}
            <div className="p-6 border-b border-white/5 bg-black/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-ivory tracking-tight">Runa Multiversa</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="font-sans text-[10px] uppercase tracking-widest text-primary/70">{t('status')}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages Area */}
            <div 
                ref={scrollRef}
                className="flex-1 p-6 overflow-y-auto space-y-6 scrollbar-hide"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "flex flex-col w-full gap-3",
                    msg.role === 'user' ? "items-end" : "items-start"
                  )}
                >
                  <div className={cn(
                    "max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed transition-all",
                    msg.role === 'user' && "bg-primary/20 border border-primary/40 text-primary font-mono",
                    msg.role === 'system' && "bg-black/60 border border-white/10 text-white/40 font-sans text-[11px] italic py-2 px-3",
                    msg.role === 'ai' && msg.persona === 'runa' && "bg-white/5 border border-white/10 text-ivory/90 font-sans",
                    msg.role === 'ai' && msg.persona === 'aureon' && "bg-white/10 border border-primary/30 text-primary font-sans italic"
                  )}>
                    {msg.text}
                  </div>
                  
                  {msg.card && (
                    <div className="w-[90%] max-w-[320px]">
                      <ChatCard {...msg.card} />
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex gap-1 items-center">
                        <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                </div>
              )}
            </div>

            {/* Input Area: Minimalist Trinity */}
            <div className="p-6 bg-black/40 border-t border-white/5">
              <div className="relative group">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t('placeholder')}
                  className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 pr-12 text-sm font-light text-ivory focus:border-primary/50 focus:outline-none transition-all placeholder:text-white/20"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 top-2 w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
