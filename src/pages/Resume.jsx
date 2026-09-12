import { useCallback, useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, Download, Mail } from "lucide-react";
import SectionHead from "../components/ui/SectionHead.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import { buttonClass } from "../components/ui/Button.jsx";
import { socials } from "../data/profile.js";
import pdf from "../Assets/Resume/Md_Samiuls_Resume.pdf";

// Vite resolves and bundles the worker from the installed pdfjs-dist.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function Resume() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWidth, setPageWidth] = useState(760);

  // Fit the rendered page to the viewport rather than a fixed scale, so it
  // stays readable from 320px phones up to wide desktops.
  useEffect(() => {
    const measure = () => setPageWidth(Math.max(280, Math.min(window.innerWidth - 72, 900)));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const onLoad = useCallback(({ numPages: total }) => {
    setNumPages(total);
    setPageNumber(1);
  }, []);

  return (
    <section className="bleed py-28 lg:py-32">
      <SectionHead
        eyebrow="Resume"
        align="center"
        title={
          <>
            The one page <span className="text-accent">version</span>
          </>
        }
        sub="Experience, projects, skills and publications. Read it here or take the PDF with you."
      />

      <Reveal className="mb-8 flex flex-wrap justify-center gap-3">
        <a href={pdf} target="_blank" rel="noreferrer" className={buttonClass({})}>
          <Download size={18} /> Download PDF
        </a>
        <a href={socials.email} className={buttonClass({ variant: "ghost" })}>
          <Mail size={18} /> Email me
        </a>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="grid place-items-center overflow-x-auto rounded-[14px] border border-line bg-surface p-3 sm:p-6">
          <Document
            file={pdf}
            onLoadSuccess={onLoad}
            loading={
              <div className="p-16 font-mono text-sm text-faint">Loading resume</div>
            }
            error={
              <div className="p-16 text-center font-mono text-sm text-faint">
                Could not render the PDF here. Use the download button above.
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              width={pageWidth}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="overflow-hidden rounded-[10px]"
            />
          </Document>
        </div>
      </Reveal>

      {numPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
            disabled={pageNumber === 1}
            className={buttonClass({ variant: "ghost", size: "sm" })}
          >
            <ChevronLeft size={16} /> Prev
          </button>
          <span className="min-w-20 text-center font-mono text-sm text-muted">
            {pageNumber} / {numPages}
          </span>
          <button
            type="button"
            onClick={() => setPageNumber((p) => Math.min(p + 1, numPages))}
            disabled={pageNumber === numPages}
            className={buttonClass({ variant: "ghost", size: "sm" })}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      )}
    </section>
  );
}

export default Resume;
