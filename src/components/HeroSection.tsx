import type { CuratedGroup } from "../data/skillGroups";
import { useScroll } from "@react-three/drei";

interface HeroSectionProps {
  curated: CuratedGroup[];
}

function ContactButton() {
  const scrollData = useScroll();
  return (
    <button
      className="hero-btn hero-email"
      aria-label="Contact me"
      onClick={() =>
        scrollData.el.scrollTo({
          top: scrollData.el.scrollHeight,
          behavior: "auto",
        })
      }
    />
  );
}

export default function HeroSection({ curated }: HeroSectionProps) {
  return (
    <section className="hero">
      <div className="hero-heading">
        <h1 className="hero-name">Jack Sydenham</h1>
        <div className="hero-subline">
          <h2 className="hero-subtitle">
            Frontend Engineering & Product Development
          </h2>
          <div className="hero-links">
            <a
              href="/Jack Sydenham 2025 SE Graduate Resume.pdf"
              download
              className="hero-btn hero-cv"
            />
            <a
              href="https://github.com/JackSydenham"
              target="_blank"
              rel="noopener"
              className="hero-btn hero-github"
            />
            <a
              href="https://www.linkedin.com/in/jack-sydenham-bb5a25284/"
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
              className="hero-btn hero-linkedin"
            />
            <ContactButton />
          </div>
        </div>
      </div>

      <img
        src="/images/pfp.png"
        alt="A profile picture of Jack Sydenham"
        className="hero-pfp"
      />

      <div className="skills-info-box">
        {curated.length > 0 ? (
          <>
            <h3 className="skills-info-heading">{curated[0].title}</h3>
            <p className="skills-info-text">{curated[0].blurb}</p>

            {curated.slice(1).map((g) => (
              <div key={g.title} className="skills-supplementary">
                <h4 className="skills-supp-heading">{g.title}</h4>
                <p className="skills-supp-text">{g.blurb}</p>
              </div>
            ))}
          </>
        ) : (
          <>
            <div>
              <h2 className="skills-info-heading">About Me</h2>

              <p className="skills-info-text">
                Final year Software Engineering student at RMIT specialising in
                Full Stack Development. During my first professional role at
                Astral Consulting, I integrated complex environments, connecting
                custom React web apps with SharePoint workflows via Power
                Automate. I thrive on weaving cloud-driven features into modern
                web applications and excel in agile teams, owning work
                end-to-end to ship production-ready software.
              </p>
            </div>
            <div className="hint-card">Hover over icons to explore my skills!</div>
          </>
        )}
      </div>
    </section>
  );
}
