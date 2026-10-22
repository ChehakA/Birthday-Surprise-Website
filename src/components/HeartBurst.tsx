import { useMemo, type CSSProperties } from "react";

/** A short, one-time flurry of hearts floating upward from the parent's centre. */
export function HeartBurst({ count = 12 }: { count?: number }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 220,
        rise: 140 + Math.random() * 160,
        size: 10 + Math.random() * 14,
        delay: Math.random() * 0.6,
        duration: 1.6 + Math.random() * 1.2,
      })),
    [count],
  );

  return (
    <span className="burst" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="burst__heart"
          style={
            {
              "--x": `${h.x}px`,
              "--rise": `-${h.rise}px`,
              fontSize: `${h.size}px`,
              animationDelay: `${h.delay}s`,
              animationDuration: `${h.duration}s`,
            } as CSSProperties
          }
        >
          ♥
        </span>
      ))}
    </span>
  );
}
