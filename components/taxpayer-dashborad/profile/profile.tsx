"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Building,
  MapPin,
  Calendar,
  Shield,
  Edit3,
  Save,
  X,
  Camera,
  FileText,
  Bell,
  Lock,
  RefreshCw,
} from "lucide-react";

// Mock taxpayer data
const taxpayerData = {
  personalInfo: {
    firstName: "Abebe",
    lastName: "Bekele",
    fullName: "Abebe Bekele Wolde",
    fullNameAmharic: "አበበ በቀለ ወልደ",
    email: "abebe.bekele@email.com",
    phone: "+251-911-234567",
    alternatePhone: "+251-116-789012",
    dateOfBirth: "1985-03-15",
    nationality: "Ethiopian",
    nationalityAmharic: "ኢትዮጵያዊ",
    maritalStatus: "Married",
    profileImage: "/tax-mug-shot.jpg",
  },
  businessInfo: {
    businessName: "Bekele Trading PLC",
    businessNameAmharic: "በቀለ ንግድ ማህበር",
    tinNumber: "TIN-ET-001234567",
    businessType: "Import/Export",
    businessTypeAmharic: "ማስመጣት/ማስወጣት",
    establishedDate: "2015-08-20",
    employeeCount: "25-50",
    businessCode: "46190",
    licenseNumber: "LIC-AM-2015-00567",
  },
  addressInfo: {
    region: "Addis Ababa",
    regionAmharic: "አዲስ አበባ",
    subCity: "Bole",
    subCityAmharic: "ቦሌ",
    woreda: "Woreda 03",
    woredaAmharic: "ወረዳ 03",
    kebele: "Kebele 08",
    kebeleAmharic: "ቀበሌ 08",
    houseNumber: "H.No 1234",
    streetAddress: "Bole Road, Near Edna Mall",
    postalCode: "1000",
  },
  accountStatus: {
    status: "Active",
    complianceScore: 98.5,
    lastLogin: "2024-08-12 14:30",
    accountCreated: "2020-05-15",
    verificationStatus: "Verified",
    taxClearanceStatus: "Valid",
    businessLicenseStatus: "Active",
  },
};

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState(taxpayerData);

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(taxpayerData);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal and business information
          </p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2"
            >
              <Edit3 className="h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Profile Overview Card */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={formData.personalInfo.profileImage}
                  alt="Profile"
                />
                <AvatarFallback className="text-2xl">
                  {formData.personalInfo.firstName[0]}
                  {formData.personalInfo.lastName[0]}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-foreground">
                  {formData.personalInfo.fullName}
                </h2>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 border-green-200"
                >
                  <Shield className="h-3 w-3 mr-1" />
                  {formData.accountStatus.verificationStatus}
                </Badge>
              </div>

              <p className="text-lg text-muted-foreground mb-1">
                {formData.personalInfo.fullNameAmharic}
              </p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  TIN: {formData.businessInfo.tinNumber}
                </div>
                <div className="flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  {formData.businessInfo.businessName}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Member since{" "}
                  {new Date(
                    formData.accountStatus.accountCreated
                  ).getFullYear()}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                {formData.accountStatus.complianceScore}%
              </div>
              <p className="text-sm text-muted-foreground">Compliance Score</p>
              <Badge variant="secondary" className="mt-1">
                {formData.accountStatus.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="business" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Business Info
          </TabsTrigger>
          <TabsTrigger value="address" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Address
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.personalInfo.firstName}
                    onChange={(e) =>
                      handleInputChange(
                        "personalInfo",
                        "firstName",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.personalInfo.lastName}
                    onChange={(e) =>
                      handleInputChange(
                        "personalInfo",
                        "lastName",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name (English)</Label>
                  <Input
                    id="fullName"
                    value={formData.personalInfo.fullName}
                    onChange={(e) =>
                      handleInputChange(
                        "personalInfo",
                        "fullName",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullNameAmharic">Full Name (Amharic)</Label>
                  <Input
                    id="fullNameAmharic"
                    value={formData.personalInfo.fullNameAmharic}
                    onChange={(e) =>
                      handleInputChange(
                        "personalInfo",
                        "fullNameAmharic",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) =>
                      handleInputChange("personalInfo", "email", e.target.value)
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.personalInfo.phone}
                    onChange={(e) =>
                      handleInputChange("personalInfo", "phone", e.target.value)
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alternatePhone">Alternate Phone</Label>
                  <Input
                    id="alternatePhone"
                    value={formData.personalInfo.alternatePhone}
                    onChange={(e) =>
                      handleInputChange(
                        "personalInfo",
                        "alternatePhone",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.personalInfo.dateOfBirth}
                    onChange={(e) =>
                      handleInputChange(
                        "personalInfo",
                        "dateOfBirth",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    value={formData.personalInfo.nationality}
                    onChange={(e) =>
                      handleInputChange(
                        "personalInfo",
                        "nationality",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationalityAmharic">
                    Nationality (Amharic)
                  </Label>
                  <Input
                    id="nationalityAmharic"
                    value={formData.personalInfo.nationalityAmharic}
                    onChange={(e) =>
                      handleInputChange(
                        "personalInfo",
                        "nationalityAmharic",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maritalStatus">Marital Status</Label>
                  <Input
                    id="maritalStatus"
                    value={formData.personalInfo.maritalStatus}
                    onChange={(e) =>
                      handleInputChange(
                        "personalInfo",
                        "maritalStatus",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Business Information Tab */}
        <TabsContent value="business" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Business Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={formData.businessInfo.businessName}
                    onChange={(e) =>
                      handleInputChange(
                        "businessInfo",
                        "businessName",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessNameAmharic">
                    Business Name (Amharic)
                  </Label>
                  <Input
                    id="businessNameAmharic"
                    value={formData.businessInfo.businessNameAmharic}
                    onChange={(e) =>
                      handleInputChange(
                        "businessInfo",
                        "businessNameAmharic",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tinNumber">TIN Number</Label>
                  <Input
                    id="tinNumber"
                    value={formData.businessInfo.tinNumber}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">
                    TIN number cannot be changed
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">License Number</Label>
                  <Input
                    id="licenseNumber"
                    value={formData.businessInfo.licenseNumber}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Input
                    id="businessType"
                    value={formData.businessInfo.businessType}
                    onChange={(e) =>
                      handleInputChange(
                        "businessInfo",
                        "businessType",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessTypeAmharic">
                    Business Type (Amharic)
                  </Label>
                  <Input
                    id="businessTypeAmharic"
                    value={formData.businessInfo.businessTypeAmharic}
                    onChange={(e) =>
                      handleInputChange(
                        "businessInfo",
                        "businessTypeAmharic",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="establishedDate">Established Date</Label>
                  <Input
                    id="establishedDate"
                    type="date"
                    value={formData.businessInfo.establishedDate}
                    onChange={(e) =>
                      handleInputChange(
                        "businessInfo",
                        "establishedDate",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employeeCount">Employee Count</Label>
                  <Input
                    id="employeeCount"
                    value={formData.businessInfo.employeeCount}
                    onChange={(e) =>
                      handleInputChange(
                        "businessInfo",
                        "employeeCount",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessCode">Business Code</Label>
                  <Input
                    id="businessCode"
                    value={formData.businessInfo.businessCode}
                    onChange={(e) =>
                      handleInputChange(
                        "businessInfo",
                        "businessCode",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Address Information Tab */}
        <TabsContent value="address" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Address Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Input
                    id="region"
                    value={formData.addressInfo.region}
                    onChange={(e) =>
                      handleInputChange("addressInfo", "region", e.target.value)
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regionAmharic">Region (Amharic)</Label>
                  <Input
                    id="regionAmharic"
                    value={formData.addressInfo.regionAmharic}
                    onChange={(e) =>
                      handleInputChange(
                        "addressInfo",
                        "regionAmharic",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subCity">Sub City</Label>
                  <Input
                    id="subCity"
                    value={formData.addressInfo.subCity}
                    onChange={(e) =>
                      handleInputChange(
                        "addressInfo",
                        "subCity",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subCityAmharic">Sub City (Amharic)</Label>
                  <Input
                    id="subCityAmharic"
                    value={formData.addressInfo.subCityAmharic}
                    onChange={(e) =>
                      handleInputChange(
                        "addressInfo",
                        "subCityAmharic",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="woreda">Woreda</Label>
                  <Input
                    id="woreda"
                    value={formData.addressInfo.woreda}
                    onChange={(e) =>
                      handleInputChange("addressInfo", "woreda", e.target.value)
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="woredaAmharic">Woreda (Amharic)</Label>
                  <Input
                    id="woredaAmharic"
                    value={formData.addressInfo.woredaAmharic}
                    onChange={(e) =>
                      handleInputChange(
                        "addressInfo",
                        "woredaAmharic",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kebele">Kebele</Label>
                  <Input
                    id="kebele"
                    value={formData.addressInfo.kebele}
                    onChange={(e) =>
                      handleInputChange("addressInfo", "kebele", e.target.value)
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kebeleAmharic">Kebele (Amharic)</Label>
                  <Input
                    id="kebeleAmharic"
                    value={formData.addressInfo.kebeleAmharic}
                    onChange={(e) =>
                      handleInputChange(
                        "addressInfo",
                        "kebeleAmharic",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="houseNumber">House Number</Label>
                  <Input
                    id="houseNumber"
                    value={formData.addressInfo.houseNumber}
                    onChange={(e) =>
                      handleInputChange(
                        "addressInfo",
                        "houseNumber",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    value={formData.addressInfo.postalCode}
                    onChange={(e) =>
                      handleInputChange(
                        "addressInfo",
                        "postalCode",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="streetAddress">Street Address</Label>
                <Textarea
                  id="streetAddress"
                  value={formData.addressInfo.streetAddress}
                  onChange={(e) =>
                    handleInputChange(
                      "addressInfo",
                      "streetAddress",
                      e.target.value
                    )
                  }
                  disabled={!isEditing}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Account Security & Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Account Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Account Status</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    {formData.accountStatus.status}
                  </Badge>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Tax Clearance</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    {formData.accountStatus.taxClearanceStatus}
                  </Badge>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="h-5 w-5 text-purple-600" />
                    <span className="font-medium">Business License</span>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                    {formData.accountStatus.businessLicenseStatus}
                  </Badge>
                </div>
              </div>

              {/* Security Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Security Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Last Login</Label>
                    <Input
                      value={formData.accountStatus.lastLogin}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Account Created</Label>
                    <Input
                      value={formData.accountStatus.accountCreated}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Notification Settings
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Enable Two-Factor Auth
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
