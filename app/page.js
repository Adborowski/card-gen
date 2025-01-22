import styles from "./page.module.css";
import CardBrowser from "@/components/CardBrowser";

export default async function Home() {
  return (
    <main className={styles.main}>
      <CardBrowser />
    </main>
  );
}
