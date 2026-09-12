import { ExternalLink } from "lucide-react";
import SectionHead from "../components/ui/SectionHead.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import Card from "../components/ui/Card.jsx";
import { buttonClass } from "../components/ui/Button.jsx";
import { publications, certifications, education } from "../data/profile.js";

function AwardCard({ item, delay, cta }) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-[14px] border border-line bg-surface transition-colors duration-200 hover:border-line-strong">
        <div className="aspect-[16/10] shrink-0 overflow-hidden bg-ink-soft">
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-5">
          <h3 className="font-display text-[0.98rem] font-semibold leading-snug text-heading">
            {item.title}
          </h3>
          {item.venue && <p className="text-sm text-accent">{item.venue}</p>}
          {item.issuer && <p className="text-sm text-faint">{item.issuer}</p>}
          {item.date && <p className="flex-1 text-sm text-faint">{item.date}</p>}
          <a
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className={buttonClass({ variant: "ghost", size: "sm", className: "mt-1 self-start" })}
          >
            <ExternalLink size={15} /> {cta}
          </a>
        </div>
      </article>
    </Reveal>
  );
}

function Achievements() {
  const tiles = [
    { value: String(publications.length), label: "Published research papers" },
    { value: String(certifications.length), label: "Professional certifications" },
    { value: "3.30", label: "CGPA out of 4.00" },
    { value: "Dean's", label: `Award, Fall 2020, ${education.school}` },
  ];

  return (
    <>
      <section className="bleed py-28 lg:py-32">
        <SectionHead
          eyebrow="Achievements"
          title={
            <>
              Research and <span className="text-accent">recognition</span>
            </>
          }
          sub="Peer reviewed publications, academic honours and the courses that shaped how I work."
        />
        <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-line bg-line lg:grid-cols-4">
          {tiles.map((t) => (
            <div key={t.label} className="bg-surface p-6 lg:p-8">
              <span className="block font-display text-3xl font-extrabold tracking-tight text-accent lg:text-4xl">
                {t.value}
              </span>
              <span className="mt-1 block text-sm text-muted">{t.label}</span>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="bleed pb-16 lg:pb-20">
        <SectionHead
          eyebrow="Publications"
          title="Published research"
          sub="Transformer based sentiment analysis for Bangla text, focused on detecting depressive and suicidal intent."
        />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {publications.map((pub, i) => (
            <AwardCard key={pub.title} item={pub} delay={i * 0.08} cta="Read paper" />
          ))}
        </div>
      </section>

      <section className="bleed pb-24 lg:pb-32">
        <SectionHead eyebrow="Credentials" title="Certifications" />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {certifications.map((cert, i) => (
            <AwardCard key={cert.title} item={cert} delay={i * 0.06} cta="Verify" />
          ))}
        </div>
      </section>
    </>
  );
}

export default Achievements;
