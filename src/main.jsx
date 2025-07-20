import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ShapeProvider } from "./dataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode dir="rtl">
    <ShapeProvider>
      <App />
    </ShapeProvider>
  </React.StrictMode>
);
