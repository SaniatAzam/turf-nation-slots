"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
          className="max-w-3xl text-white"
        >
          <h1 className="text-5xl sm:text-5xl font-bold tracking-tight mb-4 ">
            Futsowl Bangladesh
          </h1>
          <p className="text-lg sm:text-xl text-white/80 mb-6">
            Find the next futsal spot across Dhaka
          </p>
          <Button asChild className="text-base px-6 py-4 rounded-full">
            <Link href="/turf/turf-nation">Explore Slots</Link>
          </Button>
        </motion.div>
      </section>
    </main>
  );
}
