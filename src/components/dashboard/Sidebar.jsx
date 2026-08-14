'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Sidebar = () => {
    const pathname = usePathname();

    const navLinks = [
        { href: "/dashboard", label: "Overview" },
        { href: "/dashboard/my-startup", label: "My Startup" },
        { href: "/dashboard/opportunities", label: "Manage Opportunities" },
        { href: "/dashboard/applications", label: "Applications" },
        { href: "/dashboard/profile", label: "Profile" },
    ];

    return (
        <aside className="hidden md:flex flex-col w-[240px] h-screen sticky top-0 bg-gradient-to-b from-indigo-100 via-white to-white dark:from-indigo-950 dark:via-black dark:to-black border-r border-indigo-300/40 dark:border-indigo-500/20 transition-colors">
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
    );
};

export default Sidebar;