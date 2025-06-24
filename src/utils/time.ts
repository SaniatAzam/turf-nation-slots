// utils/time.ts
export function toIso(date: string, range: string): string {
  const [startRaw] = range.split("-").map((s) => s.trim());

  const [time, meridian] = startRaw.split(" ");
  let [hh, mm] = time.split(":").map(Number);

  if (Number.isNaN(hh) || Number.isNaN(mm)) {
    throw new Error(`Invalid time format: ${range}`);
  }

  if (meridian === "PM" && hh !== 12) hh += 12;
  if (meridian === "AM" && hh === 12) hh = 0;

  const dt = new Date(date);
  dt.setHours(hh, mm, 0, 0);

  // if slot is "12:30 AM" but we're attaching it to a date like "2025-06-24"
  // then the actual ISO time will be before midnight — we want it to roll into next day
  if (hh < 5) {
    dt.setDate(dt.getDate() + 1);
  }

  return dt.toISOString();
}
