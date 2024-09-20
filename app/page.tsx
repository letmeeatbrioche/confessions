import Footer from "@/components/Footer";
import styles from "./page.module.css";
import Confessions from "@/components/Confessions";

export default function Home() {

  return (
    <main className={styles.main}>
      <h1 className="header">CONFíT<sup>9</sup></h1>
      <h2 className="subheading">What&apos;s on your mind?</h2>
      <Confessions />
      <Footer />
    </main>
  );
}
