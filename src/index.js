import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { AllRouter, Routers } from "./Router/AllRouter";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AllRouter></AllRouter>
  </React.StrictMode>
);
reportWebVitals();
