import { NextResponse } from "next/server";
import dns from "node:dns/promises";

const DEFAULT_HOST = "google.com";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const host = url.searchParams.get("host")?.trim() || DEFAULT_HOST;

  if (!host) {
    return NextResponse.json(
      { ok: false, error: "host query parameter is empty" },
      { status: 400 },
    );
  }

  try {
    const started = Date.now();
    const { address, family } = await dns.lookup(host);
    const ms = Date.now() - started;

    return NextResponse.json({
      ok: true,
      host,
      address,
      family,
      ms,
    });
  } catch (error) {
    console.error("[/api/dns-check] DNS lookup failed", error);
    const message =
      error instanceof Error ? error.message : "DNS lookup failed";
    return NextResponse.json(
      { ok: false, host, error: message },
      { status: 503 },
    );
  }
}
