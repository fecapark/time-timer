import Link from "next/link";

interface IConditionalLinkProps {
  href: string;
  disabled?: boolean;
  children: JSX.Element;
}

export default function ConditionalLink({
  href,
  disabled = false,
  children,
}: IConditionalLinkProps) {
  if (disabled) {
    return children;
  }

  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {children}
    </Link>
  );
}
