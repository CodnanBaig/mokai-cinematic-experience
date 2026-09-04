import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import PageMotion from "@/components/PageMotion";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Join our team | Mokai",
  description: "Bring your craft, curiosity and care to Mokai in Bandra.",
};

const teams = [
  ["Coffee & bar", "Precision without stiffness. Ritual, flavour and a counter that still feels human."],
  ["Kitchen", "Asian references, Indian instinct and a respect for the little details that make a plate memorable."],
  ["Floor & guest experience", "Warm, observant hospitality for people who notice the room as much as the menu."],
  ["Creative & community", "Ideas, collaborations, culture and the details that make Mokai feel like more than a café."],
] as const;

export default function JoinOurTeamPage() {
  return (
    <PageMotion className={styles.page} id="top">
      <div className={styles.grain} aria-hidden="true" />
      <SiteNav />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy} data-hero-animate>
            <p className={styles.eyebrow}>WORK WITH MOKAI · BANDRA</p>
            <h1>BRING YOUR<br /><em>THING.</em></h1>
            <p className={styles.intro}>We like people with a point of view, a generous spirit and enough curiosity to care about the tiny things.</p>
            <Link className={styles.roundLink} href="#teams" aria-label="Explore the team">
              <ArrowDownRight aria-hidden="true" />
            </Link>
          </div>

          <div className={styles.heroArt} data-reveal="clip">
            <div className={styles.heroPoster} data-parallax-wrap>
              <Image
                src="/images/brand/restroom/poster-03.webp"
                alt="Mokai graphic artwork"
                fill
                priority
                sizes="(max-width: 900px) 76vw, 32vw"
                data-parallax
                data-speed="-16"
              />
            </div>
            <div className={styles.heroPhoto} data-parallax-wrap>
              <Image
                src="/images/brand/interiors/frame-01.webp"
                alt="Mokai interior"
                fill
                priority
                sizes="(max-width: 900px) 68vw, 28vw"
                data-parallax
                data-speed="-10"
              />
            </div>
            <Image className={styles.hanko} src="/brand/mokai-hanko-filled.svg" alt="" width={180} height={180} aria-hidden="true" data-reveal="scale" />
          </div>
        </section>

        <section className={styles.statement}>
          <div className={styles.statementMark} data-reveal="scale" data-parallax-wrap>
            <Image src="/brand/mokai-with-hanko-filled.svg" alt="Mokai mark" width={300} height={300} data-parallax data-speed="-8" data-scale="1" />
          </div>
          <div className={styles.statementCopy}>
            <p className={styles.eyebrow} data-reveal="right">NOT JUST ANOTHER SHIFT</p>
            <h2 data-scrub="fade-scale">MAKE THE ROOM<br /><em>feel better.</em></h2>
            <p data-reveal="right">Mokai is built around slow attention: to the coffee, the food, the guest, the room and each other. Skill matters. So does how you make people feel while using it.</p>
          </div>
        </section>

        <section className={styles.posterStrip} aria-label="Mokai visual language" data-reveal-stagger>
          {[
            "/images/brand/restroom/poster-01.webp",
            "/images/brand/restroom/poster-05.webp",
            "/images/brand/restroom/poster-08.webp",
            "/images/brand/restroom/poster-10.webp",
            "/images/brand/restroom/poster-02.webp",
          ].map((src) => (
            <div className={styles.posterFrame} key={src} data-parallax-wrap>
              <Image src={src} alt="" fill sizes="(max-width: 900px) 42vw, 18vw" data-parallax data-speed="-12" />
            </div>
          ))}
        </section>

        <section className={styles.teams} id="teams">
          <header className={styles.teamsHeader}>
            <div>
              <p className={styles.eyebrow} data-reveal="left">WHERE YOU MIGHT FIT</p>
              <h2 data-reveal="left">Find your<br />corner.</h2>
            </div>
            <p data-reveal="right">These are the worlds that make Mokai move. They are not a list of currently open vacancies—just the places where good people can make a difference.</p>
          </header>

          <div className={styles.teamGrid} data-reveal-stagger>
            {teams.map(([title, body], index) => (
              <article className={styles.teamCard} key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.culture}>
          <div className={styles.cultureImage} data-reveal="clip" data-parallax-wrap>
            <Image
              src="/images/brand/collateral/takeaway-bag-mockup.webp"
              alt="Mokai takeaway bag with brand artwork"
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
              data-parallax
              data-speed="-18"
            />
          </div>
          <div className={styles.cultureCopy}>
            <p className={styles.eyebrow} data-reveal="right">CRAFT · CURIOSITY · CARE</p>
            <h2 data-reveal="right">GOOD ENERGY,<br /><em>properly made.</em></h2>
            <p data-reveal="right">You do not need to fit a template. Tell us what you are good at, what you want to learn and why Mokai feels like your kind of place.</p>
            <Link className={styles.cta} href="/contact?type=careers" data-reveal="right">
              Introduce yourself <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <div data-reveal>
        <SiteFooter />
      </div>
    </PageMotion>
  );
}
