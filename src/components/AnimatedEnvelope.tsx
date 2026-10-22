import { Heart } from "lucide-react";

/** A CSS envelope. When `open` is true the flap lifts and the letter rises. */
export function AnimatedEnvelope({ open, note }: { open: boolean; note: string }) {
  return (
    <div className={open ? "envelope is-open" : "envelope"} aria-hidden="true">
      <div className="envelope__back" />
      <div className="envelope__letter">
        <span>{note}</span>
        <Heart size={18} fill="currentColor" strokeWidth={0} />
      </div>
      <div className="envelope__front" />
      <div className="envelope__flap" />
      <div className="envelope__seal">
        <Heart size={18} fill="currentColor" strokeWidth={0} />
      </div>
    </div>
  );
}
