import Link from "next/link";
import { Facebook, Twitter, Youtube, Send } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export function Footer() {
  const { language } = useLanguage();
  const t = {
    en: {
      accountable: "Accountable Institutions",
      customCommission: "Custom Commission",
      federalRevenue: "Federal Revenue Bureau",
      partners: "Our Partners",
      pmOffice: "Prime Minister Office",
      finance: "Ministry of Finance",
      investment: "Investment Commission",
      contact: "Contact Address",
      email: "Email: info.serb@example.com",
      phone: "Phone: +251 912 345 678",
      poBox: "P.O. Box: 1234 Addis Ababa, Ethiopia",
      social: "Social Media",
      copyright: `© ${new Date().getFullYear()} South Ethiopia Region Revenue Bureau. All rights reserved.`,
    },
    am: {
      accountable: "ተጠያቂ ተቋማት",
      customCommission: "የጉምሩክ ኮሚሽን",
      federalRevenue: "የፌዴራል ገቢ ቢሮ",
      partners: "አጋሮቻችን",
      pmOffice: "የጠቅላይ ሚኒስትሩ ቢሮ",
      finance: "የፋይናንስ ሚኒስቴር",
      investment: "የኢንቨስትመንት ኮሚሽን",
      contact: "የእውቂያ አድራሻ",
      email: "ኢሜይል: info.serb@example.com",
      phone: "ስልክ: +251 912 345 678",
      poBox: "ፒ.ኦ.ቦክስ: 1234 አዲስ አበባ, ኢትዮጵያ",
      social: "ማህበራዊ ሚዲያ",
      copyright: `© ${new Date().getFullYear()} የደቡብ ኢትዮጵያ ክልል ገቢ ቢሮ። መብት የተጠበቀ።`,
    },
  }[language];

  return (
    <footer className="bg-blue-500 text-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">{t.accountable}</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:underline">
                {t.customCommission}
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                {t.federalRevenue}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">{t.partners}</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:underline">
                {t.pmOffice}
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                {t.finance}
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                {t.investment}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">{t.contact}</h3>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              {t.email}
            </p>
            <p className="flex items-center gap-2">
              <span className="font-bold">☎</span> {t.phone}
            </p>
            <p>{t.poBox}</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">{t.social}</h3>
          <div className="flex space-x-4">
            <Link href="#" className="text-white hover:text-blue-300">
              <Facebook className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-white hover:text-blue-300">
              <Twitter className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-white hover:text-blue-300">
              <Youtube className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-blue-200 border-t border-blue-700 pt-6">
        <p>{t.copyright}</p>
      </div>
    </footer>
  );
}
