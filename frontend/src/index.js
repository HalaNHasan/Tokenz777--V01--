import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ContractProvider } from "./context/ContractProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContractProvider>
    <BrowserRouter basename="/Tokenz777--V01--">
      <App />
    </BrowserRouter>
  </ContractProvider>
);
