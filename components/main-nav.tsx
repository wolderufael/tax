"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { Globe } from "lucide-react";

export function MainNav() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();

  const t = {
    en: {
      home: "Home",
      about: "About Us",
      services: "Services",
      businessLicense: "Business License",
      receiptGenerators: "Receipt Generators",
      news: "News and Events",
      announcements: "Announcements",
      press: "Press Releases",
      events: "Upcoming Events",
      forms: "Forms",
      contact: "Contact",
      login: "Login",
      amharic: "Amharic",
      english: "English",
      langShort: "EN",
    },
    am: {
      home: "መነሻ",
      about: "ስለ እኛ",
      services: "አገልግሎቶች",
      businessLicense: "የንግድ ፈቃድ",
      receiptGenerators: "የደረሰኝ መፍጠሪያዎች",
      news: "ዜናና ክስተቶች",
      announcements: "ማስታወቂያዎች",
      press: "የጋዜጣ መግለጫዎች",
      events: "ቀጣዩ ክስተቶች",
      forms: "ቅፅዎች",
      contact: "አግኙን",
      login: "ግባ",
      amharic: "አማርኛ",
      english: "እንግሊዝኛ",
      langShort: "AM",
    },
  }[language];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo1.png"
                alt="South Ethiopia Revenue Bureau Logo"
                width={70}
                height={50}
              />
              <span className="text-lg font-bold text-gray-900 hidden md:block">
                South Ethiopia Region Revenue Bureau
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button
                variant="ghost"
                className={
                  isActive("/")
                    ? "font-bold text-blue-600"
                    : "text-md  text-blue-800"
                }
              >
                {t.home}
              </Button>
            </Link>
            <Link href="/about-us">
              <Button
                variant="ghost"
                className={
                  isActive("/about")
                    ? "font-bold text-blue-600"
                    : "text-md  text-blue-800"
                }
              >
                {t.about}
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex text-md text-blue-800 items-center gap-1"
                >
                  {t.services}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/business-license">{t.businessLicense}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/receipt-generator">{t.receiptGenerators}</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 text-md text-blue-800"
                >
                  {t.news}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>{t.announcements}</DropdownMenuItem>
                <DropdownMenuItem>{t.press}</DropdownMenuItem>
                <DropdownMenuItem>{t.events}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/forms">
              <Button
                variant="ghost"
                className={
                  isActive("/forms")
                    ? "font-bold text-blue-600"
                    : "text-md  text-blue-800"
                }
              >
                {t.forms}
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="ghost"
                className={
                  isActive("/contact")
                    ? "font-bold text-blue-600"
                    : "text-md  text-blue-800"
                }
              >
                {t.contact}
              </Button>
            </Link>
            <Link href="/login" className="pr-6 mr-3 items-end justify-end">
              <Button
                className={
                  "font-bold bg-blue-600 hover:bg-blue-700 text-white hover:cursor-pointer "
                }
              >
                {t.login}
              </Button>
            </Link>
            {/* Language Preference Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-xs font-medium">{t.langShort}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("am")}>
                  {t.amharic}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                  {t.english}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* End Language Preference Dropdown */}
          </div>
        </div>
      </div>
    </nav>
  );
}
