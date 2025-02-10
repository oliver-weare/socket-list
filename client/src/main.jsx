import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";

import { TodayListProvider } from "./context/TodayListContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TodayListProvider>
      <App />
    </TodayListProvider>
  </StrictMode>
);
