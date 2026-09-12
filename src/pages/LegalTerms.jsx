// Paired with LegalPrivacy.jsx; see the note there on the naming.
import { Scale, FileText, Copyright, TriangleAlert, Link2, Mail, RefreshCw } from "lucide-react";
import { LegalPage, LegalSection, LegalList } from "../components/ui/LegalPage.jsx";
import { profile, socials } from "../data/profile.js";

function LegalTerms() {
  return (
    <LegalPage icon={Scale} title="Terms of" accent="Service" updated="April 10, 2026">
      <LegalSection icon={FileText} title="Agreement to terms">
        <p>
          By accessing and using the portfolio website of{" "}
          <strong className="font-semibold text-heading">{profile.name}</strong>, you agree to these
          terms. If you do not agree with any part of them, please do not use this site.
        </p>
      </LegalSection>

      <LegalSection icon={Copyright} title="Intellectual property" delay={0.05}>
        <p>
          Unless stated otherwise, the content on this site is my own work and is protected by
          copyright.
        </p>
        <LegalList
          items={[
            {
              term: "Source code",
              text: "Projects linked here are governed by the licence stated in their own repository.",
            },
            {
              term: "Written content",
              text: "Case studies, descriptions and copy may not be republished without permission.",
            },
            {
              term: "Research papers",
              text: "Published work remains subject to the terms of its publishing journal.",
            },
          ]}
        />
      </LegalSection>

      <LegalSection icon={TriangleAlert} title="Disclaimer" delay={0.1}>
        <p>
          This site is provided as is. While I keep it accurate and current, I make no warranty that
          the content is complete or error free, and I am not liable for any loss arising from its
          use.
        </p>
      </LegalSection>

      <LegalSection icon={Link2} title="External links" delay={0.15}>
        <p>
          This site links to external websites that I do not control. Those links do not imply
          endorsement, and I am not responsible for their content or practices.
        </p>
      </LegalSection>

      <LegalSection icon={RefreshCw} title="Changes to these terms" delay={0.2}>
        <p>
          These terms may be revised at any time. Continuing to use the site after a revision means
          you accept the updated terms.
        </p>
      </LegalSection>

      <LegalSection icon={Mail} title="Contact" delay={0.25}>
        <p>
          Questions about these terms are welcome at{" "}
          <a href={socials.email} className="text-accent underline underline-offset-4">
            {profile.email}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}

export default LegalTerms;
