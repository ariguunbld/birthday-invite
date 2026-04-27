import { NextRequest, NextResponse } from "next/server";
import { readGuests, writeGuests } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Нэвтрэх шаардлагатай" }, { status: 401 });
  }
  const guests = await readGuests();
  return NextResponse.json(guests);
}

export async function POST(req: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Нэвтрэх шаардлагатай" }, { status: 401 });
    }
    const body = await req.json();
    const { name } = body;
    
    if (!name?.trim()) {
      return NextResponse.json({ error: "Нэр оруулна уу" }, { status: 400 });
    }

    console.log("Attempting to read guests...");
    const guests = await readGuests();
    
    const newGuest = { id: uuidv4(), name: name.trim(), createdAt: new Date().toISOString() };
    guests.push(newGuest);
    
    console.log("Attempting to write guest:", newGuest.name);
    await writeGuests(guests);

    return NextResponse.json(newGuest, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/guests error:", error);
    return NextResponse.json({ 
      error: "Дотоод алдаа гарлаа", 
      details: error.message 
    }, { status: 500 });
  }
}
