import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LetterForm from "./LetterForm";

export default async function CreateLetterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let errorMessage = "";

  if (params.error === "invalid") {
    errorMessage = "Please check your title and message.";
  } else if (params.error === "date") {
    errorMessage = "Choose a date and time in the future.";
  } else if (params.error === "save") {
    errorMessage = "We couldn't save your letter. Please try again.";
  } else if (params.error === "content") {
    errorMessage = "We couldn't save the letter's message. Please try again.";
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <section className="mx-auto max-w-2xl">
        <Link
          href="/dashboard"
          className="text-sm text-zinc-400 hover:text-white"
        >
          ← Back to dashboard
        </Link>

        <h1 className="mt-8 text-3xl font-bold">
          Write a letter to your future self
        </h1>

        <p className="mt-3 text-zinc-400">
          Write something today. Choose when your future self can read it.
        </p>

        {errorMessage && (
          <p className="mt-6 rounded-lg bg-red-950 p-4 text-sm text-red-200">
            {errorMessage}
          </p>
        )}

        <LetterForm />
        
      </section>
    </main>
  );
}
