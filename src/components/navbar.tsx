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
import Image from "next/image";

/* ------------------------------------------------------------------ */
/* Turf links                                                         */
/* ------------------------------------------------------------------ */
const TURFS = [
  { id: "turf-nation", label: "Turf Nation", href: "/turf/turf-nation" },
  { id: "jaff", label: "JAFF", href: "/turf/jaff" },
  { id: "dbox-rooftop", label: "DBOX Rooftop", href: "/turf/dbox-rooftop" },
];

/* small helper to join classNames */
function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  /* close mobile sheet when route changes */
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-background/70 dark:bg-background/60 border-b border-border/30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/icon-dark.png"
            alt="Futsowl Bangladesh Logo"
            width={32}
            height={32}
          />
          <span className="text-lg text-green-400 font-[var(--font-gothic)] font-bold tracking-wide">
            Futsowl
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="gap-4">
              {TURFS.map(({ id, label, href }) => {
                const active = pathname.startsWith(href);
                return (
                  <NavigationMenuItem key={id}>
                    <Link
                      href={href}
                      className={cx(
                        "text-sm font-medium transition-colors",
                        active
                          ? "text-green-400 dark:text-green-300"
                          : "hover:text-primary text-muted-foreground"
                      )}
                    >
                      {label}
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Right‑hand controls */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile burger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button size="icon" variant="ghost" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-64 pt-10">
              <nav className="space-y-5 px-6">
                {TURFS.map(({ id, label, href }) => {
                  const active = pathname.startsWith(href);
                  return (
                    <Button
                      key={id}
                      variant="ghost"
                      className={cx(
                        "w-full justify-start text-lg font-semibold py-3 transition-colors",
                        active
                          ? "bg-green-400/20 text-primary"
                          : "hover:bg-green-400/40 hover:text-primary"
                      )}
                      onClick={() => router.push(href)}
                    >
                      {label}
                    </Button>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
