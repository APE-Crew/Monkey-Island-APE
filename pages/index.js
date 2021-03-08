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
        <p>Login with your account</p>

        <p>HEY! BEHIND YOU! A THREE-HEADED MONKEY!</p>
        <p>I am Guybrush Threepwood, a mighty pirate!</p>

        <p>How fitting. You fight like a cow</p>
        <p>I can hold my breath for 10 minutes</p>
      </footer>
    </div>
  );
}
