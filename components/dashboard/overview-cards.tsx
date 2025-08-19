import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  FileText,
  Building2,
  Clock,
  AlertTriangle,
  Calendar,
  TrendingUp,
  CheckCircle,
  RefreshCw,
  MoreHorizontal,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatsCard from "./StatsCard";
import { useLanguage } from "@/components/LanguageProvider";

const translations = {
  en: {
    dashboardOverview: "Dashboard Overview",
    welcome:
      "Welcome back! Here's what's happening with your revenue authority today.",
    refresh: "Refresh Data",
    stats: [
      "Total Registered Users",
      "Total Certificates Issued",
      "Total Business Licenses",
      "Certificates Pending Approval",
      "Certificates Expiring Soon",
      "New Requests (This Week)",
    ],
    recentActivities: "Recent Activities",
    pendingApprovals: "Pending Approvals",
    applicant: "Applicant",
    type: "Type",
    priority: "Priority",
    actions: "Actions",
    completed: "Completed",
    pending: "Pending",
    rejected: "Rejected",
    high: "High",
    medium: "Medium",
    low: "Low",
    viewAll: "View All",
    quickActions: "Quick Actions",
    issueCertificate: "Issue Certificate",
    approveLicense: "Approve License",
    registerUser: "Register User",
    viewReports: "View Reports",
  },
  am: {
    dashboardOverview: "የዳሽቦርድ አጠቃላይ እይታ",
    welcome: "እንኳን ደህና መጡ! ዛሬ በየክፍለ ክልሉ የገቢ ባለስልጣን የሚከናወኑት ነገሮች እነዚህ ናቸው።",
    refresh: "ዳታ አድስ",
    stats: [
      "ጠቅላላ የተመዘገቡ ተጠቃሚዎች",
      "ጠቅላላ የተሰጡ ሰርተፍኬቶች",
      "ጠቅላላ የንግድ ፈቃዶች",
      "በመጠባበቅ ላይ ያሉ ሰርተፍኬቶች",
      "በቅርቡ የሚያበቃ ሰርተፍኬት",
      "የተጠየቁ አዲስ ጥያቄዎች (በዚህ ሳምንት)",
    ],
    recentActivities: "የቅርብ ጊዜ እንቅስቃሴዎች",
    pendingApprovals: "በመጠባበቅ ላይ ያሉ ማጽደቅያዎች",
    applicant: "አመልካች",
    type: "አይነት",
    priority: "ቅድሚያ",
    actions: "ተግባራት",
    completed: "ተጠናቋል",
    pending: "በመጠባበቅ ላይ",
    rejected: "ተቀባይነት አልተሰጠም",
    high: "ከፍተኛ",
    medium: "መካከለኛ",
    low: "ዝቅተኛ",
    viewAll: "ሁሉንም ይመልከቱ",
    quickActions: "ፈጣን እርምጃዎች",
    issueCertificate: "ሰርተፍኬት ያውጡ",
    approveLicense: "ፈቃድ ያጽዱ",
    registerUser: "ተጠቃሚ ይመዝገቡ",
    viewReports: "ሪፖርቶችን ይመልከቱ",
  },
};

// Mock data
const statsData = [
  {
    key: 0,
    value: 12547,
    icon: Users,
    trend: { value: 12, isPositive: true },
    variant: "info" as const,
  },
  {
    key: 1,
    value: 8924,
    icon: FileText,
    trend: { value: 8, isPositive: true },
    variant: "success" as const,
  },
  {
    key: 2,
    value: 3456,
    icon: Building2,
    trend: { value: 5, isPositive: true },
    variant: "default" as const,
  },
  {
    key: 3,
    value: 234,
    icon: Clock,
    trend: { value: 3, isPositive: false },
    variant: "warning" as const,
  },
  {
    key: 4,
    value: 67,
    icon: AlertTriangle,
    trend: { value: 15, isPositive: false },
    variant: "warning" as const,
  },
  {
    key: 5,
    value: 89,
    icon: Calendar,
    trend: { value: 22, isPositive: true },
    variant: "success" as const,
  },
];

