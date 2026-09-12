import { Lock, ExternalLink } from "lucide-react";
import { GithubIcon } from "./BrandIcons.jsx";
import Reveal from "./Reveal.jsx";
import { buttonClass } from "./Button.jsx";

function ProjectCard({ project, delay = 0 }) {
  const { title, year, kind, description, stack = [], image, links = {} } = project;

  return (
    <Reveal delay={delay} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-[14px] border border-line bg-surface transition-colors duration-200 hover:border-line-strong">
        <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-ink-soft">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="size-full object-cover brightness-90 transition duration-500 group-hover:scale-[1.04] group-hover:brightness-100"
          />
          {kind && (
            <span className="absolute left-3 top-3 max-w-[calc(100%-5rem)] truncate rounded-full border border-line bg-ink/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-accent backdrop-blur">
              {kind}
            </span>
          )}
          {year && (
            <span className="absolute right-3 top-3 rounded-full border border-line bg-ink/85 px-2.5 py-1 font-mono text-[11px] text-muted backdrop-blur">
              {year}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <h3 className="font-display text-lg font-semibold leading-snug text-heading">{title}</h3>
          <p className="flex-1 text-sm leading-relaxed text-muted">{description}</p>

          {stack.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[0.72rem] text-muted"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-2 pt-1">
            {links.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                className={buttonClass({ variant: "ghost", size: "sm" })}
              >
                <GithubIcon /> Code
              </a>
            )}
            {links.demo && (
              <a
                href={links.demo}
                target="_blank"
                rel="noreferrer"
                className={buttonClass({ size: "sm" })}
              >
                <ExternalLink size={15} /> Live demo
              </a>
            )}
            {links.private && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-line px-3.5 py-2 text-xs text-faint">
                <Lock size={13} /> Private repository
              </span>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default ProjectCard;
