"use client";

import { Suspense, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PlusCircle,
  Trash2,
  ReceiptText,
  DollarSign,
  ClipboardList,
  Building,
  Phone,
  Hash,
} from "lucide-react";
import { ReceiptData, ReceiptItem } from "@/lib/mock-data";
import ReceiptPreview from "./preview";

export default function ReceiptGeneratorPage() {
  const [items, setItems] = useState<ReceiptItem[]>([]);
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState<any>();
  const [price, setPrice] = useState<any>();
  const [type, setType] = useState("General");

  // New state for receipt header details
  const [tin, setTin] = useState("90123456");
  const [businessName, setBusinessName] = useState("YEKATIT HOSPITAL");
  const [businessAddress, setBusinessAddress] = useState(
    "R/AS/C BOLE W.09 H.NO NEW AROUND GORO SEFERA"
  );
  const [businessPhone, setBusinessPhone] = useState("0116478100/0911360005");
  const [customerName, setCustomerName] = useState("");
  const [customerTin, setCustomerTin] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [cashierName, setCashierName] = useState("Hirut G");
  const [waiterName, setWaiterName] = useState("konjit");
  const [fsNo, setFsNo] = useState("00075906");
  const [invoiceReference, setInvoiceReference] =
    useState("CS1-S11-01-0003789");
  const [preparedBy, setPreparedBy] = useState("SRE");
  const [ercaClb, setErcaClb] = useState("CLB00008701");

  const [generatedReceipt, setGeneratedReceipt] = useState<ReceiptData | null>(
    null
  );
  const [customerPhoneError, setCustomerPhoneError] = useState(false);

  const VAT_RATE = 0.15; // 15% VAT

  const handleAddItem = () => {
    if (productName && quantity > 0 && price >= 0) {
      const newItem: ReceiptItem = {
        id: Date.now().toString(), // Simple unique ID
        productName,
        quantity,
        price,
        type,
        lineTotal: quantity * price,
      };
      setItems([...items, newItem]);
      setProductName("");
      setQuantity(1);
      setPrice(0);
      setType("General");
    } else {
      alert("Please fill in all item details correctly.");
    }
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
    const vatAmount = subtotal * VAT_RATE;
    const totalAmount = subtotal + vatAmount;
    return { subtotal, vatAmount, totalAmount };
  };

  const handleCustomerPhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerPhone(e.target.value);
    if (customerPhoneError) {
      setCustomerPhoneError(false);
    }
  };

  const handleGenerateReceipt = () => {
    if (items.length === 0) {
      alert("Please add at least one item to generate a receipt.");
      return;
    }

    if (!customerPhone.trim()) {
      setCustomerPhoneError(true);
      alert("Customer phone is mandatory. Please enter a valid phone number.");
      return;
    }

    const { subtotal, vatAmount, totalAmount } = calculateTotals();
    const now = new Date();

    const receiptData: ReceiptData = {
      receiptId: `REC-${now.getTime().toString().slice(-8)}`, // Simple unique ID
      date: now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      tin,
      businessName,
      businessAddress,
      businessPhone,
      fsNo,
      invoiceReference,
      preparedBy,
      cashierName,
      waiterName,
      items,
      subtotal,
      vatRate: VAT_RATE,
      vatAmount,
      totalAmount,
      customerName,
      customerTin,
      customerPhone,
      ercaClb,
      orderNo: "1234567890",
      receiptNo: "1234567890",
    };

    setGeneratedReceipt(receiptData);
  };

  const { subtotal, vatAmount, totalAmount } = calculateTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Input Form */}
        <div className="lg:col-span-2 space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Receipt Generator
            </h1>
            <p className="text-gray-600 text-lg">
              Create professional receipts with VAT calculation
            </p>
          </div>

          {/* <Card className="shadow-lg bg-white border-t-4 border-blue-600">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-800 flex items-center gap-2">
                <Building className="h-6 w-6 text-blue-600" />
                Business & Customer Details
              </CardTitle>
              <CardDescription className="text-gray-600">Information for the top of the receipt.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tin">TIN</Label>
                  <Input id="tin" value={tin} onChange={(e) => setTin(e.target.value)} placeholder="TIN" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Business Name"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessAddress">Business Address</Label>
                <Input
                  id="businessAddress"
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  placeholder="Address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessPhone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Phone Numbers
                </Label>
                <Input
                  id="businessPhone"
                  value={businessPhone}
                  onChange={(e) => setBusinessPhone(e.target.value)}
                  placeholder="Phone Numbers"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Customer Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cashierName">Cashier Name</Label>
                  <Input
                    id="cashierName"
                    value={cashierName}
                    onChange={(e) => setCashierName(e.target.value)}
                    placeholder="Cashier Name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="waiterName">Waiter Name (Optional)</Label>
                  <Input
                    id="waiterName"
                    value={waiterName}
                    onChange={(e) => setWaiterName(e.target.value)}
                    placeholder="Waiter Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fsNo">FS No. (Optional)</Label>
                  <Input id="fsNo" value={fsNo} onChange={(e) => setFsNo(e.target.value)} placeholder="FS No." />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoiceReference">Invoice Reference (Optional)</Label>
                  <Input
                    id="invoiceReference"
                    value={invoiceReference}
                    onChange={(e) => setInvoiceReference(e.target.value)}
                    placeholder="Invoice Reference"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preparedBy">Prepared By (Optional)</Label>
                  <Input
                    id="preparedBy"
                    value={preparedBy}
                    onChange={(e) => setPreparedBy(e.target.value)}
                    placeholder="Prepared By"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ercaClb" className="flex items-center gap-2">
                  <Hash className="h-4 w-4" /> ERCA CLB (Optional)
                </Label>
                <Input
                  id="ercaClb"
                  value={ercaClb}
                  onChange={(e) => setErcaClb(e.target.value)}
                  placeholder="ERCA CLB Number"
                />
              </div>
            </CardContent>
          </Card> */}

          <Card className="shadow-lg bg-white border-t-4 border-blue-600">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-800 flex items-center gap-2">
                <ClipboardList className="h-6 w-6 text-blue-600" />
                Customer Details
              </CardTitle>
              <CardDescription className="text-gray-600">
                Enter customer information to build your receipt.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g., John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerTin">Customer TIN</Label>
                  <Input
                    id="customerTin"
                    value={customerTin}
                    onChange={(e) => setCustomerTin(e.target.value)}
                    placeholder="e.g., 0123456789"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerPhone">
                    Customer Phone{" "}
                    <span className="text-xs text-red-500">*</span>
                  </Label>

                  <Input
                    id="customerPhone"
                    value={customerPhone}
                    onChange={handleCustomerPhoneChange}
                    placeholder="e.g., 0912345678"
                    className={
                      customerPhoneError
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }
                  />
                  {customerPhoneError && (
                    <p className="text-xs text-red-500">Required</p>
                  )}
                </div>
              </div>

            </CardContent>
          </Card>
          <Card className="shadow-lg bg-white border-t-4 border-green-600">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-800 flex items-center gap-2">
                <ClipboardList className="h-6 w-6 text-green-600" />
                Add Item Details
              </CardTitle>
              <CardDescription className="text-gray-600">
                Enter product information to build your receipt.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="productName">Product Name</Label>
                  <Input
                    id="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g., Laptop, Consulting Service"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Product Type</Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Service">Service</SelectItem>
                      <SelectItem value="Apparel">Apparel</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Number.parseInt(e.target.value) || 0)
                    }
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price per Unit (ETB)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) =>
                      setPrice(Number.parseFloat(e.target.value) || 0)
                    }
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <Button
                onClick={handleAddItem}
                className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              >
                <PlusCircle className="h-5 w-5" /> Add Item
              </Button>
            </CardContent>
          </Card>

          {items.length > 0 && (
            <Card className="shadow-lg bg-white border-t-4 border-purple-600">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-purple-800 flex items-center gap-2">
                  <ReceiptText className="h-6 w-6 text-purple-600" />
                  Current Items
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Review the items added to your receipt.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.productName}
                        </TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>ETB {item.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          ETB {item.lineTotal.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          <Card className="shadow-lg bg-white border-t-4 border-orange-600">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-orange-800 flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-orange-600" />
                Receipt Summary
              </CardTitle>
              <CardDescription className="text-gray-600">
                Final totals and generate receipt.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2 text-lg font-medium">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>ETB {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT ({VAT_RATE * 100}%):</span>
                  <span>ETB {vatAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-2xl font-bold text-blue-700 border-t pt-2 mt-2">
                  <span>Total Amount:</span>
                  <span>ETB {totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={handleGenerateReceipt}
                disabled={items.length === 0}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 text-lg flex items-center gap-2"
              >
                <ReceiptText className="h-6 w-6" /> Generate Receipt
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Receipt Preview */}
        <div className="lg:col-span-2 flex justify-center items-start pt-16 mt-20 lg:pt-0">
          {generatedReceipt ? (
            <Suspense fallback={<div>Loading...</div>}>
              <ReceiptPreview receipt={generatedReceipt} />
            </Suspense>
          ) : (
            <Card className="w-[300px] p-8 text-center shadow-lg bg-white border-t-4 border-gray-300">
              <CardTitle className="text-xl text-gray-700">
                Receipt Preview
              </CardTitle>
              <CardContent className="mt-4 text-gray-500">
                <p>Your generated receipt will appear here.</p>
                <p className="mt-2">Add items and click "Generate Receipt".</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
