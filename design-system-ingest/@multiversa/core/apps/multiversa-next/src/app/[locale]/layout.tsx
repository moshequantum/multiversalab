import type { Metadata } from "next";
import Script from "next/script";
import { Sora, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500"], // Max 500 as requested
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'hero'});

  return {
    title: "Multiversa Group | Smart Business OS",
    description: t('subtitle'),
  };
}

import {RunaChat} from '@/components/chat/RunaChat';

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${sora.variable} ${playfair.variable} ${jetbrains.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col selection:bg-primary/30 selection:text-primary bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          <div className="fixed inset-0 grid-pattern opacity-10 pointer-events-none z-0"></div>
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
          <RunaChat />
          {/* Apollo Tracker Integration */}
          {process.env.NEXT_PUBLIC_APOLLO_APP_ID && (
            <Script
              id="apollo-tracker"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  function initApollo(){
                    var n=Math.random().toString(36).substring(7),o=document.createElement("script");
                    o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
                    o.onload=function(){window.trackingFunctions.onLoad({appId:"${process.env.NEXT_PUBLIC_APOLLO_APP_ID}"})},
                    document.head.appendChild(o)
                  }
                  initApollo();
                `,
              }}
            />
          )}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
