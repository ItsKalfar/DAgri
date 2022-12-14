import "../styles/globals.css";
import { ProjectContextProvider } from "../context/ProjectContext";

function MyApp({ Component, pageProps }) {
  return (
    <ProjectContextProvider>
      <Component {...pageProps} />
    </ProjectContextProvider>
  );
}

export default MyApp;
