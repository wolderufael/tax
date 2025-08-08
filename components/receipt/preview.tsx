"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ReceiptData } from "@/lib/mock-data";
import { Printer, Download, Share2 } from "lucide-react";
import { compressToEncodedURIComponent } from "lz-string";

interface ReceiptPreviewProps {
  receipt: ReceiptData;
}

export default function ReceiptPreview({ receipt }: ReceiptPreviewProps) {
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const ensureShareUrl = async (): Promise<string> => {
    if (shareUrl) return shareUrl;
    const id = String(receipt.receiptId);
    const origin = window.location.origin;
    // Build compact, self-contained URL with compressed data
    const compressed = compressToEncodedURIComponent(JSON.stringify(receipt));
    const longUrl = `${origin}/receipt/${id}?c=${compressed}`;
    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: longUrl }),
      });
      const data = await res.json();
      const shortUrl =
        typeof data?.shortUrl === "string" ? data.shortUrl : longUrl;
      try {
        window.sessionStorage.setItem(`receipt:${id}`, JSON.stringify(receipt));
      } catch {}
      setShareUrl(shortUrl);
      return shortUrl;
    } catch {
      setShareUrl(longUrl);
      return longUrl;
    }
  };

  useEffect(() => {
    // pre-create short URL when receipt changes
    ensureShareUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receipt.receiptId]);

  const openReceiptInNewTab = (url: string) => {
    // Create a new window with just the receipt
    const receiptWindow = window.open("", "_blank", "width=400,height=600");
    if (receiptWindow) {
      receiptWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Receipt - ${receipt.businessName}</title>
          <style>
            body { 
              font-family: monospace; 
              font-size: 12px; 
              margin: 20px; 
              background: white;
              color: black;
            }
            .receipt { 
              width: 300px; 
              margin: 0 auto; 
              background: white; 
              padding: 20px;
              border: 1px solid #ccc;
            }
            .header { text-align: center; margin-bottom: 20px; }
            .border-dashed { border-top: 1px dashed #ccc; border-bottom: 1px dashed #ccc; padding: 10px 0; margin: 10px 0; }
            .flex-between { display: flex; justify-content: space-between; }
            .text-center { text-align: center; }
            .font-bold { font-weight: bold; }
            .qr-code { text-align: center; margin: 20px 0; }
            @media print {
              .actions { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="receipt">
            <div class="header">
              <p>TIN: ${receipt.tin}</p>
              <p class="font-bold">${
                receipt.customerName || receipt.businessName
              }</p>
              <p>${receipt.businessName}</p>
              <p>${receipt.businessAddress}</p>
              <p>${receipt.businessPhone}</p>
            </div>

            <div class="flex-between border-dashed">
              <span>${receipt.date.split(",")}</span>
              <span>${receipt.time}</span>
            </div>

            <div class="border-dashed">
              <div>To: ${receipt.customerName}</div>
              <div>Order No.: ${receipt.orderNo}</div>
              <div>Receipt No.: ${receipt.receiptNo}</div>
            </div>

            <div>
              ${
                receipt.invoiceReference
                  ? `<p>Reference: ${receipt.invoiceReference}</p>`
                  : ""
              }
              ${receipt.fsNo ? `<p>FS No. ${receipt.fsNo}</p>` : ""}
              ${
                receipt.preparedBy
                  ? `<p>Prepared by: ${receipt.preparedBy}</p>`
                  : ""
              }
              ${receipt.cashierName ? `<p>To: ${receipt.cashierName}</p>` : ""}
            </div>

            <div class="flex-between border-dashed">
              <span>Description</span>
              <span>QTY Price</span>
              <span>Amount</span>
            </div>

            ${receipt.items
              .map(
                (item) => `
              <div class="flex-between">
                <span style="flex: 1;">${item.productName}</span>
                <span style="width: 25%; text-align: right;">
                  ${item.quantity.toFixed(3)} x ${item.price.toFixed(2)}
                </span>
                <span style="width: 25%; text-align: right;">
                  *${item.lineTotal.toFixed(2)}
                </span>
              </div>
            `
              )
              .join("")}

            <div class="border-dashed" style="padding-top: 10px;">
              <div class="flex-between">
                <span>SUBTOTAL</span>
                <span class="font-bold">ETB ${receipt.subtotal.toFixed(
                  2
                )}</span>
              </div>
              <div class="flex-between">
                <span>VAT ${receipt.vatRate * 100}%</span>
                <span class="font-bold">ETB ${receipt.vatAmount.toFixed(
                  2
                )}</span>
              </div>
              <div class="flex-between font-bold" style="border-top: 1px dashed #ccc; padding-top: 10px; margin-top: 10px;">
                <span>TOTAL</span>
                <span>ETB ${receipt.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div class="flex-between">
              <span>CASH</span>
              <span>ETB ${receipt.totalAmount.toFixed(2)}</span>
            </div>
            <div class="flex-between">
              <span>ITEM#</span>
              <span>${receipt.items.length}</span>
            </div>

            <div class="qr-code">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(
                url
              )}" alt="QR Code" style="width: 96px; height: 96px;" />
            </div>

            <div class="text-center" style="border-top: 1px dashed #ccc; padding-top: 20px;">
              <p class="font-bold">Powered By SRE</p>
              ${receipt.ercaClb ? `<p>${receipt.ercaClb}</p>` : ""}
              <p style="margin-top: 20px; font-size: 10px;">Thank you for your business!</p>
            </div>
          </div>
        </body>
        </html>
      `);
      receiptWindow.document.close();
      return receiptWindow;
    }
    return null;
  };

  const handlePrint = async () => {
    const url = await ensureShareUrl();
    const receiptWindow = openReceiptInNewTab(url);
    if (receiptWindow) {
      // Wait for the window to load, then print
      receiptWindow.onload = () => {
        receiptWindow.print();
      };
    }
  };

  const handleDownload = async () => {
    const url = await ensureShareUrl();
    // Create a new window for PDF generation
    const pdfWindow = window.open("", "_blank", "width=400,height=600");
    if (pdfWindow) {
      pdfWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Receipt - ${receipt.businessName}</title>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
          <style>
            body { 
              font-family: monospace; 
              font-size: 12px; 
              margin: 20px; 
              background: white;
              color: black;
            }
            .receipt { 
              width: 300px; 
              margin: 0 auto; 
              background: white; 
              padding: 20px;
              border: 1px solid #ccc;
            }
            .header { text-align: center; margin-bottom: 20px; }
            .border-dashed { border-top: 1px dashed #ccc; border-bottom: 1px dashed #ccc; padding: 10px 0; margin: 10px 0; }
            .flex-between { display: flex; justify-content: space-between; }
            .text-center { text-align: center; }
            .font-bold { font-weight: bold; }
            .qr-code { text-align: center; margin: 20px 0; }
            @media print {
              .actions { display: none; }
            }
          </style>
        </head>
        <body>
          <div id="receipt-content" class="receipt">
            <div class="header">
              <p>TIN: ${receipt.tin}</p>
              <p class="font-bold">${
                receipt.customerName || receipt.businessName
              }</p>
              <p>${receipt.businessName}</p>
              <p>${receipt.businessAddress}</p>
              <p>${receipt.businessPhone}</p>
            </div>

            <div class="flex-between border-dashed">
              <span>${receipt.date.split(",")}</span>
              <span>${receipt.time}</span>
            </div>

            <div class="border-dashed">
              <div>To: ${receipt.customerName}</div>
              <div>Order No.: ${receipt.orderNo}</div>
              <div>Receipt No.: ${receipt.receiptNo}</div>
            </div>

            <div>
              ${
                receipt.invoiceReference
                  ? `<p>Reference: ${receipt.invoiceReference}</p>`
                  : ""
              }
              ${receipt.fsNo ? `<p>FS No. ${receipt.fsNo}</p>` : ""}
              ${
                receipt.preparedBy
                  ? `<p>Prepared by: ${receipt.preparedBy}</p>`
                  : ""
              }
              ${receipt.cashierName ? `<p>To: ${receipt.cashierName}</p>` : ""}
            </div>

            <div class="flex-between border-dashed">
              <span>Description</span>
              <span>QTY Price</span>
              <span>Amount</span>
            </div>

            ${receipt.items
              .map(
                (item) => `
              <div class="flex-between">
                <span style="flex: 1;">${item.productName}</span>
                <span style="width: 25%; text-align: right;">
                  ${item.quantity.toFixed(3)} x ${item.price.toFixed(2)}
                </span>
                <span style="width: 25%; text-align: right;">
                  *${item.lineTotal.toFixed(2)}
                </span>
              </div>
            `
              )
              .join("")}

            <div class="border-dashed" style="padding-top: 10px;">
              <div class="flex-between">
                <span>SUBTOTAL</span>
                <span class="font-bold">ETB ${receipt.subtotal.toFixed(
                  2
                )}</span>
              </div>
              <div class="flex-between">
                <span>VAT ${receipt.vatRate * 100}%</span>
                <span class="font-bold">ETB ${receipt.vatAmount.toFixed(
                  2
                )}</span>
              </div>
              <div class="flex-between font-bold" style="border-top: 1px dashed #ccc; padding-top: 10px; margin-top: 10px;">
                <span>TOTAL</span>
                <span>ETB ${receipt.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div class="flex-between">
              <span>CASH</span>
              <span>ETB ${receipt.totalAmount.toFixed(2)}</span>
            </div>
            <div class="flex-between">
              <span>ITEM#</span>
              <span>${receipt.items.length}</span>
            </div>

            <div class="qr-code">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(
                url
              )}" alt="QR Code" style="width: 96px; height: 96px;" />
            </div>

            <div class="text-center" style="border-top: 1px dashed #ccc; padding-top: 20px;">
              <p class="font-bold">Powered By SRE</p>
              ${receipt.ercaClb ? `<p>${receipt.ercaClb}</p>` : ""}
              <p style="margin-top: 20px; font-size: 10px;">Thank you for your business!</p>
            </div>
          </div>

          <script>
            // Wait for the page to load, then generate PDF
            window.onload = function() {
              const element = document.getElementById('receipt-content');
              const opt = {
                margin: 1,
                filename: 'receipt-${receipt.receiptId}.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
              };
              
              html2pdf().set(opt).from(element).save().then(function() {
                window.close();
              });
            };
          </script>
        </body>
        </html>
      `);
      pdfWindow.document.close();
    }
  };

  const handleShare = async () => {
    const url = await ensureShareUrl();
    // Create share data
    const shareData = {
      title: `Receipt - ${receipt.businessName}`,
      text: `Receipt for ${
        receipt.customerName
      } - Total: ETB ${receipt.totalAmount.toFixed(2)}`,
      url,
    };

    try {
      // Use native share dialog
      await navigator.share(shareData);
    } catch (error) {
      console.error("Error sharing:", error);
      // Fallback: copy the URL to clipboard
      try {
        await navigator.clipboard.writeText(url);
        alert("Receipt URL copied to clipboard!");
      } catch (clipboardError) {
        console.error("Error copying to clipboard:", clipboardError);
        // Final fallback: show the URL
        alert(`Receipt URL: ${url}`);
      }
    }
  };

  const qrData =
    shareUrl ?? (typeof window !== "undefined" ? window.location.origin : "");

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(
    qrData
  )}`;

  return (
    <div className="space-y-4">
      {/* Receipt Content */}
      <div className="w-[300px] mx-auto bg-white p-4 shadow-lg font-mono font-stretch-95% text-xs leading-tight print:shadow-none print:border-none print:w-[280px] print:p-2">
        {/* Header */}
        <div className="text-center mb-4">
          <p className="text-sm mb-1">TIN: {receipt.tin}</p>
          <p className="text-sm font-bold mb-1">
            {receipt.customerName || receipt.businessName}
          </p>
          <p className="mb-1">{receipt.businessName}</p>
          <p className="mb-1">{receipt.businessAddress}</p>
          <p className="mb-1">{receipt.businessPhone}</p>
        </div>

        <div className="flex justify-between border-t border-b border-dashed border-gray-400 py-2 mb-4">
          <span>{receipt.date.split(",")}</span>
          <span>{receipt.time}</span>
        </div>
        <div className="border-t border-b border-dashed border-gray-400 py-2 mb-4">
          <div className="mb-1">
            <span>To: {receipt.customerName}</span>
          </div>
          <div className="mb-1">
            <span>Order No.: {receipt.orderNo}</span>
          </div>
          <div className="mb-1">
            <span>Receipt No.: {receipt.receiptNo}</span>
          </div>
        </div>

        <div className="mb-4">
          {receipt.invoiceReference && (
            <p className="mb-1">Reference: {receipt.invoiceReference}</p>
          )}
          {receipt.fsNo && <p className="mb-1">FS No. {receipt.fsNo}</p>}
          {receipt.preparedBy && (
            <p className="mb-1">Prepared by: {receipt.preparedBy}</p>
          )}
          {receipt.cashierName && (
            <p className="mb-1">To: {receipt.cashierName}</p>
          )}
        </div>

        <div className="flex justify-between border-t border-b border-dashed border-gray-400 py-2 mb-4">
          <span>Description</span>
          <span>QTY Price</span>
          <span>Amount</span>
        </div>

        {/* Items */}
        <div className="mb-4">
          {receipt.items.map((item) => (
            <div key={item.id} className="flex justify-between mb-1">
              <span className="flex-1">{item.productName}</span>
              <span className="w-1/4 text-right">
                {item.quantity.toFixed(3)} x {item.price.toFixed(2)}
              </span>
              <span className="w-1/4 text-right">
                *{item.lineTotal.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="border-t border-dashed border-gray-400 pt-2 mb-4">
          <div className="flex justify-between mb-1">
            <span>SUBTOTAL</span>
            <span className="font-bold">ETB {receipt.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>VAT {receipt.vatRate * 100}%</span>
            <span className="font-bold">
              ETB {receipt.vatAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm font-bold border-t border-dashed border-gray-400 pt-2 mt-2">
            <span>TOTAL</span>
            <span>ETB {receipt.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-between mb-1">
          <span>CASH</span>
          <span>ETB {receipt.totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>ITEM#</span>
          <span>{receipt.items.length}</span>
        </div>

        {/* QR Code */}
        <div className="flex justify-center mb-4">
          <img src={qrCodeUrl} alt="QR Code" className="w-24 h-24" />
        </div>

        {/* Footer */}
        <div className="text-center border-t border-dashed border-gray-400 pt-4">
          <p className="font-bold mb-1">Powered By SRE</p>
          {receipt.ercaClb && <p className="mb-1">{receipt.ercaClb}</p>}
          <p className="mt-4 text-[0.6rem]">Thank you for your business!</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 print:hidden">
        <Button
          onClick={handlePrint}
          variant="outline"
          size="sm"
          className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
        >
          <Printer className="h-4 w-4 mr-1" />
          Print
        </Button>
        <Button
          onClick={handleDownload}
          variant="outline"
          size="sm"
          className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
        >
          <Download className="h-4 w-4 mr-1" />
          Download PDF
        </Button>
        <Button
          onClick={handleShare}
          variant="outline"
          size="sm"
          className="flex-1 bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200"
        >
          <Share2 className="h-4 w-4 mr-1" />
          Share
        </Button>
      </div>
    </div>
  );
}
