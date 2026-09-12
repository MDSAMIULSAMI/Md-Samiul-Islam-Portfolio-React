import { MapPin, GraduationCap, Download, BookOpen } from "lucide-react";
import SectionHead from "../components/ui/SectionHead.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import Card from "../components/ui/Card.jsx";
import { buttonClass } from "../components/ui/Button.jsx";
import { experience, education, publications } from "../data/profile.js";
import resumePdf from "../Assets/Resume/Md_Samiuls_Resume.pdf";

function Experience() {
  return (
    <>
      <section className="bleed py-28 lg:py-32">
        <SectionHead
          eyebrow="Career"
          title={
            <>
              Where I've <span className="text-accent">shipped</span>
            </>
          }
          sub="Three teams, one throughline: own the feature end to end and make sure it holds up in production."
        />

        <ol className="relative grid gap-5 pl-7 sm:pl-10">
          <span
            aria-hidden="true"
            className="absolute bottom-3 left-0 top-3 w-px bg-line sm:left-[3px]"
          />
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.08} as="li" className="relative">
              <span
                aria-hidden="true"
                className={`absolute -left-7 top-9 size-3.5 rounded-full border-2 border-accent sm:-left-10 ${
                  job.current ? "bg-accent" : "bg-ink"
                }`}
                style={{ marginLeft: "-6px" }}
              />
              <Card className="p-6 sm:p-8">
                <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                  <h3 className="font-display text-xl font-semibold text-heading sm:text-2xl">
                    {job.role}
                  </h3>
                  <span className="rounded-full border border-accent/30 bg-accent-soft px-3 py-1 font-mono text-xs text-accent">
                    {job.period}
                  </span>
                </div>

                <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                  <span className="font-semibold text-heading">{job.company}</span>
                  {job.legalName && <span className="text-faint">{job.legalName}</span>}
                  <span className="inline-flex items-center gap-1.5 text-faint">
                    <MapPin size={14} /> {job.location}
                  </span>
                  {job.current && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-positive/35 bg-positive/10 px-2.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wide text-positive">
                      <span className="size-1.5 rounded-full bg-positive" />
                      Current
                    </span>
                  )}
                </div>

                <ul className="mb-5 grid gap-2.5">
                  {job.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-[0.94rem] leading-relaxed text-muted">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>

                <ul className="flex flex-wrap gap-1.5">
                  {job.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[0.72rem] text-muted"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="bleed pb-16 lg:pb-20">
        <SectionHead eyebrow="Education" title="Where it started" />
        <Reveal>
          <Card className="flex flex-wrap items-start gap-5 p-6 sm:p-8">
            <span className="grid size-12 shrink-0 place-items-center rounded-[12px] border border-accent/30 bg-accent-soft text-accent">
              <GraduationCap size={22} />
            </span>
            <div>
              <h3 className="text-lg font-semibold">{education.school}</h3>
              <p className="text-sm text-muted">{education.degree}</p>
              <p className="mt-1.5 text-sm text-accent">{education.detail}</p>
              <p className="mt-1 text-[0.84rem] text-faint">
                {education.period}, {education.location}
              </p>
            </div>
          </Card>
        </Reveal>
      </section>

      <section className="bleed pb-24 lg:pb-32">
        <SectionHead
          eyebrow="Publications"
          title="Peer reviewed research"
          sub="Two papers on Bangla language sentiment analysis for depressive and suicidal text."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {publications.map((pub, i) => (
            <Reveal key={pub.title} delay={i * 0.08} className="h-full">
              <Card className="flex h-full flex-col gap-3 p-6 sm:p-8">
                <span className="grid size-10 place-items-center rounded-[10px] border border-accent/30 bg-accent-soft text-accent">
                  <BookOpen size={18} />
                </span>
                <h3 className="font-display text-lg font-semibold leading-snug">{pub.title}</h3>
                <p className="flex-1 text-sm text-muted">{pub.venue}</p>
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonClass({ variant: "ghost", size: "sm", className: "self-start" })}
                >
                  Read the paper
                </a>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10 flex justify-center">
          <a href={resumePdf} target="_blank" rel="noreferrer" className={buttonClass({})}>
            <Download size={18} /> Download full resume
          </a>
        </Reveal>
      </section>
    </>
  );
}

export default Experience;
