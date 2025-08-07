"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Search,
  Settings,
  BarChart3,
  Clock,
  AlertCircle,
  Receipt,
  ChevronDown,
  ChevronRight,
  UserPlus,
  FileText,
  Calculator,
  CreditCard,
  Banknote,
  Building,
  CheckCircle,
  DollarSign,
  Percent,
  Stamp,
  Wallet,
  History,
  TrendingDown,
  Gift,
  Send,
  Eye,
  RefreshCw,
  Award,
  Search as SearchIcon,
  ShieldCheck,
  Calendar,
  ClipboardList,
  ScrollText,
  PiggyBank,
  TrendingUp,
  Coins,
  Landmark,
  BookOpen,
  Star,
  BadgeCheck,
  FileCheck,
  Database,
  CreditCard as PaymentIcon,
  ArrowDownCircle,
  RotateCcw,
  CheckSquare,
  Building2,
  FileSearch,
  Zap,
  Target,
  UserCheck,
  FileBarChart,
  BarChart2,
  UserCog,
  Lock,
  Cog,
  Bell,
  HelpCircle,
  MessageSquare,
  ThumbsUp,
  Shield,
  UserX,
  Activity,
  Headphones,
  MessageCircle,
  FileSpreadsheet,
  ShieldAlert,
  PieChart,
  Clipboard,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";

const myDashboard = [
  { title: "Overview", url: "/taxpayer-dashboard", icon: LayoutDashboard },
  { title: "My Profile", url: "/taxpayer-dashboard/profile", icon: UserCheck },
  {
    title: "My Documents",
    url: "/taxpayer-dashboard",
    icon: FileText,
  },
  {
    title: "Payment History",
    url: "/taxpayer-dashboard",
    icon: History,
  },
];

const myTaxServices = [
  {
    title: "Tax Declarations",
    icon: Calculator,
    children: [
      {
        title: "File PAYE (Monthly)",
        icon: Calendar,
        url: "/taxpayer-dashboard",
      },
      {
        title: "File VAT Return",
        icon: Percent,
        url: "/taxpayer-dashboard",
      },
      {
        title: "Income Tax Declaration",
        icon: FileText,
        url: "/taxpayer-dashboard",
      },
      {
        title: "Withholding Tax",
        icon: CreditCard,
        url: "/taxpayer-dashboard",
      },
    ],
  },
  {
    title: "My Tax Account",
    icon: Wallet,
    children: [
      {
        title: "Account Balance",
        icon: Wallet,
        url: "/taxpayer-dashboard",
      },
      {
        title: "Payment History",
        icon: History,
        url: "/taxpayer-dashboard",
      },
      {
        title: "Outstanding Amounts",
        icon: AlertCircle,
        url: "/taxpayer-dashboard",
      },
    ],
  },
  {
    title: "Certificates & Clearances",
    icon: Award,
    children: [
      {
        title: "Request Tax Clearance",
        icon: FileText,
        url: "/taxpayer-dashboard",
      },
      {
        title: "Download Certificates",
        icon: FileCheck,
        url: "/taxpayer-dashboard",
      },
      {
        title: "Certificate Status",
        icon: Eye,
        url: "/taxpayer-dashboard",
      },
    ],
  },
  {
    title: "Business License",
    icon: Building,
    children: [
      {
        title: "Apply for License",
        icon: Send,
        url: "/taxpayer-dashboard",
      },
      {
        title: "Renew License",
        icon: RefreshCw,
        url: "/taxpayer-dashboard",
      },
      {
        title: "License Status",
        icon: CheckCircle,
        url: "/taxpayer-dashboard",
      },
    ],
  },
  {
    title: "Tax Payments",
    icon: CreditCard,
    children: [
      {
        title: "Make Payment",
        icon: PaymentIcon,
        url: "/taxpayer-dashboard",
      },
      {
        title: "Payment Receipts",
        icon: Receipt,
        url: "/taxpayer-dashboard",
      },
      {
        title: "Payment Schedule",
        icon: Calendar,
        url: "/taxpayer-dashboard",
      },
    ],
  },
];

