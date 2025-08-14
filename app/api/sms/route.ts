import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const message = searchParams.get("message");

    if (!from || !to || !message) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const response = await axios.get(
      `https://api.afromessage.com/api/send?from=${from}&to=${to}&message=${encodeURIComponent(
        message
      )}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZGVudGlmaWVyIjoiYnZXc2F6YmNnbGd1N3JoQzdDZzgzQ3JqOUxpQWVacUQiLCJleHAiOjE5MTI1MDk3OTgsImlhdCI6MTc1NDc0MzM5OCwianRpIjoiNDY0YmJmMjgtYjc5MC00NGYyLTk2ZTUtYTllYTY2ZjFmNjQ2In0.R03UwREW7QYryUFygoP-Lw0Wi8TpYGntSHZT-5uF8-A ",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error proxying SMS request:", error);
    return NextResponse.json(
      { error: "Failed to send SMS" },
      { status: error.response?.status || 500 }
    );
  }
}
