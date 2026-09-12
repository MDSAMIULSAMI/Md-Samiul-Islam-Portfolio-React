import Reveal from "./Reveal.jsx";

function SectionHead({ eyebrow, title, sub, align = "left" }) {
  const centered = align === "center";
  return (
    <Reveal
      className={`flex flex-col gap-3 ${
        centered ? "items-center text-center mx-auto" : "items-start"
      } mb-10 md:mb-14 max-w-3xl`}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
          <span className="size-1.5 rounded-full bg-accent" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{title}</h2>
      {sub && <p className="text-muted text-base sm:text-lg max-w-2xl">{sub}</p>}
    </Reveal>
  );
}

export default SectionHead;
