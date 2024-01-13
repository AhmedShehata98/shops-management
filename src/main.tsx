import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import RecoilWrapper from "./lib/RecoilWrapper.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilWrapper>
      <App />
    </RecoilWrapper>
  </React.StrictMode>
);
