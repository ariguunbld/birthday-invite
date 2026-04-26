import { NextRequest, NextResponse } from "next/server";
import { readGuests, writeGuests } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Нэвтрэх шаардлагатай" }, { status: 401 });
  }
  return NextResponse.json(readGuests());
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Нэвтрэх шаардлагатай" }, { status: 401 });
  }
  const { name } = await req.json();
  if (!name?.trim()) {
    return NextResponse.json({ error: "Нэр оруулна уу" }, { status: 400 });
  }

  const guests = readGuests();
  const newGuest = { id: uuidv4(), name: name.trim(), createdAt: new Date().toISOString() };
  guests.push(newGuest);
  writeGuests(guests);

  return NextResponse.json(newGuest, { status: 201 });
}
