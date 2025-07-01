# 🔗 [Futsowl](https://futsowl.vercel.app)

**Futsowl** is a web platform that lets you check turf availability at select venues in Dhaka, Bangladesh. It aggregates slot data from providers like Turf Nation and JAFF and presents everything in a clean, responsive interface built with modern web technologies.


![Futsowl interface](public/cover.png)

---

##  Features

- 🕐 **Real-time slot availability** for 5-a-side and 6-a-side football turfs.
- 📆 **14-day forward view** with time-specific slot breakdowns.
- 📱 **Mobile-friendly UI** with fast loading and smooth animations.
- 📍 **Venue-specific pages** with cover image, logo, contact info, and links.
- 💡 **Highlighted slots** on weekends and evening hours.
- 🔍 Searchable and filterable architecture (coming soon).

##  Tech Stack

- **Frontend**: [Next.js (App Router)](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), [TailwindCSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/), [Lucide Icons](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Data Fetching**: [Redux Toolkit Query](https://redux-toolkit.js.org/rtk-query/overview) with `fetch` and `axios` scrapers
- **Backend Proxy**: API routes in Next.js for interfacing with third-party form-based scrapers
- **Weather Data**: [Open-Meteo](https://open-meteo.com/) forecast API


## Getting Started

1. **Clone the repo**

```bash
git clone https://github.com/your-username/turf-nation-slots.git
cd turf-nation-slots
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Run the development server**

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view in the browser.

---


## 📞 Add Your Turf

If you're a turf owner and want your venue featured on this platform, reach out to us at **saniatsaadat@gmail.com**.

---

## Future Plans

- User login
- Map-based navigation
- Auto price comparisons

---

## 📄 License

MIT License. Feel free to fork and contribute.

---

> Built with ❤️ in Dhaka. By Saniat Azam.
