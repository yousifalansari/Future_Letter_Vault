"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createLetter(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const unlockAtUtc = String(formData.get("unlockAtUtc") ?? "");

  if (
    !title ||
    title.length > 100 ||
    !content ||
    content.length > 10000
  ) {
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

  const { data: letter, error: letterError } = await supabase
    .from("letters")
    .insert({
      user_id: user.id,
      title,
      unlock_at: unlockAt.toISOString(),
    })
    .select("id")
    .single();

  if (letterError || !letter) {
    console.error("Letter metadata insert failed:", letterError);
    redirect("/create-letter?error=save");
  }

  const { error: contentError } = await supabase
    .from("letter_contents")
    .insert({
      letter_id: letter.id,
      content,
    });

  if (contentError) {
    console.error("Letter content insert failed:", contentError);

    await supabase
      .from("letters")
      .delete()
      .eq("id", letter.id);

    redirect("/create-letter?error=content");
  }

  redirect("/dashboard?message=created");
}
