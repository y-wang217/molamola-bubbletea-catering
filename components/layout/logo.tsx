import Image from "next/image";
import Link from "next/link";
import logo from "@/public/brand/molamola-logo.png";

/** The real MolaMola wordmark (mascot + "mola mola" + "Dive into flavours"). Swap the file in /public/brand to update. */
export function Logo({ className = "h-10 w-auto", href = "/" }: { className?: string; href?: string | null }) {
  const img = <Image src={logo} alt="mola mola — Dive into flavours" priority className={className} sizes="240px" />;
  if (!href) return img;
  return (
    <Link href={href} aria-label="MolaMola home" className="inline-flex shrink-0 items-center">
      {img}
    </Link>
  );
}
