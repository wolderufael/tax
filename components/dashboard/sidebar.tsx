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

const TaxCenter = [
  { title: "Manage Tax Center", icon: Building2 }, // Tax building/center icon
];

const manageTaxOfficers = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  {
    title: "Tax Officer Registration",
    icon: UserPlus,
    url: "/dashboard/officers/add-officer",
  },
  { title: "Manage Tax Officers", url: "/dashboard/officers", icon: UserCog },
  { title: "Tax Officers Assignment", url: "/dashboard", icon: Target },
  { title: "Tax Officers Performance", url: "/dashboard", icon: Activity },
  { title: "Manage Tax Payers", url: "/dashboard/taxPayer", icon: Users },
  {
    title: "Certificate Management",
    url: "/dashboard/certificates",
    icon: Award,
  },
  { title: "Revenue", url: "/dashboard/revenue", icon: PieChart },
];

const taxPayerManagement = [
  {
    title: "User Registration",
    icon: UserPlus,
    children: [
      {
        title: "Register Taxpayer User",
        icon: UserPlus,
        url: "/dashboard/taxPayer/registration",
      },
    ],
  },
  {
    title: "Clearance Certificates",
    icon: FileText,
    children: [
      {
        title: "Tax Clearance Certificate Requests",
        icon: FileText,
        url: "/dashboard",
      },
      {
        title: "Clearance Requests List",
        icon: FileText,
        url: "/dashboard",
      },
    ],
  },
  {
    title: "Tax Declarations",
    icon: Calculator,
    children: [
      {
        title: "SCHED D-DIVIDENDS",
        icon: DollarSign,
        url: "/dashboard",
      },
      {
        title: "SCHED D-GAIN-ON-SHARES",
        icon: TrendingDown,
        url: "/dashboard",
      },
      {
        title: "SCHEDULE-A-PAYE (MONTHLY)",
        icon: Calendar,
        url: "/dashboard",
      },
      {
        title: "SCHEDULE C-NORMAL",
        icon: FileText,
        url: "/dashboard",
      },
      {
        title: "VALUE ADDED TAX (VAT)",
        icon: Percent,
        url: "/dashboard",
      },
      {
        title: "WITHHOLDING TAX ON PAYMENT",
        icon: CreditCard,
        url: "/dashboard",
      },
      {
        title: "CAPITAL GAINS TAX",
        icon: Banknote,
        url: "/dashboard",
      },
      {
        title: "STAMP DUTIES",
        icon: Stamp,
        url: "/dashboard",
      },
    ],
  },
  {
    title: "Tax Accounts",
    icon: Wallet,
    children: [
      {
        title: "Account Balances",
        icon: Wallet,
        url: "/dashboard",
      },
      {
        title: "Payment History",
        icon: History,
        url: "/dashboard",
      },
      {
        title: "Arrears Management",
        icon: AlertCircle,
        url: "/dashboard",
      },
    ],
  },
  {
    title: "Refunds",
    icon: Gift,
    children: [
      {
        title: "Potential Refunds",
        icon: Gift,
        url: "/dashboard",
      },
      {
        title: "Refund Applications",
        icon: Send,
        url: "/dashboard",
      },
      {
        title: "Refund Status Tracking",
        icon: Eye,
        url: "/dashboard",
      },
    ],
  },
  {
    title: "Business Licensing",
    icon: Building,
    children: [
      {
        title: "Business License Renewal",
        icon: RefreshCw,
        url: "/dashboard",
      },
      {
        title: "Renewal Applications",
        icon: Send,
        url: "/dashboard",
      },
      {
        title: "License Status",
        icon: Award,
        url: "/dashboard",
      },
    ],
  },
  {
    title: "Validation Services",
    icon: ShieldCheck,
    children: [
      {
        title: "Validate TIN",
        icon: SearchIcon,
        url: "/dashboard",
      },
      {
        title: "Validate Tax Clearance",
        icon: CheckCircle,
        url: "/dashboard",
      },
      {
        title: "Verify Compliance Status",
        icon: ShieldCheck,
        url: "/dashboard",
      },
    ],
  },
];

const reportingItems = [
  { title: "Tax Collection Reports", icon: FileBarChart },
  { title: "Taxpayer Compliance Reports", icon: FileSpreadsheet },
  { title: "Revenue Analysis", icon: BarChart2 },
  { title: "Audit Trail", icon: Clipboard },
];
const systemAdministration = [
  { title: "User Management", icon: UserCog },
  { title: "Role Permissions", icon: Lock },
  { title: "System Configuration", icon: Cog },
  { title: "Notifications Settings", icon: Bell },
];
const supportItems = [
  { title: "User Guides", icon: BookOpen },
  { title: "FAQs", icon: HelpCircle },
  { title: "Contact Support", icon: Headphones },
  { title: "Feedback", icon: MessageSquare },
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
              <p className="text-xs text-muted-foreground">
                Management Dashboard
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        {/* Tax Center */}
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Tax Center
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {TaxCenter.map(({ title, icon: Icon }) => {
                const itemUrl = "/dashboard"; // Default or dynamic URL if needed
                return (
                  <SidebarMenuItem key={title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(itemUrl, title)}
                    >
                      <Link
                        href={itemUrl}
                        onClick={() => handleItemClick(title)}
                      >
                        <Icon />
                        {!isCollapsed && <span>{title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Tax Officer Management */}
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Tax Officer Management
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {manageTaxOfficers.map(({ title, url, icon: Icon }) => (
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

        {/* Tax Payer Management */}
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Tax Payer Management
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {taxPayerManagement.map(({ title, icon: Icon, children }) => {
                const isExpanded = expandedItems[title];
                return (
                  <div key={title}>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => toggleExpanded(title)}
                        className="flex items-center justify-between w-full"
                      >
                        {/* <div className="flex items-center gap-2"> */}
                        <Icon />
                        {!isCollapsed && <span>{title}</span>}
                        {/* </div> */}
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
                                  href={url || "/dashboard"}
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

        {/* Reporting */}
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Reporting
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {reportingItems.map(({ title, icon: Icon }) => {
                const itemUrl = "/dashboard"; // Default or dynamic URL if needed
                return (
                  <SidebarMenuItem key={title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(itemUrl, title)}
                    >
                      <Link
                        href={itemUrl}
                        onClick={() => handleItemClick(title)}
                      >
                        <Icon />
                        {!isCollapsed && <span>{title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System Administration */}
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              System Administration
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {systemAdministration.map(({ title, icon: Icon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton>
                    <Icon />
                    {!isCollapsed && <span>{title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Support */}
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Support
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {supportItems.map(({ title, icon: Icon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton>
                    <Icon />
                    {!isCollapsed && <span>{title}</span>}
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
