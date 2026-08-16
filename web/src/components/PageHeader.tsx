import { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
};

export function PageHeader({ eyebrow, title, intro, children }: Props) {
  return (
    <section className="mx-auto w-full max-w-[88rem] px-6 pb-14 pt-16 sm:px-10 lg:px-14 lg:pb-20 lg:pt-24">
      <Reveal stagger className="max-w-4xl">
        <p className="eyebrow text-pink">{eyebrow}</p>
        <h1 className="display-1 mt-7 text-balance text-ink">{title}</h1>
        {intro && <p className="lede mt-8 max-w-2xl text-pretty text-ink/60">{intro}</p>}
        {children}
      </Reveal>
    </section>
  );
}
