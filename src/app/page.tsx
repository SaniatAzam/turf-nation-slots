"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LandingPage() {
  return (
    <main className="flex flex-col w-screen h-screen overflow-x-hidden overflow-y-hidden">
      {/* Hero Section */}
      <section
        className="flex flex-1 items-center justify-center text-center px-8"
        style={{
          background:
            "radial-gradient(at 14% 89%, #05df72 0px, transparent 50%), radial-gradient(at 83% 38%, #05df72 0px, transparent 50%), radial-gradient(at 74.52586190453891% 100%, #40acaf 0px, transparent 50%), #000",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl flex flex-col lg:flex-row gap-16 text-white items-center justify-center lg-justify-between lg:items-start lg:text-left mx-auto"
        >
          <Image
            src="/icon-dark.png"
            alt="Futsowl Bangladesh Logo"
            width={300}
            height={300}
            className="-mt-10"
          />
          <div className="w-full">
            <h1 className="text-5xl sm:text-5xl mb-4 font-[var(--font-gothic)] font-bold tracking-wide ">
              Futsowl Bangladesh
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6">
              Find the next futsal spot in Dhaka
            </p>
            <Button
              asChild
              className="text-base px-6 py-4 rounded-full w-[100%] text-white bg-gradient-to-r from-[#05df72] to-[#40acaf] hover:from-[#05df72]/90 hover:to-[#40acaf]/90 hover:shadow-lg transition-all duration-300"
            >
              <Link href="/turf/turf-nation">Explore Slots</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
