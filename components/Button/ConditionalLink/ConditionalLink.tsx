import Link from "next/link";
import { IConditionalLinkProps } from "./ConditionalLink.type";

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
