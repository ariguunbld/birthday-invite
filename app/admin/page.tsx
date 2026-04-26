"use client";

import { useState, useEffect, useCallback } from "react";

interface Guest {
  id: string;
  name: string;
  createdAt: string;
}

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);

  const fetchGuests = useCallback(async () => {
    const res = await fetch("/api/guests");
    if (res.ok) setGuests(await res.json());
  }, []);

  useEffect(() => {
    fetch("/api/guests")
      .then((r) => {
        if (r.ok) { setAuthed(true); return r.json(); }
        setAuthed(false); return [];
      })
      .then((data) => { if (Array.isArray(data)) setGuests(data); });
  }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) { setAuthed(true); fetchGuests(); }
    else setLoginError("Нууц үг буруу байна");
  }

  async function logout() {
    await fetch("/api/auth", { method: "DELETE" });
    setAuthed(false);
    setGuests([]);
  }

  async function addGuest(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    setAdding(true);
    const res = await fetch("/api/guests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });
    if (res.ok) {
      const guest = await res.json();
      setGuests((prev) => [guest, ...prev]);
      setNewName("");
    }
    setAdding(false);
  }

  async function deleteGuest(id: string) {
    await fetch(`/api/guests/${id}`, { method: "DELETE" });
    setGuests((prev) => prev.filter((g) => g.id !== id));
  }

  async function downloadQR(guest: Guest) {
    setDownloading(guest.id);
    const res = await fetch(`/api/qr/${guest.id}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invite-${guest.name}.png`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloading(null);
  }

  if (authed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
        <div className="text-purple-400 text-xl animate-pulse">Уншиж байна...</div>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-yellow-50 to-purple-100 px-4">
        <div className="w-full max-w-sm">
          <div className="rounded-3xl bg-white shadow-2xl p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-3">🔐</div>
              <h1 className="text-2xl font-black text-gray-800">Admin Panel</h1>
              <p className="text-gray-400 text-sm mt-1">Нууц үгээ оруулна уу</p>
            </div>
            <form onSubmit={login} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Нууц үг"
                className="w-full rounded-2xl border-2 border-purple-200 px-4 py-3 text-gray-800 focus:border-purple-400 focus:outline-none"
                autoFocus
              />
              {loginError && (
                <p className="text-red-500 text-sm text-center">{loginError}</p>
              )}
              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 py-3 font-bold text-white shadow-lg hover:opacity-90 transition"
              >
                Нэвтрэх
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-purple-50 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-gray-800">🎂 Admin Panel</h1>
            <p className="text-gray-400 text-sm">Зочдын урилга удирдах</p>
          </div>
          <button
            onClick={logout}
            className="rounded-2xl border-2 border-gray-200 px-4 py-2 text-sm text-gray-500 hover:border-red-300 hover:text-red-500 transition"
          >
            Гарах
          </button>
        </div>

        {/* Add guest */}
        <div className="mb-6 rounded-3xl bg-white shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Шинэ зочин нэмэх</h2>
          <form onSubmit={addGuest} className="flex gap-3">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder='Жишээ: "Бат гэр бүл" эсвэл "Болд"'
              className="flex-1 rounded-2xl border-2 border-purple-200 px-4 py-3 text-gray-800 focus:border-purple-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={adding || !newName.trim()}
              className="rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 font-bold text-white shadow hover:opacity-90 transition disabled:opacity-50"
            >
              {adding ? "..." : "Нэмэх"}
            </button>
          </form>
        </div>

        {/* Guest list */}
        <div className="rounded-3xl bg-white shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-700">
              Зочдын жагсаалт{" "}
              <span className="ml-1 rounded-full bg-purple-100 px-2 py-0.5 text-xs font-bold text-purple-600">
                {guests.length}
              </span>
            </h2>
          </div>

          {guests.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-400">
              <div className="text-5xl mb-3">👥</div>
              <p>Одоохондоо зочид байхгүй байна</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-50">
              {guests.map((guest) => (
                <li key={guest.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 truncate">{guest.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(guest.createdAt).toLocaleString("mn-MN")}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => downloadQR(guest)}
                      disabled={downloading === guest.id}
                      className="rounded-xl bg-purple-100 px-3 py-2 text-sm font-semibold text-purple-700 hover:bg-purple-200 transition disabled:opacity-50"
                    >
                      {downloading === guest.id ? "⏳" : "📥 QR"}
                    </button>
                    <a
                      href={`/invite/${guest.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-pink-100 px-3 py-2 text-sm font-semibold text-pink-700 hover:bg-pink-200 transition"
                    >
                      👁️
                    </a>
                    <button
                      onClick={() => {
                        if (confirm(`"${guest.name}"-г устгах уу?`)) deleteGuest(guest.id);
                      }}
                      className="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-400 hover:bg-red-100 transition"
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
