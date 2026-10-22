import { useState, type CSSProperties } from "react";
import { Heart } from "lucide-react";
import type { Photo } from "../data/birthdayContent";

type Props = {
  photo: Photo;
  /** Small rotation in degrees so photos feel hand-placed */
  tilt?: number;
  /** Adds a soft glow behind the frame */
  glow?: boolean;
  /** Smaller frame, used inside gift cards */
  small?: boolean;
};

/**
 * Reusable Polaroid frame. If the image file is missing or fails to load,
 * a gentle placeholder is shown instead of a broken image icon.
 */
export function PolaroidCard({ photo, tilt = 0, glow = false, small = false }: Props) {
  const [failed, setFailed] = useState(false);
  const classes = ["polaroid", glow && "polaroid--glow", small && "polaroid--small"]
    .filter(Boolean)
    .join(" ");

  return (
    <figure className={classes} style={{ "--tilt": `${tilt}deg` } as CSSProperties}>
      <div className="polaroid__photo">
        {failed || !photo.src ? (
          <div className="polaroid__fallback" role="img" aria-label={photo.alt}>
            <Heart size={28} strokeWidth={1.25} />
            <span>Photo coming soon</span>
          </div>
        ) : (
          <img
            src={photo.src}
            alt={photo.alt}
            draggable={false}
            onError={() => setFailed(true)}
          />
        )}
      </div>
      {photo.caption && <figcaption>{photo.caption}</figcaption>}
    </figure>
  );
}
