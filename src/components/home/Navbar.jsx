"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Bars, Xmark, Person, ArrowRightFromSquare } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import ThemeSwitch from "./ThemeSwitch";

const publicLinks = [
  { label: "Home", href: "/" },
  { label: "Browse startups", href: "/browse-startups" },
  { label: "Browse opportunities", href: "/browse-opportunities" },
];

export default function Navbar() {
  
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  

  const { data: session, isPending } = authClient.useSession();

  // close the account dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const pathname = usePathname();
  if(pathname.includes("dashboard")){
    return null
  }

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const initials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/assest/logo.jfif"
            alt="StartupForge logo"
            width={32}
            height={32}
            className="rounded-md object-cover"
          />
          <span className="font-semibold text-lg tracking-tight text-gray-900 dark:text-white">
            Startup<span className="text-indigo-600 dark:text-indigo-400">Forge</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {publicLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium pb-1 border-b-2 transition-colors ${
                    active
                      ? "text-gray-900 dark:text-white border-blue-600 dark:border-blue-400"
                      : "text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeSwitch />

          {!isPending && session?.user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen((v) => !v)}
                aria-label="Account menu"
                className="h-8 w-8 rounded-full bg-indigo-600 text-white text-xs font-medium flex items-center justify-center"
              >
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  initials
                )}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 top-10 min-w-[160px] rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-1">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Person width={16} height={16} /> Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <ArrowRightFromSquare width={16} height={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            !isPending && (
              <Link
                href="/login"
                className="text-sm font-medium px-4 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Login
              </Link>
            )
          )}

          {/* Mobile menu toggle */}
          <button
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden p-1 text-gray-700 dark:text-gray-200"
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            {isMenuOpen ? <Xmark width={20} height={20} /> : <Bars width={20} height={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 px-4 py-3 space-y-1">
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {!session?.user && (
            <Link
              href="/login"
              className="block py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}