"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BusinessUsersTable } from "@/components/dashboard/business-users-table";
import { mockBusinessUsers } from "@/lib/mock-data";
import { UserPlus } from "lucide-react";

export default function BusinessUsersPage() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Business Users
        </h1>
        <p className="text-gray-600 text-lg">
          Manage all registered business license holders
        </p>
      </div>

      <Card className="bg-white shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Business License Registrations</CardTitle>
            <Button
              onClick={() => router.push("/dashboard/business/add-officer")}
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 font-semibold shadow-md"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Register Tax Officer
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <BusinessUsersTable users={mockBusinessUsers} />
        </CardContent>
      </Card>
    </div>
  );
}
