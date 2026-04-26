import fs from "fs";
import path from "path";

export interface Guest {
  id: string;
  name: string;
  createdAt: string;
}

const DB_PATH = path.join(process.cwd(), "data", "guests.json");

export function readGuests(): Guest[] {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw) as Guest[];
  } catch {
    return [];
  }
}

export function writeGuests(guests: Guest[]): void {
  fs.writeFileSync(DB_PATH, JSON.stringify(guests, null, 2), "utf-8");
}

export function findGuest(id: string): Guest | undefined {
  return readGuests().find((g) => g.id === id);
}
