"use client";

import { DashboardOverview } from "@/components/taxpayer-dashborad/overview-cards";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import * as XLSX from "xlsx";
import { Upload, Download } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/components/LanguageProvider";

const demoTaxpayerData = [
  { Date: "2024-07-30", Activity: "Business License Approved", Amount: "-" },
  {
    Date: "2024-07-29",
    Activity: "Registration Certificate Downloaded",
    Amount: "-",
  },
  { Date: "2024-07-28", Activity: "License Renewal Submitted", Amount: "-" },
  {
    Date: "2024-07-27",
    Activity: "Tax Payment Receipt Generated",
    Amount: "ETB 4,520",
  },
  { Date: "2024-07-26", Activity: "Profile Updated", Amount: "-" },
];

const translations = {
  en: {
    myRecentActivity: "My Recent Activity",
    myDocumentsStatus: "My Documents Status",
    import: "Import",
    export: "Export",
    activity: [
      "Your Business License application has been approved",
      "Taxpayer Registration certificate downloaded",
      "Business License renewal application submitted",
      "Tax payment receipt generated for July 2024",
      "Profile information updated successfully",
    ],
    status: [
      {
        label: "Taxpayer Registration:",
        value: "Active",
        color: "bg-green-500",
      },
      { label: "Business License:", value: "Valid", color: "bg-green-500" },
      {
        label: "Tax Compliance Status:",
        value: "Up to Date",
        color: "bg-green-500",
      },
      {
        label: "License Renewal Due:",
        value: "In 6 Months",
        color: "bg-blue-500",
      },
    ],
  },
  am: {
    myRecentActivity: "የኔ የቅርብ ጊዜ እንቅስቃሴ",
    myDocumentsStatus: "የኔ የሰነዶች ሁኔታ",
    import: "አስመጣ",
    export: "አስወጣ",
    activity: [
      "የንግድ ፈቃድ ማመልከቻዎ ተፀድቷል",
      "የታክስ ከፋይ ምዝገባ ሰርተፍኬት ወረደ",
      "የንግድ ፈቃድ የዳግም ማስረከቢያ ተሰጥቷል",
      "ለጁላይ 2024 የታክስ ክፍያ ደረሰኝ ተፈጥሯል",
      "የመገለጫ መረጃ በተሳካ ሁኔታ ታደሰ",
    ],
    status: [
      { label: "የታክስ ከፋይ ምዝገባ:", value: "ንቁ", color: "bg-green-500" },
      { label: "የንግድ ፈቃድ:", value: "ትክክል", color: "bg-green-500" },
      { label: "የታክስ ተግባር ሁኔታ:", value: "ወቅታዊ", color: "bg-green-500" },
      { label: "የፈቃድ ዳግም ማስረከቢያ:", value: "በ6 ወራት ውስጥ", color: "bg-blue-500" },
    ],
  },
};

const OverviewPage = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const isExcel = file.name.endsWith(".xlsx") || file.name.endsWith(".xls");
      if (!isExcel) {
        toast.error(
          language === "am"
            ? "እባክዎን የኤክሴል ፋይል ይምረጡ (.xlsx ወይም .xls)"
            : "Please select a valid Excel file (.xlsx or .xls)"
        );
        return;
      }
      toast.success(
        (language === "am" ? "ተሳክቷል፡፡ " : "Imported file: ") + file.name
      );
      // For demo: just log file name. Real logic would parse and process file.
    }
  };

  const handleExport = () => {
    // @ts-ignore
    const ws = XLSX.utils.json_to_sheet(demoTaxpayerData);
    // @ts-ignore
    const wb = XLSX.utils.book_new();
    // @ts-ignore
    XLSX.utils.book_append_sheet(
      wb,
      ws,
      language === "am" ? "የታክስ አጠቃላይ ዳታ" : "Tax Data Overview"
    );
    XLSX.writeFile(
      wb,
      language === "am" ? "የታክስ አጠቃላይ ዳታ.xlsx" : "tax data overview.xlsx"
    );
  };

  return (
    <div>
      {/* Import/Export Buttons */}
      <div className="flex justify-end mb-8">
        <div className="flex gap-3">
          <Button
            variant="default"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm"
            onClick={handleImportClick}
          >
            <Upload className="w-4 h-4 mr-2" />
            {t.import}
          </Button>
          <input
            type="file"
            accept=".xlsx,.xls"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <Button
            variant="default"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-sm"
            onClick={handleExport}
          >
            <Download className="w-4 h-4 mr-2" />
            {t.export}
          </Button>
        </div>
      </div>

      <DashboardOverview />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>{t.myRecentActivity}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-gray-700">
              {t.activity.map((item, idx) => (
                <li key={idx}>
                  <span
                    className={
                      [
                        "text-blue-600",
                        "text-green-600",
                        "text-orange-600",
                        "text-purple-600",
                        "text-green-600",
                      ][idx] + " font-medium"
                    }
                  >
                    {
                      [
                        "2024-07-30:",
                        "2024-07-29:",
                        "2024-07-28:",
                        "2024-07-27:",
                        "2024-07-26:",
                      ][idx]
                    }
                  </span>{" "}
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>{t.myDocumentsStatus}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-gray-700">
              {t.status.map((s, idx) => (
                <div className="flex justify-between items-center" key={idx}>
                  <span>{s.label}</span>
                  <Badge variant="default" className={s.color}>
                    {s.value}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewPage;
