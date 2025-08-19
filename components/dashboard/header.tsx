"use client";

import { Bell, Search, User, Menu, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/LanguageProvider";
import { useRouter } from "next/navigation";

const translations = {
  en: {
    search: "Search certificates, users, licenses...",
    amharic: "Amharic",
    english: "English",
    profile: "Profile",
    settings: "Settings",
    logout: "Log out",
    administrator: "Administrator",
    adminEmail: "admin@revenue.gov",
    import: "Import",
    export: "Export",
    notifications: "Notifications",
  },
  am: {
    search: "ሰነዶች፣ ተጠቃሚዎች፣ ፈቃዶች...",
    amharic: "አማርኛ",
    english: "እንግሊዝኛ",
    profile: "መገለጫ",
    settings: "ቅንብሮች",
    logout: "ውጣ",
    administrator: "አስተዳዳሪ",
    adminEmail: "admin@revenue.gov",
    import: "አስመጣ",
    export: "አስወጣ",
    notifications: "ማሳወቂያዎች",
  },
};

export const DashboardHeader = () => {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const router = useRouter();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-18 items-center gap-4 px-4">
        <SidebarTrigger className="h-8 w-8" />

        <div className="flex-1 flex items-center gap-4">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t.search}
              className="pl-10 pr-4 h-9 bg-background"
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Language Preference Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-xs font-medium">
                    {language === "am" ? "AM" : "EN"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("am")}>
                  <span role="img" aria-label="Amharic">
                    🇪🇹
                  </span>
                  <span className="ml-2">{t.amharic}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                  <span role="img" aria-label="English">
                    🇺🇸
                  </span>
                  <span className="ml-2">{t.english}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* End Language Preference Dropdown */}
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              aria-label={t.notifications}
            >
              <Bell className="h-4 w-4" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
              >
                3
              </Badge>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative h-8 w-8 rounded-full"
                >
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {t.administrator}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {t.adminEmail}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    //router.push("/taxpayer-dashboard/profile");
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>{t.profile}</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>{t.settings}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                >
                  <span>{t.logout}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};
