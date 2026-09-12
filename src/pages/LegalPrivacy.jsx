// Named LegalPrivacy rather than PrivacyPolicy on purpose. Vite's dev server
// serves modules at their real path, and Fanboy's Annoyances (bundled with
// uBlock Origin and AdGuard) carries the generic rule "/privacypolicy.js",
// which matches /src/pages/PrivacyPolicy.jsx and blocks it with
// ERR_BLOCKED_BY_CLIENT, leaving the whole dev app blank.
import { ShieldCheck, UserCheck, Shield, Cookie, Link2, Mail, RefreshCw } from "lucide-react";
import { LegalPage, LegalSection, LegalList } from "../components/ui/LegalPage.jsx";
import { profile, socials } from "../data/profile.js";

function LegalPrivacy() {
  return (
    <LegalPage icon={ShieldCheck} title="Privacy" accent="Policy" updated="April 10, 2026">
      <LegalSection icon={UserCheck} title="Introduction">
        <p>
          Welcome to the portfolio website of{" "}
          <strong className="font-semibold text-heading">{profile.name}</strong>. Your privacy
          matters to me. This policy explains how information is collected, used and protected when
          you visit this site.
        </p>
      </LegalSection>

      <LegalSection icon={Shield} title="Information I collect" delay={0.05}>
        <p>
          This is a personal portfolio. I do <strong className="font-semibold text-heading">not</strong>{" "}
          collect personal data through forms, accounts or tracking pixels. The following may be
          collected passively:
        </p>
        <LegalList
          items={[
            {
              term: "Usage data",
              text: "Basic analytics such as page views, browser type and device information, collected by the hosting provider.",
            },
            {
              term: "Log files",
              text: "Standard server logs that include IP addresses, timestamps and referring URLs.",
            },
          ]}
        />
      </LegalSection>

      <LegalSection icon={Cookie} title="Cookies" delay={0.1}>
        <p>
          This site sets no cookies of its own. Embedded third party content, such as the GitHub
          contribution graph, may set its own cookies, which are governed by that provider's policy.
        </p>
      </LegalSection>

      <LegalSection icon={Link2} title="Third party services" delay={0.15}>
        <p>
          Some content and links point to external services. Once you leave this site, their privacy
          policies apply rather than this one.
        </p>
        <LegalList
          items={[
            { term: "GitHub", text: "Serves the contribution calendar shown on the About page." },
            { term: "Google Fonts", text: "Serves the typefaces used across the site." },
            { term: "ResearchGate and Coursera", text: "Host the linked papers and certificates." },
          ]}
        />
      </LegalSection>

      <LegalSection icon={RefreshCw} title="Changes to this policy" delay={0.2}>
        <p>
          This policy may be updated from time to time. Any revision will be published on this page
          with a new date at the top.
        </p>
      </LegalSection>

      <LegalSection icon={Mail} title="Contact" delay={0.25}>
        <p>
          If you have any questions about this policy, reach me at{" "}
          <a href={socials.email} className="text-accent underline underline-offset-4">
            {profile.email}
          </a>{" "}
          or through the social profiles linked in the footer.
        </p>
      </LegalSection>
    </LegalPage>
  );
}

export default LegalPrivacy;
