"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Download,
  Eye,
  Receipt,
  User,
  MapPin,
  Building2,
  FileCheck,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  BadgeIcon as IdCard,
  Phone,
  Mail,
  Hash,
  Check,
} from "lucide-react";
import TaxpayerCertificate from "./certeficate";

interface TaxpayerData {
  //taxpayerIdNumber: string
  FaydaID_FIN: string;
  FaydaID_OTP: string;
  fullName: string;
  fullNameAm: string;
  region: string;
  regionAm: string;
  zoneSubCity: string;
  zoneSubCityAm: string;
  woreda: string;
  woredaAm: string;
  kebele: string;
  kebeleAm: string;
  houseNo: string;
  esicSubGroup: string;
  businessDescription: string;
  businessDescriptionAm: string;
  issuingAuthority: string;
  issuingAuthorityAm: string;
  dateOfIssuance: string;
  dateOfIssuanceAm: string;
  certificateNumber: string;
  certificateNumberAm: string;
  phoneNumber: string;
  email: string;
  businessType: string;
  businessTypeAm: string;
  registrationDate: string;
  registrationDateAm: string;
}

const dummyTaxpayerData: TaxpayerData = {
  //taxpayerIdNumber: "0090123456",
  FaydaID_FIN: "1234 5678 9012",
  FaydaID_OTP: "123456",
  fullName: "Abebe Kebede Alemu ",
  fullNameAm: "አበበ ከበደ አለሙ",
  region: "South Ethiopia",
  regionAm: "ደቡብ ኢትዮጵያ",
  zoneSubCity: "አርባ ምንጭ",
  zoneSubCityAm: "አርባ ምንጭ",
  woreda: "አርባ ምንጭ",
  woredaAm: "አርባ ምንጭ",
  kebele: "08",
  kebeleAm: "08",
  houseNo: "new",
  esicSubGroup: "31121",
  businessDescription: "Manufacturing of bakery products",
  businessDescriptionAm: "የኩባያ ምርት አምራች",
  issuingAuthority: "South Ethiopia NATIONAL REGIONAL STATE REVENUE AUTHORITY",
  issuingAuthorityAm: "የደቡብ ኢትዮጵያ ብሔራዊ ክልላዊ መንግስት ገቢዎች ባለስልጣን",
  dateOfIssuance: "08 HAMLE 2016",
  dateOfIssuanceAm: "08 ሐምሌ 2016",
  certificateNumber: "181009941425",
  certificateNumberAm: "181009941425",
  phoneNumber: "0911234567",
  email: "abebe.kebede@email.com",
  businessType: "Manufacturing",
  businessTypeAm: "አምራች",
  registrationDate: "08 HAMLE 2016",
  registrationDateAm: "08 ሐምሌ 2016",
};

const steps = [
  {
    id: 1,
    title: "Personal Information",
    titleAm: "የግለሰብ መረጃ",
    icon: User,
    description: "Basic personal and contact details",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    borderColor: "border-blue-300",
  },
  {
    id: 2,
    title: "Address Information",
    titleAm: "የአድራሻ መረጃ",
    icon: MapPin,
    description: "Location and residence details",
    color: "text-green-600",
    bgColor: "bg-green-100",
    borderColor: "border-green-300",
  },
  {
    id: 3,
    title: "Business Information",
    titleAm: "የንግድ መረጃ",
    icon: Building2,
    description: "Business type and description",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    borderColor: "border-purple-300",
  },
  {
    id: 4,
    title: "Certificate Details",
    titleAm: "የሰርተፊኬት ዝርዝር",
    icon: FileCheck,
    description: "Official documentation information",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    borderColor: "border-orange-300",
  },
];

