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
  CreditCard,
  Wallet,
  Shield,
  Award,
  DollarSign,
  TrendingDown,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatsCard from "@/components/taxpayer-dashborad/StatsCard";
import { useLanguage } from "@/components/LanguageProvider";

// Mock data for taxpayer - Enhanced and appealing
const statsData = [
  {
    title: "Tax Identification Number",
    value: "TIN-ET-001234567",
    icon: Shield,
    trend: { value: 100, isPositive: true },
    variant: "info" as const,
    subtitle: "Verified & Active",
  },
  {
    title: "Active Certificates",
    value: 5,
    icon: Award,
    trend: { value: 2, isPositive: true },
    variant: "success" as const,
    subtitle: "All Valid",
  },
  {
    title: "Business License",
    value: "Premium Active",
    icon: Building2,
    trend: { value: 0, isPositive: true },
    variant: "default" as const,
    subtitle: "Expires: Dec 2024",
  },
  {
    title: "Compliance Score",
    value: "98.5%",
    icon: CheckCircle,
    trend: { value: 2.5, isPositive: true },
    variant: "success" as const,
    subtitle: "Excellent Standing",
  },
  {
    title: "Account Balance",
    value: "ETB 15,750",
    icon: Wallet,
    trend: { value: 3250, isPositive: true },
    variant: "info" as const,
    subtitle: "Credit Balance",
  },
  {
    title: "Monthly Tax Savings",
    value: "ETB 8,450",
    icon: TrendingUp,
    trend: { value: 15, isPositive: true },
    variant: "success" as const,
    subtitle: "vs Last Month",
  },
];

const recentActivities = [
  {
    id: 1,
    type: "VAT Return Filed Successfully",
    type_am: "የቫት መመዝገቢያ በተሳካ ሁኔታ ተሰጥቷል",
    user: "July 2024 Monthly VAT Return - ETB 45,200",
    user_am: "ጁላይ 2024 ወርሃዊ ቫት መመዝገቢያ - 45,200 ብር",
    time: "2 hours ago",
    time_am: "2 ሰዓታት በፊት",
    status: "completed",
    amount: "ETB 4,520",
    amount_am: "4,520 ብር",
  },
  {
    id: 2,
    type: "Payment Processed",
    type_am: "ክፍያ ተከናውኗል",
    user: "Employee Tax Payment - 15 Employees",
    user_am: "የሰራተኞች ታክስ ክፍያ - 15 ሰራተኞች",
    time: "1 day ago",
    time_am: "1 ቀን በፊት",
    status: "completed",
    amount: "ETB 12,850",
    amount_am: "12,850 ብር",
  },
  {
    id: 3,
    type: "Tax Clearance Certificate",
    type_am: "የታክስ ነጻነት ሰርተፍኬት",
    user: "Export License Clearance Request",
    user_am: "የስደተኛ ፈቃድ ነጻነት ጥያቄ",
    time: "3 days ago",
    time_am: "3 ቀናት በፊት",
    status: "pending",
    amount: "Processing",
    amount_am: "በሂደት ላይ",
  },
  {
    id: 4,
    type: "Business License Renewal",
    type_am: "የንግድ ፈቃድ ዳግም ማስረከቢያ",
    user: "Annual Premium License Renewal",
    user_am: "ዓመታዊ ፕሪሚየም ፈቃድ ዳግም ማስረከቢያ",
    time: "5 days ago",
    time_am: "5 ቀናት በፊት",
    status: "pending",
    amount: "ETB 2,500",
    amount_am: "2,500 ብር",
  },
  {
    id: 5,
    type: "Income Tax Assessment",
    type_am: "የገቢ ታክስ ግምገማ",
    user: "Q2 2024 Tax Assessment Completed",
    user_am: "የ2024 ሩብ 2 ታክስ ግምገማ ተጠናቋል",
    time: "1 week ago",
    time_am: "1 ሳምንት በፊት",
    status: "completed",
    amount: "ETB 8,750",
    amount_am: "8,750 ብር",
  },
];

