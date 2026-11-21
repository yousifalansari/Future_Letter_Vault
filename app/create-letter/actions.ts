"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createLetter(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const unlockAtUtc = String(formData.get("unlockAtUtc") ?? "");
  const requestId = String(formData.get("requestId") ?? "");

  if (
    !title ||
    title.length > 100 ||
    !content ||
    content.length > 10000
  ) {
    redirect("/create-letter?error=invalid");
  }

  // Validate the idempotency key.
  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!uuidPattern.test(requestId)) {
    redirect("/create-letter?error=invalid");
  }

  const unlockAt = new Date(unlockAtUtc);

  if (
    !unlockAtUtc ||
    Number.isNaN(unlockAt.getTime()) ||
    unlockAt.getTime() <= Date.now()
  ) {
    redirect("/create-letter?error=date");
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  // The database function creates the letter and its content
  // atomically, and safely handles duplicate request IDs.
  const { data: letterId, error: createError } = await supabase.rpc(
    "create_letter_once",
    {
      p_request_id: requestId,
      p_title: title,
      p_unlock_at: unlockAt.toISOString(),
      p_content: content,
    }
  );

  if (createError || !letterId) {
    console.error("Letter creation failed:", createError);
    redirect("/create-letter?error=save");
  }

  redirect("/dashboard?message=created");
}
