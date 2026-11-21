import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logOut } from "@/app/auth/actions";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const params = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const email = user.email ?? "Authenticated user";

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-lg font-semibold">
            Future Letter Vault
          </Link>

          <form action={logOut}>
            <button
              type="submit"
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-900"
            >
              Log out
            </button>
          </form>
        </header>

        <section className="mt-16">
          <p className="text-sm text-indigo-400">Your private space</p>
          <h1 className="mt-2 text-4xl font-bold">Welcome back</h1>
          <p className="mt-3 text-zinc-400">{email}</p>

          {params.message === "created" && (
            <p className="mt-6 rounded-lg bg-emerald-950 p-4 text-sm text-emerald-200">
              Your future letter has been saved!
            </p>
          )}

          <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Your letters</h2>
                <p className="mt-2 text-zinc-400">
                  Your future letters will appear here.
                </p>
              </div>

              <Link
                href="/create-letter"
                className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium hover:bg-indigo-500"
              >
                + Write a letter
              </Link>
            </div>
          </div>
        </section>

        <p className="mt-16 text-center text-xs text-zinc-500">
          Powered by Codyza
        </p>
      </div>
    </main>
  );
}
