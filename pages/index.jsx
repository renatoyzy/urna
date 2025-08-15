import Head from "next/head";
import styles from "@/styles/pages/index.module.css";
import { useState } from "react";
import VotingScreen from "@/components/VotingScreen";
import VotingButtons from "@/components/VotingButtons";

export default function Index() {
  const [input, setInput] = useState('');

  return (
    <>
      <Head>
        <title>Urna - Nova DFM</title>
        <meta name="description" content="Urna para a primeira eleição do Nova DFM (projeto dos estudantes de atitude)" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main className={styles.body}>
        <main>
          <VotingScreen input={input} setInput={setInput} />
        </main>
        <aside>
          <VotingButtons setInput={setInput} />
        </aside>
      </main>
    </>
  );
}
