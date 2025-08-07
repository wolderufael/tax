"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, UserPlus, IdCard, User, Building2 } from "lucide-react";

interface TaxOfficerData {
  firstName: string;
  lastName: string;
  employeeId: string;
}

export default function AddTaxOfficerPage() {
  const router = useRouter();
  const [form, setForm] = useState<TaxOfficerData>({
    firstName: "",
    lastName: "",
    employeeId: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.employeeId.trim()
    ) {
      setError("All fields are required.");
      return;
    }

    if (form.firstName.length < 2) {
      setError("First name must be at least 2 characters long.");
      return;
    }

    if (form.lastName.length < 2) {
      setError("Last name must be at least 2 characters long.");
      return;
    }

    if (form.employeeId.length < 3) {
      setError("Employee ID must be at least 3 characters long.");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Here you would typically make an API call to add the officer
      console.log("Adding tax officer:", form);
      alert(
        `Tax Officer ${form.firstName} ${form.lastName} (${form.employeeId}) added successfully!`
      );
      router.push("/dashboard/business");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="h-10 w-10 p-0 hover:bg-blue-50"
          >
            <ArrowLeft className="h-5 w-5 text-blue-600" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-blue-800">
              Register Tax Officer
            </h1>
            <p className="text-blue-700">
              Enter the details for the new tax officer
            </p>
          </div>
        </div>

        {/* Form Card */}
        <Card className="bg-white shadow-2xl border-blue-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl text-blue-800">
                  Officer Information
                </CardTitle>
                <p className="text-sm text-blue-700">
                  Please provide the complete details for the new tax officer
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3 mb-4">
                    <IdCard className="w-5 h-5 text-blue-600" />
                    <Label
                      htmlFor="employeeId"
                      className="text-lg font-semibold text-blue-900"
                    >
                      Employee ID Number *
                    </Label>
                  </div>
                  <Input
                    id="employeeId"
                    name="employeeId"
                    type="text"
                    value={form.employeeId}
                    onChange={handleChange}
                    placeholder="Enter employee ID number"
                    className="text-lg h-12 border-2 focus:border-blue-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label
                      htmlFor="firstName"
                      className="flex items-center gap-2 text-base font-medium"
                    >
                      <User className="w-4 h-4" />
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      className="text-lg h-12 border-2 focus:border-blue-400"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="lastName"
                      className="flex items-center gap-2 text-base font-medium"
                    >
                      <User className="w-4 h-4" />
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                      className="text-lg h-12 border-2 focus:border-blue-400"
                      required
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm font-medium text-center bg-red-50 p-4 rounded-md border border-red-200">
                  {error}
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="flex-1 h-12 border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 font-semibold shadow-md"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
