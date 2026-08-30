'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { authClient } from '@/lib/auth-client';

const isOverviewLinkCheck = (item) =>
    item.href === "/dashboard/founder" ||
    item.href === "/dashboard/collaborator" ||
    item.href === "/dashboard/admin";

const Sidebar = () => {
    const pathname = usePathname();
    const { data: session, isPending } = authClient.useSession();
    const role = session?.user?.role;

    const navLinks = [
        { href: "/dashboard/founder", label: "Overview", roles: ["founder"] },
        { href: "/dashboard/collaborator", label: "Overview", roles: ["collaborator"] },
        { href: "/dashboard/admin", label: "Overview", roles: ["admin"] },
        { href: "/dashboard/profile", label: "Profile", roles: ["founder", "collaborator"] },
        { href: "/dashboard/founder/my-startup", label: "My Startup", roles: ["founder"] },
        { href: "/dashboard/founder/add-opportunities", label: "Add Opportunity", roles: ["founder"] },
        { href: "/dashboard/founder/manage-opportunities", label: "Manage Opportunities", roles: ["founder"] },
        { href: "/dashboard/founder/applications", label: "Applications", roles: ["founder"] },
        { href: "/dashboard/founder/add-opportunities/pricing", label: "Pricing", roles: ["founder"] },
        { href: "/dashboard/collaborator/my-applications", label: "My Applications", roles: ["collaborator"] },
        { href: "/dashboard/admin/manage-users", label: "Manage Users", roles: ["admin"] },
        { href: "/dashboard/admin/manage-startups", label: "Manage Startups", roles: ["admin"] },
        { href: "/dashboard/admin/transactions", label: "Transactions", roles: ["admin"] },
    ];

    if (isPending) {
        return null;
    }

    const filteredLinks = navLinks.filter((item) => item.roles.includes(role));

    return (
        <aside className="hidden lg:flex flex-col w-[240px] h-screen sticky top-0 bg-gradient-to-b from-indigo-100 via-white to-white dark:from-indigo-950 dark:via-black dark:to-black border-r border-indigo-300/40 dark:border-indigo-500/20">
            <div className="px-6 py-6 border-b border-indigo-300/40 dark:border-indigo-500/20">
                <Link href="/">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                        StartupForge
                    </h1>
                </Link>
            </div>

            <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
                {filteredLinks.map((item) => {
                    const isOverviewLink = isOverviewLinkCheck(item);

                    let isActive;
                    if (isOverviewLink) {
                        isActive = pathname === item.href;
                    } else {
                        const matchingLinks = filteredLinks.filter(
                            (l) => !isOverviewLinkCheck(l) && pathname.startsWith(l.href)
                        );
                        const longestMatch = matchingLinks.reduce(
                            (longest, l) => (l.href.length > longest.href.length ? l : longest),
                            { href: "" }
                        );
                        isActive = item.href === longestMatch.href;
                    }

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                                isActive
                                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
                                    : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-indigo-500/10"
                            }`}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="px-6 py-4 border-t border-indigo-300/40 dark:border-indigo-500/20 text-xs text-gray-500">
                © 2026 StartupForge
            </div>
        </aside>
    );
};

export default Sidebar;