import Card from "@/components/Card";
import styles from "./page.module.css";
import CardBrowser from "@/components/CardBrowser";
import CardCreator from "@/components/CardCreator";

export default async function Home() {
  return (
    <main className={styles.main}>
      <CardCreator />
      <CardBrowser />
    </main>
  );
}
