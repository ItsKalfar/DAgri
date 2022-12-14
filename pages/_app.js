import "../styles/globals.css";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    console.log("Fired");
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
