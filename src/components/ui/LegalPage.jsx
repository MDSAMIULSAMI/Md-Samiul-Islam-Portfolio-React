import Reveal from "./Reveal.jsx";
import Card from "./Card.jsx";
import { Clock } from "lucide-react";

export function LegalSection({ icon: Icon, title, children, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <Card className="p-6 sm:p-8">
        <span className="mb-4 grid size-10 place-items-center rounded-[10px] border border-accent/30 bg-accent-soft text-accent">
          <Icon size={18} />
        </span>
        <h2 className="mb-3 font-display text-lg font-semibold sm:text-xl">{title}</h2>
        <div className="flex flex-col gap-3 text-[0.95rem] leading-relaxed text-muted">
          {children}
        </div>
      </Card>
    </Reveal>
  );
}

export function LegalList({ items }) {
  return (
    <ul className="mt-1 grid gap-2.5">
      {items.map(({ term, text }) => (
        <li key={term} className="relative pl-5 text-[0.93rem] leading-relaxed text-muted">
          <span aria-hidden="true" className="absolute left-0 top-0 text-accent">
            &rsaquo;
          </span>
          <strong className="font-semibold text-heading">{term}:</strong> {text}
        </li>
      ))}
    </ul>
  );
}

export function LegalPage({ icon: Icon, title, accent, updated, children }) {
  return (
    <section className="bleed py-28 lg:py-32">
      <div className="mx-auto max-w-4xl">
        <Reveal className="mb-10">
          <div className="flex flex-wrap items-center gap-4">
            <span className="grid size-14 shrink-0 place-items-center rounded-[14px] border border-accent/30 bg-accent-soft text-accent">
              <Icon size={24} />
            </span>
            <h1 className="text-[clamp(1.9rem,4.5vw,2.9rem)] font-bold">
              {title} <span className="text-accent">{accent}</span>
            </h1>
          </div>
          <p className="mt-4 flex items-center gap-2 font-mono text-xs text-faint">
            <Clock size={13} /> Last updated: {updated}
          </p>
        </Reveal>

        <div className="grid gap-5">{children}</div>
      </div>
    </section>
  );
}
