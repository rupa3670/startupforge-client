"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";
import ThemeSwitch from "@/components/home/ThemeSwitch";
import { authClient } from "@/lib/auth-client";

export default function RootLayout({ children }) {
    const pathname = usePathname();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const initials = user?.name
        ? user.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()
        : "U";
    const navLinks = [
        { href: "/dashboard", label: "Overview" },
        { href: "/dashboard/my-startup", label: "My Startup" },
        { href: "/dashboard/opportunities", label: "Manage Opportunities" },
        { href: "/dashboard/applications", label: "Applications" },
        { href: "/dashboard/profile", label: "Profile" },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-black transition-colors">
            <div className="flex w-screen">
                {/* Sidebar */}
                <aside
                    className="hidden md:flex flex-col w-[240px] h-screen sticky top-0
                    bg-gradient-to-b from-indigo-100 via-white to-white
                    dark:from-indigo-950 dark:via-black dark:to-black
                    border-r border-indigo-300/40 dark:border-indigo-500/20
                    transition-colors"
                >
                    <div className="px-6 py-6 border-b border-indigo-300/40 dark:border-indigo-500/20">
                        <Link href="/">
                            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                                StartupForge
                            </h1>
                        </Link>
                    </div>

                    <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
                        {navLinks.map((item) => {
                            const isActive =
                                item.href === "/dashboard"
                                    ? pathname === "/dashboard"
                                    : pathname.startsWith(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                                        isActive
                                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
                                            : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gradient-to-r hover:from-indigo-600/20 hover:to-purple-600/20"
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="px-6 py-4 border-t border-indigo-300/40 dark:border-indigo-500/20 text-xs text-gray-500 dark:text-gray-500">
                        © 2026 StartupForge
                    </div>
                </aside>

                {/* Main column */}
                <div className="flex flex-col w-full min-h-screen">
                    {/* Navbar */}
                    <header
                        className="h-16 w-full flex items-center justify-between px-6
                        bg-white/60 dark:bg-black/60 backdrop-blur-md
                        border-b border-indigo-300/40 dark:border-indigo-500/20
                        sticky top-0 z-10 transition-colors"
                    >
                        <h2 className="text-black dark:text-white font-semibold">
                            Dashboard
                        </h2>

                        <div className="flex items-center gap-3">
                            <ThemeSwitch />

                            <Link href="/dashboard/add-opportunity">
                                <Button
                                    radius="lg"
                                    className="text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md shadow-indigo-500/20 data-[hover=true]:opacity-90"
                                >
                                    + New Opportunity
                                </Button>
                            </Link>

                            {isPending ? (
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500/40 to-purple-600/40 animate-pulse" />
                            ) : (
                                <Link
                                    href="/dashboard/profile"
                                    className="flex items-center gap-2"
                                >
                                    <div className="hidden sm:flex flex-col items-end leading-tight">
                                        <span className="text-sm font-medium text-black dark:text-white">
                                            {user?.name || "Guest"}
                                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                            {user?.role || "user"}
                                        </span>
                                    </div>
                                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs font-medium flex items-center justify-center overflow-hidden cursor-pointer">
                                        {user?.image ? (
                                            <img
                                                src={user.image}
                                                alt=""
                                                className="h-9 w-9 rounded-full object-cover"
                                            />
                                        ) : (
                                            initials
                                        )}
                                    </div>
                                </Link>
                            )}
                        </div>
                    </header>

                    {/* Page content */}
                    <main className="flex-1 w-full p-6 bg-white dark:bg-black text-black dark:text-white transition-colors">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}