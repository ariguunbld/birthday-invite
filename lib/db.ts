import Redis from "ioredis";

export interface Guest {
  id: string;
  name: string;
  createdAt: string;
}

const KV_KEY = "guests";

// Initialize Redis client with the REDIS_URL
const redis = new Redis(process.env.REDIS_URL || "");

redis.on("error", (err) => {
  console.error("Redis Connection Error:", err);
});

/**
 * Reads all guests from Redis.
 */
export async function readGuests(): Promise<Guest[]> {
  try {
    if (!process.env.REDIS_URL) {
      console.error("CRITICAL: REDIS_URL is missing!");
      return [];
    }
    const data = await redis.get(KV_KEY);
    if (!data) return [];
    return JSON.parse(data) as Guest[];
  } catch (error) {
    console.error("Error reading guests from Redis:", error);
    return [];
  }
}

/**
 * Writes the entire guests array to Redis.
 */
export async function writeGuests(guests: Guest[]): Promise<void> {
  try {
    await redis.set(KV_KEY, JSON.stringify(guests));
  } catch (error: any) {
    console.error("Error writing guests to Redis:", error.message);
    throw new Error(`Өгөгдлийг хадгалахад алдаа гарлаа: ${error.message}`);
  }
}

/**
 * Finds a specific guest by ID.
 */
export async function findGuest(id: string): Promise<Guest | undefined> {
  const guests = await readGuests();
  return guests.find((g) => g.id === id);
}
