import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BrandMark from "./BrandMark";
import styles from "./subpage-chrome.module.css";

type ActivePage = "join" | "contact";

export function SubpageNav({ active }: { active: ActivePage }) {
  return (
    <header className={styles.nav}>
      <Link className={styles.logo} href="/" aria-label="Mokai home">
        <BrandMark compact />
      </Link>
      <nav className={styles.links} aria-label="Secondary navigation">
        <Link href="/#story">Story</Link>
        <Link href="/#spaces">Spaces</Link>
        <Link className={active === "join" ? styles.active : undefined} href="/join-our-team">Join our team</Link>
        <Link className={active === "contact" ? styles.active : undefined} href="/contact">Contact</Link>
      </nav>
      <Link className={styles.homeLink} href="/">
        Home <ArrowUpRight size={15} aria-hidden="true" />
      </Link>
    </header>
  );
}

export function SubpageFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.lockup}>
          <div className={styles.hankoCrop} aria-hidden="true">
            <Image src="/brand/mokai-with-hanko.svg" width={300} height={300} alt="" />
          </div>
          <BrandMark light />
        </div>
        <p>Indian-made. Asian-inspired.<br />Experienced in Bandra.</p>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.footerLinks}>
          <Link href="/join-our-team">Join our team</Link>
          <Link href="/contact">Contact</Link>
          <a href="https://www.instagram.com/mokaiindia/" target="_blank" rel="noreferrer">Instagram</a>
        </div>
        <small>600–602 Hill Crest Building, Dr Ambedkar Road, Pali Hill, Bandra West, Mumbai.</small>
      </div>
    </footer>
  );
}
