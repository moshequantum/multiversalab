"use client";

import { Twitter, Instagram, Linkedin, Github } from "lucide-react";
import { useTranslations } from "next-intl";

export function Footer() {
    const t = useTranslations('footer');

    return (
        <footer className="relative bg-[#050505] pt-32 pb-10 overflow-hidden border-t border-white/5">
            <div className="site-container relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    <div className="col-span-1 md:col-span-2">
                        <a href="#" className="inline-block mb-6">
                            <img src="/Logotipo.svg" alt="Multiversa" className="h-10 w-auto" />
                        </a>
                        <p className="text-gray-500 max-w-sm mb-8 font-serif text-lg leading-relaxed">
                            {t('slogan')}
                        </p>
                        <div className="flex gap-4">
                            <SocialIcon icon={Twitter} href="https://x.com/moumultiversa" />
                            <SocialIcon icon={Linkedin} href="https://linkedin.com/in/moumultiversa" />
                            <SocialIcon icon={Instagram} href="https://instagram.com/mou_multiversa" />
                            <SocialIcon icon={Github} href="https://github.com/heymou" />
                        </div>
                    </div>

                    <div>
                        <h4 className="font-serif text-lg text-white mb-6">{t('product')}</h4>
                        <ul className="space-y-4 text-sm text-gray-500 font-serif">
                            <li><FooterLink href="#founders">{t('links.features')}</FooterLink></li>
                            <li><FooterLink href="#triad">{t('links.integrations')}</FooterLink></li>
                            <li><FooterLink href="#pricing">{t('links.pricing')}</FooterLink></li>
                            <li><FooterLink href="#">{t('links.changelog')}</FooterLink></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-serif text-lg text-white mb-6">{t('company')}</h4>
                        <ul className="space-y-4 text-sm text-gray-500 font-serif">
                            <li><FooterLink href="#">{t('links.about')}</FooterLink></li>
                            <li><FooterLink href="#">{t('links.careers')}</FooterLink></li>
                            <li><FooterLink href="#">{t('links.blog')}</FooterLink></li>
                            <li><FooterLink href="#">{t('links.contact')}</FooterLink></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-serif">
                    <p>{t('rights')}</p>
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                            <span>{t('system_status')}</span>
                        </div>
                        <span>{t('compliance')}</span>
                    </div>
                </div>

                <div className="mt-20 text-center select-none pointer-events-none overflow-hidden">
                    <h1 className="text-[12vw] font-serif font-bold tracking-tighter leading-none multiversa-chrome">
                        MULTIVERSA
                    </h1>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon: Icon, href }: { icon: any, href: string }) {
    return (
        <a href={href} 
           target="_blank" 
           rel="noopener noreferrer"
           className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all group">
            <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </a>
    );
}

function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <a href={href} className="hover:text-primary transition-colors flex items-center gap-2 group">
            <span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            {children}
        </a>
    );
}
