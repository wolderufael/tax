//import { TaxpayerOverview } from "@/components/taxpayer-dashborad/overview-cards";
import { DashboardOverview } from "@/components/taxpayer-dashborad/overview-cards";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OverviewPage = () => {
  return (
    <div>
      <DashboardOverview />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>My Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <span className="font-medium text-blue-600">2024-07-30:</span>{" "}
                Your Business License application has been approved
              </li>
              <li>
                <span className="font-medium text-green-600">2024-07-29:</span>{" "}
                Taxpayer Registration certificate downloaded
              </li>
              <li>
                <span className="font-medium text-orange-600">2024-07-28:</span>{" "}
                Business License renewal application submitted
              </li>
              <li>
                <span className="font-medium text-purple-600">2024-07-27:</span>{" "}
                Tax payment receipt generated for July 2024
              </li>
              <li>
                <span className="font-medium text-green-600">2024-07-26:</span>{" "}
                Profile information updated successfully
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>My Documents Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex justify-between items-center">
                <span>Taxpayer Registration:</span>
                <Badge variant="default" className="bg-green-500">
                  Active
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Business License:</span>
                <Badge variant="default" className="bg-green-500">
                  Valid
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Tax Compliance Status:</span>
                <Badge variant="default" className="bg-green-500">
                  Up to Date
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>License Renewal Due:</span>
                <Badge variant="default" className="bg-blue-500">
                  In 6 Months
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewPage;
