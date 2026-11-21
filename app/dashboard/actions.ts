"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function deleteLetter(formData: FormData) {
  const letterId = String(formData.get("letterId") ?? "");

  if (!letterId) {
    redirect("/dashboard?deleteError=1");
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: deletedLetter, error } = await supabase
    .from("letters")
    .delete()
    .eq("id", letterId)
    .eq("user_id", user.id)
    .select("id")
    .maybeSingle();

  if (error || !deletedLetter) {
    redirect("/dashboard?deleteError=1");
  }

  revalidatePath("/dashboard");

  redirect("/dashboard?deleted=1");
}
