function Card({ className = "", as: Tag = "div", ...rest }) {
  return (
    <Tag
      className={`rounded-[14px] border border-line bg-surface transition-colors duration-200 ${className}`}
      {...rest}
    />
  );
}

export default Card;
