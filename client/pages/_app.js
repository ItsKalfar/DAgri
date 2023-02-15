import "../styles/globals.css";
import { ProjectContextProvider } from "../context/ProjectContext";
import Modal from "react-modal";

Modal.setAppElement("#index");

function MyApp({ Component, pageProps }) {
  return (
    <ProjectContextProvider>
      <Component {...pageProps} />
    </ProjectContextProvider>
  );
}

export default MyApp;
