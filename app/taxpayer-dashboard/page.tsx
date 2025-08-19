"use client";

import OverviewPage from "./overview/page";
import { useLanguage } from "@/components/LanguageProvider";

const translations = {
  en: {
    title: "Dashboard Overview",
    subtitle: "Quick insights into your certificate management system",
  },
  am: {
    title: "የዳሽቦርድ አጠቃላይ እይታ",
    subtitle: "ስለ የሰርተፍኬት አስተዳደር ስርዓትዎ ፈጣን እይታዎች",
  },
};

export default function TaxpayerOverviewPage() {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {t.title}
        </h1>
        <p className="text-gray-600 text-lg">
          {t.subtitle}
        </p>
      </div>

      <OverviewPage />
    </div>
  );
}

