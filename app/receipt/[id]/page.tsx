"use client";

import { useEffect, useState, Suspense } from "react";
import { ReceiptData } from "@/lib/mock-data";
import { decompressFromEncodedURIComponent } from "lz-string";
import { Download, Printer } from "lucide-react";

function ReceiptContent({ params }: { params: Promise<{ id: string }> }) {
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);
  const [loading, setLoading] = useState(true);
  const [receiptId, setReceiptId] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  useEffect(() => {
    // Handle async params in Next.js 15
    params.then((resolvedParams) => {
      setReceiptId(resolvedParams.id);
    });
  }, [params]);

  useEffect(() => {
    if (!receiptId) return;
    let cancelled = false;
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/receipts/${receiptId}`);
        if (!res.ok) throw new Error("Not found");
        const data: ReceiptData = await res.json();
        if (!cancelled) setReceipt(data);
      } catch {
        // Fallback 1: compressed data in URL (?c=...)
        try {
          const search =
            typeof window !== "undefined" ? window.location.search : "";
          const params = new URLSearchParams(search);
          const compressed = params.get("c");
          if (compressed) {
            const json = decompressFromEncodedURIComponent(compressed);
            if (json) {
              const decoded = JSON.parse(json) as ReceiptData;
              if (!cancelled) {
                setReceipt(decoded);
                return;
              }
            }
          }
        } catch {}

        // Fallback 2: sessionStorage (same-device open)
        try {
          if (typeof window !== "undefined") {
            const cached = window.sessionStorage.getItem(
              `receipt:${receiptId}`
            );
            if (cached) {
              const parsed = JSON.parse(cached) as ReceiptData;
              if (!cancelled) {
                setReceipt(parsed);
                return;
              }
            }
          }
        } catch {}

        if (!cancelled) setReceipt(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchData();
    return () => {
      cancelled = true;
    };
  }, [receiptId]);

  // Generate a shortened URL for the current page to use in the QR code
  useEffect(() => {
    const shorten = async () => {
      try {
        const href = typeof window !== "undefined" ? window.location.href : "";
        if (!href) return;
        const res = await fetch("/api/shorten", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: href }),
        });
        const data = await res.json();
        if (typeof data?.shortUrl === "string") {
          setShortUrl(data.shortUrl);
        } else {
          setShortUrl(href);
        }
      } catch {
        const href = typeof window !== "undefined" ? window.location.href : "";
        setShortUrl(href || null);
      }
    };
    shorten();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading receipt...</p>
        </div>
      </div>
    );
  }

  if (!receipt) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Receipt Not Found
          </h1>
          <p className="text-gray-600">
            The receipt you're looking for doesn't exist or has expired.
          </p>
        </div>
      </div>
    );
  }

  // Use shortened URL for QR data; fallback to current href
  const qrData =
    shortUrl ?? (typeof window !== "undefined" ? window.location.href : "");

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(
    qrData
  )}`;

  const handleDownload = async () => {
    if (!receipt) return;

    const url = qrData;
    // Create a new window for Image (PNG) generation
    const imgWindow = window.open("", "_blank", "width=400,height=600");
    if (imgWindow) {
      imgWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Receipt - ${receipt.businessName}</title>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
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
              <div>Customer TIN: ${receipt.customerTin}</div>
              <div>Customer Phone: ${receipt.customerPhone}</div>
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
            // Wait for the page to load, then generate PNG
            window.onload = function() {
              const element = document.getElementById('receipt-content');
              html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' }).then(function(canvas) {
                const dataURL = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = dataURL;
                a.download = 'receipt-${receipt.receiptId}.png';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                setTimeout(() => window.close(), 500);
              });
            };
          </script>
        </body>
        </html>
      `);
      imgWindow.document.close();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto">
        {/* Receipt Content */}
        <div className="w-[300px] mx-auto bg-white p-4 shadow-lg font-mono font-stretch-95% text-xs leading-tight print:shadow-none print:border-none print:w-[280px] print:p-2">
          {/* Header */}
          <div className="text-center mb-4">
            <p className="text-sm mb-1">TIN: {receipt.tin}</p>
            <p className="text-sm font-bold mb-1">
              {receipt.businessName}
            </p>
            {/* <p className="mb-1">{receipt.businessName}</p> */}
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
              <span>Customer TIN: {receipt.customerTin}</span>
            </div>
            <div className="mb-1">
              <span>Customer Phone: {receipt.customerPhone}</span>
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
              <span className="font-bold">
                ETB {receipt.subtotal.toFixed(2)}
              </span>
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
        <div className="mt-6 flex gap-3 justify-center print:hidden">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            <Printer className="h-4 w-4" />
            Print Receipt
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            <Download className="h-4 w-4" />
            Download Image
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ReceiptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading receipt...</p>
          </div>
        </div>
      }
    >
      <ReceiptContent params={params} />
    </Suspense>
  );
}
