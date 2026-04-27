"use client";

const PIECES = ["🎊", "🎉", "⭐", "✨", "🌟", "💖", "🎈", "🍭"];
const WIDTHS = [8, 12, 6, 10, 14, 7, 11, 9];
const DURATIONS = [3, 4, 5, 3.5, 4.5, 6, 3.8, 5.5];

export default function Confetti() {
  return (
    <>
      {PIECES.map((piece, i) => (
        <span
          key={i}
          className="confetti text-2xl select-none pointer-events-none"
          style={{
            left: `${(i * 13 + 4) % 98}%`,
            animationDuration: `${DURATIONS[i]}s`,
            animationDelay: `${i * 0.7}s`,
            fontSize: `${WIDTHS[i]}px`,
          }}
        >
          {piece}
        </span>
      ))}
    </>
  );
}
