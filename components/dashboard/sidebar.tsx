"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Search,
  Settings,
  BarChart3,
  Clock,
  AlertCircle,
  Shield,
  Receipt,
} from "lucide-react"
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
} from "@/components/ui/sidebar"
import Image from "next/image"

const mainItems = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "Manage Tax Officers", url: "/dashboard/business", icon: Briefcase },
  { title: "Manage Tax Payers", url: "/dashboard/taxPayer", icon: Users },
  { title: "Certificate Management", url: "/dashboard/certificates", icon: Receipt },
  { title: "Revenue", url: "/dashboard/revenue", icon: BarChart3 }, // Placeholder
]

const requestmanagementItems = [
  { title: "Tax Clearance Certificate Request Manager", icon: Clock }, // Placeholder
  { title: "Refund Request Manager", icon: AlertCircle }, // Placeholder
];
const managementItems = [
  { title: "Pending Approvals", icon: Clock }, // Placeholder
  { title: "Expiring Soon",  icon: AlertCircle }, // Placeholder
  { title: "Search & Filters",  icon: Search }, // Placeholder
  { title: "Audit Log",  icon: Shield }, // Placeholder
]

const systemItems = [
  { title: "Settings",icon: Settings }, // Placeholder
]

export function AppSidebar() {
  const { state } = useSidebar()
  const pathname = usePathname()
  const isCollapsed = state === "collapsed"

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard" || pathname.startsWith("/dashboard/")
    }
    return pathname.startsWith(path)
  } 

  return (
    <Sidebar className="border-r border-border bg-background">
      <SidebarHeader className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className=" rounded-md ">
            <Image src="/logo1.png" alt="Logo" width={40} height={40} className="rounded-full" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-semibold text-foreground">Revenue Authority</h2>
              <p className="text-xs text-muted-foreground">Management Dashboard</p>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        {/* Main Navigation */}
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Main Navigation
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map(({ title, url, icon: Icon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton asChild isActive={isActive(url)}>
                    <Link href={url}>
                      <Icon />
                      {!isCollapsed && <span>{title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Management */}
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Management
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map(({ title, icon: Icon }) => {
                const itemUrl = '/dashboard'; // Default or dynamic URL if needed
                return (
                  <SidebarMenuItem key={title}>
                    <SidebarMenuButton asChild >
                      <Link href={itemUrl}>
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
        {/* Request Management */}
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Request Management
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {requestmanagementItems.map(({ title, icon: Icon }) => {
                const itemUrl = '/dashboard'; // Default or dynamic URL if needed
                return (
                  <SidebarMenuItem key={title}>
                    <SidebarMenuButton asChild >
                      <Link href={itemUrl}>
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

        {/* System */}
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              System
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map(({ title, icon: Icon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton  >
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
  )
}
