import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

/** Unwraps the chain of causes, since "fetch failed" alone says nothing. */
function describe(err: unknown): string {
  const seen = new Set<unknown>();
  const parts: string[] = [];
  let cur: unknown = err;

  while (cur && typeof cur === "object" && !seen.has(cur)) {
    seen.add(cur);
    const e = cur as { message?: string; code?: string; cause?: unknown };
    if (e.message) parts.push(e.code ? `${e.message} (${e.code})` : e.message);
    cur = e.cause;
  }

  return parts.join(" — ") || String(err);
}

/**
 * "fetch failed" means the request never reached Supabase. Retrying the bare
 * URL surfaces the real reason (bad hostname, paused project, refused
 * connection) instead of a generic failure.
 */
async function diagnoseUnreachable(url: string): Promise<string> {
  let host = url;
  try {
    host = new URL(url).host;
  } catch {
    return `NEXT_PUBLIC_SUPABASE_URL is not a valid address: "${url}". It should look like https://yourproject.supabase.co`;
  }

  try {
    await fetch(`${url}/storage/v1/version`, {
      method: "GET",
      signal: AbortSignal.timeout(8000),
    });
    return `Reached ${host}, but the upload itself failed. The project may be paused.`;
  } catch (err) {
    return `Could not reach ${host} — ${describe(err)}. Usually this means the Supabase project is paused, or the URL is wrong.`;
  }
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const password = formData.get("password") as string;

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD is not set on the server." },
      { status: 500 }
    );
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  // Password-only check (admin login)
  const verifyOnly = formData.get("verify_only");
  if (verifyOnly) {
    return NextResponse.json({ success: true });
  }

  const file = formData.get("file") as File;
  const path = formData.get("path") as string;

  if (!file || !path) {
    return NextResponse.json({ error: "Missing file or path." }, { status: 400 });
  }

  // Checked explicitly: createClient throws on a missing key, which would
  // otherwise surface as an unexplained 500.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_KEY;
  const missing = [
    !url && "NEXT_PUBLIC_SUPABASE_URL",
    !serviceKey && "SUPABASE_SERVICE_KEY",
  ].filter(Boolean);

  if (missing.length) {
    return NextResponse.json(
      { error: `Not set on the server: ${missing.join(", ")}.` },
      { status: 500 }
    );
  }

  try {
    const supabase = createClient(url!, serviceKey!);
    const buffer = new Uint8Array(await file.arrayBuffer());

    const { error } = await supabase.storage
      .from("portfolio")
      .upload(path, buffer, { contentType: file.type, upsert: true });

    if (error) {
      const message = /fetch failed|network|ENOTFOUND|ECONNREFUSED/i.test(
        error.message
      )
        ? await diagnoseUnreachable(url!)
        : `Storage rejected the upload: ${error.message}`;
      return NextResponse.json({ error: message }, { status: 500 });
    }

    return NextResponse.json({ success: true, path });
  } catch (err) {
    const raw = describe(err);
    const message = /fetch failed|network|ENOTFOUND|ECONNREFUSED/i.test(raw)
      ? await diagnoseUnreachable(url!)
      : raw;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
