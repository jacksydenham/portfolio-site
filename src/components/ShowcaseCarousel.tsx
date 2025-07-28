import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export interface ShowcaseItem {
  title: string;
  intro: string;
  section1Header: string;
  section1: string[];
  section2Header: string;
  section2: string[];
  challenges: { title: string; description: string }[];
  impact: string;
  images?: string[];
}

interface ShowcaseCarouselProps {
  items: ShowcaseItem[];
}

function Lightbox({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) {
  // close on esc
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return createPortal(
    <div className="lightbox-overlay" onClick={onClose}>
      <img
        className="lightbox-image"
        src={src}
        alt="Enlarged screenshot"
        onClick={(e) => e.stopPropagation()}
      />
    </div>,
    document.body
  );
}

export default function ShowcaseCarousel({ items }: ShowcaseCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const prev = () => setCurrent((c) => (c === 0 ? items.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === items.length - 1 ? 0 : c + 1));

  return (
    <div className="showcase-carousel">
      <div className="carousel-nav">
        <button onClick={prev} aria-label="Previous">
          ‹
        </button>
        <button onClick={next} aria-label="Next">
          ›
        </button>
      </div>

      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {items.map((item, i) => (
            <div key={i} className="carousel-item">
              <div className="showcase-layout">
                <h2 className="showcase-title">{item.title}</h2>

                <div className="showcase-card intro">
                  <p>{item.intro}</p>
                </div>

                <div className="showcase-card full">
                  <h4>{item.section1Header}</h4>
                  <ul>
                    {item.section1.map((line, j) => (
                      <li key={j}>{line}</li>
                    ))}
                  </ul>
                </div>

                <div className="showcase-card full">
                  <h4>{item.section2Header}</h4>
                  <ul>
                    {item.section2.map((line, j) => (
                      <li key={j}>{line}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lowerRow">
                {/* challenges + impact */}
                <div className="showcase-challenges">
                  <h3>Key Challenges Solved</h3>
                  <ul>
                    {item.challenges.map((c, j) => (
                      <li key={j}>
                        <strong>{c.title}:</strong> {c.description}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="showcase-images">
                  {Array.from({ length: 2 }).map((_, idx) => {
                    const hasRealImage = !!item.images?.[idx];
                    const src = hasRealImage
                      ? item.images![idx]
                      : "/images/placeholder.png";

                    return (
                      <img
                        key={idx}
                        src={src}
                        alt={`${item.title} screenshot ${idx + 1}`}
                        className={`showcase-image${hasRealImage ? " hoverable" : ""
                          }`}
                        {...(hasRealImage
                          ? {
                            onClick: () => setLightboxSrc(src),
                            style: { cursor: "pointer" },
                          }
                          : {
                            style: {
                              cursor: "default",
                              backdropFilter: "blur(4px)",
                            },
                          })}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="showcase-impact">
                <strong>Impact:</strong> {item.impact}
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxSrc && (
        <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
