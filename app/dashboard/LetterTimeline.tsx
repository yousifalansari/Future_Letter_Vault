
"use client";

import { deleteLetter } from "./actions";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LockKeyhole, MailOpen, Clock, Trash2 } from "lucide-react";

type Letter = {
  id: string;
  title: string;
  unlock_at: string;
  created_at: string;
};

function formatCountdown(milliseconds: number) {
  if (milliseconds <= 0) {
    return "Ready to open";
  }

  const totalSeconds = Math.floor(milliseconds / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

export default function LetterTimeline({
  letters,
}: {
  letters: Letter[];
}) {
  const [now, setNow] = useState(0);
  const [dates, setDates] = useState<Record<string, string>>({});

  useEffect(() => {
    setNow(Date.now());

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const formattedDates: Record<string, string> = {};

    for (const letter of letters) {
      formattedDates[letter.id] = new Date(
        letter.unlock_at
      ).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      });
    }

    setDates(formattedDates);
  }, [letters]);

  if (letters.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">
        <MailOpen className="mx-auto mb-4 h-10 w-10 text-zinc-500" />

        <h2 className="text-xl font-semibold text-white">
          Your vault is empty
        </h2>

        <p className="mt-2 text-zinc-400">
          Create your first letter and send a message to your future self.
        </p>

        <Link
          href="/create-letter"
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-500"
        >
          Create your first letter
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {letters.map((letter) => {
        const unlockTime = new Date(letter.unlock_at).getTime();
        const unlocked = now > 0 && unlockTime <= now;
        const remaining = unlockTime - now;

        return (
          <article
            key={letter.id}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  {unlocked ? (
                    <MailOpen className="h-5 w-5 shrink-0 text-emerald-400" />
                  ) : (
                    <LockKeyhole className="h-5 w-5 shrink-0 text-indigo-400" />
                  )}

                  <h2 className="truncate text-lg font-semibold text-white">
                    {letter.title}
                  </h2>
                </div>

                <p className="mt-2 text-sm text-zinc-400">
                  Unlocks: {dates[letter.id] ?? "Loading date..."}
                </p>

                <div className="mt-3 flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-zinc-500" />

                  {unlocked ? (
                    <span className="font-medium text-emerald-400">
                      Ready to open
                    </span>
                  ) : (
                    <span className="font-mono text-indigo-300">
                      {formatCountdown(remaining)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {unlocked ? (
                  <Link
                    href={`/letters/${letter.id}`}
                    className="shrink-0 rounded-lg bg-indigo-600 px-5 py-3 text-center font-medium text-white transition hover:bg-indigo-500"
                  >
                    Open letter
                  </Link>
                ) : (
                  <span className="shrink-0 rounded-lg border border-zinc-700 px-5 py-3 text-center text-sm text-zinc-500">
                    Locked
                  </span>
                )}

                <form
                  action={deleteLetter}
                  onSubmit={(event) => {
                    const confirmed = window.confirm(
                      "Are you sure you want to permanently delete this letter?"
                    );

                    if (!confirmed) {
                      event.preventDefault();
                    }
                  }}
                >
                  <input
                    type="hidden"
                    name="letterId"
                    value={letter.id}
                  />

                  <button
                    type="submit"
                    className="flex shrink-0 items-center gap-2 rounded-lg border border-red-900 px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-950"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
