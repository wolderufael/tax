import { NextResponse } from "next/server";
import { getReceipt } from "@/lib/receipt-store";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = getReceipt(id);
  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(data, { status: 200 });
}
