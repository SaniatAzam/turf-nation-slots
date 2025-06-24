"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggler";

const TURFS = [
  { id: "turf-nation", label: "Turf Nation", href: "/turf/turf-nation" },
  { id: "jaff", label: "JAFF", href: "/turf/jaff" },
  // add more…
];

export function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the sheet once the route actually changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className="
      fixed inset-x-0 top-0 z-50
      backdrop-blur-md bg-background/70 dark:bg-background/60
      border-b border-border/30
    "
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <Link href="/" className="font-semibold text-lg text-green-400">
          Futsowl
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="gap-4">
              {TURFS.map(({ id, label, href }) => (
                <NavigationMenuItem key={id}>
                  <Link
                    href={href}
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    {label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Right-hand controls */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Burger – mobile only */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button size="icon" variant="ghost" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-64 pt-10">
              <nav className="space-y-5 px-6">
                {TURFS.map(({ id, label, href }) => (
                  <Button
                    key={id}
                    variant="ghost"
                    className="
                      w-full justify-start
                      text-lg font-semibold
                      hover:bg-green-400/40 hover:text-primary
                      py-3
                    "
                    onClick={() => router.push(href)}
                  >
                    {label}
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
