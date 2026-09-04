"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import BrandMark from "./BrandMark";

const links = [
  { href: "/#story", label: "Story", hash: "#story" },
  { href: "/#spaces", label: "Spaces", hash: "#spaces" },
  { href: "/join-our-team", label: "Join our team", match: "/join-our-team" },
  { href: "/contact", label: "Contact", match: "/contact" },
] as const;

export default function SiteNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [navPath, setNavPath] = useState(pathname);

  if (navPath !== pathname) {
    setNavPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="nav-shell" data-nav-animate>
      <Link className="nav-logo" href={isHome ? "#top" : "/"} aria-label="Mokai home" onClick={close}>
        <BrandMark compact />
      </Link>
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        <span>{open ? "Close" : "Menu"}</span>
      </button>
      <nav id="site-nav" className={open ? "is-open" : ""} aria-label="Primary navigation">
        {links.map((link) => {
          const href = "hash" in link && isHome ? link.hash : link.href;
          const active = "match" in link && pathname.startsWith(link.match);
          return (
            <Link
              key={link.label}
              href={href}
              className={active ? "is-active" : undefined}
              onClick={close}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <Link className="pill nav-visit" href={isHome ? "#visit" : "/#visit"} onClick={close}>
        Visit <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
    </header>
  );
}
