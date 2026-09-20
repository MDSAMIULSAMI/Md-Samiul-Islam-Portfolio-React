// Roughly the shape of the page underneath: a name, a contact line, then
// sections of a heading and body lines.
const SECTIONS = [
  ["38%", "62%", "54%", "68%"],
  ["30%", "88%", "80%", "72%", "84%", "66%"],
  ["34%", "84%", "76%", "66%", "58%"],
  ["28%", "80%", "58%", "74%", "64%"],
  ["32%", "70%", "86%", "60%", "78%"],
  ["36%", "78%", "52%", "70%"],
];

// Flattened to one list rather than a div per section, because a percentage
// height only resolves against a definite one. The A4 box has a definite
// height, a section wrapper would not, and every bar inside it would collapse
// to nothing. Widths are percentages too, so the whole block scales with
// whatever width it is rendered at.
const BARS = [
  { width: "46%", height: "3.6%", gap: "0%", strong: true },
  { width: "64%", height: "1.8%", gap: "1.8%" },
  { rule: true, gap: "4.5%" },
  ...SECTIONS.flatMap(([heading, ...lines]) => [
    { width: heading, height: "2%", gap: "4.5%", strong: true },
    ...lines.map((width) => ({ width, height: "1.5%", gap: "2.2%" })),
  ]),
];

// Mirrors the measure in src/pages/Resume.jsx for the callers that have not
// measured anything yet, so the placeholder and the page react-pdf eventually
// renders come out the same width.
const UNMEASURED = "clamp(280px, calc(100vw - 72px), 900px)";

/**
 * Stands in for the resume while it loads, at A4's 1:sqrt(2) ratio, which is
 * what react-pdf renders the real page at. Deliberately free of any react-pdf
 * import: App.jsx shows it while the /resume chunk is still downloading, and
 * pulling pdf.js into the main bundle is the thing that chunk exists to avoid.
 */
function ResumeSkeleton({ width }) {
  return (
    <div
      role="status"
      aria-label="Loading the resume"
      style={{ width: width ?? UNMEASURED, aspectRatio: "1 / 1.4142" }}
      className="animate-pulse overflow-hidden rounded-[10px] border border-line bg-ink-soft p-[7%]"
    >
      {BARS.map(({ width: w, height, gap, strong, rule }, i) =>
        rule ? (
          <div key={i} className="h-px w-full bg-line" style={{ marginTop: gap }} />
        ) : (
          <div
            key={i}
            className={`rounded-full ${strong ? "bg-line-strong" : "bg-line"}`}
            style={{ width: w, height, marginTop: gap }}
          />
        )
      )}
    </div>
  );
}

export default ResumeSkeleton;
