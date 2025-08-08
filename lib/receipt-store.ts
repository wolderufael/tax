import { ReceiptData } from "@/lib/mock-data";

const receiptStore = new Map<string, ReceiptData>();

export function saveReceipt(id: string, data: ReceiptData) {
  receiptStore.set(id, data);
}

export function getReceipt(id: string): ReceiptData | undefined {
  return receiptStore.get(id);
}

export function hasReceipt(id: string): boolean {
  return receiptStore.has(id);
}
