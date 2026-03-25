import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const fallbackHits = new Map<string, { count: number; resetAt: number }>();

const upstashRedis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

const upstashLimiter = upstashRedis
  ? new Ratelimit({
      redis: upstashRedis,
      limiter: Ratelimit.slidingWindow(5, "1 m"),
      prefix: "bookings",
    })
  : null;

export async function enforceBookingRateLimit(identifier: string) {
  if (upstashLimiter) {
    const result = await upstashLimiter.limit(identifier);
    return {
      success: result.success,
      remaining: result.remaining,
      reset: result.reset,
    };
  }

  const now = Date.now();
  const current = fallbackHits.get(identifier);
  if (!current || now > current.resetAt) {
    fallbackHits.set(identifier, { count: 1, resetAt: now + 60_000 });
    return { success: true, remaining: 4, reset: now + 60_000 };
  }

  current.count += 1;
  fallbackHits.set(identifier, current);
  return {
    success: current.count <= 5,
    remaining: Math.max(0, 5 - current.count),
    reset: current.resetAt,
  };
}

