// src/lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!, // p.ej. https://xxxxx.supabase.co
  import.meta.env.VITE_SUPABASE_ANON_KEY! // tu anon key pública
);
