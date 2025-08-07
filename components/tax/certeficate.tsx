"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Share2, Eye, EyeOff, Calendar, Hash, Verified } from "lucide-react"
import Image from "next/image"

interface TaxpayerData {
  //taxpayerIdNumber: string
  FaydaID_FIN: string
  FaydaID_OTP: string
  fullName: string
  fullNameAm: string
  region: string
  regionAm: string
  zoneSubCity: string
  zoneSubCityAm: string
  woreda: string
  woredaAm: string
  kebele: string
  kebeleAm: string
  houseNo: string
  esicSubGroup: string
  businessDescription: string
  businessDescriptionAm: string
  issuingAuthority: string
  issuingAuthorityAm: string
  dateOfIssuance: string
  dateOfIssuanceAm: string
  certificateNumber: string
  certificateNumberAm: string
  phoneNumber: string
  email: string
  businessType: string
  businessTypeAm: string
  registrationDate: string
  registrationDateAm: string
}

interface TaxpayerCertificateProps {
  data: TaxpayerData
}

export default function TaxpayerCertificate({ data }: TaxpayerCertificateProps) {
  const [showSensitiveData, setShowSensitiveData] = useState(true)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async (format: "pdf" | "png" | "json") => {
    setIsDownloading(true)

    if (format === "json") {
      const dataStr = JSON.stringify(data, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `taxpayer-certificate-${data.certificateNumber}.json`
      link.click()
      URL.revokeObjectURL(url)
    } else if (format === "pdf") {
      window.print()
    } else if (format === "png") {
      window.print()
    }

    setTimeout(() => setIsDownloading(false), 1000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Taxpayer Registration Certificate",
          text: `Certificate for ${data.fullName} - ${data.certificateNumber}`,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    }
  }

  const maskSensitiveData = (value: string, showLength = 4) => {
    if (showSensitiveData) return value
    return value.slice(0, showLength) + "*".repeat(Math.max(0, value.length - showLength))
  }

  // Generate QR code data
  const qrData = JSON.stringify({
    id: data.FaydaID_FIN,
    name: data.fullName,
    certificate: data.certificateNumber,
    issued: data.dateOfIssuance,
    authority: "South Ethiopia REVENUE AUTHORITY",
  })

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(qrData)}`

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Action Bar
      <Card className="p-4 bg-slate-50 border border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
              <Verified className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Official Certificate</h3>
              <p className="text-sm text-slate-600">Generated on {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSensitiveData(!showSensitiveData)}
              className="flex items-center gap-2 border-slate-300"
            >
              {showSensitiveData ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showSensitiveData ? "Hide" : "Show"} Details
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex items-center gap-2 border-slate-300 bg-transparent"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>

            <div className="flex items-center gap-1">
              <Button
                size="sm"
                onClick={() => handleDownload("pdf")}
                disabled={isDownloading}
                className="flex items-center gap-2 bg-slate-700 hover:bg-slate-800"
              >
                <Download className="w-4 h-4" />
                PDF
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDownload("json")}
                disabled={isDownloading}
                className="flex items-center gap-2 border-slate-300"
              >
                <Download className="w-4 h-4" />
                JSON
              </Button>
            </div>
          </div>
        </div>
      </Card> */}

      {/* Certificate */}
      <Card className="relative overflow-hidden bg-white border-2 border-slate-300 shadow-xl print:shadow-none print:border-slate-400">
        {/* Subtle Watermark */}
        <div className="absolute inset-0 opacity-3 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45">
            <div className="text-6xl font-bold text-slate-200">OFFICIAL</div>
          </div>
        </div>

        <div className="relative p-8 print:p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="w-20 h-16 border-2 shadow-md rounded-sm overflow-hidden">
                <Image
                  src="/flag.png"
                  alt="Ethiopian Flag"
                  width={120}
                  height={120}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-center">
                <p className="text-sm font-semibold text-slate-700 mb-1">የኢትዮጵያ ፌዴራላዊ ዲሞክራሲያዊ ሪፐብሊክ</p>
                <p className="text-sm font-semibold text-slate-700 mb-3">የደቡብ ኢትዮጵያ ብሔራዊ ክልላዊ መንግስት ገቢዎች ባለስልጣን</p>
                <p className="text-sm font-medium text-slate-600 mb-1">Federal Democratic Republic of Ethiopia</p>
                <p className="text-sm font-medium text-slate-600 mb-4">
                  South Ethiopia NATIONAL REGIONAL STATE REVENUE AUTHORITY
                </p>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center">
                <Image
                  src={"/qr.png"}
                  alt="Certificate QR Code"
                  width={80}
                  height={80}
                  className="border border-slate-300 rounded"
                />
                <p className="text-xs text-slate-500 mt-1">Scan to verify</p>
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-xl font-bold text-slate-900">የግብር ከፋይ ምዝገባ ሰርተፊኬት</h1>
              <h1 className="text-xl font-bold text-slate-900">TAXPAYER REGISTRATION CERTIFICATE</h1>

              <div className="mt-4 p-3 bg-slate-100 rounded-lg border border-slate-300">
                <p className="text-2xl font-bold text-slate-900 font-mono">
                  {maskSensitiveData(data.FaydaID_FIN)}
                </p>
              </div>
            </div>
          </div>

          {/* Main Information Card */}
          <Card className="p-8 bg-slate-50/50 border border-slate-200 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-300">
                    የግብር ከፋይ መረጃ / Taxpayer Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">ስም / Name</p>
                      <p className="font-medium text-slate-900">{maskSensitiveData(data.fullName)}</p>
                      <p className="text-sm text-slate-600">{maskSensitiveData(data.fullNameAm)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                        የግብር ከፋይ ፋይዳ መለያ ቁጥር / Taxpayer Fayda ID FIN
                      </p>
                      <Badge variant="outline" className="font-mono border-slate-300">
                        {maskSensitiveData(data.FaydaID_FIN)}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">ስልክ እና ኢሜይል / Contact</p>
                      <p className="text-sm text-slate-700">{maskSensitiveData(data.phoneNumber)}</p>
                      <p className="text-sm text-slate-700">{maskSensitiveData(data.email)}</p>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-300">
                    አድራሻ / Address
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">ክልል / Region</p>
                      <p className="font-medium text-slate-900">{data.region}</p>
                      <p className="text-sm text-slate-600">{data.regionAm}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">ዞን እና ወረዳ / Zone & Woreda</p>
                      <p className="text-sm text-slate-700">
                        {data.zoneSubCity} / {data.woreda}
                      </p>
                      <p className="text-sm text-slate-600">
                        {data.zoneSubCityAm} / {data.woredaAm}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                        ቀበሌ እና የቤት ቁጥር / Kebele & House No.
                      </p>
                      <p className="text-sm text-slate-700">
                        {data.kebele} / {data.houseNo}
                      </p>
                      <p className="text-sm text-slate-600">{data.kebeleAm}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Business Information */}
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-300">
                    የንግድ መረጃ / Business Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">የንግድ አይነት / Business Type</p>
                      <p className="font-medium text-slate-900">{data.businessType}</p>
                      <p className="text-sm text-slate-600">{data.businessTypeAm}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">ESIC ኮድ / ESIC Code</p>
                      <Badge variant="secondary" className="font-mono bg-slate-200 text-slate-800">
                        {data.esicSubGroup}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                        የንግድ መግለጫ / Business Description
                      </p>
                      <p className="text-sm text-slate-700">{data.businessDescription}</p>
                      <p className="text-sm text-slate-600">{data.businessDescriptionAm}</p>
                    </div>
                  </div>
                </div>

                {/* Certificate Details */}
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-300">
                    የሰርተፊኬት ዝርዝር / Certificate Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                        የሰጪው ባለስልጣን / Issuing Authority
                      </p>
                      <p className="font-medium text-slate-900 text-sm">{data.issuingAuthority}</p>
                      <p className="text-sm text-slate-600">{data.issuingAuthorityAm}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">የመስጫ ቀን / Issue Date</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <p className="font-medium text-slate-900">{data.dateOfIssuance}</p>
                      </div>
                      <p className="text-sm text-slate-600">{data.dateOfIssuanceAm}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                        የሰርተፊኬት ቁጥር / Certificate Number
                      </p>
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4 text-slate-500" />
                        <Badge variant="default" className="font-mono bg-slate-700">
                          {data.certificateNumber}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Legal Text */}
          <Card className="p-6 bg-slate-50 border border-slate-200 mb-6">
            <div className="text-xs leading-relaxed space-y-2 text-slate-700">
              <p className="font-medium">
                ይህ የምስክር ወረቀት የግብር ከፋዩ ብቸኛ እና ዋና ምዝገባ እንደሆነ የሚያሳይ ሲሆን ሁሉንም የቀደሙ የምዝገባ ሰነዶች ይሽራል፡፡
              </p>
              <p>ከላይ ባለው መረጃ ላይ ለውጥ ሲደረግ የግብር ከፋዩ ተገቢውን የግብር ቢሮ በመገናኘት የግብር ሰነዱን ለማሻሻል ኃላፊነት አለበት፡፡</p>
              <p className="pt-2 border-t border-slate-300 font-medium">
                This certificate represents the sole and only registration as a taxpayer and supersedes all prior
                registration documentation.
              </p>
              <p>
                The taxpayer is responsible for notifying the appropriate Tax Office of any changes to the above
                information.
              </p>
            </div>
          </Card>

          {/* Footer */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-300">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Certificate Number</p>
              <p className="text-lg font-bold text-slate-900 font-mono">{data.certificateNumber}</p>
            </div>

            <div className="text-right">
              <p className="text-xs text-slate-500 uppercase tracking-wide">Digital Verification</p>
              <p className="text-sm text-slate-700">Scan QR code above to verify</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Certificate Verification */}
      <Card className="p-4 bg-green-50 border border-green-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
            <Verified className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-semibold text-green-900">Certificate Verified</p>
            <p className="text-sm text-green-700">
              This certificate is digitally verified and can be authenticated using certificate number:{" "}
              {data.certificateNumber}
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
