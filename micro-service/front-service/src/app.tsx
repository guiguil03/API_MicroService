import React from "react";
import ReactDOM from "react-dom/client";
import { AuthContainer } from "./front";

// Ajouter un style global pour supprimer la marge du body
const globalStyle = document.createElement("style");
globalStyle.innerHTML = `
  body {
    margin: 0;
    overflow: hidden; /* Empêche le défilement */
  }
`;
document.head.appendChild(globalStyle);

const container = document.getElementById("root");
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <AuthContainer />
    </React.StrictMode>
  );
} else {
  console.error("Root container not found");
}
