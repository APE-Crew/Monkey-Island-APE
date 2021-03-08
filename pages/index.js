import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <img src="Guybrush_Threepwood.png" height="300px" />
        <h1 className={styles.title}>Welcome to Monkey Island APE 🐒</h1>
      </main>

      <footer className={styles.footer}>
        <p>try the new APE from BoMa</p>
      </footer>
    </div>
  );
}
