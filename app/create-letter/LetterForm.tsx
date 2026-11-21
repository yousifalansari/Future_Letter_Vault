"use client";

import {
  useRef,
  type FormEvent,
  type ChangeEvent,
} from "react";
import { useFormStatus } from "react-dom";
import { CalendarDays } from "lucide-react";
import { createLetter } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Creating your letter..." : "Create future letter"}
    </button>
  );
}

export default function LetterForm() {
  const dateInput = useRef<HTMLInputElement>(null);
  const utcInput = useRef<HTMLInputElement>(null);
  const requestIdInput = useRef<HTMLInputElement>(null);
  const requestIdRef = useRef<string>("");

  function generateRequestId() {
    const newId = crypto.randomUUID();

    requestIdRef.current = newId;

    if (requestIdInput.current) {
      requestIdInput.current.value = newId;
    }
  }

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

    utcInput.current.value = selectedDate.toISOString();

    // Ensure the submission always has an idempotency key.
    if (!requestIdRef.current) {
      generateRequestId();
    }
  }

  function handleFormChange(event: ChangeEvent<HTMLFormElement>) {
    const target = event.target;

    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement
    ) {
      // Create a fresh key for the changed form.
      // Repeated submissions of this unchanged form reuse it.
      generateRequestId();
    }
  }

  return (
    <form
      action={createLetter}
      onSubmit={handleSubmit}
      onChange={handleFormChange}
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
          Choose a date and time using your device&apos;s calendar.
        </p>

        <input
          ref={utcInput}
          type="hidden"
          name="unlockAtUtc"
        />

        <input
          ref={requestIdInput}
          type="hidden"
          name="requestId"
        />
      </div>

      <SubmitButton />
    </form>
  );
}
