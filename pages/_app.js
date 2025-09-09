import { initSounds } from "@/src/playSound";
import "@/styles/globals.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    initSounds();
  }, []);
  return <Component {...pageProps} />;
}
