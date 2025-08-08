"use client";

import { useEffect, useState, Suspense } from "react";
import { ReceiptData } from "@/lib/mock-data";
import { decompressFromEncodedURIComponent } from "lz-string";

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto">
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

        {/* Print Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => window.print()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
          >
            Print Receipt
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
