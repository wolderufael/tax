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
    user: "July 2024 Monthly VAT Return - ETB 45,200",
    time: "2 hours ago",
    status: "completed",
    amount: "ETB 4,520",
  },
  {
    id: 2,
    type: "PAYE Payment Processed",
    user: "Employee Tax Payment - 15 Employees",
    time: "1 day ago",
    status: "completed",
    amount: "ETB 12,850",
  },
  {
    id: 3,
    type: "Tax Clearance Certificate",
    user: "Export License Clearance Request",
    time: "3 days ago",
    status: "pending",
    amount: "Processing",
  },
  {
    id: 4,
    type: "Business License Renewal",
    user: "Annual Premium License Renewal",
    time: "5 days ago",
    status: "pending",
    amount: "ETB 2,500",
  },
  {
    id: 5,
    type: "Income Tax Assessment",
    user: "Q2 2024 Tax Assessment Completed",
    time: "1 week ago",
    status: "completed",
    amount: "ETB 8,750",
  },
];

const upcomingTasks = [
  {
    id: 1,
    task: "August VAT Return Filing",
    type: "Monthly Declaration",
    dueDate: "Aug 15, 2024",
    priority: "high",
    amount: "Est. ETB 4,800",
    daysLeft: 3,
  },
  {
    id: 2,
    task: "Employee PAYE Payment",
    type: "Payroll Tax",
    dueDate: "Aug 20, 2024",
    priority: "high",
    amount: "ETB 13,200",
    daysLeft: 8,
  },
  {
    id: 3,
    task: "Premium License Renewal",
    type: "Business License",
    dueDate: "Sep 1, 2024",
    priority: "medium",
    amount: "ETB 2,500",
    daysLeft: 20,
  },
  {
    id: 4,
    task: "Annual Income Tax Return",
    type: "Yearly Declaration",
    dueDate: "Dec 31, 2024",
    priority: "low",
    amount: "Est. ETB 25,000",
    daysLeft: 150,
  },
];

export const DashboardOverview = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge
            variant="secondary"
            className="bg-green-400  text-success border-success/20"
          >
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="secondary"
            className="bg-blue-50 text-warning border-warning/20"
          >
            Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge
            variant="secondary"
            className="bg-destructive/10 text-destructive border-destructive/20"
          >
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return (
          <Badge
            variant="secondary"
            className="bg-blue-50 text-warning border-warning/20"
          >
            Medium
          </Badge>
        );
      case "low":
        return <Badge variant="secondary">Low</Badge>;
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
            My Tax Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your tax account and recent
            activities.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary-hover">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            variant={stat.variant}
            subtitle={stat.subtitle}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activities */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xl font-semibold">
              My Recent Activities
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
                    <p className="font-medium text-sm">{activity.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.user}
                    </p>
                    <p className="text-xs font-medium text-primary">
                      {activity.amount}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  {getStatusBadge(activity.status)}
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
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
              Upcoming Tax Obligations
            </CardTitle>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{task.task}</p>
                        <p className="text-xs text-muted-foreground">
                          {task.type}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{task.dueDate}</p>
                        <p className="text-xs text-muted-foreground">
                          {task.daysLeft} days left
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-primary">
                      {task.amount}
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
          <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button
              variant="outline"
              className="h-24 flex-col space-y-2 hover:bg-primary/5 border-primary/20"
            >
              <FileText className="h-8 w-8 text-primary" />
              <div className="text-center">
                <span className="text-sm font-medium">File Tax Return</span>
                <p className="text-xs text-muted-foreground">
                  Submit declarations
                </p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col space-y-2 hover:bg-green-50 border-green-200"
            >
              <CreditCard className="h-8 w-8 text-green-600" />
              <div className="text-center">
                <span className="text-sm font-medium">Make Payment</span>
                <p className="text-xs text-muted-foreground">
                  Pay taxes online
                </p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col space-y-2 hover:bg-blue-50 border-blue-200"
            >
              <Award className="h-8 w-8 text-blue-600" />
              <div className="text-center">
                <span className="text-sm font-medium">Get Certificate</span>
                <p className="text-xs text-muted-foreground">
                  Download clearance
                </p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col space-y-2 hover:bg-purple-50 border-purple-200"
            >
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="text-center">
                <span className="text-sm font-medium">View Reports</span>
                <p className="text-xs text-muted-foreground">Tax analytics</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
