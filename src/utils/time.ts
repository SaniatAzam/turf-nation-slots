// utils/time.ts
export function toIso(date: string, range: string): string {
  const [startRaw] = range.split("-").map((s) => s.trim());

  const [time, meridianRaw] = startRaw.split(" ");
  const meridian = meridianRaw.toUpperCase() as "AM" | "PM";

  const [hhStr, mmStr] = time.split(":"); // both strings
  let hh = Number(hhStr); // mutable
  const mm = Number(mmStr); // immutable ✅

  if (Number.isNaN(hh) || Number.isNaN(mm)) {
    throw new Error(`Invalid time format: ${range}`);
  }

  if (meridian === "PM" && hh !== 12) hh += 12;
  if (meridian === "AM" && hh === 12) hh = 0;

  const dt = new Date(date);
  dt.setHours(hh, mm, 0, 0);

  // If the slot is after midnight but before 5 AM, roll to next day
  if (hh < 5) dt.setDate(dt.getDate() + 1);

  return dt.toISOString();
}
