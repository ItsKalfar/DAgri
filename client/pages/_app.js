import "../styles/globals.css";
import { DAgreeProvider } from "../context/DAgriContext";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <DAgreeProvider>
      <Component {...pageProps} />
    </DAgreeProvider>
  );
}

export default MyApp;
