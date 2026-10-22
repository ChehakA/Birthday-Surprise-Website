import { useMemo, type CSSProperties } from "react";

/** Sparse, slow background atmosphere: a few glowing dots and tiny hearts. */
export function FloatingParticles({ count = 14 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        heart: i % 4 === 0,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 3 + Math.random() * 4,
        duration: 16 + Math.random() * 14,
        delay: -Math.random() * 20,
      })),
    [count],
  );

  return (
    <div className="particles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className={p.heart ? "particle particle--heart" : "particle"}
          style={
            {
              left: `${p.left}%`,
              top: `${p.top}%`,
              "--size": `${p.heart ? p.size * 2.4 : p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            } as CSSProperties
          }
        >
          {p.heart ? "♥" : null}
        </span>
      ))}
    </div>
  );
}
