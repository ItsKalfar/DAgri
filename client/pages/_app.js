import "../styles/globals.css";
import { DAgreeProvider } from "../context/DAgriContext";

function MyApp({ Component, pageProps }) {
  return (
    <DAgreeProvider>
      <Component {...pageProps} />
    </DAgreeProvider>
  );
}

export default MyApp;
