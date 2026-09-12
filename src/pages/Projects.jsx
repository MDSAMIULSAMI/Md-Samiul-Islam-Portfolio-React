import { useMemo, useState } from "react";
import SectionHead from "../components/ui/SectionHead.jsx";
import ProjectCard from "../components/ui/ProjectCard.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import { projects } from "../data/profile.js";

const FILTERS = ["All", "AI & ML", "Full Stack", "Research"];

function matches(project, filter) {
  if (filter === "All") return true;
  const haystack = `${project.kind} ${project.stack.join(" ")}`.toLowerCase();
  if (filter === "Research") return haystack.includes("research");
  if (filter === "AI & ML")
    return /ai|agent|rag|clip|nltk|diffusion|transformer|openai|langchain|vision|deep learning/.test(
      haystack
    );
  return /web|full stack|react|django|realtime|platform/.test(haystack);
}

function Projects() {
  const [filter, setFilter] = useState("All");
  const visible = useMemo(() => projects.filter((p) => matches(p, filter)), [filter]);

  return (
    <section className="bleed py-28 lg:py-32">
      <SectionHead
        eyebrow="Portfolio"
        title={
          <>
            My recent <span className="text-accent">works</span>
          </>
        }
        sub="Products, research prototypes and side projects, from agentic services in production to transformer architectures written for a paper."
      />

      <Reveal className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`rounded-full border px-4 py-2 text-sm transition-colors duration-200 ${
              filter === f
                ? "border-accent bg-accent text-accent-fg"
                : "border-line bg-surface text-muted hover:border-line-strong hover:text-heading"
            }`}
          >
            {f}
          </button>
        ))}
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {visible.map((project, i) => (
          <ProjectCard key={project.title} project={project} delay={Math.min(i, 6) * 0.06} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
