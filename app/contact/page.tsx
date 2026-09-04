import type { Metadata } from "next";
import Image from "next/image";
import { Clock3, MapPin, Phone } from "lucide-react";
import { SubpageFooter, SubpageNav } from "@/components/SubpageChrome";
import FeedbackForm from "./FeedbackForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact us | Mokai",
  description: "Contact Mokai in Pali Hill, Bandra West, or send feedback about your experience.",
};

type ContactPageProps = {
  searchParams: Promise<{ type?: string }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const initialType = params.type === "careers" ? "careers" : "feedback";

  return (
    <div className={styles.page} id="top">
      <div className={styles.grain} aria-hidden="true" />
      <SubpageNav active="contact" />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>HELLO, BANDRA</p>
            <h1>TALK TO<br /><em>US.</em></h1>
            <p>Feedback, questions, collaborations or something we should know—send it our way.</p>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroImage}>
              <Image src="/images/brand/backdrop-10.webp" alt="Mokai visual language artwork" fill priority sizes="(max-width: 900px) 92vw, 42vw" />
            </div>
            <div className={styles.stamp}>
              <Image src="/brand/mokai-hanko-filled.svg" alt="Mokai Hanko mark" width={180} height={180} />
            </div>
          </div>
        </section>

        <section className={styles.contactGrid}>
          <aside className={styles.details}>
            <p className={styles.eyebrow}>COME BY / CALL US</p>
            <h2>Between plans,<br />find Mokai.</h2>

            <div className={styles.detailList}>
              <div>
                <MapPin aria-hidden="true" />
                <p>600, 601, 602, Hill Crest Building,<br />Dr Ambedkar Road, Pali Hill,<br />Bandra West, Mumbai.</p>
              </div>
              <div>
                <Phone aria-hidden="true" />
                <p><a href="tel:+919820062166">+91 98200 62166</a><br /><a href="tel:+919820983607">+91 98209 83607</a></p>
              </div>
              <div>
                <Clock3 aria-hidden="true" />
                <p>Monday — Sunday<br /><strong>8:00 AM — 11:30 PM</strong></p>
              </div>
            </div>

            <div className={styles.detailArt}>
              <Image src="/images/mokai-window.webp" alt="Mokai interior window detail" fill sizes="(max-width: 900px) 90vw, 34vw" />
            </div>
          </aside>

          <section className={styles.formPanel} aria-labelledby="feedback-title">
            <div className={styles.formHeader}>
              <p className={styles.eyebrow}>FEEDBACK / ENQUIRIES</p>
              <h2 id="feedback-title">Say what<br /><em>you mean.</em></h2>
              <p>Good, bad, specific or unexpected. The useful stuff is usually in the details.</p>
            </div>
            <FeedbackForm initialType={initialType} />
          </section>
        </section>
      </main>

      <SubpageFooter />
    </div>
  );
}
