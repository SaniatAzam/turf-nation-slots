# ⚽ Dhaka Turf Finder

**Dhaka Turf Finder** is a web platform that allows users to view and book available football turf slots across various venues in Dhaka, Bangladesh. It aggregates real-time data from third-party turf providers and displays it in a clean, responsive interface built with modern web technologies.

![JAFF Turf](public/assets/turfs/jaff/jaff-cover.jpg)

## 🌟 Features

- 🕐 **Real-time slot availability** for 5-a-side and 6-a-side football turfs.
- 📆 **14-day forward view** with time-specific slot breakdowns.
- 📱 **Mobile-friendly UI** with fast loading and smooth animations.
- 📍 **Venue-specific pages** with cover image, logo, contact info, and links.
- 💡 **Highlighted slots** on weekends and evening hours.
- 🔍 Searchable and filterable architecture (coming soon).

## 🛠️ Tech Stack

- **Frontend**: [Next.js (App Router)](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), [TailwindCSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/), [Lucide Icons](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Data Fetching**: `axios`, `useSWR`
- **Backend Proxy**: API routes in Next.js for interfacing with third-party form-based scrapers

## 📂 Folder Structure (Frontend)

```
/app
  └── turf
      └── jaff
/components
  ├── TurfHeader.tsx
  ├── DayCard.tsx
  └── ...
/public
  └── assets
      └── turfs
          └── jaff
              ├── jaff-cover.jpg
              └── jaff-logo.png
```

## 🚀 Getting Started

1. **Clone the repo**

```bash
git clone https://github.com/your-username/dhaka-turf-finder.git
cd dhaka-turf-finder
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

## 📸 Screenshots

### Desktop View
![Desktop UI](public/assets/screenshots/desktop-jaff.png)

### Mobile View
![Mobile UI](public/assets/screenshots/mobile-jaff.png)

---

## 📞 Add Your Turf

If you're a turf owner and want your venue featured on this platform, reach out to us at **dhakaturfapp@gmail.com**.

---

## 🧠 Future Plans

- User login and booking
- Admin dashboard for turf managers
- Map-based navigation
- Auto price comparisons

---

## 📄 License

MIT License. Feel free to fork and contribute.

---

> Built with ❤️ in Dhaka.
