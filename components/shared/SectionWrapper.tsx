"use client";

import clsx from "clsx";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function SectionWrapper({ id, children, className, style }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={clsx("relative", className)}
      style={style}
    >
      {children}
    </section>
  );
}
