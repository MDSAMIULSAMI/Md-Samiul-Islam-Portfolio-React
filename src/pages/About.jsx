import { GitHubCalendar } from "react-github-calendar";
import { Code, Database, Sparkles, Globe, Quote, ChevronRight } from "lucide-react";
import SectionHead from "../components/ui/SectionHead.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import Card from "../components/ui/Card.jsx";
import { GithubIcon } from "../components/ui/BrandIcons.jsx";
import { profile, socials, skillGroups, education, interests, techStack } from "../data/profile.js";

const ICONS = { code: Code, database: Database, sparkles: Sparkles, globe: Globe };

const CALENDAR_THEME = {
  dark: ["#17171f", "#2b2350", "#4b37a8", "#6b4fe0", "#9a82ff"],
};

function About() {
  return (
    <>
      <section className="bleed py-28 lg:py-32">
        <SectionHead
          eyebrow="About me"
          title={
            <>
              Know who <span className="text-accent">I am</span>
            </>
          }
          sub="A short version of the story. The long one lives on my resume."
        />

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <Reveal>
            <Card className="h-full p-6 sm:p-8">
              <div className="flex flex-col gap-4 text-base text-body">
                <p>
                  Greetings, I'm <span className="font-semibold text-accent">{profile.name}</span>, a
                  software engineer based in {profile.location}. I graduated with a B.Sc. in CSE from{" "}
                  {education.school} and have been building for production ever since.
                </p>
                <p>
                  I currently split my time between{" "}
                  <span className="font-semibold text-accent">Travela</span>, where I am a Software
                  Engineer and lead developer on a shared inbox CRM used by 34,000+ people, and{" "}
                  <span className="font-semibold text-accent">DataCrata</span>, where I build FastAPI
                  backends, React frontends and LLM integrations as a Full Stack Engineer.
                </p>
                <p>
                  Before that I was a{" "}
                  <span className="font-semibold text-accent">Junior Software Engineer</span> at
                  CoderOrbit, shipping Vue.js, Nuxt.js and Next.js features on a Laravel backend and
                  writing the developer facing API docs.
                </p>
                <p>
                  My interest sits where web development, backend engineering and system design
                  meet, the kind of work that measurably benefits a company and the people using its
                  product.
                </p>
              </div>

              <ul className="mt-7 grid gap-2.5">
                {interests.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[0.94rem] text-muted">
                    <ChevronRight size={17} className="mt-1 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>

          <div className="flex flex-col gap-4">
            <Reveal delay={0.08}>
              <Card className="p-6">
                <h3 className="mb-4 font-display text-base font-semibold text-heading">
                  At a glance
                </h3>
                <dl className="grid gap-3 text-sm">
                  {[
                    ["Role", profile.role],
                    ["Location", profile.location],
                    ["Education", `B.Sc. CSE, ${education.gradYear}`],
                    ["Languages", "Bangla, English"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-3"
                    >
                      <dt className="text-faint">{k}</dt>
                      <dd className="font-medium text-body">{v}</dd>
                    </div>
                  ))}
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <dt className="text-faint">Availability</dt>
                    <dd className="font-medium text-positive">Open to work</dd>
                  </div>
                </dl>
              </Card>
            </Reveal>

            <Reveal delay={0.14}>
              <Card className="p-6">
                <Quote size={26} className="mb-3 text-accent" />
                <blockquote className="text-[0.95rem] italic leading-relaxed text-body">
                  Artificial intelligence, deep learning, machine learning, whatever you're doing, if
                  you don't understand it, learn it. Because otherwise you're going to be a dinosaur
                  within three years.
                </blockquote>
                <figcaption className="mt-3 text-sm text-faint">Mark Cuban</figcaption>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bleed py-16 lg:py-20">
        <SectionHead
          eyebrow="Skills"
          title="What I work with"
          sub="The stack I reach for day to day, grouped the way I actually use it."
        />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map((group, i) => {
            const Icon = ICONS[group.icon] ?? Code;
            return (
              <Reveal key={group.title} delay={i * 0.07} className="h-full">
                <Card className="h-full p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-[10px] border border-accent/30 bg-accent-soft text-accent">
                      <Icon size={18} />
                    </span>
                    <h3 className="font-display text-[0.95rem] font-semibold text-heading">
                      {group.title}
                    </h3>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line bg-surface-2 px-3 py-1.5 text-[0.8rem] text-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bleed py-16 lg:py-20">
        <SectionHead eyebrow="Toolbox" title="Languages, frameworks and tools" />
        <Reveal>
          <ul className="flex flex-wrap gap-2.5">
            {techStack.map((t) => (
              <li
                key={t}
                className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-muted transition-colors duration-200 hover:border-accent hover:text-heading"
              >
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="bleed pb-24 lg:pb-32">
        <SectionHead
          eyebrow="Activity"
          title={
            <>
              Days I <span className="text-accent">code</span>
            </>
          }
          sub="Contribution graph straight from GitHub."
        />
        <Reveal>
          <Card className="p-6 sm:p-8">
            <div className="overflow-x-auto">
              <GitHubCalendar
                username="MDSAMIULSAMI"
                colorScheme="dark"
                errorMessage="The contribution graph could not load. It is fetched from a third party API, which some ad blockers block."
                theme={CALENDAR_THEME}
                blockSize={13}
                blockMargin={4}
                blockRadius={3}
                fontSize={14}
              />
            </div>
            {/* Always present, so the section still leads somewhere when the
                graph API is unreachable or blocked by an extension. */}
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
            >
              <GithubIcon /> View the full profile on GitHub
            </a>
          </Card>
        </Reveal>
      </section>
    </>
  );
}

export default About;
