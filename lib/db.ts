import { kv } from "@vercel/kv";

export interface Guest {
  id: string;
  name: string;
  createdAt: string;
}

const KV_KEY = "guests";

/**
 * Reads all guests from Vercel KV.
 * Returns an empty array if no data exists or on error.
 */
export async function readGuests(): Promise<Guest[]> {
  try {
    if (!process.env.KV_REST_API_URL) {
      console.error("CRITICAL: KV_REST_API_URL is missing!");
    }
    const guests = await kv.get<Guest[]>(KV_KEY);
    return guests || [];
  } catch (error) {
    console.error("Error reading guests from KV:", error);
    // If it's a connection error, we want to know
    throw error; 
  }
}

/**
 * Writes the entire guests array to Vercel KV.
 */
export async function writeGuests(guests: Guest[]): Promise<void> {
  try {
    await kv.set(KV_KEY, guests);
  } catch (error: any) {
    console.error("Error writing guests to KV:", error.message, error.stack);
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
