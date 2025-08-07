export interface BusinessUser {
  id: string
  ownerName: string
  tradeName: string
  licenseNumber: string
  issueDate: string
  status: "Active" | "Expired" | "Pending"
  email: string
  telNo: string
  region: string
}

export interface TaxOfficer {
  id: string;
  userName: string;
  employeeId: string,
  userId: string,
  taxCenter: string,
  taxAuthority: string,
  registrationDate: string,
  deregistrationDate: string,
  suspendedAccount: string,
  registrationOfficer:string
}

export interface TaxpayerUser {
  id: string;
  tin: string;
  taxPayerName: string;
  userName: string;
  userId: string;
  taxCenter: string;
  taxAuthority: string;
  registrationDate: string;
  deregistrationDate: string;
  suspendedAccount: string;
  registrationOfficer: string;
}

export interface Certificate {
  id: string
  type: "Business License" | "Taxpayer Registration"
  name: string // ownerName or fullName
  identifier: string // licenseNumber or taxpayerIdNumber
  issueDate: string // issueDate or dateOfIssuance
  status: "Active" | "Expired" | "Pending" | "Registered" | "Suspended"
  region: string
}

export interface FormItem {
  id: string
  title: string
  description: string
  category: "Tax" | "Business" | "General" | "Other"
  fileUrl: string // Placeholder for download URL
  version: string
  lastUpdated: string
}

export interface NewsEventItem {
  id: string
  type: "News" | "Event" | "Announcement"
  title: string
  date: string // YYYY-MM-DD
  summary: string
  content: string // Full content for a detail page (if implemented later)
  imageUrl?: string // Placeholder for image
}

export const mockBusinessUsers: BusinessUser[] = [
  {
    id: "bl-001",
    ownerName: "Abeebe Beso",
    tradeName: "Shiferaw Bakery Enterprise",
    licenseNumber: "AM/DES/100136/2016",
    issueDate: "2024-07-18",
    status: "Active",
    email: "abebe.b@example.com",
    telNo: "0911234567",
    region: "South Ethiopia",
  },
  {
    id: "bl-002",
    ownerName: "Kebede Desta",
    tradeName: "Kebede Construction PLC",
    licenseNumber: "AM/GND/200500/2017",
    issueDate: "2023-11-01",
    status: "Expired",
    email: "kebede.d@example.com",
    telNo: "0922345678",
    region: "Oromia",
  },
  {
    id: "bl-003",
    ownerName: "Fatuma Ali",
    tradeName: "Fatuma Textile Factory",
    licenseNumber: "AM/HRR/300123/2018",
    issueDate: "2024-01-15",
    status: "Pending",
    email: "fatuma.a@example.com",
    telNo: "0933456789",
    region: "Tigray",
  },
  {
    id: "bl-004",
    ownerName: "Chala Gemechu",
    tradeName: "Chala Coffee Export",
    licenseNumber: "AM/ADD/400789/2019",
    issueDate: "2024-05-20",
    status: "Active",
    email: "chala.g@example.com",
    telNo: "0944567890",
    region: "Addis Ababa",
  },
  {
    id: "bl-005",
    ownerName: "Tigist Mamo",
    tradeName: "Tigist Retail Store",
    licenseNumber: "AM/DRD/500321/2020",
    issueDate: "2023-09-10",
    status: "Expired",
    email: "tigist.m@example.com",
    telNo: "0955678901",
    region: "Dire Dawa",
  },
]

export const mockTaxOfficers: TaxOfficer[] = [
  {
    id: "to-001",
    userName: "Dawit Tesfaye",
    employeeId: "STX/001",
    userId: "dawit.t",
    taxCenter: "South Ethiopia",
    taxAuthority: "South Ethiopia",
    registrationDate: "12/12/2016",
    deregistrationDate: "",
    suspendedAccount: "N",
    registrationOfficer: "Amanuel Tadesse",
  },
  {
    id: "to-002",
    userName: "Bethelhem Ayalew",
    employeeId: "STX/002",
    userId: "bethelhem.a",
    taxCenter: "South Ethiopia",
    taxAuthority: "South Ethiopia",
    registrationDate: "08/11/2016",
    deregistrationDate: "",
    suspendedAccount: "N",
    registrationOfficer: "Amanuel Tadesse",
  },
  {
    id: "to-003",
    userName: "Biniyam Belete",
    employeeId: "STX/003",
    userId: "biniyam.b",
    taxCenter: "South Ethiopia",
    taxAuthority: "South Ethiopia",
    registrationDate: "12/12/2016",
    deregistrationDate: "",
    suspendedAccount: "N",
    registrationOfficer: "Amanuel Tadesse",
  },
  {
    id: "to-004",
    userName: "Yonas Getachew",
    employeeId: "STX/004",
    userId: "yonas.g",
    taxCenter: "South Ethiopia",
    taxAuthority: "South Ethiopia",
    registrationDate: "12/12/2016",
    deregistrationDate: "",
    suspendedAccount: "N",
    registrationOfficer: "Amanuel Tadesse",
  },
]


