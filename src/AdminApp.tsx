import { createRoot } from "react-dom/client";
import { RealContentEditor } from "./components/RealContentEditor";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<RealContentEditor />);
}
