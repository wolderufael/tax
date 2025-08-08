import { NextResponse } from "next/server";
import { getReceipt } from "@/lib/receipt-store";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const segments = url.pathname.split("/");
  const id = segments[segments.length - 1] || "";

  const data = getReceipt(id);
  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(data, { status: 200 });
}
