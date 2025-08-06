"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, LogIn, User, Building2 } from "lucide-react";

export default function Login() {
  const [activeTab, setActiveTab] = useState("taxpayer");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.email || !form.password) {
      setError("Both fields are required.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        // Redirect based on user type
        const redirectPath =
          activeTab === "officer" ? "/dashboard" : "/dashboard/taxPayer";
        window.location.href = redirectPath;
      }, 1000);
      setForm({ email: "", password: "" });
    }, 1000);
  };

  const renderLoginForm = (
    userType: string,
    title: string,
    subtitle: string,
    icon: React.ReactNode
  ) => (
    <div className="flex flex-col items-center mb-8">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center mb-3 shadow-lg">
        {icon}
      </div>
      <h2 className="text-3xl font-bold text-blue-800 mb-1">{title}</h2>
      <p className="text-blue-700 text-sm">{subtitle}</p>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4">
      <Card className="w-full max-w-md p-8 shadow-2xl border-blue-200 bg-white/90">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="taxpayer" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Tax Payer
            </TabsTrigger>
            <TabsTrigger value="officer" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Tax Officer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="taxpayer">
            {renderLoginForm(
              "taxpayer",
              "Tax Payer Login",
              "Access your tax account and manage your payments",
              <User className="w-8 h-8 text-white" />
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-blue-800 font-medium mb-1"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  className="h-12 text-base"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-blue-800 font-medium mb-1"
                >
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="h-12 text-base pr-10"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-blue-600 hover:text-emerald-800"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {error && (
                <div className="text-red-600 text-sm font-medium text-center">
                  {error}
                </div>
              )}
              {success && (
                <div className="text-green-700 text-sm font-medium text-center">
                  {success}
                </div>
              )}
              <Button
                type="submit"
                className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 font-semibold shadow-md"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Login as Tax Payer"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="officer">
            {renderLoginForm(
              "officer",
              "Tax Officer Login",
              "Access the administrative dashboard",
              <Building2 className="w-8 h-8 text-white" />
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-blue-800 font-medium mb-1"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="officer@tax.gov"
                  className="h-12 text-base"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-blue-800 font-medium mb-1"
                >
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="h-12 text-base pr-10"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-blue-600 hover:text-emerald-800"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {error && (
                <div className="text-red-600 text-sm font-medium text-center">
                  {error}
                </div>
              )}
              {success && (
                <div className="text-green-700 text-sm font-medium text-center">
                  {success}
                </div>
              )}
              <Button
                type="submit"
                className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 font-semibold shadow-md"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Login as Tax Officer"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center text-sm text-blue-700">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-900 font-semibold hover:underline"
          >
            Register
          </a>
        </div>
      </Card>
    </div>
  );
}