const myReports = [
  {
    title: "My Tax Summary",
    url: "/taxpayer-dashboard",
    icon: FileBarChart,
  },
  {
    title: "Payment Report",
    url: "/taxpayer-dashboard",
    icon: FileSpreadsheet,
  },
  {
    title: "Tax History",
    url: "/taxpayer-dashboard",
    icon: BarChart2,
  },
  {
    title: "Compliance Status",
    url: "/taxpayer-dashboard",
    icon: Clipboard,
  },
];

const accountSettings = [
  {
    title: "Account Settings",
      url: "/taxpayer-dashboard",
    icon: UserCog,
  },
  {
    title: "Security Settings",
    url: "/taxpayer-dashboard",
    icon: Lock,
  },
  {
    title: "Notification Preferences",
    url: "/taxpayer-dashboard",
    icon: Bell,
  },
];
const helpSupport = [
  { title: "Tax Guide", url: "/taxpayer-dashboard", icon: BookOpen },
  { title: "FAQs", url: "/taxpayer-dashboard", icon: HelpCircle },
  {
    title: "Contact Support",
    url: "/taxpayer-dashboard",
    icon: Headphones,
  },
  {
    title: "Submit Feedback",
    url: "/taxpayer-dashboard",
    icon: MessageSquare,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();
  const isCollapsed = state === "collapsed";
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );
  const [activeItem, setActiveItem] = useState<string>("Overview"); // Track which item is actually active

  const isActive = (path: string, title?: string) => {
    // For items with unique URLs, use URL matching
    if (path !== "/dashboard") {
      return pathname === path;
    }
    // For items sharing /dashboard URL, use the clicked item tracking
    return activeItem === title;
  };

  const handleItemClick = (title: string) => {
    setActiveItem(title);
  };

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <Sidebar className="border-r border-border bg-background">
      <SidebarHeader className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className=" rounded-md ">
            <Image
              src="/logo1.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Revenue Authority
              </h2>
              <p className="text-xs text-muted-foreground">Taxpayer Portal</p>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        {/* My Dashboard */}
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              My Dashboard
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {myDashboard.map(({ title, url, icon: Icon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton asChild isActive={isActive(url, title)}>
                    <Link href={url} onClick={() => handleItemClick(title)}>
                      <Icon />
                      {!isCollapsed && <span>{title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* My Tax Services */}
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              My Tax Services
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {myTaxServices.map(({ title, icon: Icon, children }) => {
                const isExpanded = expandedItems[title];
                return (
                  <div key={title}>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => toggleExpanded(title)}
                        className="flex items-center justify-between w-full"
                      >
                        <Icon />
                        {!isCollapsed && <span>{title}</span>}
                        {!isCollapsed && (
                          <div className="ml-auto">
                            {isExpanded ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </div>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Children items */}
                    {isExpanded && !isCollapsed && children && (
                      <div className="ml-6 space-y-1">
                        {children.map(
                          ({ title: childTitle, icon: ChildIcon, url }) => (
                            <SidebarMenuItem key={childTitle}>
                              <SidebarMenuButton
                                asChild
                                isActive={isActive(url || "", childTitle)}
                              >
                                <Link
                                  href={url || "/taxpayer-dashboard"}
                                  onClick={() => handleItemClick(childTitle)}
                                >
                                  <ChildIcon className="h-4 w-4" />
                                  <span className="text-sm">{childTitle}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          )
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* My Reports */}
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              My Reports
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {myReports.map(({ title, url, icon: Icon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton asChild isActive={isActive(url, title)}>
                    <Link href={url} onClick={() => handleItemClick(title)}>
                      <Icon />
                      {!isCollapsed && <span>{title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account Settings */}
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Account Settings
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {accountSettings.map(({ title, url, icon: Icon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton asChild isActive={isActive(url, title)}>
                    <Link href={url} onClick={() => handleItemClick(title)}>
                      <Icon />
                      {!isCollapsed && <span>{title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Help & Support */}
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Help & Support
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {helpSupport.map(({ title, url, icon: Icon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton asChild isActive={isActive(url, title)}>
                    <Link href={url} onClick={() => handleItemClick(title)}>
                      <Icon />
                      {!isCollapsed && <span>{title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
