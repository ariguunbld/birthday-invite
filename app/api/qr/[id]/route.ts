import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import { findGuest } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const guest = findGuest(id);
  if (!guest) {
    return NextResponse.json({ error: "Зочин олдсонгүй" }, { status: 404 });
  }

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${base}/invite/${id}`;

  const buffer = await QRCode.toBuffer(url, {
    type: "png",
    width: 400,
    margin: 2,
    color: { dark: "#7C3AED", light: "#FFFFFF" },
  });

  const encodedName = encodeURIComponent(guest.name);
  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": `attachment; filename="invite.png"; filename*=UTF-8''${encodedName}.png`,
    },
  });
}
