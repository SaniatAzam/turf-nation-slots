// src/lib/scrapers/jaff.ts
import axios from "axios";
import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";
import * as cheerio from "cheerio";

const BASE = "https://www.jaff.com.bd";
const VENUE = `${BASE}/venue/jaff`; // GET first
const LOAD = `${BASE}/usercal/load-event`; // refresh cookies (optional)
const AVAIL = `${BASE}/usercal/avail-slot`; // real slots endpoint

export async function fetchJaffSlots(date: string, gid = "1") {
  const jar = new CookieJar();
  const http = wrapper(axios.create({ jar, withCredentials: true }));

  /* 1️⃣ GET venue page -> sets cookies + delivers <meta csrf-token> */
  const venueRes = await http.get(VENUE, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });

  /* ---- extract plain token from HTML meta ---- */
  const $page = cheerio.load(venueRes.data);
  const csrfPlain = $page('meta[name="csrf-token"]').attr("content");
  if (!csrfPlain) throw new Error("CSRF meta token not found");

  /* 2️⃣ (optional) hit /load-event to keep cookies very fresh */
  await http.post(
    LOAD,
    new URLSearchParams({
      start: date,
      end: date,
      _token: csrfPlain,
      gid,
    }).toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-XSRF-TOKEN": csrfPlain, // plain!
        "X-Requested-With": "XMLHttpRequest",
        Referer: VENUE,
        Origin: BASE,
        "User-Agent": "Mozilla/5.0",
      },
    }
  );

  /* 3️⃣ real slot request ------------------------------------- */
  const res = await http.post(
    AVAIL,
    new URLSearchParams({
      _token: csrfPlain, // plain token
      date,
      gid,
    }).toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-XSRF-TOKEN": csrfPlain, // plain again
        "X-Requested-With": "XMLHttpRequest",
        Referer: VENUE,
        Origin: BASE,
        "User-Agent": "Mozilla/5.0",
      },
    }
  );

  /* 4️⃣ parse HTML table -> JSON ------------------------------- */
  const $ = cheerio.load(res.data.output);
  return $("table tbody tr")
    .map((_, tr) => {
      const td = $(tr).find("td");
      return {
        time: $(td[0]).text().trim(),
        price: $(td[1]).text().trim(),
        type: $(td[2]).text().trim(),
        status: $(td[3]).find("i").attr("style")?.includes("green")
          ? "available"
          : "booked",
      };
    })
    .get();
}
