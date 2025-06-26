import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Futsowl Bangladesh",
  description: "Check Available Slots for Futsal Arenas in Dhaka",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex  min-h-screen justify-center items-center`}
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
