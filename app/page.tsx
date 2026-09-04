import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Experience from "@/components/Experience";
import styles from "./home-links.module.css";

export default function HomePage() {
  return (
    <>
      <Experience />
      <nav className={styles.links} aria-label="More from Mokai">
        <span>More from Mokai</span>
        <Link href="/join-our-team">Join our team <ArrowUpRight size={15} aria-hidden="true" /></Link>
        <Link href="/contact">Contact us <ArrowUpRight size={15} aria-hidden="true" /></Link>
      </nav>
    </>
  );
}
