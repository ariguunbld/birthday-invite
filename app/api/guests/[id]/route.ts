import { NextRequest, NextResponse } from "next/server";
import { readGuests, writeGuests } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Нэвтрэх шаардлагатай" }, { status: 401 });
  }
  const { id } = await params;
  const guests = await readGuests();
  const filtered = guests.filter((g) => g.id !== id);
  await writeGuests(filtered);
  return NextResponse.json({ ok: true });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { status } = await req.json();

  if (!["attending", "declined"].includes(status)) {
    return NextResponse.json({ error: "Буруу статус" }, { status: 400 });
  }

  const guests = await readGuests();
  const index = guests.findIndex((g) => g.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Зочин олдсонгүй" }, { status: 404 });
  }

  guests[index] = {
    ...guests[index],
    status,
    updatedAt: new Date().toISOString(),
  };

  await writeGuests(guests);
  return NextResponse.json({ ok: true });
}
