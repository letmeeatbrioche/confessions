import styles from "./page.module.css";
import Confessions from "@/components/Confessions";

export default function Home() {

  return (
    <main className={styles.main}>
      <h1>CONFESSIONS</h1>
      <Confessions />
    </main>
  );
}
