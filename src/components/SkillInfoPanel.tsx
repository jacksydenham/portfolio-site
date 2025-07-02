import React from "react";
import type { CuratedGroup } from "../skillGroups";

interface Props {
  curated: CuratedGroup | null;
  hoverGroup: string[] | null;
  blurbMap: Record<string, string>;
}

const SkillInfoPanel: React.FC<Props> = ({ curated, hoverGroup, blurbMap }) => (
  <div className="skills-info-box">
    {curated ? (
      <>
        <h3 className="skills-info-heading">{curated.title}</h3>
        {curated.blurb.split("\n").map((line, i) => (
          <p key={i} className="skills-info-text">
            {line}
          </p>
        ))}
      </>
    ) : hoverGroup ? (
      <>
        <h3 className="skills-info-heading">HIGHLIGHTED SKILLS</h3>
        <ul className="skills-info-text">
          {hoverGroup.map((n) => (
            <li key={n}>{blurbMap[n] ?? n}</li>
          ))}
        </ul>
      </>
    ) : (
      <>
        <h3 className="skills-info-heading">SKILL INFO</h3>
        <p className="skills-info-text">Hover a tablet to see details.</p>
      </>
    )}
  </div>
);

export default SkillInfoPanel;
