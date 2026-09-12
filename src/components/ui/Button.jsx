const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold whitespace-nowrap transition-colors duration-200 disabled:opacity-40 disabled:pointer-events-none";

const variants = {
  primary: "bg-accent text-accent-fg hover:bg-[#6b49f5]",
  ghost: "border border-line bg-surface text-heading hover:border-line-strong hover:bg-surface-2",
  quiet: "text-muted hover:text-heading",
};

const sizes = {
  md: "px-6 py-3 text-[0.95rem]",
  sm: "px-4 py-2 text-sm",
};

export function buttonClass({ variant = "primary", size = "md", block = false, className = "" }) {
  return [base, variants[variant], sizes[size], block ? "w-full" : "", className]
    .filter(Boolean)
    .join(" ");
}

function Button({ variant, size, block, className, as: Tag = "button", ...rest }) {
  return <Tag className={buttonClass({ variant, size, block, className })} {...rest} />;
}

export default Button;
