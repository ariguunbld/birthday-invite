"use client";

import { useState } from "react";

interface Props {
  guestId: string;
  initialStatus?: "attending" | "declined";
}

export default function RSVPForm({ guestId, initialStatus }: Props) {
  const [status, setStatus] = useState<"attending" | "declined" | undefined>(
    initialStatus
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function updateStatus(newStatus: "attending" | "declined") {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`/api/guests/${guestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setStatus(newStatus);
        setMessage(
          newStatus === "attending"
            ? "Баярлалаа! Таныг хүлээж байя. 🎉"
            : "Мэдээлэл хүлээн авлаа. Дараа уулзацгаая! ✨"
        );
      } else {
        setMessage("Алдаа гарлаа. Дахин оролдоно уу.");
      }
    } catch (error) {
      setMessage("Сүлжээний алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto p-8 rounded-[2rem] bg-white/40 backdrop-blur-xl border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
      <h3 className="text-xl font-(family-name:--font-playfair) italic text-slate-800 text-center mb-8">
        Та ирж чадах уу?
      </h3>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => updateStatus("attending")}
          disabled={loading}
          className={`w-full py-4 rounded-2xl font-bold tracking-widest uppercase text-[10px] transition-all active:scale-95 ${
            status === "attending"
              ? "bg-slate-800 text-white shadow-xl shadow-slate-200"
              : "bg-white/80 text-slate-600 border border-slate-100 hover:bg-white"
          } disabled:opacity-50`}
        >
          {loading && status === "attending" ? "..." : "Тийм, очно 🎂"}
        </button>

        <button
          onClick={() => updateStatus("declined")}
          disabled={loading}
          className={`w-full py-4 rounded-2xl font-bold tracking-widest uppercase text-[10px] transition-all active:scale-95 ${
            status === "declined"
              ? "bg-slate-400 text-white shadow-xl shadow-slate-100"
              : "bg-white/80 text-slate-400 border border-slate-50 hover:bg-white"
          } disabled:opacity-50`}
        >
          {loading && status === "declined" ? "..." : "Амжихгүй 😔"}
        </button>
      </div>

      {message && (
        <p className={`mt-4 text-center text-sm font-medium animate-fade-in ${
          status === "attending" ? "text-green-600" : "text-gray-600"
        }`}>
          {message}
        </p>
      )}
    </div>
  );
}
