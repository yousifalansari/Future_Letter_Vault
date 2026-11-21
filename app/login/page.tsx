import Link from "next/link";
import { logIn } from "@/app/auth/actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const params = await searchParams;

  let errorMessage = "";
  let successMessage = "";

  if (params.error === "invalid") {
    errorMessage = "Please enter your email and password.";
  } else if (params.error === "login") {
    errorMessage = "Email or password is incorrect.";
  }

  if (params.message === "check-email") {
    successMessage = "Account created. Check your email to confirm your address, then log in.";
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-12 text-white">
      <section className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <Link href="/" className="text-sm text-zinc-400 hover:text-white">
          ← Future Letter Vault
        </Link>

        <h1 className="mt-6 text-3xl font-bold">Welcome back</h1>
        <p className="mt-2 text-zinc-400">
          Log in to visit your letter vault.
        </p>

        {errorMessage && (
          <p className="mt-5 rounded-lg bg-red-950 p-3 text-sm text-red-200">
            {errorMessage}
          </p>
        )}

        {successMessage && (
          <p className="mt-5 rounded-lg bg-emerald-950 p-3 text-sm text-emerald-200">
            {successMessage}
          </p>
        )}

        <form action={logIn} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-medium hover:bg-indigo-500"
          >
            Log in
          </button>
        </form>

        <p className="mt-6 text-sm text-zinc-400">
          New here?{" "}
          <Link href="/signup" className="text-indigo-400 hover:text-indigo-300">
            Create an account
          </Link>
        </p>

        <p className="mt-8 text-center text-xs text-zinc-500">
          Powered by Codyza
        </p>
      </section>
    </main>
  );
}
