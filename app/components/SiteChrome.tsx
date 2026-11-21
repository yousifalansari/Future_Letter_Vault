"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Feather } from "lucide-react";
import { signOut } from "@/app/auth/logout-action";

export default function SiteChrome({
  children,
  isAuthenticated,
}: {
  children: React.ReactNode;
  isAuthenticated: boolean;
}) {
  const pathname = usePathname();

  const brandHref = isAuthenticated ? "/dashboard" : "/";
  const showDashboardLink =
    isAuthenticated && pathname === "/create-letter";

  return (
    <>
      <header className="relative z-10 border-b border-white/10 bg-zinc-950/90">
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-5 sm:px-6">
          {/* Left: Product */}
          <Link
            href={brandHref}
            className="flex min-w-0 items-center gap-2 sm:gap-3"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10 sm:h-11 sm:w-11">
              <Feather className="h-4 w-4 text-indigo-300 sm:h-5 sm:w-5" />
            </div>

            <span className="truncate text-sm font-semibold tracking-tight text-white sm:text-lg">
              Future Letter Vault
            </span>
          </Link>

          {/* Center: Codyza brand */}
          <Link
            href={brandHref}
            aria-label="Codyza home"
            className="text-center text-lg font-black tracking-[0.12em] text-white transition hover:text-indigo-200 sm:text-2xl"
          >
            CODYZA
          </Link>

          {/* Right: Authentication navigation */}
          <nav className="flex items-center justify-end gap-2">
            {isAuthenticated ? (
              <>
                {showDashboardLink && (
                  <Link
                    href="/dashboard"
                    className="rounded-lg px-3 py-2 text-xs font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white sm:text-sm"
                  >
                    Dashboard
                  </Link>
                )}

                <Link
                  href="/create-letter"
                  className="rounded-lg bg-indigo-500 px-3 py-2 text-xs font-medium text-white transition hover:bg-indigo-400 sm:px-4 sm:text-sm"
                >
                  <span className="sm:hidden">+ New</span>
                  <span className="hidden sm:inline">+ New letter</span>
                </Link>

                <form action={signOut}>
                  <button
                    type="submit"
                    className="rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-zinc-400 transition hover:border-white/20 hover:bg-white/5 hover:text-white sm:text-sm"
                  >
                    Sign out
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg px-2 py-2 text-xs font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white sm:px-4 sm:text-sm"
                >
                  Log in
                </Link>

                <Link
                  href="/signup"
                  className="inline-flex items-center gap-1 rounded-lg bg-indigo-500 px-3 py-2 text-xs font-medium text-white transition hover:bg-indigo-400 sm:gap-2 sm:px-4 sm:text-sm"
                >
                  Get started
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {children}

      <footer className="relative border-t border-white/10 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
            <div className="text-center sm:text-left">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-500">
                Powered by
              </p>

              <p className="mt-2 text-4xl font-black tracking-[0.12em] text-white sm:text-5xl">
                CODYZA
              </p>

              <p className="mt-2 text-sm text-zinc-500">
                Building thoughtful digital experiences.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
              <p className="text-sm font-medium text-zinc-200">
                Your words. Your future.
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Made with care by Codyza
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-5 text-center text-xs text-zinc-600">
            © {new Date().getFullYear()} Codyza. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
