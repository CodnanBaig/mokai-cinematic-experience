import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { SubpageFooter, SubpageNav } from "@/components/SubpageChrome";
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
    <div className={styles.page} id="top">
      <div className={styles.grain} aria-hidden="true" />
      <SubpageNav active="join" />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>WORK WITH MOKAI · BANDRA</p>
            <h1>BRING YOUR<br /><em>THING.</em></h1>
            <p className={styles.intro}>We like people with a point of view, a generous spirit and enough curiosity to care about the tiny things.</p>
            <Link className={styles.roundLink} href="#teams" aria-label="Explore the team">
              <ArrowDownRight aria-hidden="true" />
            </Link>
          </div>

          <div className={styles.heroArt}>
            <div className={styles.heroPoster}>
              <Image src="/images/brand/restroom/poster-07.webp" alt="Mokai graphic artwork" fill priority sizes="(max-width: 900px) 76vw, 32vw" />
            </div>
            <div className={styles.heroPhoto}>
              <Image src="/images/mokai-first-floor.webp" alt="Mokai interior" fill priority sizes="(max-width: 900px) 68vw, 28vw" />
            </div>
            <Image className={styles.hanko} src="/brand/mokai-hanko-filled.svg" alt="" width={180} height={180} aria-hidden="true" />
          </div>
        </section>

        <section className={styles.statement}>
          <div className={styles.statementMark}>
            <Image src="/brand/mokai-with-hanko-filled.svg" alt="Mokai mark" width={300} height={300} />
          </div>
          <div className={styles.statementCopy}>
            <p className={styles.eyebrow}>NOT JUST ANOTHER SHIFT</p>
            <h2>MAKE THE ROOM<br /><em>feel better.</em></h2>
            <p>Mokai is built around slow attention: to the coffee, the food, the guest, the room and each other. Skill matters. So does how you make people feel while using it.</p>
          </div>
        </section>

        <section className={styles.teams} id="teams">
          <header className={styles.teamsHeader}>
            <div>
              <p className={styles.eyebrow}>WHERE YOU MIGHT FIT</p>
              <h2>Find your<br />corner.</h2>
            </div>
            <p>These are the worlds that make Mokai move. They are not a list of currently open vacancies—just the places where good people can make a difference.</p>
          </header>

          <div className={styles.teamGrid}>
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
          <div className={styles.cultureImage}>
            <Image src="/images/brand/backdrop-04.webp" alt="Mokai visual language artwork" fill sizes="(max-width: 900px) 100vw, 48vw" />
          </div>
          <div className={styles.cultureCopy}>
            <p className={styles.eyebrow}>CRAFT · CURIOSITY · CARE</p>
            <h2>GOOD ENERGY,<br /><em>properly made.</em></h2>
            <p>You do not need to fit a template. Tell us what you are good at, what you want to learn and why Mokai feels like your kind of place.</p>
            <Link className={styles.cta} href="/contact?type=careers">
              Introduce yourself <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <SubpageFooter />
    </div>
  );
}
