import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let _perMinute: Ratelimit | null = null;
let _perDay: Ratelimit | null = null;

export function getPerMinuteLimit(): Ratelimit {
  if (!_perMinute) {
    _perMinute = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(10, "1 m"),
      analytics: true,
      prefix: "portfolio:chat:min",
    });
  }
  return _perMinute;
}

export function getPerDayLimit(): Ratelimit {
  if (!_perDay) {
    _perDay = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(50, "1 d"),
      analytics: true,
      prefix: "portfolio:chat:day",
    });
  }
  return _perDay;
}

export function getIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "127.0.0.1";
}
