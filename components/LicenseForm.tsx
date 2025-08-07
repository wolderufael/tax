"use client";

import type React from "react";

import { useEffect, useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Download,
  Eye,
  User,
  MapPin,
  Building,
  FileCheck,
  ChevronRight,
  ChevronLeft,
  Upload,
  CheckCircle,
  Check,
} from "lucide-react";
import Certificate from "./certeficate";
import { useSearchParams } from "next/navigation";

interface BusinessData {
  ownerName: string;
  ownerNameAm: string;
  nationality: string;
  nationalityAm: string;
  tradeName: string;
  tradeNameAm: string;
  generalManagerName: string;
  generalManagerNameAm: string;
  region: string;
  regionAm: string;
  zoneSubCity: string;
  zoneSubCityAm: string;
  woreda: string;
  woredaAm: string;
  kebele: string;
  kebeleAm: string;
  houseNo: string;
  telNo: string;
  fax?: string;
  email?: string;
  photo?: string;
  fieldOfBusiness: string;
  fieldOfBusinessAm: string;
  businessCode: string;
  capitalAmount: string;
  issueDate: string;
  issueLocation: string;
  issueLocationAm: string;
  officialName: string;
  officialNameAm: string;
  licenseNumber: string;
  registrationNumber: string;
  previousIssueDate: string;
}

const dummyData: BusinessData = {
  ownerName: "Abebe Kebede Alemu",
  ownerNameAm: "አበበ ከበደ አለሙ",
  nationality: "Ethiopian",
  nationalityAm: "ኢትዮጵያዊ",
  tradeName: "Abebe Bakery Enterprise",
  tradeNameAm: "አበበ ቤከሪ ኢንተርፕራይዝ",
  generalManagerName: "Mr. Abebe Kebede",
  generalManagerNameAm: "አበበ ከበደ",
  region: "South Ethiopia",
  regionAm: "ደቡብ ኢትዮጵያ",
  zoneSubCity: "Arba Minch",
  zoneSubCityAm: "አርባ ምንጭ",
  woreda: "Arba Minch",
  woredaAm: "አርባ ምንጭ",
  kebele: "KEBELE 08",
  kebeleAm: "ቀበሌ 08",
  photo: "/tax-mug-shot.jpg",
  houseNo: "new",
  telNo: "0947012893",
  fax: "",
  email: "abebe.kebede@email.com",
  fieldOfBusiness: "Manufacturing of bakery products",
  fieldOfBusinessAm: "የኩባያ ምርት አምራች",
  businessCode: "(31121)",
  capitalAmount: "10,000.00",
  issueDate: "2024-07-18",
  issueLocation: "South Ethiopia",
  issueLocationAm: "ደቡብ ኢትዮጵያ",
  officialName: "Regional Trade Officer",
  officialNameAm: "የክልል ንግድ ባለስልጣን",
  licenseNumber: "AM/DES/100136/2016",
  registrationNumber: "AM/DES/031/ADS/150512/2016",
  previousIssueDate: "2016-11-11",
};

const steps = [
  {
    id: 1,
    title: "Personal Information",
    titleAm: "የግለሰብ መረጃ",
    icon: User,
    description: "Basic owner and company details",
  },
  {
    id: 2,
    title: "Business Address",
    titleAm: "የንግድ አድራሻ",
    icon: MapPin,
    description: "Location and contact information",
  },
  {
    id: 3,
    title: "Business Details",
    titleAm: "የንግድ ዝርዝር",
    icon: Building,
    description: "Business type and operations",
  },
  {
    id: 4,
    title: "License Information",
    titleAm: "የፈቃድ መረጃ",
    icon: FileCheck,
    description: "Official documentation details",
  },
];

