import { createClient } from "@supabase/supabase-js";

export default function client() {
  const supabaseUrl = "https://snrcslaycatzqpdffmxp.supabase.co";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

  if (!supabaseKey) {
    throw new Error("Missing SUPABASE_KEY");
  }

  return createClient(supabaseUrl, supabaseKey);
}