export const mockTaxpayerUsers: TaxpayerUser[] = [
  {
    id: "tp-001",
    tin: "0090638794",
    taxPayerName: "Biniyam Belete",
    userName: "biniyam.b",
    userId: "biniyam.b",
    taxCenter: "South Ethiopia",
    taxAuthority: "South Ethiopia",
    registrationDate: "12/12/2016",
    deregistrationDate: "",
    suspendedAccount: "N",
    registrationOfficer: "Amanuel Tadesse",
  },
  {
    id: "tp-002",
    tin: "0080527683",
    taxPayerName: "Sara Mekonnen",
    userName: "sara.m",
    userId: "sara.m",
    taxCenter: "South Ethiopia",
    taxAuthority: "South Ethiopia",
    registrationDate: "12/12/2016",
    deregistrationDate: "",
    suspendedAccount: "N",
    registrationOfficer: "Amanuel Tadesse",
  },
  {
    id: "tp-003",
        tin: "0070416572",
    taxPayerName: "Dawit Tesfaye",
    userName: "dawit.t",
    userId: "dawit.t",
    taxCenter: "South Ethiopia",
    taxAuthority: "South Ethiopia",
    registrationDate: "12/12/2016",
    deregistrationDate: "",
    suspendedAccount: "N",
    registrationOfficer: "Amanuel Tadesse",
  },
  {
    id: "tp-004",
    tin: "0060305461",
    taxPayerName: "Aster Kebede",
    userName: "aster.k",
    userId: "aster.k",
    taxCenter: "South Ethiopia",
    taxAuthority: "South Ethiopia",
    registrationDate: "12/12/2016",
    deregistrationDate: "",
    suspendedAccount: "N",
    registrationOfficer: "Amanuel Tadesse",
  },
  {
    id: "tp-005",
      tin: "0050294350",
    taxPayerName: "Yonas Getachew",
    userName: "yonas.g",
    userId: "yonas.g",
    taxCenter: "South Ethiopia",
    taxAuthority: "South Ethiopia",
    registrationDate: "12/12/2016",
    deregistrationDate: "",
    suspendedAccount: "N",
    registrationOfficer: "Amanuel Tadesse",
  },
]

// export const allCertificates: Certificate[] = [
//   ...mockBusinessUsers.map((user) => ({
//     id: user.id,
//     type: "Business License",
//     name: user.ownerName,
//     identifier: user.licenseNumber,
//     issueDate: user.issueDate,
//     status: user.status,
//     region: user.region,
//   })),
//   ...mockTaxpayerUsers.map((user) => ({
//     id: user.id,
//     type: "Taxpayer Registration",
//     name: user.fullName,
//     identifier: user.taxpayerIdNumber,
//     issueDate: user.dateOfIssuance,
//     status: user.status,
//     region: user.region,
//   })),
// ]

export const mockForms: FormItem[] = [
  {
    id: "form-001",
    title: "Taxpayer Registration Form",
    description: "Form for new taxpayer registration and TIN application.",
    category: "Tax",
    fileUrl: "/forms/taxpayer-registration.pdf",
    version: "V2.1",
    lastUpdated: "2024-06-15",
  },
  {
    id: "form-002",
    title: "Business License Application",
    description: "Application form for new business licenses and renewals.",
    category: "Business",
    fileUrl: "/forms/business-license-application.pdf",
    version: "V1.5",
    lastUpdated: "2024-07-01",
  },
  {
    id: "form-003",
    title: "VAT Declaration Form",
    description: "Monthly Value Added Tax (VAT) declaration form.",
    category: "Tax",
    fileUrl: "/forms/vat-declaration.pdf",
    version: "V3.0",
    lastUpdated: "2024-07-20",
  },
  {
    id: "form-004",
    title: "Income Tax Return (Individual)",
    description: "Annual income tax return form for individual taxpayers.",
    category: "Tax",
    fileUrl: "/forms/income-tax-individual.pdf",
    version: "V2.0",
    lastUpdated: "2024-05-10",
  },
  {
    id: "form-005",
    title: "Business Name Reservation Form",
    description: "Form to reserve a business name before registration.",
    category: "Business",
    fileUrl: "/forms/business-name-reservation.pdf",
    version: "V1.0",
    lastUpdated: "2024-04-25",
  },
  {
    id: "form-006",
    title: "Complaint and Feedback Form",
    description: "Submit your complaints or provide feedback on our services.",
    category: "General",
    fileUrl: "/forms/complaint-feedback.pdf",
    version: "V1.2",
    lastUpdated: "2024-03-01",
  },
]

