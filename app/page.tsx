import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import {
  ArrowRight,
  Clock3,
  Feather,
  LockKeyhole,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Feather,
    title: "Write your thoughts",
    description:
      "Capture a feeling, a memory, or a promise you want your future self to remember.",
  },
  {
    icon: Clock3,
    title: "Choose your moment",
    description:
      "Set a date in the future. Your letter will wait patiently until the time is right.",
  },
  {
    icon: LockKeyhole,
    title: "Keep it sealed",
    description:
      "Your letter stays locked until its chosen date, giving your future self a surprise.",
  },
];

export default async function HomePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-280px] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[140px]" />
        <div className="absolute bottom-[-200px] right-[-100px] h-[450px] w-[450px] rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Hero */}
        <section className="grid items-center gap-16 py-20 md:grid-cols-2 md:py-28">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-sm text-indigo-200">
              <Sparkles className="h-4 w-4" />
              A little something for your future self
            </div>

            <h1 className="max-w-xl text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Some words are
              <span className="block bg-gradient-to-r from-indigo-300 via-violet-300 to-purple-300 bg-clip-text text-transparent">
                meant for later.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-lg leading-8 text-zinc-400">
              Write a letter today. Seal it until a day worth remembering.
              Then meet the person you were when you wrote it.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 py-3.5 font-medium text-white shadow-lg shadow-indigo-950/40 transition hover:bg-indigo-400"
              >
                Create your first letter
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
              >
                I already have an account
              </Link>
            </div>

            <p className="mt-6 text-sm text-zinc-500">
              No pressure. Just a moment with your future self.
            </p>
          </div>

          {/* Letter preview */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-6 rounded-[2rem] bg-indigo-500/10 blur-3xl" />

            <div className="relative rotate-1 rounded-3xl border border-white/10 bg-zinc-900/80 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <LockKeyhole className="h-4 w-4 text-indigo-300" />
                  Sealed for the future
                </div>

                <span className="rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1 text-xs text-indigo-200">
                  Locked
                </span>
              </div>

              <div className="my-8 border-y border-white/10 py-8">
                <p className="text-sm text-zinc-500">A letter to</p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  My future self
                </h2>

                <p className="mt-5 font-serif text-lg italic leading-8 text-zinc-300">
                  “I hope you remember how far you have come, and how much
                  courage it took to get here.”
                </p>

                <div className="mt-6 space-y-3">
                  <div className="h-2 w-full rounded-full bg-white/[0.06]" />
                  <div className="h-2 w-5/6 rounded-full bg-white/[0.06]" />
                  <div className="h-2 w-2/3 rounded-full bg-white/[0.06]" />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-zinc-500">Opens on</p>
                  <p className="mt-1 text-sm font-medium text-zinc-200">
                    A day in your future
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-400/10">
                  <Clock3 className="h-5 w-5 text-indigo-300" />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-4 rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 shadow-xl sm:-left-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/10">
                  <LockKeyhole className="h-4 w-4 text-emerald-300" />
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    Your words, safe
                  </p>
                  <p className="text-xs text-zinc-500">
                    Until the right moment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-white/10 py-16 sm:py-20">
          <div className="mb-10 max-w-xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-300">
              How it works
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Today’s thoughts.
              <span className="block text-zinc-500">
                Tomorrow’s memories.
              </span>
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:border-indigo-400/20 hover:bg-white/[0.04]"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-400/10">
                    <Icon className="h-5 w-5 text-indigo-300" />
                  </div>

                  <p className="mb-2 text-xs font-medium text-zinc-600">
                    0{index + 1}
                  </p>

                  <h3 className="text-lg font-semibold">{feature.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
