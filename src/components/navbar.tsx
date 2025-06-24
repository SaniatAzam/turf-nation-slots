"use client";

import Link from "next/link";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggler";

const TURFS = [
  {
    id: "turf-nation",
    label: "Turf Nation",
    href: "/turf/turf-nation",
  },
  { id: "jaff", label: "JAFF", href: "/turf/jaff" },
  // add more as needed
];

export function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="
        fixed inset-x-0 top-0 z-50
        backdrop-blur-md bg-background/70 dark:bg-background/60
        border-b border-border/30
      "
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* ------------- Brand / Logo ------------- */}
        <Link href="/" className="font-semibold text-lg text-green-400">
          Futsowl
        </Link>

        {/* ------------- Desktop nav ------------- */}
        <nav className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="gap-4">
              {TURFS.map((turf) => (
                <NavigationMenuItem key={turf.id}>
                  <Link
                    href={turf.href}
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    {turf.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* ------------- Right side controls ------------- */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Burger only on mobile */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button size="icon" variant="ghost">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-60">
              <nav className="mt-8 flex flex-col gap-4">
                {TURFS.map((turf) => (
                  <SheetClose asChild key={turf.id}>
                    <Link
                      href={turf.href}
                      className="text-base font-medium"
                      onClick={() => setOpen(false)}
                    >
                      {turf.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
