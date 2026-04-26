import { notFound } from "next/navigation";
import { findGuest } from "@/lib/db";
import Confetti from "@/components/Confetti";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function InvitePage({ params }: Props) {
  const { id } = await params;
  const guest = findGuest(id);

  if (!guest) notFound();

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const inviteUrl = `${base}/invite/${id}`;
  const qrSrc = `/api/qr/${id}`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-pink-100 via-yellow-50 to-purple-100">
      <Confetti />

      {/* Floating balloons — smaller on mobile */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {["🎈", "🎀", "⭐", "🎊", "💫"].map((e, i) => (
          <span
            key={i}
            className={`absolute text-2xl sm:text-4xl select-none ${i % 2 === 0 ? "animate-float" : "animate-float-delay"}`}
            style={{ left: `${5 + i * 20}%`, top: `${5 + (i % 3) * 15}%`, animationDelay: `${i * 0.5}s` }}
          >
            {e}
          </span>
        ))}
      </div>

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 py-10 text-center">
        {/* Guest greeting */}
        <div className="animate-bounce-in mb-6 w-full max-w-xs sm:max-w-md">
          <div className="inline-block w-full rounded-3xl bg-linear-to-r from-pink-400 via-purple-400 to-yellow-400 p-0.75 shadow-2xl">
            <div className="rounded-3xl bg-white px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                Хүндэт
              </p>
              <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-pink-500 via-purple-500 to-yellow-500 leading-tight">
                {guest.name}
              </h1>
            </div>
          </div>
        </div>

        {/* 1 year badge */}
        <div className="mb-5">
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute inset-0 animate-spin-slow rounded-full bg-linear-to-r from-pink-400 via-yellow-400 to-purple-400 blur-sm opacity-60" />
            <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-white shadow-xl">
              <span className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-linear-to-b from-pink-500 to-purple-600 leading-none">
                1
              </span>
            </div>
          </div>
        </div>

        <h2 className="mb-1 text-2xl sm:text-4xl font-black text-gray-800">
          НЭГ НАС БОЛЛОО! 🎂
        </h2>
        <p className="mb-7 text-gray-500 text-base">
          Таны ирэлтийг хүсэн хүлээж байна 🥳
        </p>

        {/* Event details — row layout on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xs sm:max-w-xl mb-7">
          {[
            { icon: "📅", label: "Огноо", val: "[Огноо]" },
            { icon: "🕐", label: "Цаг", val: "[Цаг]" },
            { icon: "📍", label: "Байршил", val: "[Байршил]" },
          ].map(({ icon, label, val }) => (
            <div
              key={label}
              className="flex items-center gap-4 sm:flex-col sm:items-center rounded-2xl bg-white/80 backdrop-blur px-5 py-4 shadow-md border border-purple-100"
            >
              <div className="text-3xl sm:mb-1">{icon}</div>
              <div className="text-left sm:text-center">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">{label}</p>
                <p className="font-semibold text-gray-800 text-sm">{val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* QR code */}
        <div className="rounded-3xl bg-white shadow-2xl p-5 w-full max-w-65 sm:max-w-xs">
          <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wide">
            Таны урилгын QR код
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrSrc}
            alt={`QR урилга — ${guest.name}`}
            className="w-full rounded-2xl"
          />
          <p className="mt-3 text-[10px] text-gray-400 break-all">{inviteUrl}</p>
        </div>
      </main>
    </div>
  );
}
