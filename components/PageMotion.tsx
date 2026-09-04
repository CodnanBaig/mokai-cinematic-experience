"use client";

import { useRef, type ReactNode } from "react";
import { useScrollMotion } from "@/hooks/useScrollMotion";

type PageMotionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

/** Client wrapper that adds Lenis + scroll reveals/parallax for any page. */
export default function PageMotion({ children, className, id }: PageMotionProps) {
  const root = useRef<HTMLDivElement>(null);
  useScrollMotion(root);

  return (
    <div ref={root} className={className} id={id}>
      {children}
    </div>
  );
}
