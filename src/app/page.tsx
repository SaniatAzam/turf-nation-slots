"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import ShinyText from "@/components/ui/TextAnimations/ShinyText/ShinyText";

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
            // You can also pass inline style if you want a min-height:
            // style={{ minHeight: 260 }}
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

                <div className="mt-6">
                  <Button
                    asChild
                    className="w-full rounded-2xl px-6 py-6 text-base text-white shadow-lg transition-all  border-2 bg-gradient-to-br from-[#18181b] to-[#27272a] hover:scale-101 hover:border-primary"
                  >
                    <Link href="/turf/turf-nation">
                      <ShinyText
                        text="Explore Slots"
                        disabled={false}
                        speed={3}
                        className="custom-class font-light text-xl"
                      />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </GlassSurface>
        </motion.div>
      </section>
    </main>
  );
}
