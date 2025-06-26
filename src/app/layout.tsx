import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Oswald } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/navbar";
import { ReduxProvider } from "@/components/redux-provider";
import { ThemeWrapper } from "@/components/theme-wrapper";
import { Footer } from "@/components/footer";

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
  icons: {
    icon: [
      { url: "/icon-light.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: { url: "/apple-icon.png" },
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
        className={`${geistSans.variable} ${geistMono.variable} ${gothic.variable} antialiased flex  min-h-screen justify-center items-center`}
      >
        <ReduxProvider>
          <ThemeWrapper>
            <NavBar />
            <div className="pt-16 flex flex-col">
              <div>{children}</div>
              <Footer />
            </div>
          </ThemeWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
