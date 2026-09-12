import { Link } from "react-router-dom";
import { NAV_LINKS } from "./Navbar.jsx";
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  CodeforcesIcon,
  LeetcodeIcon,
} from "../ui/BrandIcons.jsx";
import { profile, socials } from "../../data/profile.js";

const SOCIALS = [
  { href: socials.github, label: "GitHub", Icon: GithubIcon },
  { href: socials.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: socials.codeforces, label: "Codeforces", Icon: CodeforcesIcon },
  { href: socials.leetcode, label: "LeetCode", Icon: LeetcodeIcon },
  { href: socials.instagram, label: "Instagram", Icon: InstagramIcon },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line bg-ink-soft">
      <div className="bleed grid grid-cols-2 gap-8 py-12 lg:grid-cols-4">
        <div className="col-span-2 flex flex-col gap-4">
          <Link to="/" className="inline-flex items-center gap-3 font-display text-base font-bold text-heading">
            <span className="grid size-8 place-items-center rounded-[9px] bg-accent text-sm font-extrabold text-accent-fg">
              {profile.initials}
            </span>
            {profile.name}
          </Link>
          <p className="max-w-md text-sm text-muted">
            Software engineer in {profile.location} building FastAPI backends, React frontends
            and LLM powered product features.
          </p>
          <div className="flex flex-wrap gap-2">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid size-10 place-items-center rounded-[10px] border border-line bg-surface text-[1.05rem] text-muted transition-colors duration-200 hover:border-line-strong hover:text-heading"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <nav>
          <h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            Explore
          </h4>
          <ul className="grid gap-2.5">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="text-sm text-muted transition-colors hover:text-accent">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            Get in touch
          </h4>
          <ul className="grid gap-2.5">
            <li>
              <a href={socials.email} className="block break-all text-xs text-muted transition-colors hover:text-accent sm:text-sm">
                {profile.email}
              </a>
            </li>
            <li>
              <a href={`tel:${profile.phone}`} className="text-sm text-muted transition-colors hover:text-accent">
                {profile.phone}
              </a>
            </li>
            <li className="text-sm text-muted">{profile.location}</li>
          </ul>
        </div>
      </div>

      {/* extra bottom padding on phones so the floating dock never covers this */}
      <div className="bleed flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5 pb-24 text-[0.82rem] text-faint lg:pb-5">
        <span>
          &copy; {year} {profile.name}
        </span>
        <span className="flex flex-wrap items-center gap-3">
          <Link to="/privacy-policy" className="transition-colors hover:text-accent">
            Privacy Policy
          </Link>
          <span aria-hidden="true" className="opacity-40">
            /
          </span>
          <Link to="/terms-of-service" className="transition-colors hover:text-accent">
            Terms of Service
          </Link>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
