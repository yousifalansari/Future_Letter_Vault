import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
      <section className="max-w-2xl text-center">
        <p className="text-sm font-medium text-indigo-400">
          A message to the person you will become
        </p>

        <h1 className="mt-4 text-5xl font-bold tracking-tight">
          Future Letter Vault
        </h1>

        <p className="mt-6 text-lg leading-8 text-zinc-400">
          Write a letter today. Choose when it unlocks. Revisit your thoughts
          when the future becomes the present.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/signup"
            className="rounded-lg bg-indigo-600 px-6 py-3 font-medium hover:bg-indigo-500"
          >
            Get started
          </Link>

          <Link
            href="/login"
            className="rounded-lg border border-zinc-700 px-6 py-3 font-medium hover:bg-zinc-900"
          >
            Log in
          </Link>
        </div>

        <p className="mt-16 text-xs text-zinc-500">Powered by Codyza</p>
      </section>
    </main>
  );
}
