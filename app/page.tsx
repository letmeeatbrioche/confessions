import styles from "./page.module.css";
import Confessions from "@/components/Confessions";

export default function Home() {

  return (
    <main className={styles.main}>
      <h1 className="header-1">CONFíT</h1>
      {/* <h2 className="header-2">CONFESSIONS</h2> */}
      <Confessions />
    </main>
  );
}
