import Image from "next/image";

type Props = {
  variant: "wordmark" | "lockup";
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

const sources = {
  wordmark: { light: "/Medina.png", dark: "/Medina-BLK.png" },
  lockup: { light: "/Medina-Logo.png", dark: "/Medina-Logo-BLK.png" },
} as const;

export function BrandMark({
  variant,
  alt,
  width,
  height,
  className = "",
  priority,
}: Props) {
  const src = sources[variant];

  return (
    <span className="relative inline-flex">
      <Image
        src={src.light}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`logo-light ${className}`}
      />
      <Image
        src={src.dark}
        alt=""
        width={width}
        height={height}
        priority={priority}
        aria-hidden
        className={`logo-dark ${className}`}
      />
    </span>
  );
}
