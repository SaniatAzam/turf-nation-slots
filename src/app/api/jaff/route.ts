//src/app/api/jaff/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fetchJaffSlots } from "@/lib/scrapers/jaff";

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");
  if (!date) {
    return NextResponse.json({ error: "date param required" }, { status: 400 });
  }

  try {
    const slots = await fetchJaffSlots(date);
    return NextResponse.json(
      { date, slots },
      {
        headers: { "Cache-Control": "public, max-age=180" },
      }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("JAFF scrape failed:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
