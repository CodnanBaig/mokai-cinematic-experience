import type { Metadata } from "next";
import Image from "next/image";
import { Clock3, MapPin, Phone } from "lucide-react";
import PageMotion from "@/components/PageMotion";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
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
    <PageMotion className={styles.page} id="top">
      <div className={styles.grain} aria-hidden="true" />
      <SiteNav />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy} data-hero-animate>
            <p className={styles.eyebrow}>HELLO, BANDRA</p>
            <h1>TALK TO<br /><em>US.</em></h1>
            <p>Feedback, questions, collaborations or something we should know—send it our way.</p>
          </div>
          <div className={styles.heroVisual} data-reveal="clip">
            <div className={styles.heroImage} data-parallax-wrap>
              <Image
                src="/images/brand/restroom/poster-06.webp"
                alt="Mokai restroom poster artwork"
                fill
                priority
                sizes="(max-width: 900px) 92vw, 42vw"
                data-parallax
                data-speed="-16"
              />
            </div>
            <div className={styles.stamp} data-reveal="scale">
              <Image src="/brand/mokai-hanko-filled.svg" alt="Mokai Hanko mark" width={180} height={180} />
            </div>
          </div>
        </section>

        <section className={styles.markStrip} aria-label="Mokai brand marks" data-reveal-stagger>
          {[
            "/images/brand/restroom/poster-04.webp",
            "/images/brand/restroom/poster-07.webp",
            "/images/brand/restroom/poster-09.webp",
            "/images/brand/collateral/dessert-box-artwork.webp",
          ].map((src) => (
            <div className={styles.markFrame} key={src} data-parallax-wrap>
              <Image src={src} alt="" fill sizes="(max-width: 900px) 48vw, 24vw" data-parallax data-speed="-11" />
            </div>
          ))}
        </section>

        <section className={styles.contactGrid}>
          <aside className={styles.details}>
            <p className={styles.eyebrow} data-reveal="left">COME BY / CALL US</p>
            <h2 data-scrub="fade-scale">Between plans,<br />find Mokai.</h2>

            <div className={styles.detailList} data-reveal-stagger>
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

            <div className={styles.detailArt} data-reveal="clip" data-parallax-wrap>
              <Image
                src="/images/brand/interiors/jute-bag-display.webp"
                alt="Mokai jute bag display in the café"
                fill
                sizes="(max-width: 900px) 90vw, 34vw"
                data-parallax
                data-speed="-14"
              />
            </div>
          </aside>

          <section className={styles.formPanel} aria-labelledby="feedback-title">
            <div className={styles.formHeader}>
              <p className={styles.eyebrow} data-reveal="right">FEEDBACK / ENQUIRIES</p>
              <h2 id="feedback-title" data-reveal="right">Say what<br /><em>you mean.</em></h2>
              <p data-reveal="right">Good, bad, specific or unexpected. The useful stuff is usually in the details.</p>
            </div>
            <div data-reveal="right">
              <FeedbackForm initialType={initialType} />
            </div>
          </section>
        </section>
      </main>

      <div data-reveal>
        <SiteFooter />
      </div>
    </PageMotion>
  );
}
