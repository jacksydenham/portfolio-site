import { useState } from "react";

export interface ShowcaseItem {
  title: string;
  intro: string;
  section1Header: string;
  section1: string[];
  section2Header: string;
  section2: string[];
  challenges: { title: string; description: string }[];
  impact: string;
}

interface ShowcaseCarouselProps {
  items: ShowcaseItem[];
}

export default function ShowcaseCarousel({ items }: ShowcaseCarouselProps) {
  const [current, setCurrent] = useState(0);
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

              <div className="showcase-impact">
                <strong>Impact:</strong> {item.impact}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
