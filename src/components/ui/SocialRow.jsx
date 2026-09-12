import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  CodeforcesIcon,
  LeetcodeIcon,
} from "./BrandIcons.jsx";
import { socials } from "../../data/profile.js";

const LINKS = [
  { href: socials.github, label: "GitHub", Icon: GithubIcon },
  { href: socials.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: socials.codeforces, label: "Codeforces", Icon: CodeforcesIcon },
  { href: socials.leetcode, label: "LeetCode", Icon: LeetcodeIcon },
  { href: socials.instagram, label: "Instagram", Icon: InstagramIcon },
];

function SocialRow({ className = "" }) {
  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {LINKS.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="grid size-11 place-items-center rounded-full border border-line bg-surface text-[1.1rem] text-muted transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-accent-fg"
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}

export default SocialRow;
