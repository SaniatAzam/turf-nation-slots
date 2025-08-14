import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Oswald } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";
// import { DockNavBar } from "@/components/dock-navbar";
import { ReduxProvider } from "@/components/redux-provider";
import { ThemeWrapper } from "@/components/theme-wrapper";
import { Footer } from "@/components/footer";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// New Gothic font
const gothic = Oswald({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gothic",
});

export const metadata: Metadata = {
  title: "Futsowl Bangladesh",
  description: "Check Available Slots for Futsal Arenas in Dhaka",
  metadataBase: new URL("https://futsowl.vercel.app"),
  openGraph: {
    title: "Futsowl Bangladesh",
    description: "Check Available Slots for Futsal Arenas in Dhaka",
    url: "https://futsowl.vercel.app",
    siteName: "Futsowl Bangladesh",
    images: [
      {
        url: "/cover.png",
        width: 1200,
        height: 630,
        alt: "Futsowl Arena Booking",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Futsowl Bangladesh",
    description: "Check Available Slots for Futsal Arenas in Dhaka",
    images: ["/cover.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>{/* <link rel="icon" href="/favicon.png" sizes="any" /> */}</head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${gothic.variable} antialiased flex  min-h-screen justify-center items-center overflow-x-hidden`}
      >
        <ReduxProvider>
          <ThemeWrapper>
            <NavBar />
            <div className="flex flex-col">
              <div>
                {children} <Analytics />
              </div>

              <Footer />
            </div>
          </ThemeWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
