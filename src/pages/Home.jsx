import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { ArrowRight, Download, Mail, MapPin } from "lucide-react";
import Reveal from "../components/ui/Reveal.jsx";
import SectionHead from "../components/ui/SectionHead.jsx";
import SocialRow from "../components/ui/SocialRow.jsx";
import ProjectCard from "../components/ui/ProjectCard.jsx";
import Card from "../components/ui/Card.jsx";
import { buttonClass } from "../components/ui/Button.jsx";
import { profile, socials, stats, projects, experience } from "../data/profile.js";
import resumePdf from "../Assets/Resume/Md_Samiuls_Resume.pdf";
import portrait from "../Assets/SamGermany.jpg";

const featured = projects.filter((p) => p.featured);

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bleed flex min-h-svh items-center pb-16 pt-24 lg:pb-24 lg:pt-32">
        {/* Two explicit columns so the portrait always sits beside the intro.
            On phones it pairs with the name block only and the body copy runs
            full width underneath; from lg it spans both rows as before. */}
        <div className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-x-5 sm:gap-x-8 lg:grid-cols-[1.2fr_auto] lg:items-center lg:gap-x-16">
          <div className="col-start-1 row-start-1">
            <Reveal delay={0.05}>
              <p className="mb-2 font-display text-base text-muted sm:text-lg">Hello there</p>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="mb-3 font-display text-[clamp(2rem,7.5vw,5rem)] font-extrabold leading-[1.04] tracking-[-0.04em] lg:mb-4">
                I'm <span className="text-accent">{profile.name}</span>
              </h1>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="typewriter-line flex min-h-[1.5em] flex-wrap items-center gap-2 font-display text-[clamp(1rem,3.6vw,1.9rem)] font-semibold">
                <span className="font-mono text-[0.6em] font-normal text-faint">&gt;</span>
                <Typewriter
                  options={{
                    strings: profile.roles,
                    autoStart: true,
                    loop: true,
                    delay: 55,
                    deleteSpeed: 28,
                  }}
                />
              </div>
            </Reveal>
          </div>

          <Reveal
            delay={0.15}
            className="col-start-2 row-start-1 flex justify-end lg:row-span-2 lg:self-center"
          >
            <div className="relative">
              <div className="size-[clamp(96px,24vw,300px)] overflow-hidden rounded-full border-2 border-line bg-surface">
                <img
                  src={portrait}
                  alt={profile.name}
                  className="size-full object-cover"
                  loading="eager"
                />
              </div>
              <span className="absolute -bottom-3 left-1/2 hidden -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-ink px-3.5 py-1.5 text-xs font-medium text-body lg:flex">
                <MapPin size={13} className="text-accent" />
                {profile.location}
              </span>
            </div>
          </Reveal>

          <div className="col-span-2 row-start-2 lg:col-span-1 lg:col-start-1">
            <Reveal delay={0.2}>
              <p className="mb-7 mt-6 max-w-2xl text-base text-muted sm:text-lg lg:mt-5">
                {profile.summary}
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mb-8 flex flex-wrap gap-3">
                <Link to="/projects" className={buttonClass({})}>
                  View my work <ArrowRight size={18} />
                </Link>
                <a
                  href={resumePdf}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonClass({ variant: "ghost" })}
                >
                  <Download size={18} /> Resume
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-faint">
                  Find me
                </span>
                <SocialRow />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bleed pb-16 lg:pb-20">
        <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-line bg-line lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-surface p-6 lg:p-8">
              <span className="block font-display text-3xl font-extrabold tracking-tight text-accent lg:text-4xl">
                {s.value}
              </span>
              <span className="mt-1 block text-sm text-muted">{s.label}</span>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Snapshot */}
      <section className="bleed py-16 lg:py-24">
        <SectionHead
          eyebrow="Introduction"
          title="Engineering products people actually use"
          sub="Backend depth, a frontend that feels considered, and AI features that survive contact with real users."
        />

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <Reveal>
            <Card className="h-full p-6 sm:p-8">
              <div className="flex flex-col gap-4 text-base text-body">
                <p>
                  I hold a B.Sc. in{" "}
                  <span className="font-semibold text-accent">Computer Science and Engineering</span>{" "}
                  from Green University of Bangladesh. Today I work as a{" "}
                  <span className="font-semibold text-accent">Software Engineer</span> at Travela,
                  where I lead development on{" "}
                  <span className="font-semibold text-accent">Social CRM</span>, a shared inbox that
                  unifies Facebook, WhatsApp and Instagram conversations for 34,000+ users.
                </p>
                <p>
                  Its agent mode is the part I am proudest of. An{" "}
                  <span className="font-semibold text-accent">LLM agent</span> answers guest
                  questions, shows listings, generates payment links and confirms bookings without
                  leaving the chat, then hands the thread to a human the moment it should.
                </p>
                <p>
                  In parallel I am a{" "}
                  <span className="font-semibold text-accent">Full Stack Engineer</span> at
                  DataCrata, building <span className="font-semibold text-accent">RAG pipelines</span>{" "}
                  and agent workflows, and evaluating model output with LangSmith so regressions get
                  caught before release.
                </p>
              </div>
            </Card>
          </Reveal>

          <div className="flex flex-col gap-4">
            <Reveal delay={0.08}>
              <Card className="p-6">
                <h3 className="mb-4 font-display text-base font-semibold text-heading">Currently</h3>
                <dl className="grid gap-3">
                  {experience
                    .filter((e) => e.current)
                    .map((e) => (
                      <div
                        key={e.company}
                        className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-3 text-sm last:border-0 last:pb-0"
                      >
                        <dt className="text-faint">{e.company}</dt>
                        <dd className="font-medium text-body">{e.role}</dd>
                      </div>
                    ))}
                  <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                    <dt className="text-faint">Focus</dt>
                    <dd className="font-medium text-body">FastAPI, React, Agentic AI</dd>
                  </div>
                </dl>
              </Card>
            </Reveal>
            <Reveal delay={0.14}>
              <Link to="/experience" className={buttonClass({ variant: "ghost", block: true })}>
                See the full timeline <ArrowRight size={17} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured work */}
      <section className="bleed py-16 lg:py-24">
        <SectionHead
          eyebrow="Selected work"
          title="Things I've built recently"
          sub="A few projects that best represent how I think about products, models and systems."
        />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map((project, i) => (
            <ProjectCard key={project.title} project={project} delay={i * 0.08} />
          ))}
        </div>
        <Reveal delay={0.1} className="mt-10 flex justify-center">
          <Link to="/projects" className={buttonClass({ variant: "ghost" })}>
            Browse all projects <ArrowRight size={17} />
          </Link>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="bleed pb-20 lg:pb-28">
        <Reveal>
          <Card className="flex flex-col items-center gap-4 border-accent/40 bg-accent-soft px-6 py-12 text-center sm:px-10 lg:py-16">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              Get in touch
            </span>
            <h2 className="text-[clamp(1.8rem,4.5vw,3rem)] font-bold">
              Have something worth <span className="text-accent">building</span>?
            </h2>
            <p className="max-w-xl text-muted">
              I am open to product engineering roles and freelance work, especially anything
              involving FastAPI backends, React frontends or LLM powered features.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <a href={socials.email} className={buttonClass({})}>
                <Mail size={18} /> Send me an email
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className={buttonClass({ variant: "ghost" })}
              >
                Connect on LinkedIn
              </a>
            </div>
            <a
              href={socials.email}
              className="mt-2 break-all font-mono text-sm text-faint transition-colors hover:text-accent"
            >
              {profile.email}
            </a>
          </Card>
        </Reveal>
      </section>
    </>
  );
}

export default Home;
