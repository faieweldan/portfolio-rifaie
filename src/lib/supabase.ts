import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function getProjectImageUrl(slug: string) {
  const { data } = supabase.storage
    .from("portfolio")
    .getPublicUrl(`projects/${slug}`);
  return data.publicUrl;
}

export function getResumeUrl() {
  const { data } = supabase.storage
    .from("portfolio")
    .getPublicUrl("resume/cv.pdf");
  return data.publicUrl;
}
