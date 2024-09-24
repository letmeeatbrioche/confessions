import Footer from "@/components/Footer";
import styles from "./page.module.css";
import Confessions from "@/components/Confessions";
import Subheading from "@/components/Subheading";

export default function Home() {

  return (
    <main className={styles.main}>
      <h1 className="header">CONFíT<sup>9</sup></h1>
      <Subheading />
      <Confessions />
      <Footer />
    </main>
  );
}
