// src/components/Navbar.tsx
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(
    () =>
      (localStorage.getItem("theme") as "light" | "dark") ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 1);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname, location.hash]);

  const goTo = (id: "gallery" | "location") => {
    const doScroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      setTimeout(doScroll, 50);
    } else doScroll();
  };

  const RoomsDropdown = () => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="inline-flex items-center gap-1 link-underline">
        Rooms <ChevronDown className="h-4 w-4" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        sideOffset={8}
        className="w-72 rounded-xl bg-white dark:bg-slate-900 shadow-xl ring-1 ring-slate-900/10 dark:ring-white/10 p-2"
      >
        <DropdownMenu.Item asChild>
          <NavLink
            to="/rooms/deluxe-single"
            className="block rounded-lg px-3 py-3 hover:bg-slate-900/5 dark:hover:bg-white/10"
          >
            Deluxe Single Rooms
          </NavLink>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );

  const OtherServicesDropdown = () => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="inline-flex items-center gap-1 link-underline">
        Other Services <ChevronDown className="h-4 w-4" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        sideOffset={8}
        className="w-72 rounded-xl bg-white dark:bg-slate-900 shadow-xl ring-1 ring-slate-900/10 dark:ring-white/10 p-2"
      >
        <DropdownMenu.Item asChild>
          <NavLink
            to="/other/restaurant"
            className="block rounded-lg px-3 py-3 hover:bg-slate-900/5 dark:hover:bg-white/10"
          >
            Restaurant
          </NavLink>
        </DropdownMenu.Item>
        <DropdownMenu.Item asChild>
          <NavLink
            to="/other/functions"
            className="block rounded-lg px-3 py-3 hover:bg-slate-900/5 dark:hover:bg-white/10"
          >
            Functions
          </NavLink>
        </DropdownMenu.Item>
        <DropdownMenu.Item asChild>
          <NavLink
            to="/other/cafe"
            className="block rounded-lg px-3 py-3 hover:bg-slate-900/5 dark:hover:bg-white/10"
          >
            Café
          </NavLink>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 h-[var(--nav-h)] border-b",
        "bg-white/70 dark:bg-slate-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/55",
        "border-slate-900/10 dark:border-white/10",
        scrolled ? "shadow-sm" : "shadow-none",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-full items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl text-white font-black bg-[var(--brand)]">
              G
            </span>
            <span className="text-lg font-extrabold tracking-tight">
              Galaxy – Airport Residence
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <NavLink className="link-underline" to="/">
              Home
            </NavLink>
            <NavLink className="link-underline" to="/about">
              About
            </NavLink>
            <RoomsDropdown />
            <OtherServicesDropdown />
            <button className="link-underline" onClick={() => goTo("gallery")}>
              Gallery
            </button>
            <button className="link-underline" onClick={() => goTo("location")}>
              Location & Contact
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <button
              aria-label="Toggle theme"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/5 hover:bg-slate-900/10 dark:bg-white/10 dark:hover:bg-white/20 ring-1 ring-slate-900/10 dark:ring-white/10"
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button
              aria-label="Open Menu"
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/5 hover:bg-slate-900/10 dark:bg-white/10 dark:hover:bg-white/20 ring-1 ring-slate-900/10 dark:ring-white/10"
              onClick={() => setMobileOpen((o) => !o)}
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={[
          "md:hidden absolute left-0 right-0 top-[var(--nav-h)]",
          mobileOpen ? "block" : "hidden",
          "bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm border-b border-slate-900/10 dark:border-white/10",
        ].join(" ")}
      >
        <div className="px-5 py-4 max-h-[calc(100vh-var(--nav-h))] overflow-y-auto text-sm">
          <NavLink className="block py-2" to="/">
            Home
          </NavLink>
          <NavLink className="block py-2" to="/about">
            About
          </NavLink>

          <details className="py-2">
            <summary className="cursor-pointer select-none">Rooms</summary>
            <div className="pl-3 pt-2">
              <NavLink to="/rooms/deluxe-single" className="block py-2">
                Deluxe Single Rooms
              </NavLink>
            </div>
          </details>

          <details className="py-2">
            <summary className="cursor-pointer select-none">
              Other Services
            </summary>
            <div className="pl-3 pt-2">
              <NavLink to="/other/restaurant" className="block py-2">
                Restaurant
              </NavLink>
              <NavLink to="/other/functions" className="block py-2">
                Functions
              </NavLink>
              <NavLink to="/other/cafe" className="block py-2">
                Café
              </NavLink>
            </div>
          </details>

          <button
            className="block py-2 text-left"
            onClick={() => goTo("gallery")}
          >
            Gallery
          </button>
          <button
            className="block py-2 text-left"
            onClick={() => goTo("location")}
          >
            Location & Contact
          </button>
        </div>
      </div>
    </header>
  );
}
