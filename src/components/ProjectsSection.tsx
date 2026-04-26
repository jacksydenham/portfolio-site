import ProjectCard from "./ProjectCard";
import { projects } from "../data/projectData";

interface ProjectsSectionProps {
  activeProject: string;
  setActiveProject: (project: string) => void;
}

export default function ProjectsSection({
  activeProject,
  setActiveProject,
}: ProjectsSectionProps) {
  return (
    <section className="projects">
      {projects.map((proj) => (
        <ProjectCard
          key={proj.title}
          data={proj}
          isActive={activeProject === proj.title}
          inProjects={Boolean((window as any).inProjects)}
          onMouseEnter={() => setActiveProject(proj.title)}
          onMouseLeave={() => setActiveProject(activeProject)}
        />
      ))}

      <a
        href="https://github.com/jacksydenham?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
        className="projects-footer-link"
      >
        View all projects on GitHub →
      </a>
    </section>
  );
}
