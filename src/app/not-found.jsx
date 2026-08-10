// src/app/not-found.js
import Link from "next/link";
import { Button } from "@heroui/react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white dark:bg-black text-center">
            <h1 className="text-8xl md:text-9xl font-extrabold text-blue-600 dark:text-blue-400 mb-4">
                404
            </h1>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Page Not Found
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
                Sorry, the page you are looking for does not exist or has been moved.
            </p>

            <Link href="/">
                <Button color="primary" size="lg">
                    Back to Home
                </Button>
            </Link>
        </div>
    );
}