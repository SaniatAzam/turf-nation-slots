// app/api/turf/available-slots/route.ts
import { NextRequest, NextResponse } from "next/server";

const REMOTE_URL =
  "https://admin.turfnationbd.com/api/appointments/available-slots";

export async function POST(req: NextRequest) {
  const body = await req.text(); // forward raw JSON
  const res = await fetch(REMOTE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  // Stream the response straight back
  const data = await res.text();
  return new NextResponse(data, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