export const mockNewsEvents: NewsEventItem[] = [
  {
    id: "news-001",
    type: "News",
    title: "New Tax Policy on Digital Services Announced",
    date: "2025-07-28",
    summary:
      "The South Ethiopia Region Revenue Bureau has announced a new policy regarding the taxation of digital services, effective from August 1, 2025. This aims to broaden the tax base and ensure fairness in the digital economy.",
    content:
      "Detailed content about the new digital services tax policy, including its scope, implications for businesses, and implementation timeline. This policy is a significant step towards modernizing our tax system and adapting to the evolving digital landscape. We encourage all affected businesses to review the full guidelines available on our website.",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "event-001",
    type: "Event",
    title: "Workshop on Business License Renewal Procedures",
    date: "2025-07-20",
    summary:
      "A successful workshop was held for local businesses on the updated procedures for business license renewal. The event saw high participation and provided valuable insights for compliance.",
    content:
      "The workshop covered various aspects of business license renewal, including new requirements, online submission processes, and common pitfalls to avoid. Participants had the opportunity to ask questions and receive direct guidance from our experts. We plan to host more such events in the future.",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "news-002",
    type: "News",
    title: "Revenue Collection Exceeds Target for Q2 2025",
    date: "2025-07-10",
    summary:
      "The South Ethiopia Region Revenue Bureau is pleased to announce that revenue collection for the second quarter of 2025 has surpassed its targets, demonstrating strong economic activity and improved compliance.",
    content:
      "This achievement is a testament to the hard work of our staff and the increasing compliance of taxpayers. The collected revenue will be instrumental in funding various development projects across the region, contributing to overall prosperity.",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "announcement-001",
    type: "Announcement",
    title: "Public Holiday Notice: Eid al-Adha",
    date: "2025-06-16",
    summary:
      "Our offices will be closed on June 16, 2025, in observance of Eid al-Adha. Normal operations will resume on June 17, 2025.",
    content:
      "Wishing all our Muslim citizens a blessed Eid al-Adha. Please plan your visits accordingly. For urgent matters, our online services remain available.",
  },
  {
    id: "event-002",
    type: "Event",
    title: "Taxpayer Education Seminar: Understanding Your Obligations",
    date: "2025-08-05",
    summary:
      "Join us for an upcoming seminar designed to help individual taxpayers understand their rights and obligations. Registration is now open!",
    content:
      "This seminar will cover topics such as tax filing procedures, common deductions, and how to avoid penalties. It's a great opportunity for new and existing taxpayers to clarify any doubts and ensure compliance. Limited seats available, register early!",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
]



export const allCertificates: Certificate[] = [
  ...mockBusinessUsers.map((user) => ({
    id: user.id,
    type: "Business License" as const,
    name: user.ownerName,
    identifier: user.licenseNumber,
    issueDate: user.issueDate,
    status: user.status,
    region: user.region,
  })),
  ...mockTaxpayerUsers.map((user) => ({
    id: user.id,
    type: "Taxpayer Registration" as const,
    name: user.taxPayerName,
    identifier: user.tin,
    issueDate: user.registrationDate,
    status: user.suspendedAccount as "Active" | "Expired" | "Pending" | "Registered" | "Suspended",
    region: user.taxCenter,
  })),
]



// New interfaces for Receipt Generator
export interface ReceiptItem {
  id: string
  productName: string
  quantity: number
  price: number
  type: string // e.g., "Food", "Service", "Electronics"
  lineTotal: number
}

export interface ReceiptData {
  receiptId: string
  date: string
  time: string
  tin: string
  businessName: string
  businessAddress: string
  businessPhone: string
  fsNo?: string
  invoiceReference?: string
  preparedBy?: string
  cashierName: string
  waiterName?: string
  items: ReceiptItem[]
  subtotal: number
  vatRate: number // e.g., 0.15 for 15%
  vatAmount: number
  totalAmount: number
  customerName?: string
  ercaClb?: string
  orderNo?: string
  receiptNo?: string
}


// Mock receipt data for demonstration
export const mockReceiptData: ReceiptData = {
  receiptId: "REC-2025-08-001",
  date: "August 5, 2025",
  time: "11:26",
  tin: "90123456",
  businessName: "YEKATIT HOSPITAL",
  businessAddress: "R/AS/C BOLE W.09 H.NO NEW AROUND GORO SEFERA",
  businessPhone: "0116478100/0911360005",
  fsNo: "00075906",
  invoiceReference: "CS1-S11-01-0003789",
  preparedBy: "HEBAT",
  cashierName: "Hirut G",
  waiterName: "konjit",
  items: [
    { id: "item-1", productName: "BLACK TEA", quantity: 1, price: 26.09, type: "Food", lineTotal: 26.09 },
    { id: "item-2", productName: "AVOCADO Toast", quantity: 1, price: 208.7, type: "Food", lineTotal: 208.7 },
    { id: "item-3", productName: "Muffen", quantity: 1, price: 60.87, type: "Food", lineTotal: 60.87 },
    { id: "item-4", productName: "Egg Sandwich", quantity: 1, price: 200.0, type: "Food", lineTotal: 200.0 },
    { id: "item-5", productName: "Disposable", quantity: 1, price: 20.0, type: "Other", lineTotal: 20.0 },
  ],
  subtotal: 495.66, // Sum of items before VAT
  vatRate: 0.15, // 15% VAT
  vatAmount: 74.35, // 15% of 495.66
  totalAmount: 570.01, // Subtotal + VAT
  customerName: "EYOB TESFAYE",
  ercaClb: "CLB00008701",
  orderNo: "1234567890",
  receiptNo: "1234567890",
}

