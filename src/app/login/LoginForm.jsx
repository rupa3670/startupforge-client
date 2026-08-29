"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleCredentialLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
      callbackURL: redirectTo,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message || "Invalid email or password.");
      toast.error(signInError.message || "Login failed!");
      return;
    }
    toast.success("Login successful!");

    router.push(redirectTo);
  };

  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);
    await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectTo,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0B0E14] px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-8">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 text-center">
            Welcome back
          </h1>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 px-3 py-2 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Credential login */}
          <form onSubmit={handleCredentialLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-300 dark:border-white/15 bg-transparent px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-300 dark:border-white/15 bg-transparent px-3 py-2.5 pr-16 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-medium py-2.5 transition-colors"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <div className="flex items-center gap-3 mb-4 mt-4">
            <div className="h-px flex-1 bg-gray-200 dark:bg-white/10" />
            <span className="text-xs text-gray-400">or</span>
            <div className="h-px flex-1 bg-gray-200 dark:bg-white/10" />
          </div>

          <Button
            isLoading={googleLoading}
            onClick={handleGoogleLogin}
            className="bg-white text-zinc-800 dark:bg-transparent dark:text-white border-1 border-indigo-200 shadow-sm w-full"
          >
            <FcGoogle /> Continue With Google
          </Button>

          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
            >
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}