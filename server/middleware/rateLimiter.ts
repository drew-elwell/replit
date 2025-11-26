import { Request, Response, NextFunction } from 'express';

interface RateLimitOptions {
  windowMs: number;
  maxRequests: number;
  message?: string;
}

interface ClientData {
  count: number;
  resetTime: number;
}

class InMemoryStore {
  private clients = new Map<string, ClientData>();

  hit(key: string, windowMs: number): { totalHits: number; resetTime: number } {
    const now = Date.now();
    const resetTime = now + windowMs;
    
    const clientData = this.clients.get(key);
    
    if (!clientData || now > clientData.resetTime) {
      this.clients.set(key, { count: 1, resetTime });
      return { totalHits: 1, resetTime };
    }
    
    clientData.count++;
    return { totalHits: clientData.count, resetTime: clientData.resetTime };
  }

  resetKey(key: string): void {
    this.clients.delete(key);
  }
}

const store = new InMemoryStore();

export function createRateLimit(options: RateLimitOptions) {
  const { windowMs, maxRequests, message = 'Too many requests, please try again later.' } = options;

  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip || req.connection.remoteAddress || 'unknown';
    
    const { totalHits, resetTime } = store.hit(key, windowMs);
    
    // Set rate limit headers
    res.set({
      'X-RateLimit-Limit': maxRequests.toString(),
      'X-RateLimit-Remaining': Math.max(0, maxRequests - totalHits).toString(),
      'X-RateLimit-Reset': new Date(resetTime).toISOString(),
    });
    
    if (totalHits > maxRequests) {
      return res.status(429).json({
        success: false,
        error: message,
        retryAfter: Math.ceil((resetTime - Date.now()) / 1000)
      });
    }
    
    next();
  };
}

// Pre-configured rate limiters
export const strictRateLimit = createRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 10,
  message: 'Too many requests from this IP, please try again in 15 minutes.'
});

export const generalRateLimit = createRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100,
  message: 'Rate limit exceeded, please try again later.'
});