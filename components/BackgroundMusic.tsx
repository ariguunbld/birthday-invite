"use client";

import { useEffect, useRef, useState } from "react";

interface BackgroundMusicProps {
  onStart?: () => void;
  type?: "landing" | "invite";
}

export default function BackgroundMusic({
  onStart,
  type = "invite",
}: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  const startInvitation = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowOverlay(false);
          onStart?.();
        })
        .catch((err) => {
          console.error("Play failed:", err);
          setShowOverlay(false);
          onStart?.();
        });
    } else {
      setShowOverlay(false);
      onStart?.();
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (showOverlay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showOverlay]);

  return (
    <>
      {showOverlay && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white overflow-hidden">
          <div className="mesh-bg" style={{ zIndex: 0 }}>
            <div className="mesh-blob blob-1" />
            <div className="mesh-blob blob-2" />
            <div className="mesh-blob blob-3" />
          </div>
          <div className="grain-overlay" />

          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full animate-[fadeIn_2s_ease-in]">
            <div className="text-center space-y-14">
              <div className="space-y-5 animate-[slideUp_1.5s_ease-out]">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#3B82F6]">
                  {type === "landing" ? "" : "Урилга"}
                </p>

                <h1 className="hero-line text-5xl sm:text-6xl tracking-tight">
                  Ө. Хангай
                </h1>

                <h2 className="hero-line hero-line--coral text-2xl italic">
                  Нэг насны төрсөн өдөр
                </h2>
              </div>

              <div className="detail-divider" />

              <button onClick={startInvitation} className="group">
                <div
                  className="rounded-2xl p-px shadow-[0_10px_30px_rgba(59,130,246,0.2)] transition-shadow group-hover:shadow-[0_10px_30px_rgba(59,130,246,0.3)]"
                  style={{
                    background:
                      "linear-gradient(135deg, #3B82F6 0%, #F472B6 100%)",
                  }}
                >
                  <div className="bg-white rounded-[calc(1rem-1px)] px-8 py-3.5 transition-colors group-hover:bg-[rgba(59,130,246,0.02)] active:scale-95">
                    <span className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-[#3B82F6]">
                      {type === "landing" ? "Орох" : "Урилга харах"}
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <audio ref={audioRef} src="/duu.mp3" loop preload="auto">
        <track kind="captions" />
      </audio>

      {!showOverlay && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2">
          {isPlaying && (
            <div className="flex flex-col items-center gap-1 pointer-events-none animate-[fadeIn_1s_ease-in]">
              <span className="text-[#3B82F6] text-[8px] tracking-[0.3em] opacity-50">
                ♪
              </span>
              <div className="w-px h-6 bg-linear-to-b from-[rgba(59,130,246,0.3)] to-transparent animate-[hint-bob_3s_ease-in-out_infinite]" />
            </div>
          )}
          <button
            onClick={togglePlay}
            className={`w-11 h-11 flex items-center justify-center rounded-full bg-white border border-[rgba(59,130,246,0.1)] shadow-[0_4px_15px_rgba(0,0,0,0.04)] text-[#3B82F6] transition-all duration-300 hover:scale-110 hover:border-[rgba(59,130,246,0.25)] hover:shadow-[0_4px_15px_rgba(59,130,246,0.12)] active:scale-95 ${
              isPlaying
                ? "animate-[pulse_4s_ease-in-out_infinite]"
                : "animate-[hint-bob_3s_ease-in-out_infinite]"
            }`}
          >
            {isPlaying ? (
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
              >
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
                className="ml-0.5"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      )}
    </>
  );
}