const upcomingTasks = [
  {
    id: 1,
    task: "August VAT Return Filing",
    task_am: "ኦገስት ወር የቫት መመዝገቢያ",
    type: "Monthly Declaration",
    type_am: "ወርሃዊ መግለጫ",
    dueDate: "Aug 15, 2024",
    dueDate_am: "15 ኦገስት 2024",
    priority: "high",
    amount: "Est. ETB 4,800",
    amount_am: "ተገመተው 4,800 ብር",
    daysLeft: 3,
  },
  {
    id: 2,
    task: "Employee PAYE Payment",
    task_am: "የሰራተኞች PAYE ክፍያ",
    type: "Payroll Tax",
    type_am: "የደመወዝ ታክስ",
    dueDate: "Aug 20, 2024",
    dueDate_am: "20 ኦገስት 2024",
    priority: "high",
    amount: "ETB 13,200",
    amount_am: "13,200 ብር",
    daysLeft: 8,
  },
  {
    id: 3,
    task: "Premium License Renewal",
    task_am: "ፕሪሚየም ፈቃድ ዳግም ማስረከቢያ",
    type: "Business License",
    type_am: "የንግድ ፈቃድ",
    dueDate: "Sep 1, 2024",
    dueDate_am: "1 ሴፕቴምበር 2024",
    priority: "medium",
    amount: "ETB 2,500",
    amount_am: "2,500 ብር",
    daysLeft: 20,
  },
  {
    id: 4,
    task: "Annual Income Tax Return",
    task_am: "ዓመታዊ የገቢ ታክስ መመዝገቢያ",
    type: "Yearly Declaration",
    type_am: "ዓመታዊ መግለጫ",
    dueDate: "Dec 31, 2024",
    dueDate_am: "31 ዲሴምበር 2024",
    priority: "low",
    amount: "Est. ETB 25,000",
    amount_am: "ተገመተው 25,000 ብር",
    daysLeft: 150,
  },
];

