import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function createSupabaseClient() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabasePublishableKey =
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    const missing = [
      ...(!supabaseUrl ? ["SUPABASE_URL"] : []),
      ...(!supabasePublishableKey ? ["SUPABASE_PUBLISHABLE_KEY"] : []),
    ];

    throw new Error(
      `Missing Supabase environment variable(s): ${missing.join(", ")}. Add them to your .env file before starting the app.`,
    );
  }

  return createClient(supabaseUrl, supabasePublishableKey, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

let supabaseClient: SupabaseClient | undefined;

export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop, receiver) {
    if (!supabaseClient) supabaseClient = createSupabaseClient();
    return Reflect.get(supabaseClient, prop, receiver);
  },
});
