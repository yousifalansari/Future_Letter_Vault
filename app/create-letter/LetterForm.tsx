"use client";

import { useRef, type FormEvent } from "react";
import { CalendarDays } from "lucide-react";
import { createLetter } from "./actions";

export default function LetterForm() {
  const dateInput = useRef<HTMLInputElement>(null);
  const utcInput = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const localDateTime = dateInput.current?.value;

    if (!localDateTime || !utcInput.current) {
      event.preventDefault();
      return;
    }

    const selectedDate = new Date(localDateTime);

    if (
      Number.isNaN(selectedDate.getTime()) ||
      selectedDate.getTime() <= Date.now()
    ) {
      event.preventDefault();
      alert("Please choose a date and time in the future.");
      return;
    }

    // Convert the user's local date and time to UTC.
    utcInput.current.value = selectedDate.toISOString();
  }

  return (
    <form
      action={createLetter}
      onSubmit={handleSubmit}
      className="mt-8 space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
    >
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-zinc-200"
        >
          Letter title
        </label>

        <input
          id="title"
          name="title"
          type="text"
          required
          maxLength={100}
          placeholder="A letter to my future self..."
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="content"
          className="mb-2 block text-sm font-medium text-zinc-200"
        >
          Your letter
        </label>

        <textarea
          id="content"
          name="content"
          required
          maxLength={10000}
          rows={8}
          placeholder="Write something your future self will appreciate..."
          className="w-full resize-y rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="unlockAt"
          className="mb-2 block text-sm font-medium text-zinc-200"
        >
          When should this letter unlock?
        </label>

        <div className="relative">
          <input
            ref={dateInput}
            id="unlockAt"
            type="datetime-local"
            required
            onClick={() => dateInput.current?.showPicker()}
            className="w-full cursor-pointer rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 pr-12 text-white outline-none transition focus:border-indigo-500"
          />

          <button
            type="button"
            aria-label="Open date and time picker"
            onClick={() => dateInput.current?.showPicker()}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            <CalendarDays className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-2 text-sm text-zinc-500">
          Choose a date and time using your device's calendar.
        </p>

        <input
          ref={utcInput}
          type="hidden"
          name="unlockAtUtc"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-500"
      >
        Create future letter
      </button>
    </form>
  );
}
