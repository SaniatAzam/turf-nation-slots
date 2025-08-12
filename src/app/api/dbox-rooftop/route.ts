import { NextRequest, NextResponse } from "next/server";

interface DboxSlot {
  slot: {
    start_time: string;
    end_time: string;
  };
  status: "available" | "booked";
}

interface DboxApiResponse {
  success: boolean;
  data: {
    item: {
      slots: DboxSlot[];
    };
  };
}

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");
  if (!date) {
    return NextResponse.json({ error: "date param required" }, { status: 400 });
  }

  try {
    const url = `https://live-api-backend-2022.squarefeet.xyz/api/v2/booking-place-details/dbox-jfp-rooftop-futsal-ground?date=${date}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; TurfBooking/1.0)",
      },
    });

    if (!response.ok) {
      throw new Error(`DBox API responded with ${response.status}`);
    }

    const data: DboxApiResponse = await response.json();

    if (!data.success) {
      throw new Error("DBox API returned unsuccessful response");
    }

    // Transform to our expected format
    const slots = data.data.item.slots.map((slot) => ({
      time: `${slot.slot.start_time} - ${slot.slot.end_time}`,
      status: slot.status,
    }));

    return NextResponse.json(
      { date, slots },
      {
        headers: { "Cache-Control": "public, max-age=180" },
      }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("DBox fetch failed:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
