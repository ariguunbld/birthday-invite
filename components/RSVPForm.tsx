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
    <div className="w-full max-w-sm mx-auto p-6 rounded-3xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-xl">
      <h3 className="text-lg font-bold text-gray-800 text-center mb-6">
        Та ирж чадах уу?
      </h3>

      <div className="flex gap-4">
        <button
          onClick={() => updateStatus("attending")}
          disabled={loading}
          className={`flex-1 py-4 rounded-2xl font-bold transition-all active:scale-95 ${
            status === "attending"
              ? "bg-green-500 text-white shadow-lg shadow-green-200"
              : "bg-white text-green-600 border-2 border-green-100 hover:border-green-200"
          } disabled:opacity-50`}
        >
          {loading && status === "attending" ? "..." : "Тийм, очно 🎂"}
        </button>

        <button
          onClick={() => updateStatus("declined")}
          disabled={loading}
          className={`flex-1 py-4 rounded-2xl font-bold transition-all active:scale-95 ${
            status === "declined"
              ? "bg-gray-500 text-white shadow-lg shadow-gray-200"
              : "bg-white text-gray-500 border-2 border-gray-100 hover:border-gray-200"
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