const recentActivities = [
  {
    id: 1,
    type: "Certificate Issued",
    type_am: "ሰርተፍኬት ተሰጥቷል",
    user: "John Doe",
    time: "2 hours ago",
    time_am: "2 ሰዓታት በፊት",
    status: "completed",
  },
  {
    id: 2,
    type: "License Approved",
    type_am: "ፈቃድ ተፀድቷል",
    user: "ABC Corp",
    time: "4 hours ago",
    time_am: "4 ሰዓታት በፊት",
    status: "completed",
  },
  {
    id: 3,
    type: "Certificate Pending",
    type_am: "ሰርተፍኬት በመጠባበቅ ላይ",
    user: "Jane Smith",
    time: "6 hours ago",
    time_am: "6 ሰዓታት በፊት",
    status: "pending",
  },
  {
    id: 4,
    type: "License Rejected",
    type_am: "ፈቃድ ተቀባይነት አልተሰጠም",
    user: "XYZ Ltd",
    time: "8 hours ago",
    time_am: "8 ሰዓታት በፊት",
    status: "rejected",
  },
  {
    id: 5,
    type: "Certificate Renewed",
    type_am: "ሰርተፍኬት ታደሰ",
    user: "Tech Solutions",
    time: "1 day ago",
    time_am: "1 ቀን በፊት",
    status: "completed",
  },
];

const pendingApprovals = [
  {
    id: 1,
    applicant: "Sarah Wilson",
    applicant_am: "ሳራ ዊልሰን",
    type: "Business License",
    type_am: "የንግድ ፈቃድ",
    submitted: "2024-01-15",
    priority: "high",
  },
  {
    id: 2,
    applicant: "Global Corp",
    applicant_am: "ግሎባል ኮርፕ",
    type: "Export Certificate",
    type_am: "የስደተኛ ሰርተፍኬት",
    submitted: "2024-01-14",
    priority: "medium",
  },
  {
    id: 3,
    applicant: "Local Store",
    applicant_am: "አካባቢ መደብር",
    type: "Trading License",
    type_am: "የንግድ ፈቃድ",
    submitted: "2024-01-13",
    priority: "low",
  },
  {
    id: 4,
    applicant: "Manufacturing Inc",
    applicant_am: "ማኑፋክቸሪንግ ኢንክ",
    type: "Industrial License",
    type_am: "የኢንዱስትሪ ፈቃድ",
    submitted: "2024-01-12",
    priority: "high",
  },
];

export const DashboardOverview = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge
            variant="secondary"
            className="bg-green-400  text-success border-success/20"
          >
            {t.completed}
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="secondary"
            className="bg-blue-50 text-warning border-warning/20"
          >
            {t.pending}
          </Badge>
        );
      case "rejected":
        return (
          <Badge
            variant="secondary"
            className="bg-destructive/10 text-destructive border-destructive/20"
          >
            {t.rejected}
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">{t.high}</Badge>;
      case "medium":
        return (
          <Badge
            variant="secondary"
            className="bg-blue-50 text-warning border-warning/20"
          >
            {t.medium}
          </Badge>
        );
      case "low":
        return <Badge variant="secondary">{t.low}</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {t.dashboardOverview}
          </h1>
          <p className="text-muted-foreground">{t.welcome}</p>
        </div>
        <Button className="bg-primary hover:bg-primary-hover">
          <RefreshCw className="w-4 h-4 mr-2" />
          {t.refresh}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            title={t.stats[index]}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            variant={stat.variant}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activities */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xl font-semibold">
              {t.recentActivities}
            </CardTitle>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    {activity.status === "completed" ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : activity.status === "pending" ? (
                      <Clock className="h-4 w-4 text-warning" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {language === "am" ? activity.type_am : activity.type}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.user}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  {getStatusBadge(activity.status)}
                  <span className="text-xs text-muted-foreground">
                    {language === "am" ? activity.time_am : activity.time}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xl font-semibold">
              {t.pendingApprovals}
            </CardTitle>
            <Button variant="ghost" size="sm">
              {t.viewAll}
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.applicant}</TableHead>
                  <TableHead>{t.type}</TableHead>
                  <TableHead>{t.priority}</TableHead>
                  <TableHead>{t.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingApprovals.map((approval) => (
                  <TableRow key={approval.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {language === "am"
                            ? approval.applicant_am
                            : approval.applicant}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {approval.submitted}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {language === "am" ? approval.type_am : approval.type}
                    </TableCell>
                    <TableCell>{getPriorityBadge(approval.priority)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2"
                        >
                          <CheckCircle className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2"
                        >
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {t.quickActions}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2 hover:bg-primary/5"
            >
              <FileText className="h-6 w-6 text-primary" />
              <span>{t.issueCertificate}</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2 hover:bg-success/5"
            >
              <Building2 className="h-6 w-6 text-success" />
              <span>{t.approveLicense}</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2 hover:bg-warning/5"
            >
              <Users className="h-6 w-6 text-warning" />
              <span>{t.registerUser}</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2 hover:bg-accent"
            >
              <TrendingUp className="h-6 w-6 text-foreground" />
              <span>{t.viewReports}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
