import crypto from "crypto";

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;
const rawSecret = process.env.ADMIN_JWT_SECRET;

if (!adminEmail || !adminPassword) {
  throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in env");
}

if (!rawSecret) {
  throw new Error("ADMIN_JWT_SECRET must be set in env");
}

const secret: string = rawSecret;

type AdminTokenPayload = {
  email: string;
  issuedAt: number;
};

function sign(payload: AdminTokenPayload): string {
  const json = JSON.stringify(payload);
  const base = Buffer.from(json).toString("base64url");
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(base);
  const sig = hmac.digest("base64url");
  return `${base}.${sig}`;
}

function verify(token: string): AdminTokenPayload | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [base, sig] = parts;
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(base);
  const expected = hmac.digest("base64url");
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
    return null;
  }
  const json = Buffer.from(base, "base64url").toString("utf8");
  const payload = JSON.parse(json) as AdminTokenPayload;
  // 7 days validity
  const maxAgeMs = 7 * 24 * 60 * 60 * 1000;
  if (Date.now() - payload.issuedAt > maxAgeMs) return null;
  return payload;
}

export function validateAdminCredentials(email: string, password: string): boolean {
  return email === adminEmail && password === adminPassword;
}

export function createAdminToken(email: string): string {
  return sign({ email, issuedAt: Date.now() });
}

export function verifyAdminToken(token: string | undefined | null): AdminTokenPayload | null {
  if (!token) return null;
  try {
    return verify(token);
  } catch {
    return null;
  }
}

