'use client'
import React from 'react';
import ThemeSwitch from '../home/ThemeSwitch';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
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

    return (
        <div>
            <header className="h-16 w-full flex items-center justify-between px-6 bg-gray-50 dark:bg-black/60 backdrop-blur-md border-b border-indigo-300/40 dark:border-indigo-500/20 sticky top-0 z-10 transition-colors">
                <h2 className="text-black dark:text-white font-semibold">
                    Dashboard
                </h2>

                <div className="flex items-center gap-3">
                    

                    <Link href="/dashboard/add-opportunity">
                        <Button
                            radius="lg"
                            className="text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md shadow-indigo-500/20 data-[hover=true]:opacity-90"
                        >
                            + New Opportunity
                        </Button>
                    </Link>
                    <ThemeSwitch />

                    {isPending ? (
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500/40 to-purple-600/40 animate-pulse" />
                    ) : (
                        <Link href="/dashboard/profile" className="flex items-center gap-2">
                            {/* <div className="hidden sm:flex flex-col items-end leading-tight">
                                <span className="text-sm font-medium text-black dark:text-white">
                                    {user?.name || "Guest"}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                    {user?.role || "user"}
                                </span>
                            </div> */}
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
        </div>
    );
};

export default Navbar;