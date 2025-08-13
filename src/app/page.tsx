"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

// Backgrounds
import DarkVeil from "@/components/ui/Backgrounds/DarkVeil/DarkVeil";
// Glass
import GlassSurface from "@/components/ui/Components/GlassSurface/GlassSurface";

export default function LandingPage() {
  return (
    <main className="relative flex h-screen w-screen flex-col overflow-hidden bg-black">
      {/* DarkVeil background */}
      <div className="absolute inset-0 z-0 h-full">
        <DarkVeil
          hueShift={120} // green tint
          noiseIntensity={0.06} // subtle film noise
          scanlineIntensity={0.08} // faint scanlines
          scanlineFrequency={8}
          warpAmount={0.05}
          speed={0.5}
          resolutionScale={1}
        />
      </div>

      {/* Optional extra green tint */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-emerald-400/15 mix-blend-overlay" />

      {/* Hero Section */}
      <section className="relative z-10 flex flex-1 items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto w-full max-w-5xl"
        >
          {/* GlassSurface replaces the previous glass card */}
          <GlassSurface
            width="100%"
            height="auto"
            borderRadius={28}
            borderWidth={0.08}
            brightness={50}
            opacity={0.92}
            blur={11}
            backgroundOpacity={0.18}
            saturation={1.4}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            xChannel="R"
            yChannel="G"
            mixBlendMode="screen"
            className="mx-auto max-w-4xl p-6 sm:p-8 text-white"
          >
            {/* Card content */}
            <div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:items-start lg:text-left">
              <Image
                src="/icon-hero-lowpoly.png"
                alt="Futsowl Bangladesh Logo"
                width={300}
                height={300}
                className="-mt-4 h-[180px] w-[180px] shrink-0 rounded-2xl lg:h-[220px] lg:w-[220px]"
                priority
              />

              <div className="w-full">
                <h1 className="font-[var(--font-gothic)] text-5xl font-bold tracking-wide sm:text-6xl">
                  Futsowl Bangladesh
                </h1>
                <p className="mt-3 text-base text-white/80 sm:text-lg">
                  Find the next futsal spot in Dhaka
                </p>

                <div className="mt-8">
                  {/* Enhanced CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group"
                  >
                    {/* Animated background glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 rounded-3xl blur-lg opacity-70 group-hover:opacity-100 animate-pulse transition duration-1000 group-hover:duration-200"></div>

                    {/* Secondary glow ring */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                    <Button
                      asChild
                      className="relative w-full rounded-2xl px-8 py-7 text-lg font-semibold text-white shadow-2xl transition-all duration-300 border-2 border-emerald-500/50 bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700 hover:border-emerald-400 hover:from-emerald-500 hover:via-green-500 hover:to-emerald-600 hover:shadow-emerald-500/50 group overflow-hidden"
                    >
                      <Link
                        href="/turf/turf-nation"
                        className="flex items-center justify-center gap-3"
                      >
                        <span className="text-xl tracking-wide">
                          Explore Slots
                        </span>

                        {/* Simple chevron arrow with hover animation */}
                        <motion.div
                          className="opacity-80 group-hover:opacity-100 flex items-center -mt-[7px]"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          style={{ fontSize: "40px", lineHeight: -1 }}
                        >
                          ›
                        </motion.div>

                        {/* Animated shine overlay */}
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                      </Link>
                    </Button>
                  </motion.div>

                  {/* Supporting text */}
                  {/* <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-4 text-sm text-emerald-300/70 flex items-center justify-center gap-2"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Live availability
                  </motion.p> */}
                </div>
              </div>
            </div>
          </GlassSurface>
        </motion.div>
      </section>
    </main>
  );
}
