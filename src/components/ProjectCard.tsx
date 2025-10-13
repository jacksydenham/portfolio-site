import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Clock, User } from "lucide-react";
import clsx from "clsx";
import ReactPlayer from "react-player";

export interface DescriptionItem {
  title: string;
  children?: DescriptionItem[];
}

export interface ProjectData {
  title: string;
  subtitle?: string;
  subtitleUrl?: string;
  teamSize?: number;
  duration?: string;
  colors: [string, string, string];
  intro?: string;
  showcaseMedia?: { type: "video" | "image"; url: string; alt?: string }[];
  logoUrl?: string;
  descriptions: DescriptionItem[];
}

interface ProjectCardProps {
  data: ProjectData;
  isActive: boolean;
  inProjects: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

// ✅ Lightbox overlay (minimal)
function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
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
        alt="Expanded view"
        onClick={(e) => e.stopPropagation()}
      />
    </div>,
    document.body
  );
}

export default function ProjectCard({
  data,
  isActive,
  inProjects,
  onMouseEnter,
  onMouseLeave,
}: ProjectCardProps) {
  const [c1, c2, c3] = data.colors;
  const [expanded, setExpanded] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!inProjects) setExpanded(false);
  }, [inProjects]);

  return (
    <div
      className={clsx(
        "project-card",
        isActive && "active",
        expanded && "expanded"
      )}
      style={{ "--c1": c1, "--c2": c2, "--c3": c3 } as React.CSSProperties}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => setExpanded((prev) => !prev)}
    >
      <div className="card-header">
        {data.logoUrl ? (
          <img
            src={data.logoUrl}
            alt={`${data.title} logo`}
            className="card-logo"
          />
        ) : (
          <h3 className="card-title">{data.title}</h3>
        )}

        <div className="card-meta">
          <span className="meta-item">
            <User size={16} /> {data.teamSize}
          </span>
          <span className="meta-item">
            <Clock size={16} /> {data.duration}
          </span>

          {data.subtitle &&
            (data.subtitleUrl ? (
              <a
                href={data.subtitleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card-subtitle"
              >
                {data.subtitle}
              </a>
            ) : (
              <span className="card-subtitle">{data.subtitle}</span>
            ))}
        </div>
      </div>

      {data.intro && <p className="card-intro">{data.intro}</p>}

      {data.showcaseMedia && data.showcaseMedia.length > 0 && (
        <div className="showcase-scroll">
          {data.showcaseMedia.map((item, index) => (
            <div key={index} className="showcase-media">
              {item.type === "video" ? (
                <ReactPlayer
                  src={item.url}
                  controls={false}
                  width="100%"
                  height="100%"
                  config={{
                    youtube: { fs: 0, rel: 0 },
                  }}
                />
              ) : (
                <img
                  src={item.url}
                  alt={item.alt || `showcase-${index}`}
                  className="showcase-img hoverable"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxSrc(item.url);
                  }}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="card-desc-wrapper">
        <ul className="card-desc">
          {data.descriptions.map((desc) => (
            <li key={desc.title}>
              <strong>{desc.title}</strong>
              {desc.children && (
                <ul>
                  {desc.children.map((child) => (
                    <li key={child.title}>{child.title}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        {!expanded && <div className="fade-overlay" />}
      </div>

      {!expanded && (
        <span className="expand-hint" aria-hidden="true">
          click to expand
        </span>
      )}

      {lightboxSrc && (
        <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
