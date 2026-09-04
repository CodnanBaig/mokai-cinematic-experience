import Image from "next/image";
import Link from "next/link";
import BrandMark from "./BrandMark";
import styles from "./site-footer.module.css";

export default function SiteFooter() {
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
