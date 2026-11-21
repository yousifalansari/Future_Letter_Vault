
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LetterTimeline from "./LetterTimeline";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{
    created?: string;
    deleted?: string;
    deleteError?: string;
  }>;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: letters, error } = await supabase
    .from("letters")
    .select("id, title, unlock_at, created_at")
    .order("unlock_at", { ascending: true });

  const params = await searchParams;

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-indigo-400">
              FUTURE LETTER VAULT
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Your letters
            </h1>

            <p className="mt-2 text-zinc-400">
              Messages from your past, waiting for your future.
            </p>
          </div>

          <Link
            href="/create-letter"
            className="rounded-lg bg-indigo-600 px-5 py-3 text-center font-medium text-white transition hover:bg-indigo-500"
          >
            + Create letter
          </Link>
        </header>

        {params.created === "1" && (
          <div className="mb-6 rounded-lg border border-emerald-800 bg-emerald-950/40 p-4 text-emerald-300">
            Your future letter has been created successfully.
          </div>
        )}

        {params.deleted === "1" && (
          <div className="mb-6 rounded-lg border border-emerald-800 bg-emerald-950/40 p-4 text-emerald-300">
            Letter deleted successfully.
          </div>
        )}

        {params.deleteError === "1" && (
          <div className="mb-6 rounded-lg border border-red-800 bg-red-950/40 p-4 text-red-300">
            We couldn't delete that letter. Please try again.
          </div>
        )}

        {error ? (
          <div className="rounded-lg border border-red-800 bg-red-950/40 p-4 text-red-300">
            We couldn't load your letters. Please refresh the page.
          </div>
        ) : (
          <LetterTimeline letters={letters ?? []} />
        )}
        
      </div>
    </main>
  );
}
