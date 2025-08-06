"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaxpayerUsersTable } from "@/components/dashboard/tax-payer-users-table";
import { mockTaxpayerUsers } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TaxpayerUsersPage() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Manage Tax Payer Users
        </h1>
        <p className="text-gray-600 text-lg">
          Manage all registered taxpayer certificate holders
        </p>
      </div>

      <Card className="bg-white shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Taxpayer Registrations</CardTitle>
            <Button
              onClick={() => router.push("/taxPayer")}
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 font-semibold shadow-md"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Register Tax Payer
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <TaxpayerUsersTable users={mockTaxpayerUsers} />
        </CardContent>
      </Card>
    </div>
  );
}
