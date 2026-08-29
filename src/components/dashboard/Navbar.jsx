'use client'
import React, { useState, useRef, useEffect } from 'react';
import ThemeSwitch from '../home/ThemeSwitch';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from "@/lib/auth-client";

const navLinks = [
    { href: "/dashboard/founder", label: "Overview", roles: ["founder"] },
    { href: "/dashboard/collaborator", label: "Overview", roles: ["collaborator"] },
    { href: "/dashboard/admin", label: "Overview", roles: ["admin"] },
    { href: "/dashboard/profile", label: "Profile", roles: ["founder", "collaborator"] },
    { href: "/dashboard/founder/my-startup", label: "My Startup", roles: ["founder"] },
    { href: "/dashboard/founder/add-opportunities", label: "Add Opportunity", roles: ["founder"] },
    { href: "/dashboard/founder/manage-opportunities", label: "Manage Opportunities", roles: ["founder"] },
    { href: "/dashboard/founder/applications", label: "Applications", roles: ["founder"] },
    { href: "/dashboard/collaborator/my-applications", label: "My Applications", roles: ["collaborator"] },
    { href: "/dashboard/admin/manage-users", label: "Manage Users", roles: ["admin"] },
    { href: "/dashboard/admin/manage-startups", label: "Manage Startups", roles: ["admin"] },
    { href: "/dashboard/admin/transactions", label: "Transactions", roles: ["admin"] },
];

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const role = user?.role;

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const menuRef = useRef(null);

    const initials = user?.name
        ? user.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()
        : "U";

    // Route change hole mobile menu ar dropdown duitai bondho hoye jabe
    useEffect(() => {
        setMenuOpen(false);
        setDropdownOpen(false);
    }, [pathname]);

    // Click outside korle dropdown / mobile menu bondho hoye jabe
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/sign-in');
                },
            },
        });
    };

    const filteredLinks = navLinks.filter((item) => item.roles.includes(role));

    return (
        <div className="relative">
            <header className="h-16 w-full flex items-center justify-between px-4 md:px-6 bg-gray-50 dark:bg-black/60 backdrop-blur-md border-b border-indigo-300/40 dark:border-indigo-500/20 sticky top-0 z-50 transition-colors">
                <div className="flex items-center gap-3">
                    {/* Hamburger - shudhu mobile/tablet e dekhabe (lg er niche), logo nai */}
                    <div className="lg:hidden" ref={menuRef}>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-2 -ml-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-200/60 dark:hover:bg-white/10 focus:outline-none"
                            aria-label="Toggle Menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {menuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>

                        {/* Mobile dropdown menu - sidebar er links ekhane */}
                        {menuOpen && (
                            <div className="absolute left-0 top-full mt-0 w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-xl px-4 py-3 space-y-1 max-h-[80vh] overflow-y-auto z-50">
                                {filteredLinks.map((item) => {
                                    const isActive =
                                        item.href === "/dashboard/founder" || item.href === "/dashboard/collaborator" || item.href === "/dashboard/admin"
                                            ? pathname === item.href
                                            : pathname.startsWith(item.href);

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                                isActive
                                                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                                                    : "text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-white/5"
                                            }`}
                                        >
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <h2 className="text-black dark:text-white font-semibold">
                        Dashboard
                    </h2>
                </div>

                <div className="flex items-center gap-3 relative">
                    <ThemeSwitch />

                    {isPending ? (
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500/40 to-purple-600/40 animate-pulse" />
                    ) : (
                        <div className="relative" ref={dropdownRef}>
                            <div
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs font-medium flex items-center justify-center overflow-hidden cursor-pointer shadow-md hover:opacity-90 transition-opacity"
                            >
                                {user?.image ? (
                                    <img
                                        src={user.image}
                                        alt={user?.name || "User"}
                                        className="h-9 w-9 rounded-full object-cover"
                                    />
                                ) : (
                                    initials
                                )}
                            </div>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-900 border border-indigo-200 dark:border-indigo-500/20 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                                    <div className="px-4 py-2 border-b border-gray-100 dark:border-neutral-800">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.name || "User"}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                                    </div>

                                    <Link
                                        href="/"
                                        onClick={() => setDropdownOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
                                    >
                                        🏠 Home
                                    </Link>

                                    <Link
                                        href="/dashboard/profile"
                                        onClick={() => setDropdownOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
                                    >
                                        👤 Profile
                                    </Link>

                                    <div className="border-t border-gray-100 dark:border-neutral-800 my-1" />

                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left"
                                    >
                                        🚪 Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </header>
        </div>
    );
};

export default Navbar;