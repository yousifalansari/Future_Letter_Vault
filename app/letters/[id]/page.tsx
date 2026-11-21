
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LocalDateTime from "./LocalDateTime";

export default async function LetterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch the letter's metadata.
  // RLS ensures the user can only see their own letters.
  const { data: letter, error: letterError } = await supabase
    .from("letters")
    .select("id, title, unlock_at")
    .eq("id", id)
    .maybeSingle();

  if (letterError || !letter) {
    notFound();
  }

  const unlockTime = new Date(letter.unlock_at).getTime();
  const unlocked = unlockTime <= Date.now();

  if (!unlocked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
        <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
          <h1 className="text-2xl font-bold">
            This letter is still locked
          </h1>

          <p className="mt-4 text-zinc-400">
            It will unlock on:
          </p>

          <p className="mt-2 font-medium text-indigo-300">
            <LocalDateTime value={letter.unlock_at} />
          </p>

          <Link
            href="/dashboard"
            className="mt-8 inline-block rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-500"
          >
            Back to your letters
          </Link>
        </div>
      </main>
    );
  }

  // RLS allows access to the content only after unlock_at.
  const { data: letterContent, error: contentError } = await supabase
    .from("letter_contents")
    .select("content")
    .eq("letter_id", letter.id)
    .maybeSingle();

  if (contentError || !letterContent) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
        <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
          <h1 className="text-2xl font-bold">
            Letter unavailable
          </h1>

          <p className="mt-4 text-zinc-400">
            We couldn't retrieve the letter content. Please try again later.
          </p>

          <Link
            href="/dashboard"
            className="mt-8 inline-block rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-500"
          >
            Back to your letters
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/dashboard"
          className="text-sm text-indigo-400 transition hover:text-indigo-300"
        >
          ← Back to your letters
        </Link>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-10">
          <p className="text-sm font-medium text-indigo-400">
            A LETTER FROM YOUR PAST
          </p>

          <h1 className="mt-3 text-3xl font-bold">
            {letter.title}
          </h1>

          <p className="mt-3 text-sm text-zinc-500">
            Unlocked: <LocalDateTime value={letter.unlock_at} />
          </p>

          <div className="mt-8 whitespace-pre-wrap break-words leading-8 text-zinc-200">
            {letterContent.content}
          </div>
        </div>
        
      </article>
    </main>
  );
}