function BusinessLicenseContent() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<BusinessData>(dummyData);
  const [activeTab, setActiveTab] = useState("form");
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "certificate") {
      setActiveTab("certificate");
    }
  }, [searchParams]);

  const handleInputChange = (field: keyof BusinessData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          photo: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.ownerName &&
          formData.ownerNameAm &&
          formData.nationality &&
          formData.nationalityAm
        );
      case 2:
        return !!(
          formData.region &&
          formData.regionAm &&
          formData.zoneSubCity &&
          formData.telNo
        );
      case 3:
        return !!(
          formData.fieldOfBusiness &&
          formData.fieldOfBusinessAm &&
          formData.businessCode
        );
      case 4:
        return !!(
          formData.licenseNumber &&
          formData.registrationNumber &&
          formData.officialName
        );
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerateCertificate = () => {
    setActiveTab("certificate");
  };

  const handleDownloadCertificate = () => {
    window.print();
  };

  const progressPercentage = (completedSteps.length / 4) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <h3 className="text-xl font-semibold text-gray-900">
                Personal Information
              </h3>
              <p className="text-gray-600">የግለሰብ መረጃ</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="ownerNameAm"
                  className="flex items-center gap-2"
                >
                  የባለቤት/ድርጅት ስም
                </Label>
                <Input
                  id="ownerNameAm"
                  value={formData.ownerNameAm}
                  onChange={(e) =>
                    handleInputChange("ownerNameAm", e.target.value)
                  }
                  placeholder="የባለቤት/ድርጅት ስም"
                  className="text-lg"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ownerName" className="flex items-center gap-2">
                  Owner/Company Name
                </Label>
                <Input
                  id="ownerName"
                  value={formData.ownerName}
                  onChange={(e) =>
                    handleInputChange("ownerName", e.target.value)
                  }
                  placeholder="Owner or company name"
                  className="text-lg"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="nationalityAm"
                  className="flex items-center gap-2"
                >
                  ዜግነት
                </Label>
                <Input
                  id="nationalityAm"
                  value={formData.nationalityAm}
                  onChange={(e) =>
                    handleInputChange("nationalityAm", e.target.value)
                  }
                  placeholder="ዜግነት"
                  className="text-lg"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="nationality"
                  className="flex items-center gap-2"
                >
                  Nationality
                </Label>
                <Input
                  id="nationality"
                  value={formData.nationality}
                  onChange={(e) =>
                    handleInputChange("nationality", e.target.value)
                  }
                  placeholder="Nationality"
                  className="text-lg"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="tradeNameAm"
                  className="flex items-center gap-2"
                >
                  የንግድ ስም
                </Label>
                <Input
                  id="tradeNameAm"
                  value={formData.tradeNameAm}
                  onChange={(e) =>
                    handleInputChange("tradeNameAm", e.target.value)
                  }
                  placeholder="የንግድ ስም"
                  className="text-lg"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tradeName" className="flex items-center gap-2">
                  Trade Name
                </Label>
                <Input
                  id="tradeName"
                  value={formData.tradeName}
                  onChange={(e) =>
                    handleInputChange("tradeName", e.target.value)
                  }
                  placeholder="Trade name"
                  className="text-lg"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="generalManagerNameAm"
                  className="flex items-center gap-2"
                >
                  ሥራ አስኪያጅ ስም
                </Label>
                <Input
                  id="generalManagerNameAm"
                  value={formData.generalManagerNameAm}
                  onChange={(e) =>
                    handleInputChange("generalManagerNameAm", e.target.value)
                  }
                  placeholder="ሥራ አስኪያጅ ስም"
                  className="text-lg"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="generalManagerName"
                  className="flex items-center gap-2"
                >
                  General Manager Name
                </Label>
                <Input
                  id="generalManagerName"
                  value={formData.generalManagerName}
                  onChange={(e) =>
                    handleInputChange("generalManagerName", e.target.value)
                  }
                  placeholder="General manager name"
                  className="text-lg"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Photo Upload
              </Label>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="text-lg"
              />
              {formData.photo && (
                <div className="mt-2">
                  <img
                    src={formData.photo || "/placeholder.svg"}
                    alt="Preview"
                    className="w-20 h-24 object-cover rounded border"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <MapPin className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <h3 className="text-xl font-semibold text-gray-900">
                Business Address
              </h3>
              <p className="text-gray-600">የንግድ አድራሻ</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="regionAm" className="flex items-center gap-2">
                  ክልል
                </Label>
                <Input
                  id="regionAm"
                  value={formData.regionAm}
                  onChange={(e) =>
                    handleInputChange("regionAm", e.target.value)
                  }
                  placeholder="ክልል"
                  className="text-lg"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="region" className="flex items-center gap-2">
                  Region
                </Label>
                <Input
                  id="region"
                  value={formData.region}
                  onChange={(e) => handleInputChange("region", e.target.value)}
                  placeholder="Region"
                  className="text-lg"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="zoneSubCityAm"
                  className="flex items-center gap-2"
                >
                  ዞን/ክ/ከተማ
                </Label>
                <Input
                  id="zoneSubCityAm"
                  value={formData.zoneSubCityAm}
                  onChange={(e) =>
                    handleInputChange("zoneSubCityAm", e.target.value)
                  }
                  placeholder="ዞን/ክ/ከተማ"
                  className="text-lg"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="zoneSubCity"
                  className="flex items-center gap-2"
                >
                  Zone/Sub City
                </Label>
                <Input
                  id="zoneSubCity"
                  value={formData.zoneSubCity}
                  onChange={(e) =>
                    handleInputChange("zoneSubCity", e.target.value)
                  }
                  placeholder="Zone/Sub City"
                  className="text-lg"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="woredaAm" className="flex items-center gap-2">
                  ወረዳ
                </Label>
                <Input
                  id="woredaAm"
                  value={formData.woredaAm}
                  onChange={(e) =>
                    handleInputChange("woredaAm", e.target.value)
                  }
                  placeholder="ወረዳ"
                  className="text-lg"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="woreda" className="flex items-center gap-2">
                  Woreda
                </Label>
                <Input
                  id="woreda"
                  value={formData.woreda}
                  onChange={(e) => handleInputChange("woreda", e.target.value)}
                  placeholder="Woreda"
                  className="text-lg"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="kebeleAm" className="flex items-center gap-2">
                  ቀበሌ
                </Label>
                <Input
                  id="kebeleAm"
                  value={formData.kebeleAm}
                  onChange={(e) =>
                    handleInputChange("kebeleAm", e.target.value)
                  }
                  placeholder="ቀበሌ"
                  className="text-lg"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kebele" className="flex items-center gap-2">
                  Kebele
                </Label>
                <Input
                  id="kebele"
                  value={formData.kebele}
                  onChange={(e) => handleInputChange("kebele", e.target.value)}
                  placeholder="Kebele"
                  className="text-lg"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="houseNo">የቤት ቁጥር / House No.</Label>
                <Input
                  id="houseNo"
                  value={formData.houseNo}
                  onChange={(e) => handleInputChange("houseNo", e.target.value)}
                  placeholder="House number"
                  className="text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telNo">ስልክ ቁጥር / Tel. No. *</Label>
                <Input
                  id="telNo"
                  value={formData.telNo}
                  onChange={(e) => handleInputChange("telNo", e.target.value)}
                  placeholder="Telephone number"
                  className="text-lg"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">ኢሜይል / Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Email address"
                  className="text-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fax">ፋክስ / Fax</Label>
              <Input
                id="fax"
                value={formData.fax}
                onChange={(e) => handleInputChange("fax", e.target.value)}
                placeholder="Fax number"
                className="text-lg"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Building className="w-12 h-12 text-purple-600 mx-auto mb-2" />
              <h3 className="text-xl font-semibold text-gray-900">
                Business Details
              </h3>
              <p className="text-gray-600">የንግድ ዝርዝር</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="fieldOfBusinessAm"
                  className="flex items-center gap-2"
                >
                  የንግድ መግለጫ
                </Label>
                <Textarea
                  id="fieldOfBusinessAm"
                  value={formData.fieldOfBusinessAm}
                  onChange={(e) =>
                    handleInputChange("fieldOfBusinessAm", e.target.value)
                  }
                  placeholder="የንግድ መግለጫ"
                  rows={3}
                  className="text-lg"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="fieldOfBusiness"
                  className="flex items-center gap-2"
                >
                  Field of Business
                </Label>
                <Textarea
                  id="fieldOfBusiness"
                  value={formData.fieldOfBusiness}
                  onChange={(e) =>
                    handleInputChange("fieldOfBusiness", e.target.value)
                  }
                  placeholder="Field of business"
                  rows={3}
                  className="text-lg"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessCode">የንግድ ኮድ / Business Code *</Label>
              <Input
                id="businessCode"
                value={formData.businessCode}
                onChange={(e) =>
                  handleInputChange("businessCode", e.target.value)
                }
                placeholder="Business code (e.g., 31121)"
                className="text-lg"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="capitalAmount">የዋጋ ገንዘብ / Capital in ETB</Label>
                <Input
                  id="capitalAmount"
                  value={formData.capitalAmount}
                  onChange={(e) =>
                    handleInputChange("capitalAmount", e.target.value)
                  }
                  placeholder="Capital amount"
                  className="text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="issueDate">የተሰጠበት ቀን / Issue Date *</Label>
                <Input
                  id="issueDate"
                  type="date"
                  value={formData.issueDate}
                  onChange={(e) =>
                    handleInputChange("issueDate", e.target.value)
                  }
                  className="text-lg"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="issueLocationAm"
                  className="flex items-center gap-2"
                >
                  ቦታ
                </Label>
                <Input
                  id="issueLocationAm"
                  value={formData.issueLocationAm}
                  onChange={(e) =>
                    handleInputChange("issueLocationAm", e.target.value)
                  }
                  placeholder="ቦታ"
                  className="text-lg"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="issueLocation"
                className="flex items-center gap-2"
              >
                Issue Location
              </Label>
              <Input
                id="issueLocation"
                value={formData.issueLocation}
                onChange={(e) =>
                  handleInputChange("issueLocation", e.target.value)
                }
                placeholder="Issue location"
                className="text-lg"
                required
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <FileCheck className="w-12 h-12 text-orange-600 mx-auto mb-2" />
              <h3 className="text-xl font-semibold text-gray-900">
                License Information
              </h3>
              <p className="text-gray-600">የፈቃድ መረጃ</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">
                  የፈቃድ ቁጥር / License Number *
                </Label>
                <Input
                  id="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={(e) =>
                    handleInputChange("licenseNumber", e.target.value)
                  }
                  placeholder="License number"
                  className="text-lg"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registrationNumber">
                  የምዝገባ ቁጥር / Registration Number *
                </Label>
                <Input
                  id="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={(e) =>
                    handleInputChange("registrationNumber", e.target.value)
                  }
                  placeholder="Registration number"
                  className="text-lg"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="officialNameAm"
                  className="flex items-center gap-2"
                >
                  የባለስልጣኑ ስም
                </Label>
                <Input
                  id="officialNameAm"
                  value={formData.officialNameAm}
                  onChange={(e) =>
                    handleInputChange("officialNameAm", e.target.value)
                  }
                  placeholder="የባለስልጣኑ ስም"
                  className="text-lg"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="officialName"
                  className="flex items-center gap-2"
                >
                  Name of Official
                </Label>
                <Input
                  id="officialName"
                  value={formData.officialName}
                  onChange={(e) =>
                    handleInputChange("officialName", e.target.value)
                  }
                  placeholder="Official name"
                  className="text-lg"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="previousIssueDate">
                የቀደመው የተሰጠበት ቀን / Previous Issue Date
              </Label>
              <Input
                id="previousIssueDate"
                value={formData.previousIssueDate}
                onChange={(e) =>
                  handleInputChange("previousIssueDate", e.target.value)
                }
                placeholder="Previous issue date"
                className="text-lg"
                required
              />
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">
                  Ready to Generate Certificate
                </span>
              </div>
              <p className="text-green-700 text-sm mt-1">
                All required information has been collected. You can now
                generate your business license certificate.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen  p-4 mt-22">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Business License Generator
          </h1>
          <p className="text-gray-600 text-lg">
            Generate official business license certificates
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
            <TabsTrigger
              value="form"
              className="flex items-center gap-2 text-base"
            >
              <FileText className="w-5 h-5" />
              Application Form
            </TabsTrigger>
            <TabsTrigger
              value="certificate"
              className="flex items-center gap-2 text-base"
            >
              <Eye className="w-5 h-5" />
              Certificate Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form">
            {/* Top Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Business License Application Form
                </h2>
                <Badge variant="secondary" className="text-sm">
                  Step {currentStep} of 4
                </Badge>
              </div>

              {/* Step Indicators */}
              <div className="flex items-center justify-between max-w-4xl mx-auto mb-6">
                {steps.map((stepObj, index) => {
                  const isCompleted = completedSteps.includes(stepObj.id);
                  const isCurrent = stepObj.id === currentStep;
                  const status = isCompleted
                    ? "completed"
                    : isCurrent
                    ? "current"
                    : "upcoming";
                  const isLast = index === steps.length - 1;

                  return (
                    <div key={stepObj.id} className="flex items-center flex-1">
                      {/* Step Circle */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`
                  relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ease-in-out
                  ${
                    status === "completed"
                      ? "bg-green-500 border-green-500 text-white shadow-lg"
                      : status === "current"
                      ? "bg-blue-500 border-blue-500 text-white shadow-lg scale-110"
                      : "bg-white border-gray-300 text-gray-400"
                  }
                `}
                        >
                          {status === "completed" ? (
                            <Check className="w-6 h-6" />
                          ) : (
                            <span className="text-sm font-semibold">
                              {stepObj.id}
                            </span>
                          )}
                          {/* Pulse animation for current step */}
                          {status === "current" && (
                            <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-25"></div>
                          )}
                        </div>

                        {/* Step Label */}
                        <div className="mt-3 text-center">
                          <div
                            className={`text-sm font-medium transition-colors duration-200 ${
                              status === "current"
                                ? "text-blue-600"
                                : status === "completed"
                                ? "text-green-600"
                                : "text-gray-500"
                            }`}
                          >
                            {stepObj.title}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {stepObj.description}
                          </div>
                        </div>
                      </div>

                      {/* Connecting Line */}
                      {!isLast && (
                        <div className="flex-1 h-0.5 mx-4 mt-[-20px]">
                          <div
                            className={`h-full transition-all duration-500 ease-in-out ${
                              completedSteps.includes(stepObj.id)
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          ></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Progress Bar */}
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Progress</span>
                  <span>
                    {Math.round((completedSteps.length / steps.length) * 100)}%
                    Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${(completedSteps.length / steps.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Form Card */}
            <Card className="min-h-[600px] max-w-4xl mx-auto">
              <CardHeader>
                {/* <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">
                      Step {currentStep} of 4: {steps[currentStep - 1]?.title}
                    </CardTitle>
                    <CardDescription className="text-base mt-1">{steps[currentStep - 1]?.description}</CardDescription>
                  </div>
                  <Badge variant={validateStep(currentStep) ? "default" : "secondary"} className="text-sm">
                    {validateStep(currentStep) ? "Complete" : "In Progress"}
                  </Badge>
                </div> */}
              </CardHeader>
              <CardContent>
                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>

                  <div className="flex gap-4">
                    {/* <Button
                      variant="outline"
                      onClick={() => setFormData(dummyData)}
                      className="flex items-center gap-2"
                    >
                      Load Sample Data
                    </Button> */}

                    {currentStep < 4 ? (
                      <Button
                        onClick={handleNextStep}
                        disabled={!validateStep(currentStep)}
                        className="flex items-center gap-2"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleGenerateCertificate}
                        disabled={!validateStep(currentStep)}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                      >
                        <Eye className="w-4 h-4" />
                        Generate Certificate
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificate">
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button
                  onClick={handleDownloadCertificate}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Certificate
                </Button>
              </div>
              <Certificate data={formData} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function BusinessLicenseGenerator() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading business license form...</p>
          </div>
        </div>
      }
    >
      <BusinessLicenseContent />
    </Suspense>
  );
}
