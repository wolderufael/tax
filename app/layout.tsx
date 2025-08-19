/* "use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/main-nav";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/components/LanguageProvider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



declare global {
  interface Window {
    TranslateInit: () => void;
    google: {
      translate: {
        TranslateElement: {
          new (
            config: {
              pageLanguage: string;
              includedLanguages?: string;
              layout?: string;
            },
            elementId: string
          ): void;
          InlineLayout: {
            SIMPLE: string;
            HORIZONTAL: string;
          };
        };
      };
    };
    __GOOGLE_TRANSLATION_CONFIG__?: {
      languages: { title: string; name: string }[];
      defaultLanguage: string;
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
        <Script src="/assets/lang-config.js" strategy="beforeInteractive" />
        <Script src="/assets/translation.js" strategy="beforeInteractive" />
        <Script
          src="//translate.google.com/translate_a/element.js?cb=TranslateInit"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster richColors position="top-right" />
        <LanguageProvider>
          <MainNav />
          {children}</LanguageProvider>
      </body>
    </html>
  );
}
  */

"use client"; 

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/main-nav";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/components/LanguageProvider";
import Script from "next/script";
import dynamic from "next/dynamic";


const GoogleTranslate = dynamic(() => import("@/components/GoogleTranslate"), {
  ssr: false,
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

declare global {
  interface Window {
    TranslateInit: () => void;
    google: {
      translate: {
        TranslateElement: {
          new (
            config: {
              pageLanguage: string;
              includedLanguages?: string;
              layout?: string;
            },
            elementId: string
          ): void;
          InlineLayout: {
            SIMPLE: string;
            HORIZONTAL: string;
          };
        };
      };
    };
    __GOOGLE_TRANSLATION_CONFIG__?: {
      languages: { title: string; name: string }[];
      defaultLanguage: string;
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    {/*   <head>
        <Script src="/assets/lang-config.js" strategy="beforeInteractive" />
        <Script src="/assets/translation.js" strategy="beforeInteractive" />
        <Script
          src="//translate.google.com/translate_a/element.js?cb=TranslateInit"
          strategy="afterInteractive"
        />
      </head> */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster richColors position="top-right" />
        <LanguageProvider>
          <MainNav />
          {/* <GoogleTranslate />  */}
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
 
/* "use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/main-nav";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/components/LanguageProvider";
import Script from "next/script";
import dynamic from "next/dynamic";

const GoogleTranslate = dynamic(() => import("@/components/GoogleTranslate"), {
  ssr: false,
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

declare global {
  interface Window {
    TranslateInit: () => void;
    google: {
      translate: {
        TranslateElement: {
          new (
            config: {
              pageLanguage: string;
              includedLanguages?: string;
              layout?: string;
            },
            elementId: string
          ): void;
          InlineLayout: {
            SIMPLE: string;
            HORIZONTAL: string;
          };
        };
      };
    };
    __GOOGLE_TRANSLATION_CONFIG__?: {
      languages: { title: string; name: string }[];
      defaultLanguage: string;
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="/assets/lang-config.js" strategy="beforeInteractive" />
        <Script
          src="//translate.google.com/translate_a/element.js?cb=TranslateInit"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster richColors position="top-right" />
        <LanguageProvider>
          <MainNav />
          <GoogleTranslate />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
} */