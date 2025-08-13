"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggler";

const TURFS = [
  {
    id: "turf-nation",
    label: "Turf Nation",
    href: "/turf/turf-nation",
    color: "green-400",
    bgColor: "bg-green-400/15",
    borderColor: "border-green-400/30",
    glowColor: "shadow-green-400/20",
    hoverGlow: "hover:shadow-green-400/40",
  },
  {
    id: "jaff",
    label: "JAFF",
    href: "/turf/jaff",
    color: "sky-400",
    bgColor: "bg-sky-400/15",
    borderColor: "border-sky-400/30",
    glowColor: "shadow-sky-400/20",
    hoverGlow: "hover:shadow-sky-400/40",
  },
  {
    id: "dbox-rooftop",
    label: "DBOX Rooftop",
    href: "/turf/dbox-rooftop",
    color: "purple-500",
    bgColor: "bg-purple-500/15",
    borderColor: "border-purple-500/30",
    glowColor: "shadow-purple-500/20",
    hoverGlow: "hover:shadow-purple-500/40",
  },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Find active turf index based on pathname
  useEffect(() => {
    const activeIdx = TURFS.findIndex((turf) => pathname === turf.href);
    if (activeIdx !== -1) {
      setActiveIndex(activeIdx);
    }
  }, [pathname]);

  // Use hovered index if hovering, otherwise use active index
  const displayIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;
  const displayTurf = TURFS[displayIndex];

  return (
    <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4 pt-4">
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-full px-6 py-3 shadow-2xl">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <Image
              src="/icon-hero-lowpoly.png"
              alt="Futsowl Bangladesh Logo"
              width={32}
              height={32}
              className="rounded-lg transition-transform duration-300 group-hover:scale-110"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
          </div>
          <span className="font-medium tracking-widest text-lg text-foreground">
            Futsowl
          </span>
        </Link>

        {/* Navigation Links */}
        <div
          className="relative flex items-center bg-black/5 dark:bg-white/5 rounded-full p-1"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div ref={navRef} className="relative flex items-center">
            {/* Animated Background */}
            <motion.div
              className={`absolute top-1 bottom-1 rounded-full ${displayTurf.bgColor} ${displayTurf.borderColor} border ${displayTurf.glowColor} shadow-lg`}
              layoutId="navbar-pill"
              initial={false}
              animate={{
                x: linkRefs.current[displayIndex]?.offsetLeft || 0,
                width: linkRefs.current[displayIndex]?.offsetWidth || 0,
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 35,
              }}
            />

            {TURFS.map((turf, index) => {
              const isActive = pathname === turf.href;
              return (
                <Link
                  key={turf.id}
                  ref={(el) => {
                    linkRefs.current[index] = el;
                  }}
                  href={turf.href}
                  className="relative z-10 px-6 py-2 text-sm font-medium transition-all duration-300 hover:scale-105"
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  <span
                    className={`transition-all duration-300 ${
                      isActive
                        ? `text-${turf.color} drop-shadow-sm font-semibold`
                        : hoveredIndex === index
                        ? `text-${turf.color} drop-shadow-sm`
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    }`}
                  >
                    {turf.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden">
        <div className="flex items-center justify-between bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-full px-4 py-3 shadow-2xl">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/icon-dark.png"
              alt="Futsowl Bangladesh Logo"
              width={28}
              height={28}
              className="rounded-lg"
            />
            <span className="font-medium tracking-widest text-lg text-foreground">
              Futsowl
            </span>
          </Link>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 transition-all duration-300 hover:bg-white/20 dark:hover:bg-white/10"
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="mt-2 bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              {TURFS.map((turf) => {
                const isActive = pathname === turf.href;
                return (
                  <Link
                    key={turf.id}
                    href={turf.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-6 py-4 transition-all duration-300 ${
                      isActive
                        ? `${turf.bgColor} ${turf.borderColor} border-l-4 text-${turf.color}`
                        : "hover:bg-white/10 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-3 w-full"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isActive ? `bg-${turf.color}` : "bg-gray-400"
                        } transition-colors duration-300`}
                      />
                      <span className="font-medium">{turf.label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
