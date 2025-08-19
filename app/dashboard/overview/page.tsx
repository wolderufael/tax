"use client";

import { DashboardOverview } from "@/components/dashboard/overview-cards";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import * as XLSX from "xlsx";
import { Upload, Download } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/components/LanguageProvider";

const demoTaxOfficerData = [
  {
    "Officer ID": "TX-001",
    Name: "Alemu Bekele",
    "Assigned Taxpayers": 120,
    "Total Revenue": 1500000,
    Status: "Active",
  },
  {
    "Officer ID": "TX-002",
    Name: "Mekdes Tadesse",
    "Assigned Taxpayers": 98,
    "Total Revenue": 1100000,
    Status: "Active",
  },
  {
    "Officer ID": "TX-003",
    Name: "Samuel Getachew",
    "Assigned Taxpayers": 75,
    "Total Revenue": 900000,
    Status: "On Leave",
  },
  {
    "Officer ID": "TX-004",
    Name: "Hanna Gebre",
    "Assigned Taxpayers": 134,
    "Total Revenue": 1700000,
    Status: "Active",
  },
  {
    "Officer ID": "TX-005",
    Name: "Yonas Alemayehu",
    "Assigned Taxpayers": 60,
    "Total Revenue": 700000,
    Status: "Inactive",
  },
];

const translations = {
  en: {
    recentActivity: "Recent Activity",
    systemHealth: "System Health",
    import: "Import",
    export: "Export",
    activity: [
      'New Business License issued for "Tech Solutions Inc."',
      'Taxpayer Registration updated for "Jane Doe"',
      'Business License "AM/DES/100136/2016" status changed to Pending',
      'New Taxpayer Registration request from "ABC Trading PLC"',
      'Business License "AM/GND/200500/2017" expired',
    ],
    health: [
      {
        label: "Database Connection:",
        value: "Operational",
        color: "bg-green-500",
      },
      { label: "API Gateway:", value: "Operational", color: "bg-green-500" },
      {
        label: "Certificate Generation Service:",
        value: "Operational",
        color: "bg-green-500",
      },
      {
        label: "Email Notification Service:",
        value: "Degraded",
        color: "bg-orange-500",
      },
    ],
  },
  am: {
    recentActivity: "የቅርብ ጊዜ እንቅስቃሴ",
    systemHealth: "የስርዓቱ ጤና",
    import: "አስመጣ",
    export: "አስወጣ",
    activity: [
      'ለ"Tech Solutions Inc." አዲስ የንግድ ፈቃድ ተሰጥቷል',
      'ለ"Jane Doe" የታክስ ከፋይ ምዝገባ ታደሰ',
      'የንግድ ፈቃድ "AM/DES/100136/2016" ሁኔታ ወደ በመጠባበቅ ተቀይሯል',
      'ከ"ABC Trading PLC" አዲስ የታክስ ከፋይ ምዝገባ ጥያቄ',
      'የንግድ ፈቃድ "AM/GND/200500/2017" ጊዜው አልቋል',
    ],
    health: [
      { label: "የዳታቤዝ ግንኙነት:", value: "በስራ ላይ", color: "bg-green-500" },
      { label: "API መዳረሻ:", value: "በስራ ላይ", color: "bg-green-500" },
      { label: "የሰርተፍኬት ፍጠር አገልግሎት:", value: "በስራ ላይ", color: "bg-green-500" },
      { label: "የኢሜይል ማሳወቂያ አገልግሎት:", value: "ተቋርጧል", color: "bg-orange-500" },
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
        toast.error("Please select a valid Excel file (.xlsx or .xls)");
        return;
      }
      toast.success(`Imported file: ${file.name}`);
      // For demo: just log file name. Real logic would parse and process file.
    }
  };

  const handleExport = () => {
    // @ts-ignore
    const ws = XLSX.utils.json_to_sheet(demoTaxOfficerData);
    // @ts-ignore
    const wb = XLSX.utils.book_new();
    // @ts-ignore
    XLSX.utils.book_append_sheet(wb, ws, "Tax Officers");
    XLSX.writeFile(wb, "tax data overview.xlsx");
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
            <CardTitle>{t.recentActivity}</CardTitle>
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
                        "text-red-600",
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
            <CardTitle>{t.systemHealth}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-gray-700">
              {t.health.map((h, idx) => (
                <div className="flex justify-between items-center" key={idx}>
                  <span>{h.label}</span>
                  <Badge variant="default" className={h.color}>
                    {h.value}
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
