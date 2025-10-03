
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import Events from "./Events.tsx";
  import "./index.css";

  const rootEl = document.getElementById("root")!;
  const path = window.location.pathname;
  const element = path.startsWith("/events") ? <Events /> : <App />;
  createRoot(rootEl).render(element);
  