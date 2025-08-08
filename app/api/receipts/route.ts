import { NextResponse } from "next/server";
import { saveReceipt, hasReceipt } from "@/lib/receipt-store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, receipt } = body as { id: string; receipt: any };

    if (!id || !receipt) {
      return NextResponse.json(
        { error: "Missing id or receipt" },
        { status: 400 }
      );
    }

    // Save or overwrite
    saveReceipt(id, receipt);

    return NextResponse.json({ id, exists: hasReceipt(id) }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
