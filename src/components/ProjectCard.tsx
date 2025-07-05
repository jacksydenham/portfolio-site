import React, { useState, useEffect } from "react";
import { Clock, User } from "lucide-react";
import clsx from "clsx";

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

export default function ProjectCard({
  data,
  isActive,
  inProjects,
  onMouseEnter,
  onMouseLeave,
}: ProjectCardProps) {
  const [c1, c2, c3] = data.colors;
  const [expanded, setExpanded] = useState(false);

  // Collapse when leaving the Projects section
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

      {/* ↓–––––––––– Click-hint bottom-right (only when collapsed) */}
      {!expanded && (
        <span className="expand-hint" aria-hidden="true">
          click to expand
        </span>
      )}
    </div>
  );
}