const translations = {
  en: {
    dashboard: "My Tax Dashboard",
    welcome:
      "Welcome back! Here's an overview of your tax account and recent activities.",
    refresh: "Refresh Data",
    stats: [
      "Tax Identification Number",
      "Active Certificates",
      "Business License",
      "Compliance Score",
      "Account Balance",
      "Monthly Tax Savings",
    ],
    subtitles: [
      "Verified & Active",
      "All Valid",
      "Expires: Dec 2024",
      "Excellent Standing",
      "Credit Balance",
      "vs Last Month",
    ],
    recentActivities: "My Recent Activities",
    upcomingTasks: "Upcoming Tax Obligations",
    viewAll: "View All",
    task: "Task",
    dueDate: "Due Date",
    amount: "Amount",
    priority: "Priority",
    completed: "Completed",
    pending: "Pending",
    rejected: "Rejected",
    high: "High",
    medium: "Medium",
    low: "Low",
    quickActions: "Quick Actions",
    fileTaxReturn: "File Tax Return",
    submitDeclarations: "Submit declarations",
    makePayment: "Make Payment",
    payTaxes: "Pay taxes online",
    getCertificate: "Get Certificate",
    downloadClearance: "Download clearance",
    viewReports: "View Reports",
    taxAnalytics: "Tax analytics",
  },
  am: {
    dashboard: "የኔ የታክስ ዳሽቦርድ",
    welcome: "እንኳን ደህና መጡ! ይህ የታክስ መለያዎ እና የቅርብ ጊዜ እንቅስቃሴዎች አጠቃላይ እይታ ነው።",
    refresh: "ዳታ አድስ",
    stats: [
      "የታክስ መለያ ቁጥር",
      "ንቁ ሰርተፍኬቶች",
      "የንግድ ፈቃድ",
      "የተግባር አጠቃላይ ውጤት",
      "የመለያ ሂሳብ",
      "ወርሃዊ የታክስ ቅናሽ",
    ],
    subtitles: [
      "ተረጋጋ እና ንቁ",
      "ሁሉም ትክክል",
      "የሚያበቃው: ዲሴም 2024",
      "አሪፍ ሁኔታ",
      "የተቀረ ብድር",
      "ከባለፈው ወር ጋር",
    ],
    recentActivities: "የኔ የቅርብ ጊዜ እንቅስቃሴዎች",
    upcomingTasks: "የሚመጡ የታክስ ግዴታዎች",
    viewAll: "ሁሉንም ይመልከቱ",
    task: "ተግባር",
    dueDate: "የሚያበቃው ቀን",
    amount: "መጠን",
    priority: "ቅድሚያ",
    completed: "ተጠናቋል",
    pending: "በመጠባበቅ ላይ",
    rejected: "ተቀባይነት አልተሰጠም",
    high: "ከፍተኛ",
    medium: "መካከለኛ",
    low: "ዝቅተኛ",
    quickActions: "ፈጣን እርምጃዎች",
    fileTaxReturn: "የታክስ መመዝገቢያ ያስገቡ",
    submitDeclarations: "መግለጫዎችን ያስገቡ",
    makePayment: "ክፍያ ያድርጉ",
    payTaxes: "ታክስ በመስመር ላይ ይክፈሉ",
    getCertificate: "ሰርተፍኬት ያግኙ",
    downloadClearance: "የንግድ ፈቃድ ያውርዱ",
    viewReports: "ሪፖርቶችን ይመልከቱ",
    taxAnalytics: "የታክስ ትንታኔዎች",
  },
};

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
          <h1 className="text-3xl font-bold text-foreground">{t.dashboard}</h1>
          <p className="text-muted-foreground">{t.welcome}</p>
        </div>
        <Button className="bg-primary hover:bg-primary-hover">
          <RefreshCw className="w-4 h-4 mr-2" />
          {t.refresh}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            title={t.stats[index]}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            variant={stat.variant}
            subtitle={t.subtitles[index]}
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
                      {language === "am" ? activity.user_am : activity.user}
                    </p>
                    <p className="text-xs font-medium text-primary">
                      {language === "am" ? activity.amount_am : activity.amount}
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

        {/* Upcoming Tasks */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xl font-semibold">
              {t.upcomingTasks}
            </CardTitle>
            <Button variant="ghost" size="sm">
              {t.viewAll}
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.task}</TableHead>
                  <TableHead>{t.dueDate}</TableHead>
                  <TableHead>{t.amount}</TableHead>
                  <TableHead>{t.priority}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {language === "am" ? task.task_am : task.task}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {language === "am" ? task.type_am : task.type}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">
                          {language === "am" ? task.dueDate_am : task.dueDate}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {task.daysLeft}{" "}
                          {language === "am" ? "ቀናት ቀርበዋል" : "days left"}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-primary">
                      {language === "am" ? task.amount_am : task.amount}
                    </TableCell>
                    <TableCell>{getPriorityBadge(task.priority)}</TableCell>
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
              className="h-24 flex-col space-y-2 hover:bg-primary/5 border-primary/20"
            >
              <FileText className="h-8 w-8 text-primary" />
              <div className="text-center">
                <span className="text-sm font-medium">{t.fileTaxReturn}</span>
                <p className="text-xs text-muted-foreground">
                  {t.submitDeclarations}
                </p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col space-y-2 hover:bg-green-50 border-green-200"
            >
              <CreditCard className="h-8 w-8 text-green-600" />
              <div className="text-center">
                <span className="text-sm font-medium">{t.makePayment}</span>
                <p className="text-xs text-muted-foreground">{t.payTaxes}</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col space-y-2 hover:bg-blue-50 border-blue-200"
            >
              <Award className="h-8 w-8 text-blue-600" />
              <div className="text-center">
                <span className="text-sm font-medium">{t.getCertificate}</span>
                <p className="text-xs text-muted-foreground">
                  {t.downloadClearance}
                </p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col space-y-2 hover:bg-purple-50 border-purple-200"
            >
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="text-center">
                <span className="text-sm font-medium">{t.viewReports}</span>
                <p className="text-xs text-muted-foreground">
                  {t.taxAnalytics}
                </p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
