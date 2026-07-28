import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

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
      return NextResponse.json(
        { error: `Storage rejected the upload: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, path });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown upload error." },
      { status: 500 }
    );
  }
}
