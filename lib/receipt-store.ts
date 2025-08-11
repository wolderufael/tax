import { ReceiptData } from "@/lib/mock-data";

interface StoredReceipt {
  data: ReceiptData;
  timestamp: number;
}

const receiptStore = new Map<string, StoredReceipt>();

// Clean up old receipts (24 hours TTL)
const RECEIPT_TTL = 24 * 60 * 60 * 1000; // 24 hours

function cleanupExpiredReceipts() {
  const now = Date.now();
  for (const [id, stored] of receiptStore.entries()) {
    if (now - stored.timestamp > RECEIPT_TTL) {
      receiptStore.delete(id);
    }
  }
}

export function saveReceipt(id: string, data: ReceiptData) {
  // Clean up expired receipts before saving new ones
  cleanupExpiredReceipts();

  receiptStore.set(id, {
    data,
    timestamp: Date.now(),
  });
}

export function getReceipt(id: string): ReceiptData | undefined {
  const stored = receiptStore.get(id);
  if (!stored) return undefined;

  // Check if receipt has expired
  if (Date.now() - stored.timestamp > RECEIPT_TTL) {
    receiptStore.delete(id);
    return undefined;
  }

  return stored.data;
}

export function hasReceipt(id: string): boolean {
  const stored = receiptStore.get(id);
  if (!stored) return false;

  // Check if receipt has expired
  if (Date.now() - stored.timestamp > RECEIPT_TTL) {
    receiptStore.delete(id);
    return false;
  }

  return true;
}

// Run cleanup every hour
setInterval(cleanupExpiredReceipts, 60 * 60 * 1000);
