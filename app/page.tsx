import Experience from "@/components/Experience";
import styles from "./loader-identity.module.css";

export default function HomePage() {
  return (
    <div className={styles.loaderScope}>
      <Experience />
    </div>
  );
}
