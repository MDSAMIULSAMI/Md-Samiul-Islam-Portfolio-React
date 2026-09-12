import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { House, User, Briefcase, FolderGit2, Trophy, FileText } from "lucide-react";
import { GithubIcon } from "../ui/BrandIcons.jsx";
import { buttonClass } from "../ui/Button.jsx";
import { profile, socials } from "../../data/profile.js";

export const NAV_LINKS = [
  { to: "/", label: "Home", Icon: House },
  { to: "/about", label: "About", Icon: User },
  { to: "/experience", label: "Experience", Icon: Briefcase },
  { to: "/projects", label: "Projects", Icon: FolderGit2 },
  { to: "/achievements", label: "Awards", Icon: Trophy },
  { to: "/resume", label: "Resume", Icon: FileText },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (to) => pathname === to;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled ? "border-line bg-ink/85 backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
      >
        <nav className="bleed flex h-16 items-center justify-between gap-4 lg:h-[72px]">
          <Link to="/" className="flex items-center gap-3" aria-label="Home">
            <span className="grid size-9 place-items-center rounded-[10px] bg-accent font-display text-sm font-extrabold text-accent-fg">
              {profile.initials}
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[0.95rem] font-semibold text-heading">
                {profile.shortName} Islam
              </span>
              <span className="block text-[0.7rem] text-faint">{profile.role}</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map(({ to, label, Icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  aria-current={isActive(to) ? "page" : undefined}
                  className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive(to) ? "text-accent-fg" : "text-muted hover:text-heading"
                  }`}
                >
                  {isActive(to) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <Icon size={16} strokeWidth={2} />
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="hidden size-10 place-items-center rounded-full border border-line bg-surface text-body transition-colors duration-200 hover:border-line-strong hover:text-heading lg:grid"
            >
              <GithubIcon className="text-[1.05rem]" />
            </a>
            {/* Wrapper, not a `hidden` class on the anchor: the button base sets
                `inline-flex`, and Tailwind emits that after `hidden`. */}
            <span className="hidden lg:block">
              <a href={socials.email} className={buttonClass({ size: "sm" })}>
                Let's talk
              </a>
            </span>
          </div>
        </nav>
      </header>

      {/* Mobile navigation: a floating icon dock instead of a hamburger drawer.
          One tap to any page, no menu to open first. */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-50 flex justify-center pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
      >
        <ul className="flex items-center gap-0.5 rounded-full border border-line bg-ink-soft/95 p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          {NAV_LINKS.map(({ to, label, Icon }) => (
            <li key={to}>
              <Link
                to={to}
                aria-label={label}
                aria-current={isActive(to) ? "page" : undefined}
                className={`relative grid size-11 place-items-center rounded-full transition-colors duration-200 ${
                  isActive(to) ? "text-accent-fg" : "text-muted"
                }`}
              >
                {isActive(to) && (
                  <motion.span
                    layoutId="dock-active"
                    className="absolute inset-0 -z-10 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <Icon size={19} strokeWidth={2} />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