export default function TaxpayerRegistrationGenerator() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<TaxpayerData>(dummyTaxpayerData);
  const [activeTab, setActiveTab] = useState("form");
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Check for tab query parameter on component mount
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "certificate") {
      setActiveTab("certificate");
    }
  }, [searchParams]);

  const handleInputChange = (field: keyof TaxpayerData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.FaydaID_FIN &&
          formData.FaydaID_OTP &&
          formData.fullName &&
          formData.fullNameAm &&
          formData.phoneNumber
        );
      case 2:
        return !!(
          formData.region &&
          formData.regionAm &&
          formData.zoneSubCity &&
          formData.woreda
        );
      case 3:
        return !!(
          formData.businessType &&
          formData.businessTypeAm &&
          formData.businessDescription &&
          formData.esicSubGroup
        );
      case 4:
        return !!(
          formData.issuingAuthority &&
          formData.certificateNumber &&
          formData.dateOfIssuance
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
  const currentStepData = steps[currentStep - 1];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div
                className={`w-16 h-16 ${currentStepData.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <User className={`w-8 h-8 ${currentStepData.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Personal Information
              </h3>
              <p className="text-gray-600 text-lg">የግለሰብ መረጃ</p>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <IdCard className="w-5 h-5 text-blue-600" />
                  <Label
                    htmlFor="taxpayerIdNumber"
                    className="text-lg font-semibold text-blue-900"
                  >
                    የግብር ከፋይ ፋይዳ መለያ ቁጥር / Taxpayer Fayda ID FIN *
                  </Label>
                </div>
                <Input
                  id="FaydaID_FIN"
                  value={formData.FaydaID_FIN}
                  onChange={(e) =>
                    handleInputChange("FaydaID_FIN", e.target.value)
                  }
                  placeholder="Enter Fayda ID FIN"
                  className="text-lg h-12 border-2 focus:border-blue-400"
                  required
                />
                <div className="flex items-center gap-3 mb-4">
                  <IdCard className="w-5 h-5 text-blue-600" />
                  <Label
                    htmlFor="taxpayerIdNumber"
                    className="text-lg font-semibold text-blue-900"
                  >
                    የግብር ከፋይ ፋይዳ ኦቲፒ / Taxpayer Fayda ID OTP *
                  </Label>
                </div>
                <Input
                  id="FaydaID_OTP"
                  value={formData.FaydaID_OTP}
                  onChange={(e) =>
                    handleInputChange("FaydaID_OTP", e.target.value)
                  }
                  placeholder="Enter Fayda ID OTP"
                  className="text-lg h-12 border-2 focus:border-blue-400"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="fullNameAm"
                    className="flex items-center gap-2 text-base font-medium"
                  >
                    ስም/ድርጅት ስም
                  </Label>
                  <Input
                    id="fullNameAm"
                    value={formData.fullNameAm}
                    onChange={(e) =>
                      handleInputChange("fullNameAm", e.target.value)
                    }
                    placeholder="ስም"
                    className="text-lg h-12 border-2 focus:border-blue-400"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="fullName"
                    className="flex items-center gap-2 text-base font-medium"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    placeholder="Enter full name"
                    className="text-lg h-12 border-2 focus:border-blue-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="phoneNumber"
                    className="flex items-center gap-2 text-base font-medium"
                  >
                    <Phone className="w-4 h-4" />
                    ስልክ ቁጥር / Phone Number *
                  </Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                    placeholder="Enter phone number"
                    className="text-lg h-12 border-2 focus:border-blue-400"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="email"
                    className="flex items-center gap-2 text-base font-medium"
                  >
                    <Mail className="w-4 h-4" />
                    ኢሜይል አድራሻ / Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter email address"
                    className="text-lg h-12 border-2 focus:border-blue-400"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div
                className={`w-16 h-16 ${currentStepData.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <MapPin className={`w-8 h-8 ${currentStepData.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Address Information
              </h3>
              <p className="text-gray-600 text-lg">የአድራሻ መረጃ</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="regionAm"
                    className="flex items-center gap-2 text-base font-medium"
                  >
                    ክልል
                  </Label>
                  <Input
                    id="regionAm"
                    value={formData.regionAm}
                    onChange={(e) =>
                      handleInputChange("regionAm", e.target.value)
                    }
                    placeholder="ክልል"
                    className="text-lg h-12 border-2 focus:border-green-400"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="region"
                    className="flex items-center gap-2 text-base font-medium"
                  >
                    Region
                  </Label>
                  <Input
                    id="region"
                    value={formData.region}
                    onChange={(e) =>
                      handleInputChange("region", e.target.value)
                    }
                    placeholder="Region"
                    className="text-lg h-12 border-2 focus:border-green-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="zoneSubCityAm"
                    className="flex items-center gap-2 text-base font-medium"
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
                    className="text-lg h-12 border-2 focus:border-green-400"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="zoneSubCity"
                    className="flex items-center gap-2 text-base font-medium"
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
                    className="text-lg h-12 border-2 focus:border-green-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="woredaAm"
                    className="flex items-center gap-2 text-base font-medium"
                  >
                    ወረዳ
                  </Label>
                  <Input
                    id="woredaAm"
                    value={formData.woredaAm}
                    onChange={(e) =>
                      handleInputChange("woredaAm", e.target.value)
                    }
                    placeholder="ወረዳ"
                    className="text-lg h-12 border-2 focus:border-green-400"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="woreda"
                    className="flex items-center gap-2 text-base font-medium"
                  >
                    Woreda
                  </Label>
                  <Input
                    id="woreda"
                    value={formData.woreda}
                    onChange={(e) =>
                      handleInputChange("woreda", e.target.value)
                    }
                    placeholder="Woreda"
                    className="text-lg h-12 border-2 focus:border-green-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="kebeleAm"
                    className="flex items-center gap-2 text-base font-medium"
                  >
                    ቀበሌ/የገበሬ ማህበር
                  </Label>
                  <Input
                    id="kebeleAm"
                    value={formData.kebeleAm}
                    onChange={(e) =>
                      handleInputChange("kebeleAm", e.target.value)
                    }
                    placeholder="ቀበሌ/የገበሬ ማህበር"
                    className="text-lg h-12 border-2 focus:border-green-400"
                  />
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="kebele"
                    className="flex items-center gap-2 text-base font-medium"
                  >
                    Kebele/Farmer's Assoc.
                  </Label>
                  <Input
                    id="kebele"
                    value={formData.kebele}
                    onChange={(e) =>
                      handleInputChange("kebele", e.target.value)
                    }
                    placeholder="Kebele/Farmer's Assoc."
                    className="text-lg h-12 border-2 focus:border-green-400"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="houseNo" className="text-base font-medium">
                  የቤት ቁጥር / House No.
                </Label>
                <Input
                  id="houseNo"
                  value={formData.houseNo}
                  onChange={(e) => handleInputChange("houseNo", e.target.value)}
                  placeholder="House number"
                  className="text-lg h-12 border-2 focus:border-green-400"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div
                className={`w-16 h-16 ${currentStepData.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <Building2 className={`w-8 h-8 ${currentStepData.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Business Information
              </h3>
              <p className="text-gray-600 text-lg">የንግድ መረጃ</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="businessTypeAm"
                    className="flex items-center gap-2 text-base font-medium"
                  >
                    የንግድ አይነት
                  </Label>
                  <Input
                    id="businessTypeAm"
                    value={formData.businessTypeAm}
                    onChange={(e) =>
                      handleInputChange("businessTypeAm", e.target.value)
                    }
                    placeholder="የንግድ አይነት"
                    className="text-lg h-12 border-2 focus:border-purple-400"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="businessType"
                    className="flex items-center gap-2 text-base font-medium"
                  >
                    Business Type
                  </Label>
                  <Select
                    value={formData.businessType}
                    onValueChange={(value) =>
                      handleInputChange("businessType", value)
                    }
                  >
                    <SelectTrigger className="text-lg h-12 border-2 focus:border-purple-400">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manufacturing">
                        Manufacturing
                      </SelectItem>
                      <SelectItem value="Trading">Trading</SelectItem>
                      <SelectItem value="Service">Service</SelectItem>
                      <SelectItem value="Agriculture">Agriculture</SelectItem>
                      <SelectItem value="Construction">Construction</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <Hash className="w-5 h-5 text-purple-600" />
                  <Label
                    htmlFor="esicSubGroup"
                    className="text-lg font-semibold text-purple-900"
                  >
                    ESIC Sub-group Code *
                  </Label>
                </div>
                <Input
                  id="esicSubGroup"
                  value={formData.esicSubGroup}
                  onChange={(e) =>
                    handleInputChange("esicSubGroup", e.target.value)
                  }
                  placeholder="Enter ESIC code (e.g., 31121)"
                  className="text-lg h-12 border-2 focus:border-purple-400"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="businessDescriptionAm"
                    className="flex items-center gap-2 text-base font-medium"
                  >
                    የንግድ መግለጫ
                  </Label>
                  <Textarea
                    id="businessDescriptionAm"
                    value={formData.businessDescriptionAm}
                    onChange={(e) =>
                      handleInputChange("businessDescriptionAm", e.target.value)
                    }
                    placeholder="የንግድ መግለጫ"
                    rows={4}
                    className="text-lg border-2 focus:border-purple-400 resize-none"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="businessDescription"
                    className="flex items-center gap-2 text-base font-medium"
                  >
                    Business Description
                  </Label>
                  <Textarea
                    id="businessDescription"
                    value={formData.businessDescription}
                    onChange={(e) =>
                      handleInputChange("businessDescription", e.target.value)
                    }
                    placeholder="Describe the business activity"
                    rows={4}
                    className="text-lg border-2 focus:border-purple-400 resize-none"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div
                className={`w-16 h-16 ${currentStepData.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <FileCheck className={`w-8 h-8 ${currentStepData.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Certificate Details
              </h3>
              <p className="text-gray-600 text-lg">የሰርተፊኬት ዝርዝር</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="issuingAuthorityAm"
                    className="flex items-center gap-2 text-base font-medium"
                  >
                    የሰጪው ባለስልጣን
                  </Label>
                  <Input
                    id="issuingAuthorityAm"
                    value={formData.issuingAuthorityAm}
                    onChange={(e) =>
                      handleInputChange("issuingAuthorityAm", e.target.value)
                    }
                    placeholder="የሰጪው ባለስልጣን"
                    className="text-lg h-12 border-2 focus:border-orange-400"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="issuingAuthority"
                    className="flex items-center gap-2 text-base font-medium"
                  >
                    Issuing Authority
                  </Label>
                  <Input
                    id="issuingAuthority"
                    value={formData.issuingAuthority}
                    onChange={(e) =>
                      handleInputChange("issuingAuthority", e.target.value)
                    }
                    placeholder="Issuing authority"
                    className="text-lg h-12 border-2 focus:border-orange-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="certificateNumberAm"
                    className="flex items-center gap-2 text-base font-medium"
                  >
                    የምስክር ወረቀት ቁ.
                  </Label>
                  <Input
                    id="certificateNumberAm"
                    value={formData.certificateNumberAm}
                    onChange={(e) =>
                      handleInputChange("certificateNumberAm", e.target.value)
                    }
                    placeholder="የምስክር ወረቀት ቁ."
                    className="text-lg h-12 border-2 focus:border-orange-400"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="certificateNumber"
                    className="flex items-center gap-2 text-base font-medium"
                  >
                    Certificate Number
                  </Label>
                  <Input
                    id="certificateNumber"
                    value={formData.certificateNumber}
                    onChange={(e) =>
                      handleInputChange("certificateNumber", e.target.value)
                    }
                    placeholder="Certificate number"
                    className="text-lg h-12 border-2 focus:border-orange-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="registrationDateAm"
                    className="flex items-center gap-2 text-base font-medium"
                  >
                    የምዝገባ ቀን
                  </Label>
                  <Input
                    id="registrationDateAm"
                    value={formData.registrationDateAm}
                    onChange={(e) =>
                      handleInputChange("registrationDateAm", e.target.value)
                    }
                    placeholder="የምዝገባ ቀን"
                    className="text-lg h-12 border-2 focus:border-orange-400"
                  />
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="registrationDate"
                    className="flex items-center gap-2 text-base font-medium"
                  >
                    Registration Date
                  </Label>
                  <Input
                    id="registrationDate"
                    value={formData.registrationDate}
                    onChange={(e) =>
                      handleInputChange("registrationDate", e.target.value)
                    }
                    placeholder="Registration date"
                    className="text-lg h-12 border-2 focus:border-orange-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="dateOfIssuanceAm"
                    className="flex items-center gap-2 text-base font-medium"
                  >
                    የመስጫ ቀን
                  </Label>
                  <Input
                    id="dateOfIssuanceAm"
                    value={formData.dateOfIssuanceAm}
                    onChange={(e) =>
                      handleInputChange("dateOfIssuanceAm", e.target.value)
                    }
                    placeholder="የመስጫ ቀን"
                    className="text-lg h-12 border-2 focus:border-orange-400"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="dateOfIssuance"
                    className="flex items-center gap-2 text-base font-medium"
                  >
                    Date of Issuance
                  </Label>
                  <Input
                    id="dateOfIssuance"
                    value={formData.dateOfIssuance}
                    onChange={(e) =>
                      handleInputChange("dateOfIssuance", e.target.value)
                    }
                    placeholder="Date of issuance"
                    className="text-lg h-12 border-2 focus:border-orange-400"
                    required
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-3 text-green-800">
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-semibold text-lg">
                    Ready to Generate Certificate
                  </span>
                </div>
                <p className="text-green-700 mt-2">
                  All required information has been collected. You can now
                  generate your taxpayer registration certificate.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-4 mt-22">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <Receipt className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              Taxpayer Registration Generator
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Generate official taxpayer registration certificates
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
            <TabsTrigger
              value="form"
              className="flex items-center gap-2 text-base"
            >
              <FileText className="w-5 h-5" />
              Registration Form
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
            {/* Step Navigation */}
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

            <Card className="min-h-[700px] shadow-lg">
              <CardHeader className="pb-6">
                {/* <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl flex items-center gap-3">
                          Step {currentStep} of 4: {currentStepData?.title}
                        </CardTitle>
                        <CardDescription className="text-base mt-2">
                          {currentStepData?.description}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={validateStep(currentStep) ? "default" : "secondary"}
                        className="text-sm px-3 py-1"
                      >
                        {validateStep(currentStep) ? "Complete" : "In Progress"}
                      </Badge>
                    </div> */}
              </CardHeader>
              <CardContent className="pb-8">
                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-10 pt-8 border-t-2 border-gray-100">
                  <Button
                    variant="outline"
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2 h-12 px-6 text-base bg-transparent"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Previous
                  </Button>

                  <div className="flex gap-4">
                    {/*  <Button
                          variant="outline"
                          onClick={() => setFormData(dummyTaxpayerData)}
                          className="flex items-center gap-2 h-12 px-6 text-base"
                        >
                          Load Sample Data
                        </Button> */}

                    {currentStep < 4 ? (
                      <Button
                        onClick={handleNextStep}
                        disabled={!validateStep(currentStep)}
                        className="flex items-center gap-2 h-12 px-6 text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        Next
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleGenerateCertificate}
                        disabled={!validateStep(currentStep)}
                        className="flex items-center gap-2 h-12 px-6 text-base bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      >
                        <Eye className="w-5 h-5" />
                        Generate Certificate
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificate">
            <div className="space-y-6">
              <div className="flex justify-end">
                <Button
                  onClick={handleDownloadCertificate}
                  className="flex items-center gap-2 h-12 px-6 text-base"
                >
                  <Download className="w-5 h-5" />
                  Download Certificate
                </Button>
              </div>
              <TaxpayerCertificate data={formData} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
